<script lang="ts">
	import {
		RawReportMetricRibbon,
		type RawReportMetricRibbonProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportMetricRibbonProps = $props();
	const node = $derived(RawReportMetricRibbon({ ...props }));
</script>

<RawNodeHost {node} />
