import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
	Badge,
	Button,
	CampaignCardGrid,
	CampaignListCard,
	CampaignListToolbar,
	CampaignScheduleDialog,
	CampaignStatCard,
	SectionHeader,
	SiteInventoryPanel,
	SupportRequestDialog,
	ThemeSwitcher,
} from '../index';

const meta: Meta = {
	title: 'Campaigns/Workflow Components',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj;

const campaignCards = [
	{
		client: 'No Client',
		dateRange: '9 Jul - 22 Jul 2026',
		duration: '13 days',
		id: 'lario',
		progress: undefined,
		title: 'lario lario',
	},
	{
		client: 'Camissa Asset Management',
		dateRange: '15 Jun - 30 Jun 2026',
		duration: '15 days',
		id: 'camissa-a',
		progress: undefined,
		title: 'Camissa Asset Management - Awareness Flight',
	},
	{
		client: 'Teazy',
		dateRange: '1 Jun - 31 Aug 2026',
		duration: '91 days',
		id: 'teazy',
		progress: undefined,
		title: 'Teazy - Renewal May 2026',
	},
	{
		client: 'Easybet',
		dateRange: '15 May - 23 Aug 2026',
		duration: '100 days',
		id: 'easybet',
		progress: 1,
		title: 'Easybet - Renewal May 2026',
	},
	{
		client: 'SASOL SA',
		dateRange: '15 May - 23 Jun 2026',
		duration: '39 days',
		id: 'sasol',
		progress: 3,
		title: 'SASOL SA - Renewal May 2026',
	},
	{
		client: 'Acme Outdoor Media',
		dateRange: '12 May - 10 Jun 2026',
		duration: '29 days',
		id: 'final-test',
		progress: 14,
		title: 'Lario final test',
	},
];

const inventoryItems = [
	{
		dimensions: '1575mm x 1020mm',
		format: 'Illum ID Lite Sign',
		id: 'AC003',
		location: 'Acornhoek, Acornhoek, Limpopo',
		price: 'R1,500',
		recommended: true,
		title: 'AC003 - Illum ID Lite Sign - Acornhoek',
	},
	{
		dimensions: '1575mm x 1020mm',
		format: 'Illum ID Lite Sign',
		id: 'AC006',
		location: 'Acornhoek, Acornhoek, Limpopo',
		price: 'R1,500',
		recommended: true,
		title: 'AC006 - Illum ID Lite Sign - Acornhoek',
	},
	{
		dimensions: '1575mm x 1020mm',
		format: 'Illum ID Lite Sign',
		id: 'AC007',
		location: 'Acornhoek, Acornhoek, Limpopo',
		price: 'R1,500',
		title: 'AC007 - Illum ID Lite Sign - Acornhoek',
	},
	{
		dimensions: '1575mm x 1020mm',
		format: 'Illum ID Lite Sign',
		id: 'AC008',
		location: 'Acornhoek, Acornhoek, Limpopo',
		price: 'R1,500',
		title: 'AC008 - Illum ID Lite Sign - Acornhoek',
	},
	{
		dimensions: '12m x 3m',
		format: 'Victory Plaza',
		id: 'AD014',
		location: 'University precinct, Gauteng',
		price: 'R101,000.69',
		recommended: true,
		title: 'AD014 - Victory Plaza - University',
	},
];

export const CampaignListWorkbench: Story = {
	parameters: {
		docs: {
			source: {
				code: `import {
  CampaignCardGrid,
  CampaignListCard,
  CampaignListToolbar,
  CampaignStatCard,
} from '@pikaboo/web-design-system';

<CampaignListToolbar value={query} onValueChange={setQuery} />
<CampaignStatCard icon="▣" label="Visible Campaigns" value={200} />
<CampaignCardGrid>
  <CampaignListCard
    canEditLabel="Can edit"
    client="No Client"
    dateRange="9 Jul - 22 Jul 2026"
    duration="13 days"
    onView={() => openCampaign(id)}
    title="lario lario"
  />
</CampaignCardGrid>`,
			},
		},
	},
	render: () => {
		const [query, setQuery] = useState('');
		const [selectedCard, setSelectedCard] = useState('lario');
		const filteredCampaigns = campaignCards.filter((campaign) =>
			[campaign.title, campaign.client]
				.join(' ')
				.toLowerCase()
				.includes(query.toLowerCase()),
		);

		return (
			<main className="pds-story-frame">
				<SectionHeader
					actions={
						<>
							<ThemeSwitcher />
							<Button leftIcon="+">Create Campaign</Button>
						</>
					}
					description="Manage and monitor reusable campaign-card states."
					title="Campaigns"
				/>
				<CampaignListToolbar
					actions={
						<Button aria-label="Reverse sort" size="icon" variant="outline">
							↓
						</Button>
					}
					onValueChange={setQuery}
					value={query}
				/>
				<div className="pds-story-grid pds-story-grid--four">
					<CampaignStatCard icon="▣" label="Visible Campaigns" value="200" />
					<CampaignStatCard
						icon="↗"
						label="Active Now"
						tone="success"
						value="69"
					/>
					<CampaignStatCard
						icon="◎"
						label="Your Planning"
						tone="warning"
						value="0"
					/>
					<CampaignStatCard
						icon="✦"
						label="Your Booked"
						tone="brand"
						value="0"
					/>
				</div>
				<div className="pds-story-row">
					<span>
						Showing <strong>{filteredCampaigns.length}</strong> of{' '}
						{campaignCards.length} campaigns
					</span>
					<div>
						<Badge tone="brand">My Campaigns</Badge>
						<Badge>Shared</Badge>
					</div>
				</div>
				<CampaignCardGrid>
					{filteredCampaigns.map((campaign) => (
						<CampaignListCard
							canEditLabel="Can edit"
							client={campaign.client}
							dateRange={campaign.dateRange}
							duration={campaign.duration}
							key={campaign.id}
							onSelect={() => setSelectedCard(campaign.id)}
							progress={campaign.progress}
							progressLabel={
								campaign.progress === undefined ? undefined : 'In Progress'
							}
							selected={selectedCard === campaign.id}
							status="Planning"
							title={campaign.title}
						/>
					))}
				</CampaignCardGrid>
			</main>
		);
	},
};

export const SupportRequest: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { SupportRequestDialog } from '@pikaboo/web-design-system';

<SupportRequestDialog
  defaultValues={{ name: 'Lario Owner', page: 'Campaigns' }}
  onSubmit={(values) => sendSupportRequest(values)}
/>`,
			},
		},
	},
	render: () => (
		<div style={{ minHeight: '100vh' }}>
			<SupportRequestDialog
				defaultValues={{
					email: 'lario.borges+primedia-owner@example.com',
					name: 'Lario Owner',
					page: 'Campaigns',
				}}
			/>
		</div>
	),
};

export const AddSitesInventory: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { SiteInventoryPanel } from '@pikaboo/web-design-system';

<SiteInventoryPanel
  defaultSelectedIds={['AC003']}
  items={siteItems}
  onBulkAdd={(ids) => addSitesToCampaign(ids)}
  onSelectedIdsChange={setSelectedSiteIds}
/>`,
			},
		},
	},
	render: () => {
		const [selectedIds, setSelectedIds] = useState<string[]>(['AC003']);

		return (
			<main className="pds-story-frame">
				<SectionHeader
					actions={<ThemeSwitcher />}
					description="Reusable add-sites panel with tabs, search, sort actions, selectable rows, and bulk-add callback."
					eyebrow="Location Intel"
					title="Add Sites"
				/>
				<div style={{ maxWidth: 760 }}>
					<SiteInventoryPanel
						items={inventoryItems}
						onSelectedIdsChange={setSelectedIds}
						selectedIds={selectedIds}
					/>
				</div>
			</main>
		);
	},
};

export const ScheduleDialog: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { CampaignScheduleDialog } from '@pikaboo/web-design-system';

<CampaignScheduleDialog
  defaultRange={{ from: new Date(2026, 6, 9), to: new Date(2026, 6, 22) }}
  minRangeDays={14}
  onApply={(range) => updateCampaignSchedule(range)}
/>`,
			},
		},
	},
	render: () => (
		<div style={{ minHeight: '100vh' }}>
			<CampaignScheduleDialog
				defaultRange={{
					from: new Date(2026, 6, 9),
					to: new Date(2026, 6, 22),
				}}
				minRangeDays={14}
			/>
		</div>
	),
};
