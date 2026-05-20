import {
	type FieldsetHTMLAttributes,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Icon } from './icons';

export type ThemeToggleMode = 'dark' | 'light';

const STORAGE_DEFAULT = 'pikaboo:website:theme';
const THEME_FOR_MODE: Record<ThemeToggleMode, string> = {
	dark: 'pikaboo-dark',
	light: 'pikaboo',
};

const MODE_FOR_THEME = (
	themeId: string | null | undefined,
): ThemeToggleMode | null => {
	if (themeId === 'pikaboo-dark') return 'dark';
	if (themeId === 'pikaboo') return 'light';
	return null;
};

export interface ThemeToggleProps
	extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
	/** Controlled mode value. When set, the component is controlled and won't manage its own state. */
	value?: ThemeToggleMode;
	/** Default mode for uncontrolled use. Ignored if `value` is set. */
	defaultValue?: ThemeToggleMode;
	/** Fired whenever the user toggles the mode. */
	onChange?: (mode: ThemeToggleMode) => void;
	/** When true (default), writes `data-theme` on the document root so DS components react. */
	applyToDocument?: boolean;
	/** When set, persists the user's choice in localStorage under this key. Pass `false` to disable. */
	persistKey?: string | false;
	/** Label for the light option (default: "Light"). */
	lightLabel?: string;
	/** Label for the dark option (default: "Dark"). */
	darkLabel?: string;
	/** Accessible label for the whole control (default: "Theme"). */
	ariaLabel?: string;
}

/**
 * Theme switcher — a polished 2-option pill toggle (sun / moon) for switching
 * between light and dark themes. Works uncontrolled (manages its own state via
 * localStorage + document attribute) or controlled (caller supplies `value` +
 * `onChange`).
 *
 * The control writes `data-theme="pikaboo"` (light) or `data-theme="pikaboo-dark"`
 * (dark) on `document.documentElement` so every DS component picks up the
 * theme tokens. Pair with a synchronous boot script in your layout `<head>` that
 * reads localStorage before paint to avoid a theme flash:
 *
 * ```html
 * <script>
 *   try {
 *     var v = localStorage.getItem('pikaboo:website:theme');
 *     if (v === 'pikaboo' || v === 'pikaboo-dark')
 *       document.documentElement.setAttribute('data-theme', v);
 *   } catch (e) {}
 * </script>
 * ```
 */
export function ThemeToggle({
	applyToDocument = true,
	ariaLabel = 'Theme',
	className,
	darkLabel = 'Dark',
	defaultValue,
	lightLabel = 'Light',
	onChange,
	persistKey = STORAGE_DEFAULT,
	value,
	...props
}: ThemeToggleProps) {
	const isControlled = value !== undefined;
	const initial: ThemeToggleMode =
		value ??
		defaultValue ??
		(typeof document !== 'undefined'
			? (MODE_FOR_THEME(document.documentElement.dataset.theme) ?? 'dark')
			: 'dark');
	const [internal, setInternal] = useState<ThemeToggleMode>(initial);
	const active: ThemeToggleMode = isControlled
		? (value as ThemeToggleMode)
		: internal;

	useEffect(() => {
		if (isControlled || typeof window === 'undefined') return;
		if (!persistKey) return;
		try {
			const stored = window.localStorage.getItem(persistKey);
			if (stored === 'pikaboo' || stored === 'pikaboo-dark') {
				setInternal(stored === 'pikaboo' ? 'light' : 'dark');
			}
		} catch {
			/* ignore unavailable localStorage */
		}
		// Only run once on mount in uncontrolled mode.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setMode = useCallback(
		(next: ThemeToggleMode) => {
			if (!isControlled) setInternal(next);
			if (applyToDocument && typeof document !== 'undefined') {
				document.documentElement.dataset.theme = THEME_FOR_MODE[next];
			}
			if (persistKey && typeof window !== 'undefined') {
				try {
					window.localStorage.setItem(persistKey, THEME_FOR_MODE[next]);
				} catch {
					/* ignore */
				}
			}
			onChange?.(next);
		},
		[applyToDocument, isControlled, onChange, persistKey],
	);

	return (
		<fieldset
			aria-label={ariaLabel}
			className={cx('pds-theme-toggle', className)}
			{...props}
		>
			<legend className="pds-visually-hidden">{ariaLabel}</legend>
			<span
				aria-hidden="true"
				className={cx(
					'pds-theme-toggle__thumb',
					active === 'dark' && 'pds-theme-toggle__thumb--dark',
				)}
			/>
			<button
				aria-label={lightLabel}
				aria-pressed={active === 'light'}
				className={cx(
					'pds-theme-toggle__option',
					active === 'light' && 'pds-theme-toggle__option--active',
				)}
				onClick={() => setMode('light')}
				type="button"
			>
				<Icon name="sun" size={16} />
				<span className="pds-visually-hidden">{lightLabel}</span>
			</button>
			<button
				aria-label={darkLabel}
				aria-pressed={active === 'dark'}
				className={cx(
					'pds-theme-toggle__option',
					active === 'dark' && 'pds-theme-toggle__option--active',
				)}
				onClick={() => setMode('dark')}
				type="button"
			>
				<Icon name="moon" size={16} />
				<span className="pds-visually-hidden">{darkLabel}</span>
			</button>
		</fieldset>
	);
}

/**
 * Synchronous boot script that reads the persisted theme from localStorage
 * and applies it to `document.documentElement` before first paint, avoiding
 * a theme flash. Inline into your layout's `<head>` so it runs before any
 * styles paint.
 */
export const themeToggleBootScript = (
	persistKey: string = STORAGE_DEFAULT,
): string => `(() => {
  try {
    var v = window.localStorage.getItem(${JSON.stringify(persistKey)});
    if (v === "pikaboo" || v === "pikaboo-dark") {
      document.documentElement.setAttribute("data-theme", v);
    }
  } catch (_) {}
})();`;
