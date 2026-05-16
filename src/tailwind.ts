export const pikabooTailwindTheme = {
	borderRadius: {
		DEFAULT: 'var(--radius)',
		lg: 'calc(var(--radius) + 4px)',
		md: 'var(--radius)',
		sm: 'calc(var(--radius) - 2px)',
	},
	boxShadow: {
		card: 'var(--theme-shadow-card)',
		glow: 'var(--theme-brand-glow)',
		lg: 'var(--theme-shadow-lg)',
		md: 'var(--theme-shadow-md)',
		sm: 'var(--theme-shadow-sm)',
	},
	colors: {
		brand: {
			cyan: 'var(--theme-brand-cyan)',
			magenta: 'var(--theme-brand-magenta)',
			primary: 'var(--theme-brand-primary)',
			primaryDark: 'var(--theme-brand-primary-dark)',
			primaryLight: 'var(--theme-brand-primary-light)',
			surface: 'var(--theme-brand-surface)',
			text: 'var(--theme-brand-text)',
		},
		chart: {
			axis: 'var(--theme-chart-axis)',
			grid: 'var(--theme-chart-grid)',
			primary: 'var(--theme-chart-primary)',
			quaternary: 'var(--theme-chart-quaternary)',
			quinary: 'var(--theme-chart-quinary)',
			secondary: 'var(--theme-chart-secondary)',
			senary: 'var(--theme-chart-senary)',
			tertiary: 'var(--theme-chart-tertiary)',
		},
		theme: {
			accent: 'var(--theme-accent)',
			background: 'var(--theme-page-bg)',
			backgroundMuted: 'var(--theme-bg-muted)',
			border: 'var(--theme-border)',
			borderStrong: 'var(--theme-border-strong)',
			danger: 'var(--theme-danger)',
			foreground: 'var(--theme-foreground)',
			foregroundMuted: 'var(--theme-foreground-muted)',
			foregroundSubtle: 'var(--theme-foreground-subtle)',
			info: 'var(--theme-info)',
			link: 'var(--theme-link)',
			linkHover: 'var(--theme-link-hover)',
			primary: 'var(--theme-primary)',
			primaryForeground: 'var(--theme-primary-foreground)',
			primaryHover: 'var(--theme-primary-hover)',
			primaryTint: 'var(--theme-primary-tint)',
			secondary: 'var(--theme-secondary)',
			success: 'var(--theme-success)',
			surface: 'var(--theme-surface)',
			surfaceElevated: 'var(--theme-surface-elevated)',
			warning: 'var(--theme-warning)',
		},
	},
	fontFamily: {
		body: ['var(--theme-font-body)'],
		heading: ['var(--theme-font-heading)'],
		ui: ['var(--theme-font-ui)'],
	},
} as const;

export const pikabooTailwindPreset = {
	theme: {
		extend: pikabooTailwindTheme,
	},
} as const;

export default pikabooTailwindPreset;
