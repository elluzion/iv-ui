<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: Snippet;
		title?: string;
		description?: string;
		className?: string;
		action?: Snippet;
		children?: Snippet;
	}

	let { icon, title = '', description = '', className = '', action, children }: Props = $props();
</script>

<div class="iv-empty-state {className}">
	{#if icon}
		<div class="iv-empty-icon">{@render icon()}</div>
	{/if}
	{#if title}
		<h3 class="iv-empty-title">{title}</h3>
	{/if}
	{#if description}
		<p class="iv-empty-description">{description}</p>
	{/if}
	{#if children}
		<div class="iv-empty-body">{@render children()}</div>
	{/if}
	{#if action}
		<div class="iv-empty-action">{@render action()}</div>
	{/if}
</div>

<style>
	.iv-empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--iv_spacing-sm);
		width: 100%;
		padding: var(--iv_spacing-2xl);
		box-sizing: border-box;
	}

	.iv-empty-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-elevated);
		border: 1px solid var(--iv_border);
		color: var(--iv_foreground-dim);
		margin-bottom: var(--iv_spacing-xs);
	}

	.iv-empty-title {
		margin: 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-lg);
		font-weight: var(--iv_weight-semibold);
		color: var(--iv_foreground);
		line-height: var(--iv_leading-tight);
	}

	.iv-empty-description {
		margin: 0;
		max-width: 36ch;
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		line-height: var(--iv_leading-base);
	}

	.iv-empty-action {
		margin-top: var(--iv_spacing-sm);
	}
</style>
