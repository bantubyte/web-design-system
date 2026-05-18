import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card';

const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs', 'ai-generated'],
	argTypes: {
		tone: {
			control: 'inline-radio',
			options: ['default', 'muted', 'brand', 'accent'],
		},
		interactive: { control: 'boolean' },
	},
	args: { tone: 'default', interactive: false },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	render: (args) => (
		<Card {...args} style={{ maxWidth: 360 }}>
			<CardHeader>
				<CardTitle>Camissa Asset Management</CardTitle>
				<CardDescription>
					15-day awareness flight running 15 Jun – 30 Jun 2026.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Badge tone="brand">Planning</Badge>
			</CardContent>
			<CardFooter>
				<small>Owner: lario.borges</small>
			</CardFooter>
		</Card>
	),
};

export const Tones: Story = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
			}}
		>
			{(['default', 'muted', 'brand', 'accent'] as const).map((tone) => (
				<Card key={tone} tone={tone}>
					<CardHeader>
						<CardTitle>{tone}</CardTitle>
						<CardDescription>tone="{tone}"</CardDescription>
					</CardHeader>
				</Card>
			))}
		</div>
	),
};

export const Interactive: Story = {
	args: { interactive: true },
	render: (args) => (
		<Card {...args} style={{ cursor: 'pointer', maxWidth: 320 }}>
			<CardHeader>
				<CardTitle>Renew flight</CardTitle>
				<CardDescription>Click to open the renewal wizard.</CardDescription>
			</CardHeader>
		</Card>
	),
};
