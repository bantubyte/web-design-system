import {
	type CSSProperties,
	createContext,
	type HTMLAttributes,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type {
	ChartA11yColumn,
	ChartDatum,
	ChartPalette,
	ChartPaletteName,
	ChartStatusProps,
} from '../../../charts-core';
import {
	defaultChartPalette,
	paletteFromCssVariables,
	resolvePalette,
} from '../../../charts-core';
import { useTheme } from '../../../theme/theme-provider';
import { cx } from '../../../utils/class-names';
import { A11yDataTable } from './a11y-data-table';
import { ChartEmpty } from './chart-empty';
import { ChartError } from './chart-error';
import { ChartLoading, type ChartLoadingVariant } from './chart-loading';

export interface ChartContextValue {
	palette: ChartPalette;
	resolvePalette: (name?: ChartPaletteName) => ChartPalette;
}

const ChartContext = createContext<ChartContextValue>({
	palette: defaultChartPalette,
	resolvePalette: (name = 'default') => resolvePalette(name),
});

export interface ChartProviderProps extends HTMLAttributes<HTMLDivElement> {
	palette?: ChartPaletteName;
}

const readPaletteFromElement = (
	element: HTMLElement | null,
	name: ChartPaletteName,
): ChartPalette => {
	if (typeof window === 'undefined' || !element) {
		return resolvePalette(name);
	}
	const styles = window.getComputedStyle(element);
	const readVariable = (variable: string) => {
		const value = styles.getPropertyValue(variable).trim();
		return value || undefined;
	};
	return resolvePalette(name, paletteFromCssVariables(readVariable));
};

export function ChartProvider({
	children,
	className,
	palette = 'default',
	...props
}: ChartProviderProps) {
	const { themeId } = useTheme();
	const ref = useRef<HTMLDivElement>(null);
	const [resolvedPalette, setResolvedPalette] = useState<ChartPalette>(() =>
		resolvePalette(palette),
	);

	useEffect(() => {
		setResolvedPalette(readPaletteFromElement(ref.current, palette));
	}, [palette, themeId]);

	const value = useMemo<ChartContextValue>(
		() => ({
			palette: resolvedPalette,
			resolvePalette: (name = palette) =>
				name === palette
					? resolvedPalette
					: readPaletteFromElement(ref.current, name),
		}),
		[palette, resolvedPalette],
	);

	return (
		<ChartContext.Provider value={value}>
			<div className={cx('pds-chart-provider', className)} ref={ref} {...props}>
				{children}
			</div>
		</ChartContext.Provider>
	);
}

export const useChartContext = (): ChartContextValue =>
	useContext(ChartContext);

export const useChartPalette = (palette?: ChartPaletteName): ChartPalette => {
	const context = useChartContext();
	return palette ? context.resolvePalette(palette) : context.palette;
};

export interface ChartContainerProps<T extends ChartDatum>
	extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
		ChartStatusProps {
	actions?: ReactNode;
	ariaDescription?: string;
	ariaLabel: string;
	children: ReactNode;
	data: readonly T[];
	height?: number;
	loadingVariant?: ChartLoadingVariant;
	style?: CSSProperties;
	tableCaption?: string;
	tableColumns?: readonly ChartA11yColumn<T>[];
	tableVisible?: boolean;
}

export function ChartContainer<T extends ChartDatum>({
	actions,
	ariaDescription,
	ariaLabel,
	children,
	className,
	data,
	empty,
	emptyMessage,
	error,
	height = 320,
	loading,
	loadingVariant,
	style,
	tableCaption,
	tableColumns,
	tableVisible = false,
	...props
}: ChartContainerProps<T>) {
	const chartRef = useRef<HTMLDivElement>(null);
	const descriptionId = ariaDescription
		? `${ariaLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-description`
		: undefined;

	useEffect(() => {
		const chart = chartRef.current;
		if (!chart) return;

		const setAttribute = (
			element: Element,
			attributeName: string,
			value: string,
		) => {
			if (element.getAttribute(attributeName) !== value) {
				element.setAttribute(attributeName, value);
			}
		};

		const removeAttribute = (element: Element, attributeName: string) => {
			if (element.hasAttribute(attributeName)) {
				element.removeAttribute(attributeName);
			}
		};

		const sanitizeRechartsA11y = () => {
			for (const element of chart.querySelectorAll(
				'.recharts-wrapper[role="region"]',
			)) {
				removeAttribute(element, 'role');
				removeAttribute(element, 'aria-hidden');
			}

			for (const element of chart.querySelectorAll('.recharts-surface')) {
				setAttribute(element, 'role', 'presentation');
				setAttribute(element, 'focusable', 'false');
				removeAttribute(element, 'aria-hidden');
			}

			for (const element of chart.querySelectorAll(
				'.recharts-layer[role="img"], .recharts-sector[role="img"], .recharts-rectangle[role="img"], .recharts-scatter-symbol[role="img"], [role="img"].recharts-symbols',
			)) {
				setAttribute(element, 'role', 'presentation');
				setAttribute(element, 'aria-hidden', 'true');
				setAttribute(element, 'tabindex', '-1');
				setAttribute(element, 'focusable', 'false');
			}

			for (const element of chart.querySelectorAll(
				'.recharts-wrapper [tabindex], .recharts-wrapper [focusable="true"]',
			)) {
				if (element instanceof HTMLElement || element instanceof SVGElement) {
					setAttribute(element, 'tabindex', '-1');
					setAttribute(element, 'focusable', 'false');
				}
			}
		};

		sanitizeRechartsA11y();

		const observer = new MutationObserver(sanitizeRechartsA11y);
		observer.observe(chart, {
			attributeFilter: ['aria-hidden', 'focusable', 'role', 'tabindex'],
			attributes: true,
			childList: true,
			subtree: true,
		});

		return () => observer.disconnect();
	});

	return (
		<>
			<div
				aria-describedby={descriptionId}
				aria-label={ariaLabel}
				className={cx('pds-chart', className)}
				ref={chartRef}
				role="img"
				style={
					{ '--pds-chart-height': `${height}px`, ...style } as CSSProperties
				}
				{...props}
			>
				{ariaDescription ? (
					<p className="pds-visually-hidden" id={descriptionId}>
						{ariaDescription}
					</p>
				) : null}
				{actions ? <div className="pds-chart__actions">{actions}</div> : null}
				<div className="pds-chart__body">
					{loading ? (
						<ChartLoading variant={loadingVariant} />
					) : error ? (
						<ChartError message={error} />
					) : empty || data.length === 0 ? (
						<ChartEmpty message={emptyMessage} />
					) : (
						children
					)}
				</div>
			</div>
			{tableColumns?.length ? (
				<A11yDataTable
					caption={tableCaption ?? ariaLabel}
					columns={tableColumns}
					data={data}
					visible={tableVisible}
				/>
			) : null}
		</>
	);
}
