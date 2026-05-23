import type { ChartDatum, ChartFormatter } from '../../../charts-core';
import {
	formatCompactNumber,
	formatDate,
	formatPercent,
} from '../../../charts-core';

export type ChartAxisPreset = 'compact' | 'currency' | 'date' | 'percent';

export const resolveAxisFormatter = <T extends ChartDatum>(
	preset?: ChartAxisPreset,
	formatter?: ChartFormatter<T>,
): ChartFormatter<T> | undefined => {
	if (formatter) return formatter;
	if (preset === 'compact') return formatCompactNumber() as ChartFormatter<T>;
	if (preset === 'date') return formatDate() as ChartFormatter<T>;
	if (preset === 'percent') return formatPercent() as ChartFormatter<T>;
	return undefined;
};

export const getRechartsTickFormatter = <T extends ChartDatum>(
	formatter?: ChartFormatter<T>,
): ((value: unknown) => string) | undefined =>
	formatter ? (value: unknown) => formatter(value) : undefined;
