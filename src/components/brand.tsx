import type { HTMLAttributes, SVGProps } from 'react';
import { useTheme } from '../theme';
import { cx } from '../utils/class-names';

export interface BrandMarkProps extends SVGProps<SVGSVGElement> {
	size?: number;
}

export function BrandMark({ className, size = 32, ...props }: BrandMarkProps) {
	return (
		<svg
			aria-hidden="true"
			className={cx('pds-brand-mark', className)}
			fill="none"
			height={size}
			viewBox="0 0 64 64"
			width={size}
			{...props}
		>
			<rect className="pds-brand-mark__field" height="64" rx="14" width="64" />
			<path
				className="pds-brand-mark__arc"
				d="M15 36c6.3-13 24.7-21 37-11"
				strokeLinecap="round"
				strokeWidth="8"
			/>
			<circle className="pds-brand-mark__dot" cx="25" cy="38" r="7" />
			<circle
				className="pds-brand-mark__dot pds-brand-mark__dot--accent"
				cx="43"
				cy="28"
				r="5"
			/>
		</svg>
	);
}

export interface ProductNameProps extends HTMLAttributes<HTMLSpanElement> {
	withTenant?: boolean;
}

export function ProductName({
	className,
	withTenant = false,
	...props
}: ProductNameProps) {
	const { theme } = useTheme();
	const label =
		withTenant && theme.copy.tenantName
			? `${theme.copy.productName} for ${theme.copy.tenantName}`
			: theme.copy.productName;

	return (
		<span className={cx('pds-product-name', className)} {...props}>
			{label}
		</span>
	);
}

export interface BrandLockupProps extends HTMLAttributes<HTMLDivElement> {
	markSize?: number;
	showTenant?: boolean;
	subtitle?: string;
}

export function BrandLockup({
	className,
	markSize = 36,
	showTenant = true,
	subtitle,
	...props
}: BrandLockupProps) {
	const { theme } = useTheme();
	const supportingText =
		subtitle ?? (showTenant ? theme.copy.tenantName : theme.name);

	return (
		<div className={cx('pds-brand-lockup', className)} {...props}>
			<BrandMark size={markSize} />
			<div className="pds-brand-lockup__text">
				<ProductName />
				<span className="pds-brand-lockup__meta">{supportingText}</span>
			</div>
		</div>
	);
}
