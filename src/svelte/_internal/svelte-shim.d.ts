// Lets `tsc --noEmit` accept `*.svelte` imports from the TypeScript barrels.
// The real component-class types are emitted by `@sveltejs/package` (svelte2tsx)
// into `dist/svelte/*.svelte.d.ts` at build time — consumers get those.
declare module '*.svelte' {
	import type { Component } from 'svelte';
	const component: Component<Record<string, unknown>>;
	export default component;
}
