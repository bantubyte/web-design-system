import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';

export interface PageShellProps extends HTMLAttributes<HTMLDivElement> {
	aside?: ReactNode;
	header?: ReactNode;
}

export function PageShell({
	aside,
	children,
	className,
	header,
	...props
}: PageShellProps) {
	return (
		<div className={cx('pds-page-shell', className)} {...props}>
			{aside ? <aside className="pds-page-shell__aside">{aside}</aside> : null}
			<div className="pds-page-shell__main">
				{header ? <div className="pds-page-shell__header">{header}</div> : null}
				{children}
			</div>
		</div>
	);
}

export interface SectionHeaderProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	actions?: ReactNode;
	description?: ReactNode;
	eyebrow?: ReactNode;
	title: ReactNode;
}

export function SectionHeader({
	actions,
	className,
	description,
	eyebrow,
	title,
	...props
}: SectionHeaderProps) {
	return (
		<div className={cx('pds-section-header', className)} {...props}>
			<div>
				{eyebrow ? (
					<p className="pds-section-header__eyebrow">{eyebrow}</p>
				) : null}
				<h2 className="pds-section-header__title">{title}</h2>
				{description ? (
					<p className="pds-section-header__description">{description}</p>
				) : null}
			</div>
			{actions ? (
				<div className="pds-section-header__actions">{actions}</div>
			) : null}
		</div>
	);
}

export function Toolbar({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-toolbar', className)} {...props} />;
}
