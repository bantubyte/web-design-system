import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cx } from '../utils/class-names';

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled,
			fullWidth = false,
			isLoading = false,
			leftIcon,
			rightIcon,
			variant = 'primary',
			size = 'md',
			type = 'button',
			...props
		},
		ref,
	) => (
		<button
			aria-busy={isLoading || undefined}
			className={cx(
				'pds-button',
				`pds-button--${variant}`,
				`pds-button--${size}`,
				fullWidth && 'pds-button--full',
				className,
			)}
			disabled={disabled || isLoading}
			ref={ref}
			type={type}
			{...props}
		>
			{isLoading ? <span className="pds-button__spinner" /> : leftIcon}
			{children ? <span className="pds-button__label">{children}</span> : null}
			{rightIcon}
		</button>
	),
);

Button.displayName = 'Button';

export interface IconButtonProps
	extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
	icon: ReactNode;
	label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, label, size = 'icon', ...props }, ref) => (
		<Button aria-label={label} ref={ref} size={size} title={label} {...props}>
			{icon}
		</Button>
	),
);

IconButton.displayName = 'IconButton';
