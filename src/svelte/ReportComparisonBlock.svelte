<script lang="ts">
	import {
		RawReportComparisonBlock,
		type RawReportComparisonBlockProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportComparisonBlockProps = $props();
	const node = $derived(RawReportComparisonBlock({ ...props }));
</script>

<RawNodeHost {node} />
