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

	<div class="iv-body" style="max-width: {maxWidth}px">
		{@render children()}
	</div>
</article>

<style>
	.iv-article {
		box-sizing: border-box;
		width: 100%;
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		line-height: 1.6;

		.iv-header {
			max-width: 880px;
			margin-inline: auto;
			padding: 0 0 1.25rem;
			border-bottom: 1px solid var(--iv_border);

			.iv-title {
				margin: 0;
				font-size: var(--iv_text-xl);
				font-weight: 700;
				letter-spacing: -0.01em;
				color: var(--iv_foreground);
			}

			.iv-description {
				margin: 0.5rem 0 0;
				font-size: var(--iv_text-label);
				color: var(--iv_foreground-dim);
			}
		}

		.iv-body {
			margin-inline: auto;
			padding-top: 1.25rem;
			font-size: var(--iv_text-body);

			& > :global(:first-child) {
				margin-top: 0;
			}

			& > :global(:last-child) {
				margin-bottom: 0;
			}

			:global(:is(h1, h2, h3, h4, h5, h6)) {
				font-family: var(--iv_font-sans);
				font-weight: 600;
				color: var(--iv_foreground);
				line-height: 1.3;
				margin: 1.75em 0 0.5em;
			}

			:global(h1) {
				font-size: var(--iv_text-xl);
			}

			:global(h2) {
				font-size: var(--iv_text-lg);
			}

			:global(h3) {
				font-size: var(--iv_text-base);
			}

			:global(h4),
			:global(h5),
			:global(h6) {
				font-size: var(--iv_text-body);
			}

			:global(p) {
				margin: 0 0 1em;
			}

			:global(a[href]) {
				color: var(--iv_accent);
				text-decoration: underline;
				text-decoration-style: dotted;
				text-underline-offset: 3px;
				transition: color var(--iv_transition-base);

				&:hover {
					color: var(--iv_accent-dim);
					text-decoration-style: solid;
				}
			}

			:global(strong) {
				color: var(--iv_foreground);
				font-weight: 600;
			}

			:global(em) {
				font-style: italic;
			}

			:global(:is(ul, ol)) {
				margin: 0 0 1em;
				padding-left: 1.5em;

				:global(li) {
					margin: 0.25em 0;

					&::marker {
						color: var(--iv_foreground-dim);
					}
				}
			}

			:global(blockquote) {
				margin: 1.25em 0;
				padding: 0.75rem 1rem;
				border-left: 2px solid var(--iv_border);
				background: var(--iv_surface-raised);
				border-radius: 0 var(--iv_radius-sm) var(--iv_radius-sm) 0;
				color: var(--iv_foreground-dim);

				:global(p:last-child) {
					margin-bottom: 0;
				}
			}

			:global(:is(code, pre)) {
				font-family: var(--iv_font-mono);
				font-size: 0.85em;
			}

			:global(:not(pre) > code) {
				padding: 0.15em 0.4em;
				background: var(--iv_surface-raised);
				border: 1px solid var(--iv_border);
				border-radius: var(--iv_radius-sm);
				color: var(--iv_accent);
				white-space: nowrap;
			}

			:global(pre) {
				margin: 1.25em 0;
				padding: 1rem 1.25rem;
				overflow-x: auto;
				background: var(--iv_surface-raised);
				border: 1px solid var(--iv_border);
				border-radius: var(--iv_radius);
				color: var(--iv_foreground);
				line-height: 1.6;

				:global(code) {
					background: none;
					border: none;
					padding: 0;
					color: inherit;
					white-space: pre;
				}
			}

			:global(hr) {
				margin: 2em 0;
				border: none;
				border-top: 1px solid var(--iv_border);
			}

			:global(img) {
				max-width: 100%;
				height: auto;
				border-radius: var(--iv_radius);
				border: 1px solid var(--iv_border);
			}
		}
	}
</style>
