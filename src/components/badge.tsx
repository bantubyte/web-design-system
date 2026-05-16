import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';
import { Popover } from './popover';

export type BadgeTone =
	| 'neutral'
	| 'brand'
	| 'accent'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	size?: BadgeSize;
	tone?: BadgeTone;
}

export function Badge({
	children,
	className,
	leftIcon,
	rightIcon,
	size = 'md',
	tone = 'neutral',
	...props
}: BadgeProps) {
	return (
		<span
			className={cx(
				'pds-badge',
				`pds-badge--${tone}`,
				`pds-badge--${size}`,
				className,
			)}
			{...props}
		>
			{leftIcon}
			<span>{children}</span>
			{rightIcon}
		</span>
	);
}

export interface RemovableBadgeProps extends Omit<BadgeProps, 'children'> {
	label: ReactNode;
	onRemove?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
	removeLabel?: string;
	suffix?: ReactNode;
	truncate?: boolean;
}

export function RemovableBadge({
	className,
	label,
	onRemove,
	removeLabel = 'Remove',
	suffix,
	tone = 'neutral',
	truncate = false,
	...props
}: RemovableBadgeProps) {
	return (
		<Badge
			className={cx('pds-removable-badge', className)}
			tone={tone}
			{...props}
		>
			<span
				className={cx(
					'pds-removable-badge__label',
					truncate && 'pds-removable-badge__label--truncate',
				)}
			>
				{label}
				{suffix ? (
					<small className="pds-removable-badge__suffix">{suffix}</small>
				) : null}
			</span>
			<button
				aria-label={removeLabel}
				className="pds-removable-badge__button"
				onClick={onRemove}
				type="button"
			>
				×
			</button>
		</Badge>
	);
}

export interface SelectionBadgeProps extends HTMLAttributes<HTMLSpanElement> {
	emptyLabel?: ReactNode;
	items: readonly ReactNode[];
	maxVisible?: number;
}

export function SelectionBadge({
	className,
	emptyLabel = 'None',
	items,
	maxVisible = 1,
	...props
}: SelectionBadgeProps) {
	if (items.length === 0) {
		return (
			<span className={cx('pds-selection-badge', className)} {...props}>
				<span className="pds-selection-badge__empty">{emptyLabel}</span>
			</span>
		);
	}

	const visibleItems = items.slice(0, maxVisible);
	const hiddenItems = items.slice(maxVisible);

	return (
		<span className={cx('pds-selection-badge', className)} {...props}>
			{visibleItems.map((item, index) => (
				<Badge key={index} size="sm">
					{item}
				</Badge>
			))}
			{hiddenItems.length > 0 ? (
				<Popover
					label={`+${hiddenItems.length}`}
					panelLabel="Additional selected items"
					triggerVariant="ghost"
					width="sm"
				>
					<div className="pds-selection-badge__overflow">
						{hiddenItems.map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</div>
				</Popover>
			) : null}
		</span>
	);
}
