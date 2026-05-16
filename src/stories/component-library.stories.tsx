import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import {
	Accordion,
	ActionBar,
	Alert,
	AudienceCard,
	AvatarGroup,
	Badge,
	BrandLockup,
	Breadcrumbs,
	Button,
	Calendar,
	CampaignSummaryCard,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ChartCard,
	CommandMenu,
	DataTable,
	DateRangePicker,
	Divider,
	DropdownItem,
	DropdownMenu,
	DropdownSeparator,
	EmptyAction,
	EmptyState,
	Field,
	FileDropzone,
	FilterChip,
	IconButton,
	Input,
	InsightCard,
	KeyValueList,
	LoadingState,
	MetricCard,
	PageShell,
	Pagination,
	PlacementCard,
	Popover,
	Progress,
	RadioCardGroup,
	RemovableBadge,
	SearchableSelector,
	SectionHeader,
	SegmentedControl,
	Select,
	SelectionBadge,
	SelectorGroup,
	SelectorOption,
	Skeleton,
	Slider,
	StatGrid,
	Surface,
	Switch,
	Tab,
	TabList,
	Tabs,
	Textarea,
	Timeline,
	Toolbar,
	Tooltip,
} from '../components';
import { ThemeProvider, ThemeSwitcher, useTheme } from '../theme';

const meta = {
	title: 'Components/Library',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function WorkspaceFrame({ children }: { children: ReactNode }) {
	const { theme } = useTheme();

	return (
		<PageShell
			aside={
				<div className="pds-story-stack">
					<BrandLockup />
					<TabList ariaLabel="Main sections">
						<Tab selected>Campaigns</Tab>
						<Tab>Insights</Tab>
						<Tab>Renewals</Tab>
					</TabList>
				</div>
			}
			header={
				<SectionHeader
					actions={<ThemeSwitcher />}
					description={`${theme.copy.productName} components tuned for campaign planning, reporting, and tenant-specific product copy.`}
					eyebrow={theme.copy.tenantName}
					title="Design system workspace"
				/>
			}
		>
			{children}
		</PageShell>
	);
}

export const Foundations: Story = {
	render: () => {
		const { theme } = useTheme();

		return (
			<main className="pds-story-frame">
				<SectionHeader
					actions={<ThemeSwitcher />}
					description="Tenant tokens, product copy, brand lockups, buttons, badges, and surface tones."
					eyebrow={theme.copy.tenantName}
					title={theme.copy.productName}
				/>

				<div className="pds-story-grid">
					<Surface>
						<BrandLockup />
						<p className="pds-story-copy">{theme.description}</p>
					</Surface>
					<Surface tone="brand">
						<h3 style={{ marginTop: 0 }}>{theme.copy.reportTitle}</h3>
						<p style={{ marginBottom: 0 }}>{theme.copy.poweredByLabel}</p>
					</Surface>
					<Surface tone="muted">
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
							<Badge tone="brand">Brand</Badge>
							<Badge tone="accent">Accent</Badge>
							<Badge tone="success">Ready</Badge>
							<Badge tone="warning">Review</Badge>
							<Badge tone="danger">Blocked</Badge>
							<Badge tone="info">Insight</Badge>
						</div>
					</Surface>
				</div>

				<div className="pds-story-grid">
					{(
						['primary', 'secondary', 'outline', 'ghost', 'danger'] as const
					).map((variant) => (
						<Button key={variant} variant={variant}>
							{variant}
						</Button>
					))}
				</div>
			</main>
		);
	},
};

export const FormsAndControls: Story = {
	render: () => {
		const [mode, setMode] = useState('recommended');
		const [objective, setObjective] = useState('awareness');
		const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
			'gauteng',
			'western-cape',
		]);
		const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 12));
		const [budget, setBudget] = useState(1_200_000);
		const [command, setCommand] = useState('create');

		return (
			<main className="pds-story-frame">
				<SectionHeader
					actions={<ThemeSwitcher />}
					description="Inputs, selectors, switches, filters, tabs, and status controls for dense product screens."
					eyebrow="Controls"
					title="Form System"
				/>

				<div className="pds-story-grid">
					<Card>
						<CardHeader>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '0.75rem',
								}}
							>
								<CardTitle>Old Native Controls</CardTitle>
								<Badge size="sm" tone="warning">
									Old
								</Badge>
							</div>
							<CardDescription>
								Kept for simple forms and backwards compatibility.
							</CardDescription>
						</CardHeader>
						<CardContent className="pds-story-stack">
							<Field hint="Visible in reporting views" label="Campaign name">
								<Input placeholder="Summer mall reach" />
							</Field>
							<Field label="Objective">
								<Select defaultValue="awareness">
									<option value="awareness">Awareness</option>
									<option value="conversion">Conversion</option>
									<option value="retention">Retention</option>
								</Select>
							</Field>
							<Field label="Notes">
								<Textarea placeholder="Audience, regions, exclusions" />
							</Field>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '0.75rem',
								}}
							>
								<CardTitle>Suggested Selectors</CardTitle>
								<Badge size="sm" tone="success">
									Suggested
								</Badge>
							</div>
							<CardDescription>
								Use these for tenant-aware campaign planning flows.
							</CardDescription>
						</CardHeader>
						<CardContent className="pds-story-stack">
							<DropdownMenu label="Objective">
								<DropdownItem
									description="Brand reach and top-of-funnel lift"
									selected
								>
									Awareness
								</DropdownItem>
								<DropdownItem description="Drive qualified audiences into store">
									Conversion
								</DropdownItem>
								<DropdownSeparator />
								<DropdownItem description="Bring known customers back">
									Retention
								</DropdownItem>
							</DropdownMenu>
							<Popover label="More filters" panelLabel="Campaign filter panel">
								<SearchableSelector
									mode="multiple"
									onValueChange={(nextValues) =>
										setSelectedMarkets(nextValues as string[])
									}
									options={[
										{
											description: 'Johannesburg and Pretoria priority sites',
											label: 'Gauteng',
											meta: '12',
											value: 'gauteng',
										},
										{
											description: 'Cape Town and surrounding corridor',
											label: 'Western Cape',
											meta: '8',
											value: 'western-cape',
										},
										{
											description: 'Durban retail and commuter routes',
											label: 'KwaZulu-Natal',
											meta: '5',
											value: 'kzn',
										},
									]}
									placeholder="Search markets"
									selectedValues={selectedMarkets}
								/>
							</Popover>
							<SegmentedControl
								onChange={setMode}
								options={[
									{ label: 'Recommended', value: 'recommended' },
									{ label: 'Manual', value: 'manual' },
									{ label: 'Saved', value: 'saved' },
								]}
								value={mode}
							/>
							<RadioCardGroup
								columns={2}
								label="Campaign objective"
								onValueChange={setObjective}
								options={[
									{
										description: 'Maximise reach and upper-funnel lift.',
										icon: '◎',
										label: 'Awareness',
										meta: 'Suggested',
										value: 'awareness',
									},
									{
										description:
											'Optimise towards visits and conversion intent.',
										icon: '↗',
										label: 'Conversion',
										value: 'conversion',
									},
								]}
								value={objective}
							/>
							<Slider
								formatValue={(value) =>
									new Intl.NumberFormat('en-ZA', {
										currency: 'ZAR',
										maximumFractionDigits: 0,
										style: 'currency',
									}).format(value)
								}
								label="Budget"
								max={2_500_000}
								min={100_000}
								onValueChange={setBudget}
								step={50_000}
								value={budget}
							/>
							<Switch defaultChecked label="Use premium audience model" />
							<SelectorGroup columns={1}>
								<SelectorOption
									description="Best for repeated dashboard workflows and campaign setup."
									meta="Recommended for new work"
									selected
									status="Suggested"
									statusTone="success"
									title="Guided selector"
								/>
								<SelectorOption
									description="Fast, compact fallback when the choice is not strategic."
									status="Basic"
									title="Native select"
								/>
							</SelectorGroup>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
								<FilterChip active count={12}>
									Gauteng
								</FilterChip>
								<FilterChip count={4}>Retail</FilterChip>
								<FilterChip>Digital</FilterChip>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
								}}
							>
								<AvatarGroup
									people={[
										{ alt: 'Asha Naidoo', initials: 'AN' },
										{ alt: 'Thabo Mokoena', initials: 'TM' },
										{ alt: 'Leila Jacobs', initials: 'LJ' },
										{ alt: 'Chris Smith', initials: 'CS' },
										{ alt: 'Nandi Dlamini', initials: 'ND' },
									]}
									size="sm"
								/>
								<Tooltip content="Collaborators with access to this campaign">
									<IconButton
										icon="i"
										label="Collaborator info"
										variant="outline"
									/>
								</Tooltip>
							</div>
							<Tabs
								ariaLabel="Suggested tabbed view"
								items={[
									{
										badge: '8',
										label: 'Sites',
										panel: (
											<p style={{ margin: 0 }}>
												Selected placements and availability checks.
											</p>
										),
										value: 'sites',
									},
									{
										label: 'Audience',
										panel: (
											<p style={{ margin: 0 }}>
												Audience fit, demographics, and source weighting.
											</p>
										),
										value: 'audience',
									},
									{
										label: 'Budget',
										panel: (
											<p style={{ margin: 0 }}>
												Spend allocation and budget limit controls.
											</p>
										),
										value: 'budget',
									},
								]}
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '0.75rem',
								}}
							>
								<CardTitle>Calendar and States</CardTitle>
								<Badge size="sm" tone="success">
									Suggested
								</Badge>
							</div>
							<CardDescription>
								Date selection, loading, progress, and empty results.
							</CardDescription>
						</CardHeader>
						<CardContent className="pds-story-stack">
							<DateRangePicker
								defaultRange={{
									from: new Date(2026, 5, 3),
									to: new Date(2026, 5, 30),
								}}
								label="Suggested date range"
								minRangeDays={14}
							/>
							<Calendar
								month={new Date(2026, 5, 1)}
								onSelectDate={setSelectedDate}
								selectedDate={selectedDate}
							/>
							<LoadingState label="Calculating reach" />
							<Progress label="Brief completeness" value={72} />
							<Skeleton height={44} />
							<EmptyState
								action={<EmptyAction>Create campaign</EmptyAction>}
								description="Saved campaigns will appear once filters match available records."
								title="No campaigns yet"
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '0.75rem',
								}}
							>
								<CardTitle>Reusable App Primitives</CardTitle>
								<Badge size="sm" tone="success">
									Suggested
								</Badge>
							</div>
							<CardDescription>
								Command search, removable badges, disclosure, and file intake.
							</CardDescription>
						</CardHeader>
						<CardContent className="pds-story-stack">
							<CommandMenu
								items={[
									{
										description: 'Start from a new campaign brief.',
										group: 'Campaigns',
										label: 'Create campaign',
										shortcut: 'C',
										value: 'create',
									},
									{
										description: 'Open saved dashboard filters.',
										group: 'Campaigns',
										label: 'Open saved view',
										shortcut: 'O',
										value: 'open',
									},
									{
										description: 'Export the current media plan.',
										group: 'Reports',
										label: 'Export brief',
										shortcut: 'E',
										value: 'export',
									},
								]}
								onSelect={setCommand}
								selectedValue={command}
							/>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
								<RemovableBadge label="Gauteng" tone="brand" truncate />
								<RemovableBadge label="Retail commuters" suffix="audience" />
								<SelectionBadge
									items={['Sandton City', 'Gateway', 'N1 Digital']}
								/>
							</div>
							<Accordion
								defaultOpenItems={['measurement']}
								items={[
									{
										content:
											'Road 2.0 and enhanced mobility inputs should stay visible as source-aware choices.',
										id: 'measurement',
										title: 'Measurement source rules',
									},
									{
										content:
											'Use tenant tokens for brand color and product-name copy.',
										id: 'theme',
										title: 'Theme behaviour',
									},
								]}
							/>
							<FileDropzone
								accept=".csv,.xlsx"
								description="Upload a CSV or spreadsheet for bulk site import."
								maxSizeMb={5}
								title="Bulk placement import"
							/>
						</CardContent>
					</Card>
				</div>
			</main>
		);
	},
};

export const CampaignWorkspace: Story = {
	render: () => (
		<WorkspaceFrame>
			<div className="pds-story-stack">
				<Breadcrumbs
					items={[
						{ href: '#', label: 'Campaigns' },
						{ href: '#', label: 'Planning' },
						{ current: true, label: 'High street awareness' },
					]}
				/>
				<Toolbar>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
						<FilterChip active count={8}>
							Live
						</FilterChip>
						<FilterChip count={3}>Draft</FilterChip>
						<FilterChip>Archived</FilterChip>
					</div>
					<Button>Create campaign</Button>
				</Toolbar>

				<StatGrid columns={4}>
					<MetricCard
						change="+12%"
						label="Reach"
						status="success"
						value="2.4M"
					/>
					<MetricCard
						change="83%"
						label="Audience fit"
						status="brand"
						value="High"
					/>
					<MetricCard change="-3%" label="CPM" status="warning" value="R42" />
					<MetricCard
						change="24"
						label="Placements"
						status="info"
						value="186"
					/>
				</StatGrid>

				<div className="pds-story-grid">
					<CampaignSummaryCard
						budget="R1.2m"
						client="Retail banking launch"
						flightDates="Jun 3 - Jul 14"
						metrics={[
							{ label: 'Sites', value: 186 },
							{ label: 'Regions', value: 7 },
							{ label: 'Formats', value: 4 },
						]}
						status="Planning"
						title="High street awareness"
					/>
					<AudienceCard
						segments={[
							{ label: 'Commuters', tone: 'brand', value: 86 },
							{ label: 'Retail intent', tone: 'success', value: 74 },
							{ label: 'Affluent suburbs', tone: 'info', value: 68 },
						]}
					/>
					<InsightCard
						confidence="High confidence"
						evidence={[
							'Weekend mall traffic is strongest in the northern corridor.',
							'Digital roadside formats lift frequency during commuter peaks.',
						]}
						title="AI placement insight"
					>
						<p>
							Shift ten percent of the plan from static roadside into digital
							mall formats to improve late-week frequency.
						</p>
					</InsightCard>
				</div>

				<div className="pds-story-grid">
					<PlacementCard
						attributes={['Digital', 'Mall', 'Premium']}
						location="Sandton City"
						meta="Est. 420k weekly impressions"
						title="Atrium network"
					/>
					<ChartCard
						data={[
							{ label: 'Malls', value: 42 },
							{ label: 'Roadside', value: 31 },
							{ label: 'Transit', value: 18 },
							{ label: 'Retail', value: 9 },
						]}
						description="Recommended channel allocation"
						title="Channel mix"
					/>
					<Alert
						action={
							<Button size="sm" variant="outline">
								Review
							</Button>
						}
						icon="!"
						title="Budget variance"
						tone="warning"
					>
						<p>
							The recommended plan is four percent above the working budget.
						</p>
					</Alert>
				</div>

				<div className="pds-story-grid">
					<Card>
						<CardHeader>
							<CardTitle>Plan Metadata</CardTitle>
							<CardDescription>
								Dense details without turning every row into a card.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<KeyValueList
								items={[
									{ label: 'Owner', value: 'Primedia Outdoor' },
									{ label: 'Market', value: 'South Africa' },
									{ label: 'Currency', value: 'ZAR' },
									{ label: 'Attribution', value: 'OOH reach model' },
								]}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Workflow</CardTitle>
							<CardDescription>
								Campaign status, implementation, and review flow.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Timeline
								items={[
									{
										description: 'Brief and audience assumptions are captured.',
										label: 'Done',
										state: 'complete',
										title: 'Brief',
									},
									{
										description:
											'Recommendations are being shaped into a media plan.',
										label: 'Now',
										state: 'current',
										title: 'Planning',
									},
									{
										description: 'Export and share with client stakeholders.',
										label: 'Next',
										state: 'upcoming',
										title: 'Review',
									},
								]}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Inline Utilities</CardTitle>
							<CardDescription>
								Small pieces for dense enterprise screens.
							</CardDescription>
						</CardHeader>
						<CardContent className="pds-story-stack">
							<Tooltip content="Use when an icon button is not self-explanatory">
								<IconButton icon="?" label="Help" variant="outline" />
							</Tooltip>
							<Divider />
							<p style={{ color: 'var(--theme-foreground-muted)', margin: 0 }}>
								Metadata, helper actions, and low-noise separators keep
								operational screens readable.
							</p>
						</CardContent>
					</Card>
				</div>

				<DataTable
					columns={[
						{ header: 'Placement', key: 'placement' },
						{ header: 'Region', key: 'region' },
						{ align: 'right', header: 'Reach', key: 'reach' },
						{
							header: 'Status',
							key: 'status',
							render: (row) => (
								<Badge tone="success">{String(row.status)}</Badge>
							),
						},
					]}
					rows={[
						{
							placement: 'Sandton City Atrium',
							reach: '420k',
							region: 'Gauteng',
							status: 'Ready',
						},
						{
							placement: 'N1 Digital Roadside',
							reach: '310k',
							region: 'Western Cape',
							status: 'Ready',
						},
						{
							placement: 'Gateway Retail Loop',
							reach: '280k',
							region: 'KwaZulu-Natal',
							status: 'Ready',
						},
					]}
				/>

				<Pagination page={1} pageCount={8} />

				<ActionBar
					primaryAction={{ children: 'Save plan' }}
					secondaryAction={{ children: 'Export brief' }}
					supportingText="Autosaved moments ago"
				/>
			</div>
		</WorkspaceFrame>
	),
};

function ThemeMatrixPanel({ themeId }: { themeId: 'pikaboo' | 'primedia' }) {
	return (
		<ThemeProvider theme={themeId}>
			<div className="pds-story-stack">
				<SectionHeader
					actions={
						<Badge tone={themeId === 'primedia' ? 'info' : 'brand'}>
							{themeId}
						</Badge>
					}
					description="Every surface below should change color, copy, and emphasis from the active tenant theme."
					eyebrow="Theme matrix"
					title={themeId === 'primedia' ? 'Cortexx' : 'PIKABOO'}
				/>
				<BrandLockup />
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
					<Button>Create campaign</Button>
					<Button variant="outline">Export</Button>
					<Button variant="ghost">Preview</Button>
				</div>
				<DropdownMenu label="Objective">
					<DropdownItem selected>Awareness</DropdownItem>
					<DropdownItem>Conversion</DropdownItem>
				</DropdownMenu>
				<SelectorGroup columns={1}>
					<SelectorOption
						description="Suggested selector implementation."
						selected
						status="Suggested"
						statusTone="success"
						title="Campaign objective"
					/>
				</SelectorGroup>
				<SearchableSelector
					options={[
						{ label: 'Retail commuters', value: 'retail' },
						{ label: 'Affluent suburbs', value: 'affluent' },
						{ label: 'Mall visitors', value: 'mall' },
					]}
					value="retail"
				/>
				<Calendar
					month={new Date(2026, 5, 1)}
					selectedDate={new Date(2026, 5, 12)}
				/>
				<DateRangePicker
					defaultRange={{
						from: new Date(2026, 5, 3),
						to: new Date(2026, 5, 30),
					}}
					label="Campaign dates"
					numberOfMonths={1}
				/>
				<Tabs
					items={[
						{
							label: 'Plan',
							panel: <p>Theme-aware plan controls.</p>,
							value: 'plan',
						},
						{
							label: 'Report',
							panel: <p>Tenant copy and report surfaces.</p>,
							value: 'report',
						},
					]}
				/>
				<StatGrid columns={2}>
					<MetricCard
						change="+8%"
						label="Reach"
						status="success"
						value="1.8M"
					/>
					<MetricCard change="72%" label="Fit" status="brand" value="High" />
				</StatGrid>
				<Alert icon="i" title="Theme check" tone="info">
					<p>
						Dropdowns, selectors, calendar, feedback, metrics, and buttons are
						token-driven here.
					</p>
				</Alert>
			</div>
		</ThemeProvider>
	);
}

export const ThemeSwitchingMatrix: Story = {
	render: () => (
		<main className="pds-story-frame">
			<div className="pds-story-grid pds-story-grid--two">
				<ThemeMatrixPanel themeId="pikaboo" />
				<ThemeMatrixPanel themeId="primedia" />
			</div>
		</main>
	),
};
