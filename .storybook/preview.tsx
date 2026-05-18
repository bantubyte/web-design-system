import type { Decorator, Preview } from '@storybook/react-vite';
import { useGlobals } from 'storybook/preview-api';
import { type ThemeId, ThemeProvider } from '../src';
import '../src/styles.css';

const withTheme: Decorator = (Story, context) => {
	const [, updateGlobals] = useGlobals();
	const selectedTheme =
		context.globals.theme === 'primedia'
			? 'primedia'
			: context.globals.theme === 'pikaboo-dark'
				? 'pikaboo-dark'
				: 'pikaboo';

	return (
		<ThemeProvider
			applyToRoot
			onThemeChange={(themeId) => updateGlobals({ theme: themeId })}
			theme={selectedTheme}
		>
			<Story />
		</ThemeProvider>
	);
};

const preview: Preview = {
	decorators: [withTheme],
	initialGlobals: {
		theme: 'pikaboo' satisfies ThemeId,
	},
	globalTypes: {
		theme: {
			description: 'Tenant theme',
			toolbar: {
				icon: 'paintbrush',
				items: [
					{ value: 'pikaboo', title: 'Pikaboo' },
					{ value: 'pikaboo-dark', title: 'Pikaboo Dark' },
					{ value: 'primedia', title: 'Primedia / Cortexx' },
				],
				dynamicTitle: true,
			},
		},
	},
	parameters: {
		layout: 'centered',
		a11y: { test: 'todo' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: ['Foundations', 'Components', 'Patterns'],
			},
		},
	},
};

export default preview;
