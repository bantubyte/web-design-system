import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Surface } from './surface';

const meta = {
	title: 'Components/Surface',
	component: Surface,
	tags: ['autodocs', 'ai-generated'],
	argTypes: {
		tone: {
			control: 'select',
			options: [
				'default',
				'muted',
				'brand',
				'ink',
				'success',
				'warning',
				'danger',
			],
		},
		padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
		as: { control: 'inline-radio', options: ['div', 'section', 'article'] },
	},
	args: { tone: 'default', padding: 'md', as: 'section' },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	render: (args) => (
		<Surface {...args} style={{ maxWidth: 480 }}>
			<h3 style={{ margin: 0 }}>Planning workspace</h3>
			<p style={{ marginBottom: 0 }}>
				Surfaces wrap dense product UI in tenant-aware containers.
			</p>
		</Surface>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('heading', { name: 'Planning workspace' }),
		).toBeVisible();
	},
};

export const Tones: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gap: '0.75rem',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
			}}
		>
			{(
				[
					'default',
					'muted',
					'brand',
					'ink',
					'success',
					'warning',
					'danger',
				] as const
			).map((tone) => (
				<Surface key={tone} tone={tone}>
					<strong>{tone}</strong>
				</Surface>
			))}
		</div>
	),
	play: async ({ canvas }) => {
		for (const tone of [
			'default',
			'muted',
			'brand',
			'ink',
			'success',
			'warning',
			'danger',
		]) {
			await expect(canvas.getByText(tone)).toBeVisible();
		}
	},
};
