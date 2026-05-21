<script lang="ts">
	import {
		RawReportEvidenceList,
		type RawReportEvidenceListProps,
	} from '../report-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawReportEvidenceListProps = $props();
	const node = $derived(RawReportEvidenceList({ ...props }));
</script>

<RawNodeHost {node} />
