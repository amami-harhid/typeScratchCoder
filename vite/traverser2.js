import ts from 'typescript';
//import MagicString from 'magic-string';

// 繰り返し構文（ループ）であるかを判定するヘルパー
export function isLoopStatement(node) {
    return (
        ts.isForStatement(node) ||
        ts.isForInStatement(node) ||
        ts.isForOfStatement(node) ||
        ts.isWhileStatement(node) ||
        ts.isDoStatement(node)
    );
}

// ノードの直前に「// @ts-loop-step-skip」コメントがあるか判定するヘルパー
export function hasSkipComment(node, sourceFile) {
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
    node, 
    typeChecker, 
    targetFunctionNodes
) {
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
    context,
    sourceFile,
    code,
    ms,
    targetFunctionNodes
) {
    const visit = (node) => {
        console.log('visit node=', node)
        if (ts.isSwitchStatement(node)) {
            console.log('switch error')
            context.error(
                `[vite-plugin-ts-loop-stepper] Switch statements are strictly prohibited. Please rewrite using if-else statements.`,
                node.getStart()
            );
        }

        if (ts.isArrowFunction(node)) {
            let hasUnskippedLoop = false;
            const checkLoop = (child) => {
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
            const funcNode = node;
            
            if (funcNode.body) {
                //let yieldInsertedInThisFunction = false;

                const visitFunctionBody = (child) => {
                    if (ts.isSwitchStatement(child)) {
                        return; 
                    }

                    // const getLineNumberFromComment = (targetNode) => {
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
                        let parentLoop = child.parent;
                        while (parentLoop && !isLoopStatement(parentLoop)) {
                            if (ts.isFunctionDeclaration(parentLoop) || ts.isFunctionExpression(parentLoop) || ts.isMethodDeclaration(parentLoop) || ts.isArrowFunction(parentLoop)) {
                                parentLoop = undefined;
                                break;
                            }
                            parentLoop = parentLoop.parent;
                        }
                        
                        if (parentLoop && !hasSkipComment(parentLoop, sourceFile)) {
                            //const line = getLineNumberFromComment(child);
                            //ms.appendLeft(child.getStart(sourceFile), `yield; `);
                            //yieldInsertedInThisFunction = true;
                        }
                    }

                    if (isLoopStatement(child)) {
                        if (hasSkipComment(child, sourceFile)) {
                            return; 
                        }

                        const loop = child;
                        
                        if (loop.statement) {
                            //const line = getLineNumberFromComment(loop);

                            if (ts.isBlock(loop.statement)) {
                                if (loop.statement.statements.length === 0) {
                                    console.log(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile))
                                    context.error(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile));
                                }
                                //ms.appendLeft(loop.statement.getEnd() - 1, ` yield; `);
                                //yieldInsertedInThisFunction = true;

                            } else {
                                if (ts.isEmptyStatement(loop.statement)) {
                                    console.log(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile))
                                    context.error(`[vite-plugin-ts-loop-stepper] Loop body cannot be empty.`, loop.getStart(sourceFile));
                                }

                                //const statementCode = code.slice(loop.statement.getStart(sourceFile), loop.statement.getEnd());
                                ms.overwrite(
                                    loop.statement.getStart(sourceFile),
                                    loop.statement.getEnd(),
                                    ``
                                );
                                //yieldInsertedInThisFunction = true;
                            }
                        }
                    }

                    if (ts.isFunctionDeclaration(child) || ts.isFunctionExpression(child) || ts.isMethodDeclaration(child) || ts.isArrowFunction(child)) {
                        return;
                    }

                    ts.forEachChild(child, visitFunctionBody);
                };

                ts.forEachChild(funcNode.body, visitFunctionBody);

                // if (yieldInsertedInThisFunction) {
                //     if (ts.isFunctionExpression(funcNode) || ts.isFunctionDeclaration(funcNode)) {
                //         const functionKeywordStart = code.indexOf('function', funcNode.getStart(sourceFile));
                //         if (functionKeywordStart !== -1) {
                //             ms.appendLeft(functionKeywordStart + 8, '*');
                //         }
                //     }
                // }
            }
        }

        ts.forEachChild(node, visit);
    };

    return visit;
}