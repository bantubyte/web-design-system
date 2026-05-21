import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import type { AuthAccessState } from '../auth-core';
import type { ReportRankedListItem } from '../report-core';
import type { RawJsxNode } from '../report-jsx';
import AuthAccessScreen from './AuthAccessScreen.svelte';
import AuthLoginScreen from './AuthLoginScreen.svelte';
import AuthSignUpScreen from './AuthSignUpScreen.svelte';
import ReportComparisonBlock from './ReportComparisonBlock.svelte';
import ReportEvidenceList from './ReportEvidenceList.svelte';
import ReportMetricTile from './ReportMetricTile.svelte';
import ReportPageLoadingState from './ReportPageLoadingState.svelte';
import ReportPlacementTable from './ReportPlacementTable.svelte';
import ReportRankedListBlock from './ReportRankedListBlock.svelte';
import ReportTourCallout from './ReportTourCallout.svelte';

type SvelteComponent<TProps extends Record<string, unknown>> = Parameters<
	typeof mount<TProps, Record<string, unknown>>
>[0];

function withMount<TProps extends Record<string, unknown>>(
	Component: SvelteComponent<TProps>,
	props: TProps,
	assertions: (container: HTMLElement) => void,
) {
	const target = document.createElement('div');
	document.body.appendChild(target);
	const instance = mount(Component, { target, props });
	flushSync();
	try {
		assertions(target);
	} finally {
		unmount(instance);
		target.remove();
	}
}

afterEach(() => {
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
});

describe('svelte/auth components', () => {
	it('renders the access screen in login mode with the supplied product name', () => {
		withMount(
			AuthAccessScreen,
			{ mode: 'login', productName: 'Cortexx' },
			(container) => {
				expect(container.textContent).toContain('Log in to Cortexx');
				expect(container.textContent).toContain('Log in with Google');
				expect(container.textContent).toContain('Need an account?');
			},
		);
	});

	it('AuthLoginScreen forces login mode regardless of consumer input', () => {
		withMount(AuthLoginScreen, { productName: 'Cortexx' }, (container) => {
			expect(container.textContent).toContain('Log in to Cortexx');
			expect(container.textContent).not.toContain('Sign up for Cortexx');
		});
	});

	it('AuthSignUpScreen forces signup mode and submits the typed email', () => {
		let captured = '';
		withMount(
			AuthSignUpScreen,
			{
				productName: 'Cortexx',
				onSubmit({ email }: AuthAccessState) {
					captured = email;
				},
			},
			(container) => {
				expect(container.textContent).toContain('Sign up for Cortexx');
				const form = container.querySelector('form');
				const input = container.querySelector<HTMLInputElement>(
					'input[name="email"]',
				);
				if (!form || !input) {
					throw new Error('signup form did not render');
				}
				input.value = 'lead@example.com';
				form.dispatchEvent(
					new SubmitEvent('submit', { bubbles: true, cancelable: true }),
				);
			},
		);
		expect(captured).toBe('lead@example.com');
	});
});

describe('svelte/report components', () => {
	it('renders a metric tile with label and value', () => {
		withMount(
			ReportMetricTile,
			{ id: 'reach', label: 'Reach', value: '12.4M' },
			(container) => {
				expect(container.textContent).toContain('Reach');
				expect(container.textContent).toContain('12.4M');
			},
		);
	});

	it('renders evidence items with their detail copy', () => {
		withMount(
			ReportEvidenceList,
			{
				items: [
					{
						detail: 'Highest dwell-time observed on Saturday afternoons.',
						id: 'saturday-peak',
						title: 'Saturday peak',
					},
				],
			},
			(container) => {
				expect(container.textContent).toContain('Saturday peak');
				expect(container.textContent).toContain(
					'Highest dwell-time observed on Saturday afternoons.',
				);
			},
		);
	});

	it('renders a comparison block headline using the two entities', () => {
		withMount(
			ReportComparisonBlock,
			{
				left: { id: 'sandton', label: 'Sandton' },
				metrics: [{ label: 'Reach', leftValue: 1000, rightValue: 1200 }],
				right: { id: 'rosebank', label: 'Rosebank' },
			},
			(container) => {
				expect(container.textContent).toContain('Sandton');
				expect(container.textContent).toContain('Rosebank');
				expect(container.textContent).toContain('Reach');
			},
		);
	});

	it('renders a ranked list and reports clicks on items', () => {
		let selectedId = '';
		withMount(
			ReportRankedListBlock,
			{
				items: [
					{ id: 'sandton', label: 'Sandton City', value: 92 },
					{ id: 'rosebank', label: 'Rosebank Mall', value: 88 },
				],
				onItemSelect: (item: ReportRankedListItem<RawJsxNode>) => {
					selectedId = item.id;
				},
			},
			(container) => {
				expect(container.textContent).toContain('Sandton City');
				expect(container.textContent).toContain('Rosebank Mall');
				const firstItem = container.querySelector('button');
				firstItem?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			},
		);
		expect(selectedId).toBe('sandton');
	});

	it('renders a tour callout with the current step copy', () => {
		withMount(
			ReportTourCallout,
			{
				steps: [{ body: 'Start here.', id: 'one', title: 'Welcome' }],
			},
			(container) => {
				expect(container.textContent).toContain('Welcome');
				expect(container.textContent).toContain('Start here.');
			},
		);
	});

	it('renders the placement table rows', () => {
		withMount(
			ReportPlacementTable,
			{
				rows: [
					{
						code: 'M1-S',
						id: 'm1-south',
						name: 'M1 South',
						region: 'Johannesburg',
						value: '1.0M',
					},
				],
			},
			(container) => {
				expect(container.textContent).toContain('M1 South');
				expect(container.textContent).toContain('Johannesburg');
			},
		);
	});

	it('renders the page loading state with the provided title', () => {
		withMount(
			ReportPageLoadingState,
			{ title: 'Crunching the campaign…' },
			(container) => {
				expect(container.textContent).toContain('Crunching the campaign…');
				expect(
					container.querySelector('.pds-report-page-loader'),
				).not.toBeNull();
			},
		);
	});
});
