import ts from 'typescript';
import MagicString from 'magic-string';

// 繰り返し構文（ループ）であるかを判定するヘルパー
export function isLoopStatement(node: ts.Node): boolean {
    return (
        ts.isForStatement(node) ||
        ts.isForInStatement(node) ||
        ts.isForOfStatement(node) ||
        ts.isWhileStatement(node) ||
        ts.isDoStatement(node)
    );
}

// ノードの直前に「// @ts-loop-step-skip」コメントがあるか判定するヘルパー
export function hasSkipComment(node: ts.Node, sourceFile: ts.SourceFile): boolean {
    const fullText = sourceFile.getFullText();
    const leadingComments = ts.getLeadingCommentRanges(fullText, node.getFullStart());
    
    if (!leadingComments) return false;

    return leadingComments.some(commentRange => {
        const commentText = fullText.slice(commentRange.pos, commentRange.end);
        return commentText.includes('@ts-loop-step-skip');
    });
}

// 【パス1】対象となる関数（セッターへの直接代入、または対象変数への代入関数）を抽出するメソッド
export function collectTargets(
    node: ts.Node, 
    typeChecker: ts.TypeChecker, 
    targetFunctionNodes: Set<ts.Node>
): void {
    if (ts.isFunctionExpression(node) && node.parent && ts.isBinaryExpression(node.parent)) {
        const binaryExp = node.parent;
        if (binaryExp.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(binaryExp.left)) {
            targetFunctionNodes.add(node);
        }
    }

    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        if (ts.isPropertyAccessExpression(node.left) && ts.isIdentifier(node.right)) {
            const symbol = typeChecker.getSymbolAtLocation(node.right);
            if (symbol) {
                const declarations = symbol.getDeclarations();
                if (declarations && declarations.length > 0) {
                    const firstDecl = declarations[0];
                    if (ts.isVariableDeclaration(firstDecl) && firstDecl.initializer && ts.isFunctionExpression(firstDecl.initializer)) {
                        targetFunctionNodes.add(firstDecl.initializer);
                    } else if (ts.isFunctionDeclaration(firstDecl)) {
                        targetFunctionNodes.add(firstDecl);
                    }
                }
            }
        }
    }
    ts.forEachChild(node, child => collectTargets(child, typeChecker, targetFunctionNodes));
}

// 【パス2】条件を満たす関数を書き換えるビジターの生成ファクトリ
export function createVisitor(
    context: { error: (msg: string, pos: number) => never },
    sourceFile: ts.SourceFile,
    code: string,
    ms: MagicString,
    targetFunctionNodes: Set<ts.Node>
) {
    const visit = (node: ts.Node): void => {
        if (ts.isSwitchStatement(node)) {
            context.error(
                `[vite-plugin-ts-loop-stepper] Switch statements are strictly prohibited. Please rewrite using if-else statements.`,
                node.getStart()
            );
        }

        if (ts.isArrowFunction(node)) {
            let hasUnskippedLoop = false;
            const checkLoop = (child: ts.Node) => {
                if (isLoopStatement(child) && !hasSkipComment(child, sourceFile)) {
                    hasUnskippedLoop = true;
                }
                if (ts.isFunctionDeclaration(child) || ts.isFunctionExpression(child) || ts.isMethodDeclaration(child) || ts.isArrowFunction(child)) return;
                ts.forEachChild(child, checkLoop);
            };
            ts.forEachChild(node, checkLoop);

            if (hasUnskippedLoop) {
                context.error(
                    `[vite-plugin-ts-loop-stepper] Arrow functions cannot contain loop statements because they cannot be converted to generator functions. Please use a standard function declaration/expression or add '// @ts-loop-step-skip' before the loop.`,
                    node.getStart()
                );
            }
        }

        if (targetFunctionNodes.has(node)) {
            const funcNode = node as ts.FunctionExpression | ts.FunctionDeclaration;
            
            if (funcNode.body) {
                let yieldInsertedInThisFunction = false;

                const visitFunctionBody = (child: ts.Node) => {
                    if (ts.isSwitchStatement(child)) {
                        return; 
                    }

                    // const getLineNumberFromComment = (targetNode: ts.Node) => {
                    //     const approxStart = targetNode.getStart(sourceFile);
                    //     const approxLine = sourceFile.getLineAndCharacterOfPosition(approxStart).line;
                    //     const rawLines = code.split(/\r?\n/);
                        
                    //     for (let i = approxLine; i < rawLines.length; i++) {
                    //         const match = rawLines[i].match(/\[step:\s*(\d+)\]/);
                    //         if (match && match[1]) {
                    //             return parseInt(match[1], 10);
                    //         }
                    //     }
                    //     return approxLine + 1;
                    // };

                    if (ts.isBreakStatement(child) || ts.isContinueStatement(child)) {
                        let parentLoop: ts.Node | undefined = child.parent;
                        while (parentLoop && !isLoopStatement(parentLoop)) {
                            if (ts.isFunctionDeclaration(parentLoop) || ts.isFunctionExpression(parentLoop) || ts.isMethodDeclaration(parentLoop) || ts.isArrowFunction(parentLoop)) {
                                // 親がループ構文に到達せずに 関数やメソッドになる場合( そのようなbreak構文はそもそもエラーのだが )
                                parentLoop = undefined;
                                break;
                            }
                            parentLoop = parentLoop.parent;
                        }
                        // child の親が if 文であり、
                        // 親のstatement がブロックでないとき
                        // --> ブロック化して yield をつける
                        // 親のstatement がブロックのとき
                        // --> child の左に yieldをつける
                        // 
                        if (parentLoop && !hasSkipComment(parentLoop, sourceFile)) {
                            //対象の行の左側に yield を付ける
                            //const line = getLineNumberFromComment(child);
                            ms.appendLeft(child.getStart(sourceFile), `yield; `);
                            //ms.appendLeft(child.getStart(sourceFile), `if(window._step)window._step(${line}); yield; `);
                            yieldInsertedInThisFunction = true;
                        }
                    }

                    if (isLoopStatement(child)) {
                        if (hasSkipComment(child, sourceFile)) {
                            return; 
                        }

                        const loop = child as ts.ForStatement | ts.ForInStatement | ts.ForOfStatement | ts.WhileStatement | ts.DoStatement;
                        
                        if (loop.statement) {
                            //const line = getLineNumberFromComment(loop);

                            if (ts.isBlock(loop.statement)) {
                                if (loop.statement.statements.length === 0) {
                                    context.error(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile));
                                }
                                ms.appendLeft(loop.statement.getEnd() - 1, ` yield; `);
                                //ms.appendLeft(loop.statement.getEnd() - 1, ` if(window._step)window._step(${line}); yield; `);
                                yieldInsertedInThisFunction = true;

                            } else {
                                // ここは 繰り返し構文が { } を持たない場合( 最大 1行だけ )
                                // 例 
                                // for(let i = 0 ; i < 5; i++ )
                                //      console.log(i);
                                //
                                if (ts.isEmptyStatement(loop.statement)) {
                                    // 空文の繰り返し構文はエラーにする
                                    context.error(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile));
                                }
                                const loopStatement = loop.statement;
                                if(ts.isExpressionStatement(loopStatement)){
                                    //console.log('ts.isYieldExpression(loopStatement.expression)=',ts.isYieldExpression(loopStatement.expression));
                                    if(ts.isYieldExpression(loopStatement.expression)){
                                        //console.log('loopStatement.expression.expression=',loopStatement.expression.expression);
                                        if(loopStatement.expression.expression === undefined){
                                            // 繰り返しが yield; だけの場合は何もしない。
                                            return;
                                        }
                                    }
                                }
                                const statementCode = code.slice(loop.statement.getStart(sourceFile), loop.statement.getEnd());
                                //console.log('statementCode=',statementCode);
                                // 繰り返し構文(1行)を 波カッコ{ } で囲み、yield を追加する
                                // 元の行は セミコロンがついている前提（eslintで強制付与)
                                ms.overwrite(
                                    loop.statement.getStart(sourceFile),
                                    loop.statement.getEnd(),
                                    `{ ${statementCode} yield; }`
                                    //`{ ${statementCode} if(window._step)window._step(${line}); yield; }`
                                );
                                yieldInsertedInThisFunction = true;
                            }
                        }
                    }

                    if (ts.isFunctionDeclaration(child) || ts.isFunctionExpression(child) || ts.isMethodDeclaration(child) || ts.isArrowFunction(child)) {
                        return;
                    }

                    ts.forEachChild(child, visitFunctionBody);
                };

                ts.forEachChild(funcNode.body, visitFunctionBody);

                if (yieldInsertedInThisFunction) {
                    if (ts.isFunctionExpression(funcNode) || ts.isFunctionDeclaration(funcNode) || ts.isMethodDeclaration(node) ) {
                        const funcNode = node as ts.FunctionLikeDeclaration;
                        // Generator関数でない場合は、function* にする
                        if( funcNode.asteriskToken == undefined){
                            const functionKeywordStart = code.indexOf('function', funcNode.getStart(sourceFile));
                            if (functionKeywordStart !== -1) {
                                ms.appendLeft(functionKeywordStart + 8, '*');
                            }

                        }
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    return visit;
}