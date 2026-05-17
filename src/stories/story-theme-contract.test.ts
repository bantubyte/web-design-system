import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const storiesDir = resolve(import.meta.dirname);

const readStory = (filename: string) =>
	readFileSync(resolve(storiesDir, filename), 'utf8');

const countFixedThemeProviders = (source: string) =>
	source.match(
		/render:\s*(?:\([^)]*\)|\w+)\s*=>\s*\(\s*<ThemeProvider\s+theme=/g,
	)?.length ?? 0;

describe('Storybook theme awareness', () => {
	it('does not pin normal docs and playground stories to a single theme', () => {
		for (const filename of [
			'auth.stories.tsx',
			'campaign-workflows.stories.tsx',
			'help-payment.stories.tsx',
		]) {
			expect(countFixedThemeProviders(readStory(filename)), filename).toBe(0);
		}
	});

	it('only keeps fixed page-block themes for the deliberate matrix comparison', () => {
		expect(countFixedThemeProviders(readStory('page-blocks.stories.tsx'))).toBe(
			2,
		);
	});
});
