<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'neutral' | 'success' | 'error' | 'accent' | 'info';
		size?: 'sm' | 'md';
		dismissible?: boolean;
		ondismiss?: () => void;
		className?: string;
		children: Snippet;
	}

	let {
		variant = 'neutral',
		size = 'md',
		dismissible = false,
		ondismiss,
		className = '',
		children
	}: Props = $props();
</script>

<span
	class="iv-badge {className}"
	class:iv-success={variant === 'success'}
	class:iv-error={variant === 'error'}
	class:iv-accent={variant === 'accent'}
	class:iv-info={variant === 'info'}
	class:iv-sm={size === 'sm'}
	class:iv-md={size === 'md'}
	class:iv-dismissible={dismissible}
>
	<span class="iv-badge-content">{@render children()}</span>
	{#if dismissible}
		<button type="button" class="iv-badge-dismiss" onclick={ondismiss} aria-label="Dismiss">
			<IconX size={12} />
		</button>
	{/if}
</span>

<style>
	.iv-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-xs);
		box-sizing: border-box;
		height: var(--iv_badge-h-md);
		padding: 0 var(--iv_badge-pad-x-md);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-elevated);
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-chips);
		font-weight: var(--iv_weight-semibold);
		white-space: nowrap;

		&.iv-sm {
			height: var(--iv_badge-h-sm);
			padding: 0 var(--iv_badge-pad-x-sm);
			font-size: var(--iv_text-xs);
		}

		&.iv-success {
			color: var(--iv_success);
		}

		&.iv-error {
			color: var(--iv_error);
		}

		&.iv-accent {
			color: var(--iv_accent);
		}

		&.iv-info {
			color: var(--iv_info);
		}

		&.iv-dismissible {
			padding-right: var(--iv_spacing-sm);
		}
	}

	.iv-badge-content {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.iv-badge-dismiss {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--iv_radius-sm);
		color: inherit;
		opacity: 0.7;

		&:hover {
			opacity: 1;
			background: var(--iv_surface-overlay);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}
</style>
