import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cx } from '../utils/class-names';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	alt?: string;
	initials?: string;
	size?: AvatarSize;
	src?: string;
}

export function Avatar({
	alt = '',
	className,
	initials,
	size = 'md',
	src,
	...props
}: AvatarProps) {
	return (
		<div
			className={cx('pds-avatar', `pds-avatar--${size}`, className)}
			{...props}
		>
			{src ? (
				<img alt={alt} className="pds-avatar__image" src={src} />
			) : (
				<span
					aria-hidden={alt ? undefined : true}
					className="pds-avatar__initials"
				>
					{initials ?? alt.slice(0, 2).toUpperCase()}
				</span>
			)}
		</div>
	);
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
	max?: number;
	people: readonly Pick<AvatarProps, 'alt' | 'initials' | 'src'>[];
	size?: AvatarSize;
}

export function AvatarGroup({
	className,
	max = 4,
	people,
	size = 'md',
	...props
}: AvatarGroupProps) {
	const visiblePeople = people.slice(0, max);
	const overflowCount = Math.max(people.length - visiblePeople.length, 0);

	return (
		<div className={cx('pds-avatar-group', className)} {...props}>
			{visiblePeople.map((person, index) => (
				<Avatar
					alt={person.alt}
					initials={person.initials}
					key={`${person.alt ?? person.initials ?? 'avatar'}-${index}`}
					size={size}
					src={person.src}
				/>
			))}
			{overflowCount ? (
				<div
					className={cx(
						'pds-avatar',
						`pds-avatar--${size}`,
						'pds-avatar--overflow',
					)}
				>
					+{overflowCount}
				</div>
			) : null}
		</div>
	);
}

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement>;
