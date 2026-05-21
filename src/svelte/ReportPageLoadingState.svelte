<script lang="ts">
	import {
		RawReportPageLoadingState,
		type RawReportPageLoadingStateProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportPageLoadingStateProps = $props();
	const node = $derived(RawReportPageLoadingState({ ...props }));
</script>

<RawNodeHost {node} />
