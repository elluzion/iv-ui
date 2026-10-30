<script lang="ts">
	import type { ComponentApi } from '../../../docs/types';
	import { api } from '../../../docs/lib/data';
	import { inline } from '../../../docs/lib/inline';
	import { componentImport, componentPager, relatedDocs } from '../../../docs/registry';
	import ApiTable from '../../../docs/ui/ApiTable.svelte';
	import CodeBlock from '../../../docs/ui/CodeBlock.svelte';
	import DemoFrame from '../../../docs/ui/DemoFrame.svelte';
	import DocHeader from '../../../docs/ui/DocHeader.svelte';
	import DocShell from '../../../docs/ui/DocShell.svelte';
	import RelatedCards from '../../../docs/ui/RelatedCards.svelte';
	import SectionLabel from '../../../docs/ui/SectionLabel.svelte';
	import TokenChips from '../../../docs/ui/TokenChips.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const apiEntries = $derived(
		doc.api.map((id) => api[id]).filter((entry): entry is ComponentApi => Boolean(entry))
	);
	const tokensUsed = $derived([...new Set(apiEntries.flatMap((entry) => entry.tokens))]);
	const cssHooks = $derived([...new Set(apiEntries.flatMap((entry) => entry.classes))]);
	const related = $derived(relatedDocs(doc.related));
	const pager = $derived(componentPager(doc.slug));
	const primary = $derived(doc.examples[0]);
	const rest = $derived(doc.examples.slice(1));

	const sections = $derived.by(() => {
		const defs: { id: string; label: string }[] = [{ id: 'preview', label: 'Preview' }];
		if (doc.usage?.length) defs.push({ id: 'usage', label: 'Usage' });
		if (rest.length) defs.push({ id: 'examples', label: 'Examples' });
		defs.push({ id: 'api', label: 'API' });
		if (doc.accessibility) defs.push({ id: 'accessibility', label: 'Accessibility' });
		if (tokensUsed.length || cssHooks.length) {
			defs.push({ id: 'tokens', label: 'Tokens & CSS hooks' });
		}
		if (related.length) defs.push({ id: 'related', label: 'Related' });
		return defs.map((def, index) => ({ ...def, number: String(index + 1).padStart(2, '0') }));
	});

	const numberFor = (id: string) => sections.find((section) => section.id === id)?.number;
</script>

<svelte:head>
	<title>{doc.name} · iv-ui</title>
	<meta name="description" content={doc.summary} />
</svelte:head>

<DocShell
	toc={sections}
	{related}
	sourceLinks={[
		{ label: 'Markdown', href: `/components/${doc.slug}.md` },
		{ label: 'API JSON', href: `/api/${doc.slug}.json` }
	]}
	{pager}
>
	<DocHeader
		title={doc.name}
		summary={doc.summary}
		badge={doc.status && doc.status !== 'stable' ? doc.status : undefined}
		since={doc.since}
		crumbs={[
			{ label: 'Home', href: '/' },
			{ label: 'Components', href: '/components' },
			{ label: doc.name }
		]}
		importCode={componentImport(doc)}
	/>

	{#if primary}
		<section id="preview" class="iv-docs-section">
			<SectionLabel label="Preview" number={numberFor('preview')} />
			<DemoFrame
				slug={doc.slug}
				id={primary.id}
				description={primary.description}
				title={primary.title}
			/>
		</section>
	{/if}

	{#if doc.usage?.length}
		<section id="usage" class="iv-docs-section">
			<SectionLabel label="Usage" number={numberFor('usage')} />
			<ul class="iv-docs-list">
				{#each doc.usage as item, index (index)}
					<li>{@html inline(item)}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if rest.length}
		<section id="examples" class="iv-docs-section">
			<SectionLabel label="Examples" number={numberFor('examples')} />
			{#each rest as example (example.id)}
				<DemoFrame
					slug={doc.slug}
					id={example.id}
					title={example.title}
					description={example.description}
				/>
			{/each}
		</section>
	{/if}

	<section id="api" class="iv-docs-section">
		<SectionLabel label="API" number={numberFor('api')} />
		<div class="iv-docs-api">
			<div class="iv-docs-import iv-docs-import-plain">
				<code>{componentImport(doc)}</code>
			</div>
			<ApiTable entries={apiEntries} manual={doc.manual} />
		</div>
	</section>

	{#if doc.accessibility}
		<section id="accessibility" class="iv-docs-section">
			<SectionLabel label="Accessibility" number={numberFor('accessibility')} />
			{#if doc.accessibility.keyboard?.length}
				<table class="iv-docs-kbd-table">
					<thead class="iv-sr-only">
						<tr><th scope="col">Keys</th><th scope="col">Action</th></tr>
					</thead>
					<tbody>
						{#each doc.accessibility.keyboard as [keys, action] (keys)}
							<tr>
								<td><span class="iv-docs-kbd">{keys}</span></td>
								<td>{@html inline(action)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
			{#if doc.accessibility.notes?.length}
				<ul class="iv-docs-list">
					{#each doc.accessibility.notes as note, index (index)}
						<li>{@html inline(note)}</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}

	{#if tokensUsed.length || cssHooks.length}
		<section id="tokens" class="iv-docs-section">
			<SectionLabel label="Tokens & CSS hooks" number={numberFor('tokens')} />
			<TokenChips names={tokensUsed} label="Tokens used" />
			{#if cssHooks.length}
				<div class="iv-docs-token-block">
					<div class="iv-docs-rail-label">Class hooks</div>
					<div class="iv-docs-tokens">
						{#each cssHooks as name (name)}
							<code class="iv-docs-token">.{name}</code>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	{/if}

	{#if related.length}
		<section id="related" class="iv-docs-section">
			<SectionLabel label="Related" number={numberFor('related')} />
			<RelatedCards {related} />
		</section>
	{/if}
</DocShell>
