import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from './button';
import {
	Dialog,
	DialogBody,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './dialog';

const meta = {
	title: 'Components/Dialog',
	component: Dialog,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {
	render: () => (
		<Dialog titleId="confirm-plan-title">
			<DialogHeader>
				<DialogTitle id="confirm-plan-title">Save campaign plan</DialogTitle>
				<DialogDescription>
					Confirm the current media mix, placements, and audience assumptions.
				</DialogDescription>
			</DialogHeader>
			<DialogBody>
				<p style={{ color: 'var(--theme-foreground-muted)', margin: 0 }}>
					This keeps the plan editable while making the selected scenario
					available for reporting.
				</p>
			</DialogBody>
			<DialogFooter
				actions={
					<>
						<Button variant="outline">Cancel</Button>
						<Button>Save plan</Button>
					</>
				}
			/>
		</Dialog>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Save campaign plan')).toBeVisible();
		await expect(
			canvas.getByRole('button', { name: /save plan/i }),
		).toBeVisible();
		await expect(canvas.getByRole('button', { name: /cancel/i })).toBeVisible();
	},
};
