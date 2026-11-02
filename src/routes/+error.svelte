<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · iv-ui</title>
</svelte:head>

<main id="content" class="iv-docs-landing iv-docs-error">
	<div class="iv-docs-statusline">
		<span class="iv-docs-dot" aria-hidden="true"></span>
		<span>request failed</span>
		<span aria-hidden="true">·</span>
		<span>{page.status}</span>
	</div>
	<h1>{page.status}</h1>
	<p>{page.error?.message || 'This page does not exist.'}</p>
	<div class="iv-docs-hero-actions">
		<a class="iv-docs-cta" href="/">Back to index</a>
		<a class="iv-docs-cta" data-variant="outline" href="/components">Components</a>
	</div>
</main>
