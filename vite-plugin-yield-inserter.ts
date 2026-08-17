import { Plugin } from 'vite';
import ts from 'typescript';

// yield; 文を生成するヘルパー
function createYieldStatement(): ts.ExpressionStatement {
    return ts.factory.createExpressionStatement(
        ts.factory.createYieldExpression(undefined, undefined)
    );
}

// break または continue か判定
function isTarget(node: ts.Node): boolean {
    return ts.isBreakStatement(node) || ts.isContinueStatement(node);
}

// 繰り返し構文の「本体（Body）」を書き換えるメイン処理
function transformLoopBody(node: ts.Statement, visit: (n: ts.Node) => ts.Node, id: string): ts.Statement {
    if (ts.isBlock(node)) {
        if (node.statements.length === 0) {
            throw new Error(`[vite-plugin-yield-inserter] エラー: 空の繰り返し構文が検出されました。ファイル: ${id}`);
        }

        const newStatements: ts.Statement[] = [];
        for (const stmt of node.statements) {
            if (isTarget(stmt)) {
                newStatements.push(createYieldStatement());
            }
            newStatements.push(ts.visitNode(stmt, visit) as ts.Statement);
        }

        const sourceFile = node.getSourceFile();
        const yieldStmt = createYieldStatement();

        const lastStmt = node.statements[node.statements.length - 1];
        const rawTailText = sourceFile.text.substring(lastStmt.end, node.end - 1);

        const commentRegex = /(\/\/.*|\/\*[\s\S]*?\*\/)/g;
        const matches = rawTailText.match(commentRegex);

        if (matches && matches.length > 0) {
            for (const rawComment of matches) {
                const isSingleLine = rawComment.startsWith('//');
                const cleanText = isSingleLine
                    ? rawComment.replace(/^\/\/ ?/, '').trimEnd()
                    : rawComment.replace(/^\/\* ?/, '').replace(/ ?\*\/$/, '').trim();

                ts.addSyntheticLeadingComment(
                    yieldStmt,
                    isSingleLine ? ts.SyntaxKind.SingleLineCommentTrivia : ts.SyntaxKind.MultiLineCommentTrivia,
                    cleanText,
                    true
                );
            }
        }

        newStatements.push(yieldStmt);
        return ts.factory.updateBlock(node, newStatements);
    }

    if (ts.isEmptyStatement(node)) {
        throw new Error(`[vite-plugin-yield-inserter] エラー: 空の繰り返し構文が検出されました。ファイル: ${id}`);
    }

    const newStatements: ts.Statement[] = [];
    if (isTarget(node)) {
        newStatements.push(createYieldStatement());
        newStatements.push(ts.visitNode(node, visit) as ts.Statement);
    } else {
        newStatements.push(ts.visitNode(node, visit) as ts.Statement);
    }

    newStatements.push(createYieldStatement());
    return ts.factory.createBlock(newStatements, true);
}

// ループの中ではない通常の if/else の中にある break/continue を処理するヘルパー
function transformIfBody(node: ts.Statement, visit: (n: ts.Node) => ts.Node): ts.Statement {
    if (ts.isBlock(node)) {
        const newStatements: ts.Statement[] = [];
        for (const stmt of node.statements) {
            if (isTarget(stmt)) {
                newStatements.push(createYieldStatement());
            }
            newStatements.push(ts.visitNode(stmt, visit) as ts.Statement);
        }
        return ts.factory.updateBlock(node, newStatements);
    } else {
        if (isTarget(node)) {
            return ts.factory.createBlock([
                createYieldStatement(),
        ts.visitNode(node, visit) as ts.Statement
            ], true);
        }
        return ts.factory.createBlock([ts.visitNode(node, visit) as ts.Statement], true);
    }
}

// ノードの手前に特定のスキップマークコメントがあるか判定する関数
function hasSkipComment(node: ts.Node, sourceFile: ts.SourceFile): boolean {
    // ノードの開始位置より手前にある Leading コメントを取得
    const leadingComments = ts.getLeadingCommentRanges(sourceFile.text, node.pos);
    if (!leadingComments) return false;

    for (const commentRange of leadingComments) {
        const commentText = sourceFile.text.substring(commentRange.pos, commentRange.end);
        // コメント内に「@ts-loop-yield-skip」が含まれているかチェック
        if (commentText.includes('@ts-loop-yield-skip')) {
            return true;
        }
    }
    return false;
}

// Vite プラグインの本体
export function yieldInserterPlugin(): Plugin {
    return {
        name: 'vite-plugin-yield-inserter',
        enforce: 'pre', 
    
        transform(code, id) {
            // .ts または .js ファイルのみを対象にする（node_modules などを除外）
            if ((!id.endsWith('.ts') && !id.endsWith('.js')) || id.includes('node_modules') || id.includes('commonJs')) {
                return null;
            }

            try {
                // カスタム Transformer の定義
                const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
                    return (sf) => {
                        function visit(node: ts.Node, inLoop = false): ts.Node {
              
                            // --- 繰り返し構文の検知 ---
                            if (
                                ts.isForStatement(node) ||
                ts.isForInStatement(node) ||
                ts.isForOfStatement(node) ||
                ts.isWhileStatement(node) ||
                ts.isDoStatement(node)
                            ) {
                                // 🌟【スキップマーク対応】直前に指定のコメントがあれば、子ノードも含め一切の変換処理をスキップ
                                if (hasSkipComment(node, sf)) {
                                    return ts.visitEachChild(node, (n) => visit(n, false), context);
                                }

                                // スキップ対象でなければ、各ループを通常通り書き換え
                                if (ts.isForStatement(node)) {
                                    const updatedBody = transformLoopBody(node.statement, (n) => visit(n, true), id);
                                    return ts.factory.updateForStatement(node, node.initializer, node.condition, node.incrementor, updatedBody);
                                }
                                if (ts.isForInStatement(node)) {
                                    const updatedBody = transformLoopBody(node.statement, (n) => visit(n, true), id);
                                    return ts.factory.updateForInStatement(node, node.initializer, node.expression, updatedBody);
                                }
                                if (ts.isForOfStatement(node)) {
                                    const updatedBody = transformLoopBody(node.statement, (n) => visit(n, true), id);
                                    return ts.factory.updateForOfStatement(node, node.awaitModifier, node.initializer, node.expression, updatedBody);
                                }
                                if (ts.isWhileStatement(node)) {
                                    const updatedBody = transformLoopBody(node.statement, (n) => visit(n, true), id);
                                    return ts.factory.updateWhileStatement(node, node.expression, updatedBody);
                                }
                                if (ts.isDoStatement(node)) {
                                    const updatedBody = transformLoopBody(node.statement, (n) => visit(n, true), id);
                                    return ts.factory.updateDoStatement(node, updatedBody, node.expression);
                                }
                            }

                            // ループ内の if 文の検知
                            if (inLoop && ts.isIfStatement(node)) {
                                const newThen = transformIfBody(node.thenStatement, (n) => visit(n, true));
                                const newElse = node.elseStatement 
                                    ? transformIfBody(node.elseStatement, (n) => visit(n, true))
                                    : undefined;
                                return ts.factory.updateIfStatement(node, node.expression, newThen, newElse);
                            }

                            return ts.visitEachChild(node, (n) => visit(n, inLoop), context);
                        }
                        return ts.visitNode(sf, (n) => visit(n, false)) as ts.SourceFile;
                    };
                };

                // 🌟【ソースマップ有効化のためのトランスパイル方式へ変更】
                const transpileResult = ts.transpileModule(code, {
                    compilerOptions: {
                        target: ts.ScriptTarget.Latest,
                        module: ts.ModuleKind.ESNext,
                        sourceMap: true, // ソースマップを有効化
                    },
                    fileName: id,
                    transformers: {
                        before: [transformer] // 自作したトランスフォーマーをトランスパイル時に実行
                    }
                });

                console.log('transpileResult.outputText=', transpileResult.outputText);

                // 変換後のコードと生成されたソースマップオブジェクトを Vite に返却
                return {
                    code: transpileResult.outputText,
                    map: transpileResult.sourceMapText ? JSON.parse(transpileResult.sourceMapText) : null
                };

            } catch (error: unknown) {
                if (error instanceof Error) {
                    this.error(error.message);
                } else {
                    this.error(String(error));
                }
            }
        }
    };
}