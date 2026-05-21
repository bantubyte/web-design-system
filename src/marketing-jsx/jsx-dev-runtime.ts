import { jsx, type RawJsxNode } from './runtime';

export type { JSX } from './runtime';
export { Fragment } from './runtime';

export function jsxDEV<TProps extends Record<string, unknown>>(
	type: Parameters<typeof jsx<TProps>>[0],
	props?: TProps | null,
	key?: string | number,
): RawJsxNode {
	return jsx(type, props, key);
}
