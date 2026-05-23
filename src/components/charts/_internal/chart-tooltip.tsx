import type { ChartDatum, ChartFormatter } from '../../../charts-core';
import { formatPlainValue } from '../../../charts-core';

interface TooltipPayloadItem<T extends ChartDatum = ChartDatum> {
	color?: string;
	dataKey?: string;
	name?: string;
	payload?: T;
	value?: unknown;
}

export interface ChartTooltipProps<T extends ChartDatum = ChartDatum> {
	active?: boolean;
	label?: unknown;
	labelFormatter?: ChartFormatter<T>;
	payload?: readonly TooltipPayloadItem<T>[];
	valueFormatter?: ChartFormatter<T>;
}

export function ChartTooltip<T extends ChartDatum = ChartDatum>({
	active,
	label,
	labelFormatter,
	payload,
	valueFormatter,
}: ChartTooltipProps<T>) {
	if (!active || !payload?.length) return null;

	return (
		<div className="pds-chart-tooltip">
			{label != null ? (
				<p className="pds-chart-tooltip__label">
					{labelFormatter ? labelFormatter(label) : formatPlainValue(label)}
				</p>
			) : null}
			<ul>
				{payload.map((item, index) => (
					<li key={`${item.dataKey ?? item.name ?? 'series'}-${index}`}>
						<span
							className="pds-chart-tooltip__swatch"
							style={{ background: item.color }}
						/>
						<span>{item.name ?? item.dataKey}</span>
						<strong>
							{valueFormatter
								? valueFormatter(item.value, {
										dataKey: item.dataKey,
										datum: item.payload,
									})
								: formatPlainValue(item.value)}
						</strong>
					</li>
				))}
			</ul>
		</div>
	);
}
