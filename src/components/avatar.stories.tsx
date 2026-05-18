import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './avatar';

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
	tags: ['autodocs', 'ai-generated'],
	argTypes: {
		size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
	},
	args: {
		alt: 'Lario Borges',
		initials: 'LB',
		size: 'md',
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
	render: () => (
		<div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
			<Avatar initials="LB" size="sm" />
			<Avatar initials="LB" size="md" />
			<Avatar initials="LB" size="lg" />
		</div>
	),
};

export const Group: Story = {
	render: () => (
		<AvatarGroup
			max={3}
			people={[
				{ alt: 'Lario Borges', initials: 'LB' },
				{ alt: 'Daisy Kim', initials: 'DK' },
				{ alt: 'Otis Mokoena', initials: 'OM' },
				{ alt: 'Ada Lovelace', initials: 'AL' },
				{ alt: 'Ruth Sango', initials: 'RS' },
			]}
		/>
	),
};
