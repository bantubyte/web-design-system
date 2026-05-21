#!/usr/bin/env node
// svelte-package's TS pass (svelte2tsx) emits .d.ts files alongside cross-folder
// imports when its libRoot doesn't contain every referenced file. The "real"
// declarations land in dist/svelte/, but stray copies appear under src/.
// This script deletes them. It deliberately preserves vite-env.d.ts and the
// hand-written shim under src/svelte/_internal/.
import { readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../src', import.meta.url).pathname;
const KEEP = new Set([
	join(ROOT, 'vite-env.d.ts'),
	join(ROOT, 'svelte/_internal/svelte-shim.d.ts'),
]);

let removed = 0;
function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stats = statSync(full);
		if (stats.isDirectory()) {
			walk(full);
			continue;
		}
		if (!full.endsWith('.d.ts')) continue;
		if (KEEP.has(full)) continue;
		rmSync(full);
		removed += 1;
	}
}

walk(ROOT);
if (removed > 0) {
	console.log(
		`clean-stray-dts: removed ${removed} stray .d.ts file(s) under src/`,
	);
}
