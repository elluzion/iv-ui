<script lang="ts">
	import { page } from '$app/state';
	import { componentGroups, foundations, guides } from '../registry';
	import { ui } from '../lib/ui.svelte';

	const path = $derived(page.url.pathname);
	const groups = componentGroups();

	function current(href: string): 'page' | undefined {
		return path === href ? 'page' : undefined;
	}
</script>

<nav class="iv-docs-sidebar" aria-label="Documentation">
	<div class="iv-docs-side-group">
		<div class="iv-docs-side-label">Getting started</div>
		{#each guides as doc (doc.slug)}
			<a
				class="iv-docs-side-link"
				href={`/docs/${doc.slug}`}
				aria-current={current(`/docs/${doc.slug}`)}
				onclick={() => (ui.nav = false)}>{doc.title}</a
			>
		{/each}
	</div>

	<div class="iv-docs-side-group">
		<div class="iv-docs-side-label">Foundations</div>
		{#each foundations as doc (doc.slug)}
			<a
				class="iv-docs-side-link"
				href={`/foundations/${doc.slug}`}
				aria-current={current(`/foundations/${doc.slug}`)}
				onclick={() => (ui.nav = false)}>{doc.title}</a
			>
		{/each}
	</div>

	<div class="iv-docs-side-group">
		<div class="iv-docs-side-label">
			Components <span>{groups.reduce((sum, group) => sum + group.docs.length, 0)}</span>
		</div>
		<a
			class="iv-docs-side-link"
			href="/components"
			aria-current={current('/components')}
			onclick={() => (ui.nav = false)}>All components</a
		>
		{#each groups as group (group.category.id)}
			{#if group.docs.length}
				<div class="iv-docs-side-label iv-docs-side-sub">
					{group.category.label} <span>{group.docs.length}</span>
				</div>
				{#each group.docs as doc (doc.slug)}
					<a
						class="iv-docs-side-link"
						href={`/components/${doc.slug}`}
						aria-current={current(`/components/${doc.slug}`)}
						onclick={() => (ui.nav = false)}>{doc.name}</a
					>
				{/each}
			{/if}
		{/each}
	</div>

	<div class="iv-docs-side-group">
		<div class="iv-docs-side-label">Reference</div>
		<a class="iv-docs-side-link" href="/api/index.json">API index (JSON)</a>
		<a class="iv-docs-side-link" href="/llms.txt">llms.txt</a>
		<a class="iv-docs-side-link" href="/llms-full.txt">llms-full.txt</a>
		<a class="iv-docs-side-link" href="/search.json">search.json</a>
	</div>
</nav>
