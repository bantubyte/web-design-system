import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import {
	Button,
	Calendar,
	Field,
	GuidedWizardPanel,
	GuidedWizardShell,
	GuidedWizardStatusBar,
	GuidedWizardStepper,
	GuidedWizardToast,
	Input,
	Select,
	Switch,
	useTheme,
} from '../index';

const meta = {
	title: 'Components/Guided Wizard',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type WizardStepId = 'name' | 'dates' | 'locations';

const steps = [
	{ label: 'Name', value: 'name' },
	{ label: 'Dates', value: 'dates' },
	{ label: 'Locations', value: 'locations' },
] as const;

export const QuickSetup: Story = {
	parameters: {
		docs: {
			source: {
				code: `import {
  Calendar,
  GuidedWizardPanel,
  GuidedWizardShell,
  GuidedWizardStatusBar,
  GuidedWizardStepper,
} from '@pikaboo/t2-design-system';

<GuidedWizardShell title={campaignName} backAction={{ children: 'Back' }}>
  <GuidedWizardStepper steps={steps} activeStep={activeStep} onStepChange={setActiveStep} />
  <GuidedWizardPanel title="Campaign Dates" required>
    <Calendar defaultSelectedDate={startDate} onSelectDate={setStartDate} />
  </GuidedWizardPanel>
</GuidedWizardShell>`,
			},
		},
	},
	render: () => {
		const { theme } = useTheme();
		const [activeStep, setActiveStep] = useState<WizardStepId>('dates');
		const [campaignName, setCampaignName] = useState('efa');
		const [client, setClient] = useState('none');
		const [briefEnabled, setBriefEnabled] = useState(false);
		const [startDate, setStartDate] = useState(new Date(2026, 3, 29));
		const [toastOpen, setToastOpen] = useState(true);

		const missing = useMemo(() => {
			const items = [];
			if (!campaignName.trim()) items.push('Name');
			if (activeStep !== 'locations') items.push('Locations');
			return items;
		}, [activeStep, campaignName]);

		return (
			<main
				style={{
					minHeight: '100vh',
					padding: '2rem',
					background:
						'linear-gradient(180deg, var(--theme-page-bg), var(--theme-bg-muted))',
				}}
			>
				<div className="pds-story-grid pds-story-grid--two">
					{Array.from({ length: 8 }, (_, index) => (
						<div
							key={index}
							style={{
								minHeight: 140,
								padding: '1rem',
								background: 'var(--theme-surface)',
								border: '1px solid var(--theme-border)',
								borderTop: '4px solid var(--theme-warning)',
								borderRadius: 'var(--radius)',
								boxShadow: 'var(--theme-shadow-sm)',
							}}
						>
							<strong>Campaign card</strong>
							<p style={{ color: 'var(--theme-foreground-muted)' }}>
								Background content under wizard overlay.
							</p>
						</div>
					))}
				</div>

				<GuidedWizardShell
					backAction={{
						children: activeStep === 'name' ? 'Cancel' : 'Back',
						onClick: () => {
							if (activeStep === 'locations') setActiveStep('dates');
							if (activeStep === 'dates') setActiveStep('name');
						},
					}}
					icon="✦"
					title={campaignName || `New ${theme.copy.productName} campaign`}
				>
					<GuidedWizardStepper
						activeStep={activeStep}
						onStepChange={setActiveStep}
						steps={steps}
					/>

					{activeStep === 'name' ? (
						<GuidedWizardPanel icon="✦" required title="Campaign name">
							<Field label="Campaign Name">
								<Input
									onChange={(event) => setCampaignName(event.target.value)}
									placeholder="Name your campaign..."
									value={campaignName}
								/>
							</Field>
							<Field label="Client">
								<Select
									onChange={(event) => setClient(event.target.value)}
									value={client}
								>
									<option value="none">No Client</option>
									<option value="mazda">Mazda</option>
									<option value="netcare">Netcare</option>
								</Select>
							</Field>
							<Switch
								checked={briefEnabled}
								label="Add brief"
								onChange={(event) => setBriefEnabled(event.target.checked)}
							/>
						</GuidedWizardPanel>
					) : null}

					{activeStep === 'dates' ? (
						<GuidedWizardPanel
							description="Start and end dates for your campaign"
							icon="▣"
							required
							title="Campaign Dates"
							tone="highlight"
						>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
								<span style={{ color: 'var(--theme-foreground-muted)' }}>
									Quick:
								</span>
								<Button size="sm" variant="outline">
									30 days
								</Button>
								<Button size="sm" variant="outline">
									60 days
								</Button>
								<Button size="sm" variant="outline">
									90 days
								</Button>
							</div>
							<Calendar
								defaultMonth={new Date(2026, 4, 1)}
								onSelectDate={setStartDate}
								selectedDate={startDate}
							/>
							<Field label="Selected start date">
								<Input
									readOnly
									value={new Intl.DateTimeFormat('en', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									}).format(startDate)}
								/>
							</Field>
							<p style={{ color: 'var(--theme-primary)', margin: 0 }}>
								Select an end date (14 day minimum)
							</p>
						</GuidedWizardPanel>
					) : null}

					{activeStep === 'locations' ? (
						<GuidedWizardPanel icon="⌖" required title="Target Locations">
							<Field label="Location">
								<Input placeholder="Search locations..." />
							</Field>
						</GuidedWizardPanel>
					) : null}

					<Button
						fullWidth
						onClick={() => {
							if (activeStep === 'name') setActiveStep('dates');
							if (activeStep === 'dates') setActiveStep('locations');
						}}
						size="lg"
					>
						{activeStep === 'locations'
							? 'Finish'
							: `Next: ${activeStep === 'name' ? 'Campaign Dates' : 'Target Locations'} →`}
					</Button>
				</GuidedWizardShell>

				<GuidedWizardStatusBar
					action={
						<Button disabled={missing.length > 0} size="sm">
							Generate Campaign
						</Button>
					}
					message={
						missing.length > 0
							? `Missing: ${missing.join(', ')}`
							: 'Ready to generate'
					}
					tone={missing.length > 0 ? 'warning' : 'success'}
				/>

				{toastOpen ? (
					<GuidedWizardToast
						message={`Nice — you've seen how ${theme.copy.productName} builds a campaign.`}
						onDismiss={() => setToastOpen(false)}
						replayAction={<button type="button">Replay</button>}
					/>
				) : null}
			</main>
		);
	},
};
