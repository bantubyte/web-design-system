import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';

export interface KeyValueItem {
	label: ReactNode;
	value: ReactNode;
}

export interface KeyValueListProps extends HTMLAttributes<HTMLDListElement> {
	items: readonly KeyValueItem[];
	columns?: 1 | 2 | 3;
}

export function KeyValueList({
	className,
	columns = 2,
	items,
	...props
}: KeyValueListProps) {
	return (
		<dl
			className={cx(
				'pds-key-value-list',
				`pds-key-value-list--${columns}`,
				className,
			)}
			{...props}
		>
			{items.map((item, index) => (
				<div className="pds-key-value-list__item" key={index}>
					<dt>{item.label}</dt>
					<dd>{item.value}</dd>
				</div>
			))}
		</dl>
	);
}

export type DividerTone = 'default' | 'strong';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	tone?: DividerTone;
}

export function Divider({
	className,
	tone = 'default',
	...props
}: DividerProps) {
	return (
		<hr
			className={cx('pds-divider', `pds-divider--${tone}`, className)}
			{...props}
		/>
	);
}
