import ts from 'typescript';
import { isTarget, createYieldStatement, hasSkipComment, isTargetEventAssignment } from '../utils/ast-helpers';

// 🌟 型アノテーションに , inLoop?: boolean を追加
function transformLoopBody(
    node: ts.Statement, 
    visit: (n: ts.Node, inLoop?: boolean) => ts.Node, 
    id: string
): ts.Statement {
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

// 🌟 型アノテーションに , inLoop?: boolean を追加
function transformIfBody(
    node: ts.Statement, 
    visit: (n: ts.Node, inLoop?: boolean) => ts.Node
): ts.Statement {
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
            return ts.factory.createBlock([createYieldStatement(), ts.visitNode(node, visit) as ts.Statement], true);
        }
        return ts.factory.createBlock([ts.visitNode(node, visit) as ts.Statement], true);
    }
}

// 🌟 型アノテーションに , inLoop?: boolean を追加
function convertToAsyncGenerator(
    rightExpr: ts.FunctionExpression, 
    visit: (n: ts.Node, inLoop?: boolean) => ts.Node, 
    inLoop: boolean
): ts.FunctionExpression {
    const hasAsync = rightExpr.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
    let newModifiers = rightExpr.modifiers || ts.factory.createNodeArray([]);
  
    if (!hasAsync) {
        newModifiers = ts.factory.createNodeArray([
            ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword),
            ...newModifiers
        ]);
    }

    return ts.factory.updateFunctionExpression(
        rightExpr,
        newModifiers,
        ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
        rightExpr.name,
        rightExpr.typeParameters,
        rightExpr.parameters,
        rightExpr.type,
    ts.visitNode(rightExpr.body, (n) => visit(n, inLoop)) as ts.Block
    );
}

export const createYieldTransformer = (id: string, context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    return (sf: ts.SourceFile) => {
    
        // スコープ外（別ファイル）を追跡しないよう、ファイルごとに独立したターゲット管理変数を定義
        const targetVariableNames = new Set<string>();

        // 【1パス目】ファイル内のイベント代入式を先にスキャンし、変数への参照があればその名前を控える
        function preScan(node: ts.Node): void {
            if (isTargetEventAssignment(node)) {
                const binaryExpr = node as ts.BinaryExpression;
                // 右辺が変数名（Identifier）単体（例: func = flagPresser）の場合
                if (ts.isIdentifier(binaryExpr.right)) {
                    targetVariableNames.add(binaryExpr.right.text);
                }
            }
            ts.forEachChild(node, preScan);
        }
        preScan(sf);

        // 【2パス目】実際のコード書き換え処理
        function visit(node: ts.Node, inLoop = false): ts.Node {
      
            // パターンA: 変数宣言文（const flagPresser = function...）の検知と変換
            if (ts.isVariableDeclaration(node) && node.initializer && ts.isFunctionExpression(node.initializer)) {
                if (ts.isIdentifier(node.name) && targetVariableNames.has(node.name.text)) {
                    const updatedFunction = convertToAsyncGenerator(node.initializer, visit, inLoop);
                    return ts.factory.updateVariableDeclaration(
                        node,
                        node.name,
                        node.exclamationToken,
                        node.type,
                        updatedFunction
                    );
                }
            }

            // パターンB: 直接のイベント代入（xxx.Event...func = function...）の検知と変換
            if (isTargetEventAssignment(node)) {
                const binaryExpr = node as ts.BinaryExpression;
                const rightExpr = binaryExpr.right;

                if (ts.isFunctionExpression(rightExpr)) {
                    const updatedFunction = convertToAsyncGenerator(rightExpr, visit, inLoop);
                    return ts.factory.updateBinaryExpression(
                        binaryExpr,
                        binaryExpr.left,
                        binaryExpr.operatorToken,
                        updatedFunction
                    );
                }
            }

            // --- 繰り返し構文の検知と書き換え ---
            if (
                ts.isForStatement(node) ||
        ts.isForInStatement(node) ||
        ts.isForOfStatement(node) ||
        ts.isWhileStatement(node) ||
        ts.isDoStatement(node)
            ) {
                if (hasSkipComment(node, sf)) {
                    return ts.visitEachChild(node, (n) => visit(n, false), context);
                }

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
                const newElse = node.elseStatement ? transformIfBody(node.elseStatement, (n) => visit(n, true)) : undefined;
                return ts.factory.updateIfStatement(node, node.expression, newThen, newElse);
            }

            return ts.visitEachChild(node, (n) => visit(n, inLoop), context);
        }
        return ts.visitNode(sf, (n) => visit(n, false)) as ts.SourceFile;
    };
};