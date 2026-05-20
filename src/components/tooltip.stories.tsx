import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Tooltip } from './tooltip';

const meta = {
	title: 'Components/Tooltip',
	component: Tooltip,
	tags: ['autodocs', 'ai-generated'],
	argTypes: {
		side: {
			control: 'inline-radio',
			options: ['top', 'right', 'bottom', 'left'],
		},
	},
	args: {
		content: 'Renews on 30 Jun 2026',
		side: 'top',
		children: 'Renewal date',
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Renewal date')).toBeVisible();
	},
};

export const Sides: Story = {
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip content={`Tooltip on the ${side}`} key={side} side={side}>
					<span style={{ textDecoration: 'underline dotted' }}>{side}</span>
				</Tooltip>
			))}
		</div>
	),
	play: async ({ canvas }) => {
		for (const side of ['top', 'right', 'bottom', 'left']) {
			await expect(canvas.getByText(side)).toBeVisible();
		}
	},
};
