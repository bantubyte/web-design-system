import { cx } from '../../../utils/class-names';

export type ChartLoadingVariant = 'line' | 'bar' | 'donut' | 'grid';

export interface ChartLoadingProps {
	className?: string;
	variant?: ChartLoadingVariant;
}

export function ChartLoading({
	className,
	variant = 'line',
}: ChartLoadingProps) {
	return (
		<output
			aria-label="Loading chart"
			className={cx(
				'pds-chart-loading',
				`pds-chart-loading--${variant}`,
				className,
			)}
		>
			<span />
			<span />
			<span />
			<span />
		</output>
	);
}
