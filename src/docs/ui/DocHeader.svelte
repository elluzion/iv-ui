<script lang="ts">
	import { Badge, Breadcrumb } from '$lib';
	import { inline } from '../lib/inline';
	import CopyButton from './CopyButton.svelte';

	interface Props {
		title: string;
		summary: string;
		crumbs?: { label: string; href?: string }[];
		badge?: string;
		since?: string;
		importCode?: string;
	}

	let { title, summary, crumbs = [], badge, since, importCode }: Props = $props();
</script>

<header class="iv-docs-header">
	{#if crumbs.length}
		<Breadcrumb items={crumbs} />
	{/if}

	<div class="iv-docs-title-row">
		<h1 class="iv-docs-title">{title}</h1>
		{#if badge}
			<Badge variant={badge === 'deprecated' ? 'error' : 'accent'} size="sm">{badge}</Badge>
		{/if}
		{#if since}<span class="iv-docs-meta">since {since}</span>{/if}
	</div>

	<p class="iv-docs-summary">{@html inline(summary)}</p>

	{#if importCode}
		<div class="iv-docs-import">
			<code>{importCode}</code>
			<CopyButton value={importCode} />
		</div>
	{/if}
</header>
