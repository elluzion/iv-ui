<script lang="ts">
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
		<nav class="iv-docs-crumbs" aria-label="Breadcrumb">
			{#each crumbs as crumb, index (crumb.label)}
				{#if crumb.href}
					<a href={crumb.href}>{crumb.label}</a>
				{:else}
					<span aria-current="page">{crumb.label}</span>
				{/if}
				{#if index < crumbs.length - 1}<span aria-hidden="true">/</span>{/if}
			{/each}
		</nav>
	{/if}

	<div class="iv-docs-title-row">
		<h1 class="iv-docs-title">{title}</h1>
		{#if badge}<span class="iv-docs-badge" data-tone="accent">{badge}</span>{/if}
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
