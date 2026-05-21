<script lang="ts">
	import {
		RawReportChartLoadingBlock,
		type RawReportChartLoadingBlockProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportChartLoadingBlockProps = $props();
	const node = $derived(RawReportChartLoadingBlock({ ...props }));
</script>

<RawNodeHost {node} />
