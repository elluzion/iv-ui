import axe from 'axe-core';
import { createRawSnippet } from 'svelte';
import { expect } from 'vitest';

/**
 * Markup snippet for components that accept children. The markup is static test
 * content, so raw HTML keeps the fixtures small.
 */
export function snippet(markup: string) {
	return createRawSnippet(() => ({ render: () => markup }));
}

/** Plain text snippet, wrapped so inline content has a stable container. */
export function text(value: string) {
	return createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
}

/** Runs axe on the rendered page and fails on any violation. */
export async function expectAccessible() {
	const results = await axe.run(document.body, {
		rules: {
			// Components are tested in isolation; the page shell rules belong to the app.
			region: { enabled: false },
			'landmark-one-main': { enabled: false },
			'page-has-heading-one': { enabled: false },
			'html-has-lang': { enabled: false }
		}
	});
	expect(results.violations).toEqual([]);
}
