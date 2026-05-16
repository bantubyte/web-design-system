import type { HTMLAttributes } from 'react';
import { cx } from '../utils/class-names';

export type SurfaceTone =
	| 'default'
	| 'muted'
	| 'brand'
	| 'ink'
	| 'success'
	| 'warning'
	| 'danger';
export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
	as?: 'div' | 'section' | 'article';
	padding?: SurfacePadding;
	tone?: SurfaceTone;
}

export function Surface({
	as: Component = 'section',
	padding = 'md',
	tone = 'default',
	className,
	...props
}: SurfaceProps) {
	return (
		<Component
			className={cx(
				'pds-surface',
				`pds-surface--${tone}`,
				`pds-surface--padding-${padding}`,
				className,
			)}
			{...props}
		/>
	);
}
