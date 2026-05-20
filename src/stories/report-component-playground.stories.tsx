import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import {
	Badge,
	ReportChartLoadingBlock,
	ReportComparisonBlock,
	ReportEntityCard,
	ReportMetricRibbon,
	ReportMetricRibbonLoading,
	ReportMetricTile,
	ReportPlacementTable,
	ReportRankedListBlock,
	ReportTourCallout,
} from '../index';

const meta: Meta = {
	title: 'Reports/Component Playground',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		accent: {
			control: 'select',
			options: ['blue', 'violet', 'magenta', 'cyan', 'green', 'orange', 'red'],
		},
		variant: {
			control: 'select',
			options: ['bars', 'line', 'ranked'],
		},
	},
};

export default meta;

type Story = StoryObj;

export const MetricTile: Story = {
	args: {
		accent: 'cyan',
		label: 'VAC',
		selected: false,
		sublabel: 'Projected delivery',
		value: '48.1M',
	},
	parameters: {
		docs: {
			source: {
				code: `import { ReportMetricTile } from '@pikaboo/t2-design-system';

<ReportMetricTile
  accent="cyan"
  icon="◎"
  id="vac"
  label="VAC"
  onSelect={(id) => setSelectedMetric(id)}
  selected={selectedMetric === 'vac'}
  value="48.1M"
/>`,
			},
		},
	},
	render: (args) => (
		<div style={{ width: 240 }}>
			<ReportMetricTile
				accent="cyan"
				label="VAC"
				value="48.1M"
				{...args}
				icon="◎"
			/>
		</div>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByText('48.1M')).toBeVisible();
		await expect(canvas.getByText('VAC')).toBeVisible();
	},
};

export const MetricRibbonLoading: Story = {
	args: {
		count: 6,
	},
	parameters: {
		docs: {
			source: {
				code: `import { ReportMetricRibbonLoading } from '@pikaboo/t2-design-system';

<ReportMetricRibbonLoading count={6} />`,
			},
		},
		layout: 'fullscreen',
	},
	render: (args) => (
		<div style={{ padding: '2rem' }}>
			<ReportMetricRibbonLoading {...args} />
		</div>
	),
	play: async ({ canvasElement }) => {
		await expect(canvasElement.children.length).toBeGreaterThan(0);
	},
};

export const MetricRibbonInteractive: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportMetricRibbon, ReportMetricTile } from '@pikaboo/t2-design-system';

<ReportMetricRibbon highlighted tourAnchor="bottom">
  <ReportMetricTile id="reach" label="Reach" onSelect={setSelectedMetric} selected={selectedMetric === 'reach'} value="3.3M" />
  <ReportMetricTile id="vac" label="VAC" onSelect={setSelectedMetric} selected={selectedMetric === 'vac'} value="48.1M" />
</ReportMetricRibbon>`,
			},
		},
		layout: 'fullscreen',
	},
	render: () => {
		const [selectedMetric, setSelectedMetric] = useState('reach');

		return (
			<div style={{ padding: '2rem' }}>
				<ReportMetricRibbon highlighted tourAnchor="bottom">
					<ReportMetricTile
						accent="violet"
						id="reach"
						label="Reach"
						onSelect={(id) => id && setSelectedMetric(id)}
						selected={selectedMetric === 'reach'}
						value="3.3M"
					/>
					<ReportMetricTile
						accent="cyan"
						id="vac"
						label="VAC"
						onSelect={(id) => id && setSelectedMetric(id)}
						selected={selectedMetric === 'vac'}
						value="48.1M"
					/>
					<ReportMetricTile
						accent="green"
						id="frequency"
						label="Avg. frequency"
						onSelect={(id) => id && setSelectedMetric(id)}
						selected={selectedMetric === 'frequency'}
						value="14.70"
					/>
				</ReportMetricRibbon>
			</div>
		);
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Reach')).toBeVisible();
		await expect(canvas.getByText('48.1M')).toBeVisible();
	},
};

export const ChartLoadingBlock: Story = {
	args: {
		rows: 6,
		title: 'Reach',
		variant: 'bars',
	},
	parameters: {
		docs: {
			source: {
				code: `import { ReportChartLoadingBlock } from '@pikaboo/t2-design-system';

<ReportChartLoadingBlock title="Reach" variant="bars" rows={6} />`,
			},
		},
	},
	render: (args) => (
		<div style={{ width: 520 }}>
			<ReportChartLoadingBlock title="Reach" {...args} />
		</div>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Reach')).toBeVisible();
	},
};

export const RankedListBlock: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportRankedListBlock } from '@pikaboo/t2-design-system';

<ReportRankedListBlock
  items={items}
  onItemSelect={(item) => setSelectedItemId(item.id)}
  selectedItemId={selectedItemId}
  title="Reach"
/>`,
			},
		},
	},
	render: () => {
		const [selectedItemId, setSelectedItemId] = useState('spec-607');

		return (
			<div style={{ width: 520 }}>
				<ReportRankedListBlock
					items={[
						{
							id: 'spec-607',
							label: 'SPEC/607/1',
							value: 254_170,
							valueLabel: '254,170.80',
						},
						{
							id: 'spec-112',
							label: 'SPEC/112/1',
							value: 206_533,
							valueLabel: '206,533.68',
						},
						{
							id: 'rtv-029',
							label: 'RTV029 - Cape Town Upper Deck',
							tone: 'risk',
							value: 193_045,
							valueLabel: '193,045.75',
						},
					]}
					onItemSelect={(item) => setSelectedItemId(item.id)}
					selectedItemId={selectedItemId}
					title="Reach"
				/>
			</div>
		);
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText('SPEC/607/1')).toBeVisible();
	},
};

export const EntityCard: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportEntityCard } from '@pikaboo/t2-design-system';

<ReportEntityCard
  id="mazda"
  meta={[
    { label: 'Flight', value: 'May 4, 2026 - Jul 19, 2026' },
    { label: 'Sites', value: '4 · 48 orders' },
  ]}
  onSelect={setSelectedEntity}
  selected={selectedEntity === 'mazda'}
  status="Expired"
  title="Mazda"
/>`,
			},
		},
	},
	render: () => {
		const [selectedEntity, setSelectedEntity] = useState('mazda');

		return (
			<div style={{ width: 420 }}>
				<ReportEntityCard
					description="For Mazda Motor Corporation · MAZ001"
					id="mazda"
					meta={[
						{ label: 'Flight', value: 'May 4, 2026 - Jul 19, 2026' },
						{ label: 'Sites', value: '4 · 48 orders' },
						{ label: 'Media', value: 'Digital Urban Network' },
					]}
					onSelect={setSelectedEntity}
					score="100% likely to renew"
					selected={selectedEntity === 'mazda'}
					status="Expired"
					title="Mazda"
				/>
			</div>
		);
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Mazda')).toBeVisible();
		await expect(canvas.getByText('100% likely to renew')).toBeVisible();
	},
};

export const ComparisonBlock: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportComparisonBlock } from '@pikaboo/t2-design-system';

<ReportComparisonBlock
  left={{ id: 'scenario-a', label: 'Scenario A' }}
  right={{ id: 'scenario-b', label: 'Scenario B' }}
  metrics={[
    { label: 'Reach', leftValue: 84, rightValue: 72, unit: '%' },
    { label: 'Frequency', leftValue: 61, rightValue: 79, unit: '%' },
  ]}
/>`,
			},
		},
	},
	render: () => (
		<div style={{ width: 560 }}>
			<ReportComparisonBlock
				left={{
					description: 'Premium CBD and airport coverage',
					id: 'scenario-a',
					label: 'Scenario A',
					meta: 'Higher reach',
				}}
				metrics={[
					{ label: 'Reach', leftValue: 84, rightValue: 72, unit: '%' },
					{
						label: 'CPT',
						leftValue: 46,
						rightValue: 52,
						unit: ' index',
						winner: 'left',
					},
					{ label: 'Frequency', leftValue: 61, rightValue: 79, unit: '%' },
				]}
				right={{
					description: 'Retail-heavy renewal route',
					id: 'scenario-b',
					label: 'Scenario B',
					meta: 'Higher frequency',
				}}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Scenario A')).toBeVisible();
		await expect(canvas.getByText('Scenario B')).toBeVisible();
	},
};

export const PlacementTable: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportPlacementTable } from '@pikaboo/t2-design-system';

<ReportPlacementTable
  rows={rows}
  selectedRowId={selectedPlacementId}
  onRowSelect={(row) => setSelectedPlacementId(row.id)}
/>`,
			},
		},
		layout: 'fullscreen',
	},
	render: () => {
		const [selectedRowId, setSelectedRowId] = useState('spec-607');

		return (
			<div style={{ padding: '2rem' }}>
				<ReportPlacementTable
					onRowSelect={(row) => row.id && setSelectedRowId(row.id)}
					rows={[
						{
							code: 'SPEC/607/1',
							format: 'Spectacular',
							id: 'spec-607',
							name: 'Pretoria Central Gantry',
							pacing: 1.18,
							region: 'Gauteng',
							status: <Badge tone="success">Over</Badge>,
							value: '254k',
						},
						{
							code: 'RTV029',
							format: 'Digital freeway',
							id: 'rtv-029',
							name: 'Cape Town Upper Deck',
							pacing: 0.92,
							region: 'Western Cape',
							status: <Badge tone="warning">Watch</Badge>,
							value: '193k',
						},
					]}
					selectedRowId={selectedRowId}
				/>
			</div>
		);
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Pretoria Central Gantry')).toBeVisible();
	},
};

export const TourCallout: Story = {
	parameters: {
		docs: {
			source: {
				code: `import { ReportTourCallout } from '@pikaboo/t2-design-system';

<ReportTourCallout
  steps={[
    { id: 'metrics', title: 'Performance metrics at a glance', body: '...' },
    { id: 'rankings', title: 'Drill into evidence', body: '...' },
  ]}
/>`,
			},
		},
	},
	render: () => (
		<ReportTourCallout
			steps={[
				{
					body: 'Total population, reach, frequency, CPT, and GRP summarize how the recommended set performs against your goals.',
					id: 'metrics',
					title: 'Performance metrics at a glance',
				},
				{
					body: 'Use the ranking blocks to identify which sites are driving each metric.',
					id: 'rankings',
					title: 'Drill into evidence',
				},
			]}
		/>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByText('Performance metrics at a glance'),
		).toBeVisible();
	},
};
