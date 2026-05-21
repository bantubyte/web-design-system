<script lang="ts">
	import {
		RawReportMetricTile,
		type RawReportMetricTileProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportMetricTileProps = $props();
	const node = $derived(RawReportMetricTile({ ...props }));
</script>

<RawNodeHost {node} />
