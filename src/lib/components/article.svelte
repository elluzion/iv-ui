<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		maxWidth?: number;
		className?: string;
		children: Snippet;
	}

	let {
		title = '',
		description = '',
		maxWidth = 880,
		className = '',
		children,
		...restProps
	}: Props = $props();
</script>

<article class="iv-article {className}" {...restProps}>
	{#if title || description}
		<header class="iv-header">
			{#if title}
				<h1 class="iv-title">{title}</h1>
			{/if}
			{#if description}
				<p class="iv-description">{description}</p>
			{/if}
		</header>
	{/if}

	<div class="iv-body iv-prose" style="max-width: {maxWidth}px">
		{@render children()}
	</div>
</article>

<style>
	.iv-article {
		box-sizing: border-box;
		width: 100%;
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		line-height: var(--iv_leading-prose);

		.iv-header {
			max-width: var(--iv_article-width);
			margin-inline: auto;
			padding: 0 0 var(--iv_spacing-2xl);
			border-bottom: 1px solid var(--iv_border);

			.iv-title {
				margin: 0;
				font-size: var(--iv_text-xl);
				font-weight: var(--iv_weight-bold);
				letter-spacing: var(--iv_tracking-tight);
				line-height: var(--iv_leading-heading);
				color: var(--iv_foreground);
			}

			.iv-description {
				margin: var(--iv_spacing-sm) 0 0;
				font-size: var(--iv_text-label);
				color: var(--iv_foreground-dim);
			}
		}

		.iv-body {
			margin-inline: auto;
		}
	}
</style>
