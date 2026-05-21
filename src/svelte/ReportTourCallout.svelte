<script lang="ts">
	import {
		RawReportTourCallout,
		type RawReportTourCalloutProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportTourCalloutProps = $props();
	const node = $derived(RawReportTourCallout({ ...props }));
</script>

<RawNodeHost {node} />
