import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps
	extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
	content: ReactNode;
	side?: TooltipSide;
}

export function Tooltip({
	children,
	className,
	content,
	side = 'top',
	...props
}: TooltipProps) {
	return (
		<span className={cx('pds-tooltip', className)} {...props}>
			{children}
			<span
				className={cx('pds-tooltip__content', `pds-tooltip__content--${side}`)}
			>
				{content}
			</span>
		</span>
	);
}
