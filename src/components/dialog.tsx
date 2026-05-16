import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	titleId?: string;
}

export function Dialog({
	children,
	className,
	open = true,
	titleId,
	...props
}: DialogProps) {
	if (!open) return null;

	return (
		<div className="pds-dialog-backdrop">
			<div
				aria-labelledby={titleId}
				aria-modal="true"
				className={cx('pds-dialog', className)}
				role="dialog"
				{...props}
			>
				{children}
			</div>
		</div>
	);
}

export function DialogHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-dialog__header', className)} {...props} />;
}

export function DialogTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return <h2 className={cx('pds-dialog__title', className)} {...props} />;
}

export function DialogDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cx('pds-dialog__description', className)} {...props} />;
}

export function DialogBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-dialog__body', className)} {...props} />;
}

export function DialogFooter({
	actions,
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement> & { actions?: ReactNode }) {
	return (
		<div
			className={cx(
				'pds-dialog__footer',
				!children && 'pds-dialog__footer--actions-only',
				className,
			)}
			{...props}
		>
			{children ? <div>{children}</div> : null}
			{actions ? <div className="pds-dialog__actions">{actions}</div> : null}
		</div>
	);
}
