import {
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
	useState,
} from 'react';
import { cx } from '../utils/class-names';

export interface AccordionItem {
	content: ReactNode;
	disabled?: boolean;
	id: string;
	title: ReactNode;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
	defaultOpenItems?: readonly string[];
	items: readonly AccordionItem[];
	multiple?: boolean;
	onOpenItemsChange?: (openItems: string[]) => void;
	openItems?: readonly string[];
}

export function Accordion({
	className,
	defaultOpenItems = [],
	items,
	multiple = false,
	onOpenItemsChange,
	openItems,
	...props
}: AccordionProps) {
	const [uncontrolledOpenItems, setUncontrolledOpenItems] = useState<string[]>(
		() => Array.from(defaultOpenItems),
	);
	const activeOpenItems = openItems
		? Array.from(openItems)
		: uncontrolledOpenItems;

	const toggleItem = (itemId: string) => {
		const isOpen = activeOpenItems.includes(itemId);
		const nextOpenItems = multiple
			? isOpen
				? activeOpenItems.filter((openItem) => openItem !== itemId)
				: [...activeOpenItems, itemId]
			: isOpen
				? []
				: [itemId];

		if (openItems === undefined) {
			setUncontrolledOpenItems(nextOpenItems);
		}
		onOpenItemsChange?.(nextOpenItems);
	};

	return (
		<div className={cx('pds-accordion', className)} {...props}>
			{items.map((item) => {
				const isOpen = activeOpenItems.includes(item.id);
				return (
					<section className="pds-accordion__item" key={item.id}>
						<button
							aria-controls={`${item.id}-panel`}
							aria-expanded={isOpen}
							className="pds-accordion__trigger"
							disabled={item.disabled}
							id={`${item.id}-trigger`}
							onClick={() => toggleItem(item.id)}
							type="button"
						>
							<span>{item.title}</span>
							<span aria-hidden="true" className="pds-accordion__chevron">
								⌄
							</span>
						</button>
						{isOpen ? (
							<div className="pds-accordion__panel" id={`${item.id}-panel`}>
								{item.content}
							</div>
						) : null}
					</section>
				);
			})}
		</div>
	);
}

export interface DisclosureButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	open?: boolean;
}

export function DisclosureButton({
	children,
	className,
	open = false,
	type = 'button',
	...props
}: DisclosureButtonProps) {
	return (
		<button
			aria-expanded={open}
			className={cx('pds-disclosure-button', className)}
			type={type}
			{...props}
		>
			<span>{children}</span>
			<span aria-hidden="true" className="pds-disclosure-button__chevron">
				⌄
			</span>
		</button>
	);
}
