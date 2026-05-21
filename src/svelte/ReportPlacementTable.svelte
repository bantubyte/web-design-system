<script lang="ts">
	import {
		RawReportPlacementTable,
		type RawReportPlacementTableProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportPlacementTableProps = $props();
	const node = $derived(RawReportPlacementTable({ ...props }));
</script>

<RawNodeHost {node} />
