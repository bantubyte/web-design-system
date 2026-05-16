import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'icon'],
		},
	},
	args: {
		children: 'Create campaign',
		variant: 'primary',
		size: 'md',
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.75rem',
				maxWidth: 720,
			}}
		>
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="danger">Danger</Button>
			<Button isLoading>Calculating</Button>
			<Button fullWidth variant="outline">
				Full width
			</Button>
		</div>
	),
};
