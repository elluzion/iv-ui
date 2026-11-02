<script lang="ts">
	import { categories, site } from '../../docs/manifest';
	import { componentGroups, components } from '../../docs/registry';
	import DocHeader from '../../docs/ui/DocHeader.svelte';
	import DocShell from '../../docs/ui/DocShell.svelte';

	let query = $state('');

	const groups = componentGroups();
	const filtered = $derived(
		groups
			.map((group) => ({
				...group,
				docs: group.docs.filter((doc) =>
					`${doc.name} ${doc.summary}`.toLowerCase().includes(query.trim().toLowerCase())
				)
			}))
			.filter((group) => !query.trim() || group.docs.length > 0)
	);
</script>

<svelte:head>
	<title>Components · {site.name}</title>
	<meta
		name="description"
		content={`All ${components.length} iv-ui components, grouped by role.`}
	/>
</svelte:head>

<DocShell>
	<DocHeader
		title="Components"
		summary={`${components.length} components in ${categories.length} groups. Every page lists props, events, snippets, tokens, and copyable examples.`}
		crumbs={[{ label: 'Home', href: '/' }, { label: 'Components' }]}
	/>

	<div class="iv-docs-filterbar">
		<input
			type="search"
			bind:value={query}
			placeholder="Filter components…"
			aria-label="Filter components by name or description"
		/>
	</div>

	{#each filtered as group (group.category.id)}
		<section class="iv-docs-index-group" id={group.category.id}>
			<h2>{group.category.label} <span>{group.docs.length}</span></h2>
			<div class="iv-docs-index-list">
				{#each group.docs as doc (doc.slug)}
					<a class="iv-docs-index-row" href={`/components/${doc.slug}`}>
						<strong>{doc.name}</strong>
						<span>{doc.summary}</span>
						<em>{doc.api.length > 1 ? `${doc.api.length} parts` : 'stable'}</em>
					</a>
				{:else}
					<p class="iv-docs-empty">No components in this group yet.</p>
				{/each}
			</div>
		</section>
	{:else}
		<p class="iv-docs-empty">No components match “{query}”.</p>
	{/each}
</DocShell>
