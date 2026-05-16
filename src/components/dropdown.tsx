import {
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
	useId,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Button } from './button';

export interface DropdownMenuProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
	align?: 'start' | 'end';
	children: ReactNode;
	defaultOpen?: boolean;
	label: ReactNode;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
	variant?: 'primary' | 'outline' | 'ghost';
}

export function DropdownMenu({
	align = 'start',
	children,
	className,
	defaultOpen = false,
	label,
	onOpenChange,
	open,
	variant = 'outline',
	...props
}: DropdownMenuProps) {
	const menuId = useId();
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const isOpen = open ?? uncontrolledOpen;

	const setOpen = (nextOpen: boolean) => {
		if (open === undefined) {
			setUncontrolledOpen(nextOpen);
		}
		onOpenChange?.(nextOpen);
	};

	return (
		<div className={cx('pds-dropdown', className)} {...props}>
			<Button
				aria-controls={menuId}
				aria-expanded={isOpen}
				onClick={() => setOpen(!isOpen)}
				rightIcon={<span aria-hidden="true">v</span>}
				variant={variant}
			>
				{label}
			</Button>
			{isOpen ? (
				<div
					className={cx('pds-dropdown__menu', `pds-dropdown__menu--${align}`)}
					id={menuId}
				>
					{children}
				</div>
			) : null}
		</div>
	);
}

export interface DropdownItemProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	description?: ReactNode;
	leftIcon?: ReactNode;
	selected?: boolean;
}

export function DropdownItem({
	children,
	className,
	description,
	leftIcon,
	selected = false,
	type = 'button',
	...props
}: DropdownItemProps) {
	return (
		<button
			className={cx(
				'pds-dropdown__item',
				selected && 'pds-dropdown__item--selected',
				className,
			)}
			type={type}
			{...props}
		>
			{leftIcon ? (
				<span className="pds-dropdown__item-icon">{leftIcon}</span>
			) : null}
			<span className="pds-dropdown__item-copy">
				<span>{children}</span>
				{description ? (
					<small className="pds-dropdown__item-description">
						{description}
					</small>
				) : null}
			</span>
			{selected ? (
				<span aria-hidden="true" className="pds-dropdown__item-check">
					✓
				</span>
			) : null}
		</button>
	);
}

export function DropdownSeparator(props: HTMLAttributes<HTMLHRElement>) {
	return (
		<hr className={cx('pds-dropdown__separator', props.className)} {...props} />
	);
}
