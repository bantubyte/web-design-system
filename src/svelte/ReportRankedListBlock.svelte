<script lang="ts">
	import {
		RawReportRankedListBlock,
		type RawReportRankedListBlockProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportRankedListBlockProps = $props();
	const node = $derived(RawReportRankedListBlock({ ...props }));
</script>

<RawNodeHost {node} />
