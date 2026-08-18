import ts from 'typescript';

export function isTarget(node: ts.Node): boolean {
    return ts.isBreakStatement(node) || ts.isContinueStatement(node);
}

export function createYieldStatement(): ts.ExpressionStatement {
    return ts.factory.createExpressionStatement(
        ts.factory.createYieldExpression(undefined, undefined)
    );
}

export function hasSkipComment(node: ts.Node, sourceFile: ts.SourceFile): boolean {
    const leadingComments = ts.getLeadingCommentRanges(sourceFile.text, node.pos);
    if (!leadingComments) return false;

    for (const commentRange of leadingComments) {
        const commentText = sourceFile.text.substring(commentRange.pos, commentRange.end);
        if (commentText.includes('@ts-loop-yield-skip')) {
            return true;
        }
    }
    return false;
}

/**
 * ノードが特定のイベント定義パターン（xxx.Event...func = ...）に合致するか判定する
 */
export function isTargetEventAssignment(node: ts.Node): boolean {
    if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.EqualsToken) {
        return false;
    }

    const left = node.left;
    if (!ts.isPropertyAccessExpression(left) || left.name.text !== 'func') {
        return false;
    }

    let expr = left.expression;
    if (ts.isCallExpression(expr)) {
        expr = expr.expression;
    }

    if (ts.isPropertyAccessExpression(expr)) {
        const parentExpr = expr.expression;
        if (ts.isPropertyAccessExpression(parentExpr)) {
            const categoryName = parentExpr.name.text;
            if (categoryName === 'Event' || categoryName === 'Broadcast') {
                return true;
            }
        }
    }

    return false;
}