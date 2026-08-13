<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		className?: string;
		prefix?: Snippet;
		suffix?: Snippet;
		children: Snippet;
	}

	let { size = 'md', disabled = false, className = '', prefix, suffix, children }: Props = $props();
</script>

<div
	class="iv-input-group {className}"
	class:iv-sm={size === 'sm'}
	class:iv-lg={size === 'lg'}
	class:iv-disabled={disabled}
>
	{#if prefix}
		<span class="iv-addon iv-prefix">{@render prefix()}</span>
	{/if}
	<span class="iv-control">{@render children()}</span>
	{#if suffix}
		<span class="iv-addon iv-suffix">{@render suffix()}</span>
	{/if}
</div>

<style>
	.iv-input-group {
		display: flex;
		align-items: stretch;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
		overflow: hidden;
		transition:
			border-color var(--iv_transition-base),
			box-shadow var(--iv_transition-base);

		&:hover:not(:focus-within) {
			border-color: var(--iv_border-hover);
		}

		&:focus-within {
			border-color: var(--iv_border-focus);
			box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
		}

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}

	.iv-control {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: stretch;

		:global(.iv-input-wrapper),
		:global(.iv-textarea-wrapper),
		:global(.iv-native-select),
		:global(.iv-trigger) {
			border: none;
			border-radius: 0;
			background: transparent;
			box-shadow: none;
			flex: 1;
		}
	}

	.iv-addon {
		display: flex;
		align-items: center;
		padding: 0 var(--iv_control-pad-x);
		background: var(--iv_surface-elevated);
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		white-space: nowrap;
		user-select: none;
		flex-shrink: 0;

		&.iv-prefix {
			border-right: 1px solid var(--iv_border);
		}

		&.iv-suffix {
			border-left: 1px solid var(--iv_border);
		}
	}

	.iv-sm {
		& .iv-addon {
			padding: 0 var(--iv_control-pad-x-sm);
			font-size: var(--iv_text-body-sm);
		}
	}

	.iv-lg {
		& .iv-addon {
			padding: 0 var(--iv_control-pad-x-lg);
			font-size: var(--iv_text-body);
		}
	}
</style>
