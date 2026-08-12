<script lang="ts">
	interface Props {
		keys: string | string[];
		label?: string;
		size?: 'sm' | 'md';
		className?: string;
	}

	let { keys, label = '', size = 'sm', className = '' }: Props = $props();

	const list = $derived(Array.isArray(keys) ? keys : [keys]);
</script>

<kbd class="iv-root {className}" class:iv-md={size === 'md'} aria-label={label || undefined}>
	{#each list as key, i (i)}
		<kbd class="iv-key">{key}</kbd>
	{/each}
</kbd>

<style>
	.iv-root {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		color: var(--iv_foreground-dim);
	}

	.iv-key {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.1rem;
		height: 1.1rem;
		padding: 0 0.25rem;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-elevated);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		font-weight: 500;
		line-height: var(--iv_leading-none);
		color: inherit;
	}

	.iv-md .iv-key {
		min-width: 1.4rem;
		height: 1.4rem;
		padding: 0 0.35rem;
		font-size: var(--iv_text-sm);
	}
</style>
