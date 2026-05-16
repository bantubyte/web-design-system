import type { HTMLAttributes } from 'react';
import { cx } from '../utils/class-names';

export type CardTone = 'default' | 'muted' | 'brand' | 'accent';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	interactive?: boolean;
	tone?: CardTone;
}

export function Card({
	className,
	interactive = false,
	tone = 'default',
	...props
}: CardProps) {
	return (
		<div
			className={cx(
				'pds-card',
				`pds-card--${tone}`,
				interactive && 'pds-card--interactive',
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-card__header', className)} {...props} />;
}

export function CardTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cx('pds-card__title', className)} {...props} />;
}

export function CardDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cx('pds-card__description', className)} {...props} />;
}

export function CardContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-card__content', className)} {...props} />;
}

export function CardFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cx('pds-card__footer', className)} {...props} />;
}
