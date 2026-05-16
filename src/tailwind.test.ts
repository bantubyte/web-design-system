import { pikabooTailwindPreset, pikabooTailwindTheme } from './tailwind';

describe('tailwind export', () => {
	it('exports a dependency-light Tailwind preset backed by design-system CSS variables', () => {
		expect(pikabooTailwindPreset.theme?.extend?.colors?.theme).toMatchObject({
			accent: 'var(--theme-accent)',
			primary: 'var(--theme-primary)',
			surface: 'var(--theme-surface)',
		});
		expect(pikabooTailwindTheme.colors.chart.primary).toBe(
			'var(--theme-chart-primary)',
		);
		expect(pikabooTailwindTheme.fontFamily.heading).toEqual([
			'var(--theme-font-heading)',
		]);
	});
});
