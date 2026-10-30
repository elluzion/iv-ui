<script lang="ts">
	import { foundationPager, foundationToc, relatedDocs } from '../../../docs/registry';
	import DocHeader from '../../../docs/ui/DocHeader.svelte';
	import DocShell from '../../../docs/ui/DocShell.svelte';
	import GuideContent from '../../../docs/ui/GuideContent.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const toc = $derived(foundationToc(doc));
	const related = $derived(relatedDocs(doc.related));
	const pager = $derived(foundationPager(doc.slug));
</script>

<svelte:head>
	<title>{doc.title} · iv-ui</title>
	<meta name="description" content={doc.summary} />
</svelte:head>

<DocShell
	{toc}
	{related}
	sourceLinks={[
		{ label: 'Markdown', href: `/foundations/${doc.slug}.md` },
		{ label: 'Tokens JSON', href: '/api/tokens.json' }
	]}
	{pager}
>
	<DocHeader
		title={doc.title}
		summary={doc.summary}
		crumbs={[{ label: 'Home', href: '/' }, { label: 'Foundations' }, { label: doc.title }]}
	/>
	<GuideContent slug={doc.slug} blocks={doc.blocks} />
</DocShell>
