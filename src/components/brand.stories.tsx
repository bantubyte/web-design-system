import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLockup, BrandMark, ProductName } from './brand';

const meta = {
	title: 'Components/Brand',
	component: BrandLockup,
	tags: ['autodocs', 'ai-generated'],
	parameters: {
		docs: {
			description: {
				component:
					'Brand primitives. Switch the tenant theme via the toolbar to see Pikaboo, Pikaboo Dark, and Primedia/Cortexx product copy.',
			},
		},
	},
} satisfies Meta<typeof BrandLockup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const MarkSizes: Story = {
	render: () => (
		<div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
			<BrandMark size={24} />
			<BrandMark size={36} />
			<BrandMark size={56} />
		</div>
	),
};

export const ProductNameOnly: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
			<ProductName />
			<ProductName withTenant />
		</div>
	),
};
