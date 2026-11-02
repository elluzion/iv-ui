<script lang="ts">
	import { Badge } from '$lib';
	import { changelogIntro, releases } from '../../docs/lib/changelog';
	import { site } from '../../docs/manifest';
	import DocHeader from '../../docs/ui/DocHeader.svelte';
	import DocShell from '../../docs/ui/DocShell.svelte';

	const toc = releases.map((release) => ({ id: release.id, label: release.version }));

	const sourceLinks = [
		{ label: 'CHANGELOG.md', href: `${site.github}/blob/main/CHANGELOG.md` },
		{ label: 'Markdown', href: '/changelog.md' }
	];
</script>

<svelte:head>
	<title>Changelog · iv-ui</title>
	<meta
		name="description"
		content="Every notable change to @elluzion/iv-ui, newest first — read from the repository's CHANGELOG.md."
	/>
</svelte:head>

<DocShell {toc} {sourceLinks}>
	<DocHeader
		title="Changelog"
		summary="Every notable change to `@elluzion/iv-ui`, newest first. Rendered from the repository's `CHANGELOG.md`."
		crumbs={[{ label: 'Home', href: '/' }, { label: 'Docs' }, { label: 'Changelog' }]}
	/>

	<div class="iv-docs-changelog">
		{#if changelogIntro}
			<div class="iv-docs-changelog-intro">{@html changelogIntro}</div>
		{/if}

		{#each releases as release (release.id)}
			<section class="iv-docs-release" id={release.id}>
				<header class="iv-docs-release-head">
					<h2 class="iv-docs-release-version">{release.version}</h2>
					{#if release.unreleased}
						<Badge variant="accent" size="sm">Unreleased</Badge>
					{:else if release.date}
						<span class="iv-docs-release-date">{release.date}</span>
					{/if}
				</header>
				<div class="iv-docs-release-body">{@html release.html}</div>
			</section>
		{/each}
	</div>
</DocShell>
