<script lang="ts">
	import {
		renderRawJsxToDom,
		renderRawJsxToHtml,
		type RawJsxNode,
	} from '../../report-jsx/runtime';

	interface Props {
		node: RawJsxNode;
	}

	const { node }: Props = $props();

	function mount(host: HTMLElement, current: RawJsxNode) {
		host.replaceChildren(renderRawJsxToDom(current));
		return {
			update(next: RawJsxNode) {
				host.replaceChildren(renderRawJsxToDom(next));
			},
		};
	}
</script>

<div class="pds-svelte-host" style="display:contents" use:mount={node}>{@html renderRawJsxToHtml(node)}</div>
