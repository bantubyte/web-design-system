import {
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
	useId,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Button } from './button';

export interface BreadcrumbItem {
	current?: boolean;
	href?: string;
	label: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
	items: readonly BreadcrumbItem[];
}

export function Breadcrumbs({ className, items, ...props }: BreadcrumbsProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cx('pds-breadcrumbs', className)}
			{...props}
		>
			<ol>
				{items.map((item, index) => (
					<li key={index}>
						{item.href && !item.current ? (
							<a href={item.href}>{item.label}</a>
						) : (
							<span aria-current={item.current ? 'page' : undefined}>
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}

export interface SegmentedOption<TValue extends string = string> {
	disabled?: boolean;
	label: ReactNode;
	value: TValue;
}

export interface SegmentedControlProps<TValue extends string = string>
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	onChange?: (value: TValue) => void;
	options: readonly SegmentedOption<TValue>[];
	value: TValue;
}

export function SegmentedControl<TValue extends string = string>({
	className,
	onChange,
	options,
	value,
	...props
}: SegmentedControlProps<TValue>) {
	return (
		<div className={cx('pds-segmented-control', className)} {...props}>
			{options.map((option) => (
				<button
					aria-pressed={option.value === value}
					className="pds-segmented-control__option"
					disabled={option.disabled}
					key={option.value}
					onClick={() => onChange?.(option.value)}
					type="button"
				>
					{option.label}
				</button>
			))}
		</div>
	);
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
	ariaLabel?: string;
}

export function TabList({
	ariaLabel = 'Tabs',
	className,
	...props
}: TabListProps) {
	return (
		<div
			aria-label={ariaLabel}
			className={cx('pds-tab-list', className)}
			role="tablist"
			{...props}
		/>
	);
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	selected?: boolean;
}

export function Tab({ className, selected = false, ...props }: TabProps) {
	return (
		<button
			aria-selected={selected}
			className={cx('pds-tab', selected && 'pds-tab--selected', className)}
			role="tab"
			type="button"
			{...props}
		/>
	);
}

export interface TabsItem<TValue extends string = string> {
	badge?: ReactNode;
	disabled?: boolean;
	label: ReactNode;
	panel: ReactNode;
	value: TValue;
}

export interface TabsProps<TValue extends string = string>
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	ariaLabel?: string;
	defaultValue?: TValue;
	items: readonly TabsItem<TValue>[];
	onValueChange?: (value: TValue) => void;
	value?: TValue;
}

const getInitialTabValue = <TValue extends string>(
	items: readonly TabsItem<TValue>[],
	defaultValue?: TValue,
) =>
	defaultValue ??
	items.find((item) => !item.disabled)?.value ??
	items[0]?.value;

export function Tabs<TValue extends string = string>({
	ariaLabel = 'Tabs',
	className,
	defaultValue,
	items,
	onValueChange,
	value,
	...props
}: TabsProps<TValue>) {
	const baseId = useId();
	const [uncontrolledValue, setUncontrolledValue] = useState<
		TValue | undefined
	>(() => getInitialTabValue(items, defaultValue));
	const activeValue = value ?? uncontrolledValue;
	const activeItem =
		items.find((item) => item.value === activeValue) ??
		items.find((item) => !item.disabled) ??
		items[0];

	const setValue = (nextValue: TValue) => {
		if (value === undefined) {
			setUncontrolledValue(nextValue);
		}
		onValueChange?.(nextValue);
	};

	return (
		<div className={cx('pds-tabs', className)} {...props}>
			<div aria-label={ariaLabel} className="pds-tabs__list" role="tablist">
				{items.map((item) => {
					const selected = item.value === activeItem?.value;
					const tabId = `${baseId}-${item.value}-tab`;
					const panelId = `${baseId}-${item.value}-panel`;

					return (
						<button
							aria-controls={panelId}
							aria-selected={selected}
							className={cx(
								'pds-tabs__tab',
								selected && 'pds-tabs__tab--active',
							)}
							disabled={item.disabled}
							id={tabId}
							key={item.value}
							onClick={() => setValue(item.value)}
							role="tab"
							tabIndex={selected ? 0 : -1}
							type="button"
						>
							<span>{item.label}</span>
							{item.badge ? (
								<span className="pds-tabs__badge">{item.badge}</span>
							) : null}
						</button>
					);
				})}
			</div>
			{activeItem ? (
				<div
					aria-labelledby={`${baseId}-${activeItem.value}-tab`}
					className="pds-tabs__panel"
					id={`${baseId}-${activeItem.value}-panel`}
					role="tabpanel"
				>
					{activeItem.panel}
				</div>
			) : null}
		</div>
	);
}

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
	onNext?: () => void;
	onPrevious?: () => void;
	page: number;
	pageCount: number;
}

export function Pagination({
	className,
	onNext,
	onPrevious,
	page,
	pageCount,
	...props
}: PaginationProps) {
	const totalPages = Math.max(1, pageCount);
	const safePage = Math.max(1, Math.min(page, totalPages));

	return (
		<div className={cx('pds-pagination', className)} {...props}>
			<Button
				disabled={safePage <= 1}
				onClick={onPrevious}
				size="sm"
				variant="outline"
			>
				Previous
			</Button>
			<span>
				Page {safePage} of {totalPages}
			</span>
			<Button
				disabled={safePage >= totalPages}
				onClick={onNext}
				size="sm"
				variant="outline"
			>
				Next
			</Button>
		</div>
	);
}
