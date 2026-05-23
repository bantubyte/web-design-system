import { cx } from '../../../utils/class-names';

export interface ChartErrorProps {
	className?: string;
	message?: string;
}

export function ChartError({
	className,
	message = 'Chart could not be loaded.',
}: ChartErrorProps) {
	return (
		<div
			className={cx('pds-chart-state pds-chart-state--error', className)}
			role="alert"
		>
			<span aria-hidden="true" className="pds-chart-state__mark" />
			<p>{message}</p>
		</div>
	);
}
