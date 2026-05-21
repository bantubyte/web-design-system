<script lang="ts">
	import {
		RawReportSectionLoadingState,
		type RawReportSectionLoadingStateProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportSectionLoadingStateProps = $props();
	const node = $derived(RawReportSectionLoadingState({ ...props }));
</script>

<RawNodeHost {node} />
