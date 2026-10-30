<script lang="ts">
	import { guidePager, guideToc, relatedDocs } from '../../../docs/registry';
	import DocHeader from '../../../docs/ui/DocHeader.svelte';
	import DocShell from '../../../docs/ui/DocShell.svelte';
	import GuideContent from '../../../docs/ui/GuideContent.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const toc = $derived(guideToc(doc));
	const related = $derived(relatedDocs(doc.related));
	const pager = $derived(guidePager(doc.slug));
</script>

<svelte:head>
	<title>{doc.title} · iv-ui</title>
	<meta name="description" content={doc.summary} />
</svelte:head>

<DocShell
	{toc}
	{related}
	sourceLinks={[{ label: 'Markdown', href: `/docs/${doc.slug}.md` }]}
	{pager}
>
	<DocHeader
		title={doc.title}
		summary={doc.summary}
		crumbs={[{ label: 'Home', href: '/' }, { label: 'Docs' }, { label: doc.title }]}
	/>
	<GuideContent slug={doc.slug} blocks={doc.blocks} />
</DocShell>
