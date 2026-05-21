<script lang="ts">
	import {
		RawReportMetricRibbonLoading,
		type RawReportMetricRibbonLoadingProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportMetricRibbonLoadingProps = $props();
	const node = $derived(RawReportMetricRibbonLoading({ ...props }));
</script>

<RawNodeHost {node} />
