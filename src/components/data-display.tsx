import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';
import { Badge, type BadgeTone } from './badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './card';

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
	change?: ReactNode;
	label: ReactNode;
	status?: BadgeTone;
	value: ReactNode;
}

export function MetricCard({
	change,
	className,
	label,
	status = 'neutral',
	value,
	...props
}: MetricCardProps) {
	return (
		<Card className={cx('pds-metric-card', className)} {...props}>
			<p className="pds-metric-card__label">{label}</p>
			<div className="pds-metric-card__value">{value}</div>
			{change ? (
				<Badge size="sm" tone={status}>
					{change}
				</Badge>
			) : null}
		</Card>
	);
}

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
	columns?: 2 | 3 | 4;
}

export function StatGrid({ className, columns = 4, ...props }: StatGridProps) {
	return (
		<div
			className={cx('pds-stat-grid', `pds-stat-grid--${columns}`, className)}
			{...props}
		/>
	);
}

export interface DataTableColumn<TRow extends Record<string, unknown>> {
	align?: 'left' | 'right' | 'center';
	header: ReactNode;
	key: keyof TRow | string;
	render?: (row: TRow) => ReactNode;
}

export interface DataTableProps<TRow extends Record<string, unknown>>
	extends HTMLAttributes<HTMLDivElement> {
	columns: readonly DataTableColumn<TRow>[];
	emptyLabel?: ReactNode;
	getRowKey?: (row: TRow, index: number) => string;
	rows: readonly TRow[];
}

export function DataTable<TRow extends Record<string, unknown>>({
	className,
	columns,
	emptyLabel = 'No records',
	getRowKey,
	rows,
	...props
}: DataTableProps<TRow>) {
	return (
		<div className={cx('pds-data-table', className)} {...props}>
			<table>
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								className={`pds-data-table__cell--${column.align ?? 'left'}`}
								key={String(column.key)}
								scope="col"
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length ? (
						rows.map((row, rowIndex) => (
							<tr key={getRowKey?.(row, rowIndex) ?? rowIndex}>
								{columns.map((column) => {
									const value = row[column.key as keyof TRow];
									return (
										<td
											className={`pds-data-table__cell--${column.align ?? 'left'}`}
											key={String(column.key)}
										>
											{column.render?.(row) ??
												(value == null ? '' : String(value))}
										</td>
									);
								})}
							</tr>
						))
					) : (
						<tr>
							<td className="pds-data-table__empty" colSpan={columns.length}>
								{emptyLabel}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export interface ChartDatum {
	color?: string;
	label: string;
	value: number;
}

export interface ChartCardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	data: readonly ChartDatum[];
	description?: ReactNode;
	title: ReactNode;
}

export function ChartCard({
	className,
	data,
	description,
	title,
	...props
}: ChartCardProps) {
	const maxValue = Math.max(...data.map((datum) => datum.value), 1);
	const chartColors = [
		'var(--theme-chart-primary)',
		'var(--theme-chart-secondary)',
		'var(--theme-chart-tertiary)',
		'var(--theme-chart-quaternary)',
		'var(--theme-chart-quinary)',
		'var(--theme-chart-senary)',
	];

	return (
		<Card className={cx('pds-chart-card', className)} {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description ? <CardDescription>{description}</CardDescription> : null}
			</CardHeader>
			<CardContent>
				<div className="pds-chart-card__bars">
					{data.map((datum, index) => (
						<div className="pds-chart-card__row" key={datum.label}>
							<span className="pds-chart-card__label">{datum.label}</span>
							<span className="pds-chart-card__track">
								<span
									className="pds-chart-card__bar"
									style={{
										background:
											datum.color ?? chartColors[index % chartColors.length],
										width: `${Math.round((datum.value / maxValue) * 100)}%`,
									}}
								/>
							</span>
							<span className="pds-chart-card__value">{datum.value}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export interface InsightCardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	confidence?: ReactNode;
	evidence?: readonly ReactNode[];
	title: ReactNode;
}

export function InsightCard({
	children,
	className,
	confidence,
	evidence = [],
	title,
	...props
}: InsightCardProps) {
	return (
		<Card className={cx('pds-insight-card', className)} tone="muted" {...props}>
			<CardHeader>
				<div className="pds-insight-card__header">
					<CardTitle>{title}</CardTitle>
					{confidence ? (
						<Badge size="sm" tone="info">
							{confidence}
						</Badge>
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<div className="pds-insight-card__content">{children}</div>
				{evidence.length ? (
					<ul className="pds-insight-card__evidence">
						{evidence.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				) : null}
			</CardContent>
		</Card>
	);
}
