<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PagerEntry } from '../registry';
	import OnThisPage from './OnThisPage.svelte';
	import Pager from './Pager.svelte';
	import Sidebar from './Sidebar.svelte';

	interface Props {
		children: Snippet;
		toc?: { id: string; label: string }[];
		related?: { title: string; summary: string; url: string; kind: string }[];
		sourceLinks?: { label: string; href: string }[];
		pager?: { prev: PagerEntry | null; next: PagerEntry | null };
	}

	let { children, toc = [], related = [], sourceLinks = [], pager }: Props = $props();

	const hasRail = $derived(toc.length > 0 || related.length > 0 || sourceLinks.length > 0);
</script>

<div class="iv-docs-shell" data-rail={hasRail}>
	<Sidebar />

	<main id="content" class="iv-docs-main">
		{@render children()}
		{#if pager}
			<Pager prev={pager.prev} next={pager.next} />
		{/if}
	</main>

	{#if hasRail}
		<aside class="iv-docs-rail">
			{#if toc.length}
				<OnThisPage items={toc} />
			{/if}

			{#if related.length}
				<div>
					<div class="iv-docs-rail-label">Related</div>
					<div class="iv-docs-related">
						{#each related as item (item.url)}
							<a href={item.url}>{item.title}</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if sourceLinks.length}
				<div>
					<div class="iv-docs-rail-label">Source</div>
					<div class="iv-docs-rail-links">
						{#each sourceLinks as link (link.href)}
							<a href={link.href}>{link.label} <em>↗</em></a>
						{/each}
					</div>
				</div>
			{/if}
		</aside>
	{/if}
</div>
