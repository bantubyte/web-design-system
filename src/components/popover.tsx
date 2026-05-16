import {
	type HTMLAttributes,
	type ReactNode,
	useId,
	useRef,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Button, type ButtonVariant } from './button';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
	align?: 'start' | 'center' | 'end';
	children: ReactNode;
	defaultOpen?: boolean;
	label: ReactNode;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
	panelLabel?: string;
	triggerVariant?: ButtonVariant;
	width?: 'sm' | 'md' | 'lg';
}

export function Popover({
	align = 'start',
	children,
	className,
	defaultOpen = false,
	label,
	onOpenChange,
	open,
	panelLabel = 'Popover content',
	triggerVariant = 'outline',
	width = 'md',
	...props
}: PopoverProps) {
	const panelId = useId();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const isOpen = open ?? uncontrolledOpen;

	const setOpen = (nextOpen: boolean) => {
		if (open === undefined) {
			setUncontrolledOpen(nextOpen);
		}
		onOpenChange?.(nextOpen);
	};

	return (
		<div className={cx('pds-popover', className)} {...props}>
			<Button
				aria-controls={panelId}
				aria-expanded={isOpen}
				onClick={() => setOpen(!isOpen)}
				ref={triggerRef}
				rightIcon={<span aria-hidden="true">⌄</span>}
				variant={triggerVariant}
			>
				{label}
			</Button>
			{isOpen ? (
				<div
					aria-label={panelLabel}
					className={cx(
						'pds-popover__panel',
						`pds-popover__panel--${align}`,
						`pds-popover__panel--${width}`,
					)}
					id={panelId}
					role="dialog"
				>
					{children}
				</div>
			) : null}
		</div>
	);
}
