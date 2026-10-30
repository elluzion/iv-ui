<script lang="ts" module>
	import type { Component } from 'svelte';

	const exampleModules = import.meta.glob('/src/docs/examples/**/*.svelte', {
		eager: true
	}) as Record<string, { default: Component }>;
</script>

<script lang="ts">
	import { examples, highlight } from '../lib/data';
	import { inline } from '../lib/inline';
	import CodeBlock from './CodeBlock.svelte';

	interface Props {
		slug: string;
		id: string;
		title?: string;
		description?: string;
		tall?: boolean;
	}

	let { slug, id, title, description, tall = false }: Props = $props();

	const key = $derived(`/src/docs/examples/${slug}/${id}.svelte`);
	const Example = $derived(exampleModules[key]?.default);
	const entry = $derived(examples[`${slug}/${id}`]);
	const html = $derived(highlight[`example-${slug}-${id}`] ?? entry?.html ?? '');
</script>

<div class="iv-docs-demo">
	{#if title}
		<h3 class="iv-docs-demo-title">{title}</h3>
	{/if}
	{#if description}
		<p class="iv-docs-demo-desc">{@html inline(description)}</p>
	{/if}
	<div class="iv-docs-demo-frame" data-tall={tall}>
		{#if Example}
			<Example />
		{:else}
			<p class="iv-docs-empty">Missing example `{slug}/{id}.svelte`.</p>
		{/if}
	</div>
	{#if entry}
		<CodeBlock code={entry.code} {html} />
	{/if}
</div>
