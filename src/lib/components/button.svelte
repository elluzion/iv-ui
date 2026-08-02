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
	class="btn {className}"
	class:primary={variant === 'primary'}
	class:outline={variant === 'outline'}
	class:ghost={variant === 'ghost'}
	class:icon={variant === 'icon'}
	class:danger={variant === 'danger'}
	class:btn-sm={size === 'sm'}
	class:btn-lg={size === 'lg'}
	class:loading
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
		padding: 9px 18px;
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
		gap: 0.5rem;
		align-items: center;
		justify-content: center;

		&:hover {
			border-color: var(--iv_border-hover);
			background: var(--iv_surface-hover);
		}

		&:active {
			transform: scale(0.98);
		}

		&.primary {
			background: var(--iv_foreground);
			color: var(--iv_surface);
			border-color: var(--iv_foreground);
			font-weight: 700;

			&:hover {
				background: var(--iv_foreground-hover);
				border-color: var(--iv_foreground-hover);
			}
		}

		&.ghost,
		&.outline {
			background: transparent;
			border: 1px solid var(--iv_border);
		}

		&.ghost {
			border-color: transparent;
		}

		&.icon {
			background: transparent;
			color: var(--iv_foreground-dim);
			border: none;
			padding: 0.5625rem;

			&:hover {
				color: var(--iv_foreground);
			}
		}

		&.disabled,
		&[disabled] {
			background: var(--iv_surface-raised);
			color: var(--iv_foreground-dim);
			cursor: not-allowed;
			opacity: var(--iv_disabled-opacity);
		}

		&.danger {
			background: var(--iv_error);
			border-color: transparent;
			color: var(--iv_surface);

			&:hover {
				background: var(--iv_error-dim);
			}
		}

		&.btn-sm {
			padding: 5px 13px;
			font-size: var(--iv_text-btn-sm);
			gap: 0.375rem;
		}

		&.btn-lg {
			padding: 12px 24px;
			font-size: var(--iv_text-lg);
			gap: 0.625rem;
		}

		&.loading {
			cursor: wait;
		}
	}
</style>
