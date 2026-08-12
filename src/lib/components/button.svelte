<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import LoadingSpinner from './loading-spinner.svelte';

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		className?: string;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (e: MouseEvent) => void;
		'on:click'?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		disabled = false,
		loading = false,
		className = '',
		type = 'button',
		onclick,
		'on:click': onEventClick,
		children,
		...restProps
	}: Props = $props();

	function handleClick(e: MouseEvent) {
		if (loading || disabled) return;
		onclick?.(e);
		onEventClick?.(e);
	}
</script>

<button
	class="iv-btn {className}"
	class:iv-primary={variant === 'primary'}
	class:iv-outline={variant === 'outline'}
	class:iv-ghost={variant === 'ghost'}
	class:iv-icon={variant === 'icon'}
	class:iv-danger={variant === 'danger'}
	class:iv-btn-sm={size === 'sm'}
	class:iv-btn-lg={size === 'lg'}
	class:iv-loading={loading}
	{disabled}
	{type}
	onclick={handleClick}
	aria-busy={loading}
	{...restProps}
>
	{#if loading}
		<LoadingSpinner size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} color="currentColor" />
	{/if}
	{@render children()}
</button>

<style>
	button {
		padding: var(--iv_control-pad-y) var(--iv_btn-pad-x);
		border-radius: var(--iv_radius-pill);
		font-weight: 600;
		border: 1px solid var(--iv_border);
		color: var(--iv_foreground);
		background: var(--iv_surface-elevated);
		font-family: var(--iv_font-sans);
		cursor: pointer;
		transition:
			border-color var(--iv_transition-base),
			color var(--iv_transition-base),
			background var(--iv_transition-base),
			transform var(--iv_transition-fast);
		display: flex;
		flex-direction: row;
		gap: var(--iv_spacing-sm);
		align-items: center;
		justify-content: center;

		&:hover {
			border-color: var(--iv_border-hover);
			background: var(--iv_surface-hover);
		}

		&:active {
			transform: scale(0.98);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
		}

		&.iv-primary {
			background: var(--iv_foreground);
			color: var(--iv_surface);
			border-color: var(--iv_foreground);
			font-weight: 700;

			&:hover {
				background: var(--iv_foreground-hover);
				border-color: var(--iv_foreground-hover);
			}
		}

		&.iv-ghost,
		&.iv-outline {
			background: transparent;
			border: 1px solid var(--iv_border);
		}

		&.iv-ghost {
			border-color: transparent;
		}

		&.iv-icon {
			background: transparent;
			color: var(--iv_foreground-dim);
			border: none;
			padding: var(--iv_control-pad-y);

			&:hover {
				color: var(--iv_foreground);
			}
		}

		&.iv-disabled,
		&[disabled] {
			background: var(--iv_surface-raised);
			color: var(--iv_foreground-dim);
			cursor: not-allowed;
			opacity: var(--iv_disabled-opacity);
		}

		&.iv-danger {
			background: var(--iv_error);
			border-color: transparent;
			color: var(--iv_surface);

			&:hover {
				background: var(--iv_error-dim);
			}
		}

		&.iv-btn-sm {
			padding: var(--iv_control-pad-y-sm) var(--iv_btn-pad-x-sm);
			font-size: var(--iv_text-btn-sm);
			gap: var(--iv_spacing-xs);
		}

		&.iv-btn-lg {
			padding: var(--iv_control-pad-y-lg) var(--iv_btn-pad-x-lg);
			font-size: var(--iv_text-lg);
			gap: var(--iv_spacing-sm);
		}

		&.iv-loading {
			cursor: wait;
		}
	}
</style>
