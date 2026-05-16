import { describe, expect, it } from 'vitest';
import {
	defaultThemeId,
	getProductName,
	getThemeById,
	getThemeCssVariables,
	getThemeDataAttributes,
	resolveThemeId,
	themeIds,
} from './tokens';

describe('theme contract', () => {
	it('uses Pikaboo as the default brand theme and exposes Primedia as a tenant theme', () => {
		expect(defaultThemeId).toBe('pikaboo');
		expect(themeIds).toEqual(['pikaboo', 'primedia']);
	});

	it('uses Cortexx as the Primedia-facing product name without adding a Cortexx theme', () => {
		expect(resolveThemeId('cortexx')).toBe('primedia');
		expect(getThemeById('pikaboo')).toMatchObject({
			id: 'pikaboo',
			tenant: 'pikaboo',
			copy: {
				productName: 'PIKABOO',
			},
		});
		expect(getThemeById('primedia')).toMatchObject({
			id: 'primedia',
			tenant: 'primedia',
			copy: {
				productName: 'Cortexx',
			},
		});
		expect(getProductName('cortexx')).toBe('Cortexx');
	});

	it('falls back to Pikaboo for unknown theme ids', () => {
		expect(resolveThemeId('missing-tenant')).toBe('pikaboo');
		expect(getThemeById('missing-tenant').id).toBe('pikaboo');
	});

	it('exports CSS variables compatible with the marketing app theme contract', () => {
		expect(getThemeCssVariables('pikaboo')).toMatchObject({
			'--theme-primary': '#6b3fe4',
			'--theme-accent': '#fdff2e',
			'--theme-page-bg': '#fffbf5',
		});
		expect(getThemeCssVariables('primedia')).toMatchObject({
			'--theme-primary': '#2647ed',
			'--theme-secondary': '#123f8a',
			'--theme-page-bg': '#f4f6fa',
		});
	});

	it('marks every scoped theme as part of the Pikaboo brand system', () => {
		expect(getThemeDataAttributes('primedia')).toEqual({
			'data-brand': 'pikaboo',
			'data-theme': 'primedia',
		});
	});
});
