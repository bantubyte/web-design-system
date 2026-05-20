import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeToggle, type ThemeToggleMode } from './theme-toggle';

const meta = {
	title: 'Components/ThemeToggle',
	component: ThemeToggle,
	tags: ['autodocs', 'ai-generated'],
	parameters: {
		docs: {
			description: {
				component:
					'Pill-style sun/moon segmented toggle that switches the active design-system theme. Works uncontrolled (manages document `data-theme` + localStorage) or controlled (`value` + `onChange`).',
			},
		},
	},
	argTypes: {
		applyToDocument: { control: 'boolean' },
		persistKey: { control: 'text' },
	},
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		defaultValue: 'dark',
		applyToDocument: false,
		persistKey: false as unknown as string,
	},
};

export const Light: Story = {
	args: {
		defaultValue: 'light',
		applyToDocument: false,
		persistKey: false as unknown as string,
	},
};

export const Dark: Story = {
	args: {
		defaultValue: 'dark',
		applyToDocument: false,
		persistKey: false as unknown as string,
	},
};

export const Controlled: Story = {
	render: () => {
		const [mode, setMode] = useState<ThemeToggleMode>('dark');
		return (
			<div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
				<ThemeToggle
					applyToDocument={false}
					onChange={setMode}
					persistKey={false}
					value={mode}
				/>
				<code style={{ fontSize: 12 }}>current mode: {mode}</code>
			</div>
		);
	},
};

export const CustomLabels: Story = {
	args: {
		ariaLabel: 'Site theme',
		darkLabel: 'Night mode',
		defaultValue: 'dark',
		lightLabel: 'Day mode',
		applyToDocument: false,
		persistKey: false as unknown as string,
	},
};
