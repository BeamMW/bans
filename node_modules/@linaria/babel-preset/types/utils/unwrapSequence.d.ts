import type { NodePath } from '@babel/traverse';
import type { Expression, V8IntrinsicIdentifier } from '@babel/types';
/**
 * If expression is a sequence like `(a, b, c)`, returns `c`
 * otherwise returns an original expression
 * @param path
 */
export default function unwrapSequence(path: NodePath<Expression | V8IntrinsicIdentifier>): NodePath<Expression | V8IntrinsicIdentifier> | undefined;
