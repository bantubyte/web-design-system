type ClassValue = string | false | null | undefined;

export const cx = (...classNames: ClassValue[]): string =>
	classNames.filter(Boolean).join(' ');
