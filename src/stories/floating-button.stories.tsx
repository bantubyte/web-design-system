import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { expect } from 'storybook/test';
import {
	Badge,
	FloatingButton,
	type FloatingButtonCorner,
	floatingButtonCorners,
	pdsIconNames,
	SectionHeader,
} from '../index';

interface FloatingButtonStoryArgs {
	bottomLiftInset: number;
	collapseAfterMs: number;
	defaultCorner: FloatingButtonCorner;
	dragDisabled: boolean;
	edgeInset: number;
	icon: (typeof pdsIconNames)[number];
	idlePulse: boolean;
	label: string;
	liftBottomCorners: boolean;
	position: 'absolute' | 'fixed';
	tooltip: string;
	tooltipFontSize: string;
	tooltipPadding: string;
	tooltipRadius: string;
	tooltipShadow: string;
	tooltipSide: 'auto' | 'bottom' | 'left' | 'right' | 'top';
	zIndex: number;
}

type FloatingButtonCssVars = CSSProperties &
	Record<
		| '--pds-floating-button-tooltip-padding'
		| '--pds-floating-button-tooltip-font-size'
		| '--pds-floating-button-tooltip-radius'
		| '--pds-floating-button-tooltip-shadow'
		| '--pds-floating-button-idle-animation',
		string | undefined
	>;

const meta = {
	title: 'Components/Floating Button',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: [
					'A generic draggable floating button. Use it for help, support, quick create,',
					'export, or any persistent action that should not own the dialog implementation.',
					'',
					'Tooltip shape is fully theme-able via CSS variables passed through `style`:',
					'`--pds-floating-button-tooltip-{padding,font-size,font-weight,line-height,',
					'color,background,border-width,border-color,radius,shadow,max-width}`.',
					'',
					'Set `--pds-floating-button-idle-animation: pds-floating-button-idle-pulse` to',
					'opt in to the built-in breathing-ring idle animation. Tune the duration with',
					'`--pds-floating-button-idle-duration` (default `2.4s`). The animation respects',
					'`prefers-reduced-motion` and pauses on hover, focus, drag, and snap.',
				].join(' '),
			},
			source: {
				code: `import { FloatingButton } from '@pikaboo/t2-design-system';

<FloatingButton
  icon="help"
  label="Contact Help"
  liftBottomCorners
  onClick={() => setHelpOpen(true)}
  storageKey="cortexx_help_fab_corner"
  tooltip="Drag me to another corner"
  style={{
    '--pds-floating-button-tooltip-radius': '14px',
    '--pds-floating-button-tooltip-padding': '0.6rem 0.9rem',
    '--pds-floating-button-idle-animation': 'pds-floating-button-idle-pulse',
  }}
/>`,
			},
		},
	},
	argTypes: {
		defaultCorner: {
			control: 'select',
			options: floatingButtonCorners,
		},
		icon: {
			control: 'select',
			options: pdsIconNames,
		},
		position: {
			control: 'inline-radio',
			options: ['absolute', 'fixed'],
		},
		tooltipSide: {
			control: 'select',
			options: ['auto', 'left', 'right', 'top', 'bottom'],
		},
		tooltipPadding: {
			control: 'text',
			description:
				'CSS value for `--pds-floating-button-tooltip-padding`. Empty falls back to default.',
		},
		tooltipFontSize: {
			control: 'text',
			description:
				'CSS value for `--pds-floating-button-tooltip-font-size`. Empty falls back to default.',
		},
		tooltipRadius: {
			control: 'text',
			description:
				'CSS value for `--pds-floating-button-tooltip-radius`. Empty falls back to default.',
		},
		tooltipShadow: {
			control: 'text',
			description:
				'CSS value for `--pds-floating-button-tooltip-shadow`. Empty falls back to default.',
		},
		idlePulse: {
			control: 'boolean',
			description:
				'When on, opts into the built-in breathing-ring idle animation via `--pds-floating-button-idle-animation`.',
		},
	},
} satisfies Meta<FloatingButtonStoryArgs>;

export default meta;

type Story = StoryObj<FloatingButtonStoryArgs>;

function buildCssVarStyle(
	args: FloatingButtonStoryArgs,
): FloatingButtonCssVars {
	return {
		'--pds-floating-button-tooltip-padding': args.tooltipPadding || undefined,
		'--pds-floating-button-tooltip-font-size':
			args.tooltipFontSize || undefined,
		'--pds-floating-button-tooltip-radius': args.tooltipRadius || undefined,
		'--pds-floating-button-tooltip-shadow': args.tooltipShadow || undefined,
		'--pds-floating-button-idle-animation': args.idlePulse
			? 'pds-floating-button-idle-pulse'
			: undefined,
	};
}

function FloatingButtonDemo(args: FloatingButtonStoryArgs) {
	const {
		idlePulse: _idlePulse,
		tooltipFontSize: _tooltipFontSize,
		tooltipPadding: _tooltipPadding,
		tooltipRadius: _tooltipRadius,
		tooltipShadow: _tooltipShadow,
		...floatingButtonProps
	} = args;
	const [corner, setCorner] = useState<FloatingButtonCorner>(
		args.defaultCorner,
	);
	const [clicks, setClicks] = useState(0);

	useEffect(() => {
		setCorner(args.defaultCorner);
	}, [args.defaultCorner]);

	return (
		<main className="pds-story-frame pds-floating-demo-page">
			<SectionHeader
				description="Change the args, drag the button to a corner, wait for idle collapse, then focus or hover it back open. Position absolute keeps the demo contained; fixed shows the production viewport behavior."
				eyebrow="Interactive primitive"
				title="Floating Button"
			/>

			<div className="pds-floating-demo-stage">
				<div className="pds-floating-demo-stage__panel">
					<Badge tone="info">Current corner: {corner}</Badge>
					<Badge tone="success">Clicks: {clicks}</Badge>
					<p>
						This component deliberately stays generic: icon, label, text,
						corner, persistence key, and click handler are props. The consuming
						app decides whether the click opens help, create campaign, export,
						chat, or anything else.
					</p>
					<p>
						Tooltip styling and the optional idle pulse are exposed via CSS vars
						passed through <code>style</code>; flip the knobs in the docs panel
						to see them live.
					</p>
				</div>

				<FloatingButton
					{...floatingButtonProps}
					corner={corner}
					onClick={() => setClicks((count) => count + 1)}
					onCornerChange={setCorner}
					storageKey="pds-story-floating-button-corner"
					style={buildCssVarStyle(args)}
				/>
			</div>
		</main>
	);
}

const defaultArgs: FloatingButtonStoryArgs = {
	bottomLiftInset: 20,
	collapseAfterMs: 4000,
	defaultCorner: 'bottom-right',
	dragDisabled: false,
	edgeInset: 20,
	icon: 'help',
	idlePulse: false,
	label: 'Contact Help',
	liftBottomCorners: true,
	position: 'absolute',
	tooltip: 'Drag me to another corner',
	tooltipFontSize: '',
	tooltipPadding: '',
	tooltipRadius: '',
	tooltipShadow: '',
	tooltipSide: 'auto',
	zIndex: 10,
};

export const Playground: Story = {
	args: defaultArgs,
	render: (args) => <FloatingButtonDemo {...args} />,
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('button', { name: /contact help/i }),
		).toBeVisible();
	},
};

export const QuickCreateAction: Story = {
	args: {
		...defaultArgs,
		defaultCorner: 'bottom-left',
		icon: 'plus',
		label: 'Create Campaign',
		tooltip: 'Start a new campaign',
	},
	render: (args) => <FloatingButtonDemo {...args} />,
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('button', { name: /create campaign/i }),
		).toBeVisible();
	},
};

export const PillTooltipShape: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Override `--pds-floating-button-tooltip-{radius,padding,font-size,shadow}` via inline `style` to give the tooltip a pill shape with bolder type.',
			},
		},
	},
	args: {
		...defaultArgs,
		tooltip: 'Need a hand?',
		tooltipRadius: '999px',
		tooltipPadding: '0.55rem 0.95rem',
		tooltipFontSize: '0.8125rem',
		tooltipShadow: '0 12px 28px -12px rgb(0 0 0 / 0.32)',
	},
	render: (args) => <FloatingButtonDemo {...args} />,
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('button', { name: /contact help/i }),
		).toBeVisible();
	},
};

export const IdlePulse: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Setting `--pds-floating-button-idle-animation: pds-floating-button-idle-pulse` opts into a soft breathing ring while the button is idle. The animation pauses on hover, focus, drag, and snap, and is disabled under `prefers-reduced-motion`.',
			},
		},
	},
	args: {
		...defaultArgs,
		collapseAfterMs: 1500,
		idlePulse: true,
		tooltip: 'Soft breathing ring while idle',
	},
	render: (args) => <FloatingButtonDemo {...args} />,
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole('button', { name: /contact help/i }),
		).toBeVisible();
	},
};
