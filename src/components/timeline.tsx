import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/class-names';
import { Badge, type BadgeTone } from './badge';

export type TimelineItemState = 'complete' | 'current' | 'upcoming' | 'blocked';

export interface TimelineItem {
	description?: ReactNode;
	label?: ReactNode;
	state?: TimelineItemState;
	title: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
	items: readonly TimelineItem[];
}

const stateTone: Record<TimelineItemState, BadgeTone> = {
	blocked: 'danger',
	complete: 'success',
	current: 'brand',
	upcoming: 'neutral',
};

export function Timeline({ className, items, ...props }: TimelineProps) {
	return (
		<ol className={cx('pds-timeline', className)} {...props}>
			{items.map((item, index) => {
				const state = item.state ?? 'upcoming';

				return (
					<li
						className={cx('pds-timeline__item', `pds-timeline__item--${state}`)}
						key={index}
					>
						<span className="pds-timeline__marker">{index + 1}</span>
						<div className="pds-timeline__content">
							<div className="pds-timeline__heading">
								<strong>{item.title}</strong>
								{item.label ? (
									<Badge size="sm" tone={stateTone[state]}>
										{item.label}
									</Badge>
								) : null}
							</div>
							{item.description ? (
								<p className="pds-timeline__description">{item.description}</p>
							) : null}
						</div>
					</li>
				);
			})}
		</ol>
	);
}
