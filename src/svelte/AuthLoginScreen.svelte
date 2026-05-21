<script lang="ts">
	import {
		RawAuthAccessScreen,
		type RawAuthAccessScreenProps,
	} from '../auth-jsx';
	import RawNodeHost from './_internal/RawNodeHost.svelte';

	type Props = Omit<RawAuthAccessScreenProps, 'mode'>;
	const props: Props = $props();
	const node = $derived(RawAuthAccessScreen({ ...props, mode: 'login' }));
</script>

<RawNodeHost {node} />
