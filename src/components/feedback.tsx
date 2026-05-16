import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';
import { Button, type ButtonProps } from './button';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	action?: ReactNode;
	icon?: ReactNode;
	title?: ReactNode;
	tone?: AlertTone;
}

export function Alert({
	action,
	children,
	className,
	icon,
	title,
	tone = 'info',
	...props
}: AlertProps) {
	return (
		<div
			aria-live="polite"
			className={cx(
				'pds-alert',
				`pds-alert--${tone}`,
				!icon && 'pds-alert--no-icon',
				className,
			)}
			{...props}
		>
			{icon ? <div className="pds-alert__icon">{icon}</div> : null}
			<div className="pds-alert__body">
				{title ? <p className="pds-alert__title">{title}</p> : null}
				{children ? <div className="pds-alert__content">{children}</div> : null}
			</div>
			{action ? <div className="pds-alert__action">{action}</div> : null}
		</div>
	);
}

export interface EmptyStateProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	action?: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	title: ReactNode;
}

export function EmptyState({
	action,
	className,
	description,
	icon,
	title,
	...props
}: EmptyStateProps) {
	return (
		<div className={cx('pds-empty-state', className)} {...props}>
			{icon ? <div className="pds-empty-state__icon">{icon}</div> : null}
			<h3 className="pds-empty-state__title">{title}</h3>
			{description ? (
				<p className="pds-empty-state__description">{description}</p>
			) : null}
			{action ? <div className="pds-empty-state__action">{action}</div> : null}
		</div>
	);
}

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
	label?: ReactNode;
}

export function LoadingState({
	className,
	label = 'Loading',
	...props
}: LoadingStateProps) {
	return (
		<div
			aria-live="polite"
			className={cx('pds-loading-state', className)}
			{...props}
		>
			<span className="pds-loading-state__spinner" />
			<span>{label}</span>
		</div>
	);
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	label?: ReactNode;
	value: number;
}

export function Progress({ className, label, value, ...props }: ProgressProps) {
	const safeValue = Math.max(0, Math.min(100, value));

	return (
		<div className={cx('pds-progress', className)} {...props}>
			{label ? (
				<div className="pds-progress__label">
					<span>{label}</span>
					<span>{safeValue}%</span>
				</div>
			) : null}
			<div
				aria-valuemax={100}
				aria-valuemin={0}
				aria-valuenow={safeValue}
				className="pds-progress__track"
				role="progressbar"
			>
				<span
					className="pds-progress__bar"
					style={{ width: `${safeValue}%` }}
				/>
			</div>
		</div>
	);
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	height?: number | string;
	width?: number | string;
}

export function Skeleton({
	className,
	height,
	style,
	width,
	...props
}: SkeletonProps) {
	return (
		<div
			aria-hidden="true"
			className={cx('pds-skeleton', className)}
			style={{ height, width, ...style }}
			{...props}
		/>
	);
}

export function EmptyAction(props: ButtonProps) {
	return <Button size="sm" variant="outline" {...props} />;
}
