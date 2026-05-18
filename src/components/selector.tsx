import {
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
	useMemo,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Badge, type BadgeTone } from './badge';

export interface SelectorGroupProps extends HTMLAttributes<HTMLDivElement> {
	columns?: 1 | 2 | 3;
}

export function SelectorGroup({
	className,
	columns = 2,
	...props
}: SelectorGroupProps) {
	return (
		<div
			className={cx(
				'pds-selector-group',
				`pds-selector-group--${columns}`,
				className,
			)}
			{...props}
		/>
	);
}

export interface SelectorOptionProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
	description?: ReactNode;
	meta?: ReactNode;
	selected?: boolean;
	status?: ReactNode;
	statusTone?: BadgeTone;
	title: ReactNode;
}

export function SelectorOption({
	className,
	description,
	meta,
	selected = false,
	status,
	statusTone = 'neutral',
	title,
	type = 'button',
	...props
}: SelectorOptionProps) {
	return (
		<button
			aria-pressed={selected}
			className={cx(
				'pds-selector-option',
				selected && 'pds-selector-option--selected',
				className,
			)}
			type={type}
			{...props}
		>
			<span className="pds-selector-option__indicator" />
			<span className="pds-selector-option__body">
				<span className="pds-selector-option__header">
					<strong>{title}</strong>
					{status ? (
						<Badge size="sm" tone={statusTone}>
							{status}
						</Badge>
					) : null}
				</span>
				{description ? (
					<span className="pds-selector-option__description">
						{description}
					</span>
				) : null}
				{meta ? (
					<span className="pds-selector-option__meta">{meta}</span>
				) : null}
			</span>
		</button>
	);
}

export interface SearchableSelectorOption<TValue extends string = string> {
	description?: ReactNode;
	disabled?: boolean;
	group?: string;
	label: ReactNode;
	meta?: ReactNode;
	value: TValue;
}

export interface SearchableSelectorProps<TValue extends string = string>
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	emptyLabel?: ReactNode;
	mode?: 'single' | 'multiple';
	onValueChange?: (value: TValue | TValue[]) => void;
	options: readonly SearchableSelectorOption<TValue>[];
	placeholder?: string;
	searchLabel?: string;
	selectedValues?: readonly TValue[];
	value?: TValue;
}

const normalizeSearchText = (value: ReactNode): string => {
	if (typeof value === 'string' || typeof value === 'number') {
		return String(value).toLowerCase();
	}

	if (Array.isArray(value)) {
		return value.map(normalizeSearchText).join(' ');
	}

	return '';
};

export function SearchableSelector<TValue extends string = string>({
	className,
	emptyLabel = 'No options found',
	mode = 'single',
	onValueChange,
	options,
	placeholder = 'Search...',
	searchLabel = 'Search options',
	selectedValues,
	value,
	...props
}: SearchableSelectorProps<TValue>) {
	const [query, setQuery] = useState('');
	const activeValues = useMemo(() => {
		if (mode === 'multiple') return new Set(selectedValues ?? []);
		return new Set(value ? [value] : []);
	}, [mode, selectedValues, value]);

	const filteredOptions = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		if (!normalizedQuery) return options;

		return options.filter((option) => {
			const searchableText = [
				option.value,
				normalizeSearchText(option.label),
				normalizeSearchText(option.description),
				normalizeSearchText(option.meta),
				option.group,
			]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();

			return searchableText.includes(normalizedQuery);
		});
	}, [options, query]);

	const selectedOptions = options.filter((option) =>
		activeValues.has(option.value),
	);

	const toggleValue = (nextValue: TValue) => {
		if (mode === 'single') {
			onValueChange?.(nextValue);
			return;
		}

		const nextValues = new Set(activeValues);
		if (nextValues.has(nextValue)) {
			nextValues.delete(nextValue);
		} else {
			nextValues.add(nextValue);
		}
		onValueChange?.(Array.from(nextValues));
	};

	return (
		<div className={cx('pds-searchable-selector', className)} {...props}>
			<label className="pds-searchable-selector__search">
				<span className="pds-visually-hidden">{searchLabel}</span>
				<span
					aria-hidden="true"
					className="pds-searchable-selector__search-icon"
				>
					⌕
				</span>
				<input
					onChange={(event) => setQuery(event.target.value)}
					placeholder={placeholder}
					type="search"
					value={query}
				/>
			</label>

			{mode === 'multiple' && selectedOptions.length > 0 ? (
				<div className="pds-searchable-selector__selected">
					{selectedOptions.map((option) => (
						<button
							className="pds-searchable-selector__pill"
							key={option.value}
							onClick={() => toggleValue(option.value)}
							type="button"
						>
							<span>{option.label}</span>
							<span aria-hidden="true">×</span>
						</button>
					))}
				</div>
			) : null}

			<div
				aria-label={searchLabel}
				aria-multiselectable={mode === 'multiple'}
				className="pds-searchable-selector__list"
				role="listbox"
			>
				{filteredOptions.length > 0 ? (
					filteredOptions.map((option) => {
						const selected = activeValues.has(option.value);

						return (
							<button
								aria-selected={selected}
								className={cx(
									'pds-searchable-selector__option',
									selected && 'pds-searchable-selector__option--selected',
								)}
								disabled={option.disabled}
								key={option.value}
								onClick={() => toggleValue(option.value)}
								role="option"
								type="button"
							>
								<span className="pds-searchable-selector__option-copy">
									<strong>{option.label}</strong>
									{option.description ? (
										<small>{option.description}</small>
									) : null}
								</span>
								{option.meta ? (
									<span className="pds-searchable-selector__meta">
										{option.meta}
									</span>
								) : null}
								<span
									aria-hidden="true"
									className="pds-searchable-selector__check"
								>
									✓
								</span>
							</button>
						);
					})
				) : (
					<div className="pds-searchable-selector__empty">{emptyLabel}</div>
				)}
			</div>
		</div>
	);
}
