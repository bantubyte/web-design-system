<script lang="ts">
	import {
		RawAuthAccessScreen,
		type RawAuthAccessScreenProps,
	} from '../auth-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	const props: RawAuthAccessScreenProps = $props();
	const node = $derived(RawAuthAccessScreen({ ...props }));
</script>

<RawNodeHost {node} />
