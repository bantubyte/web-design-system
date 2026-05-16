import type { FieldsetHTMLAttributes } from 'react';
import { cx } from '../utils/class-names';
import { useTheme } from './theme-provider';
import {
	getThemeById,
	resolveThemeId,
	type ThemeId,
	type ThemeInput,
	themeIds,
} from './tokens';

export interface ThemeSwitcherProps
	extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
	value?: ThemeInput;
	onThemeChange?: (themeId: ThemeId) => void;
	options?: readonly ThemeId[];
	label?: string;
}

export function ThemeSwitcher({
	value,
	onThemeChange,
	options = themeIds,
	label = 'Theme',
	className,
	...props
}: ThemeSwitcherProps) {
	const context = useTheme();
	const selectedThemeId = resolveThemeId(value ?? context.themeId);

	return (
		<fieldset className={cx('pds-theme-switcher', className)} {...props}>
			<legend className="pds-visually-hidden">{label}</legend>
			{options.map((themeId) => {
				const theme = getThemeById(themeId);
				const isSelected = themeId === selectedThemeId;

				return (
					<button
						aria-pressed={isSelected}
						className="pds-theme-switcher__option"
						key={themeId}
						onClick={() => {
							context.setTheme(themeId);
							onThemeChange?.(themeId);
						}}
						title={
							theme.tenant
								? `${theme.name}: ${theme.copy.productName}`
								: theme.name
						}
						type="button"
					>
						<span className="pds-theme-switcher__swatch" />
						<span>{theme.name}</span>
					</button>
				);
			})}
		</fieldset>
	);
}
