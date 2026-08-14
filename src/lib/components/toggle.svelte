<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<
		HTMLAttributes<HTMLButtonElement>,
		'onclick' | 'on:click' | 'onchange' | 'on:change'
	> {
		checked?: boolean;
		disabled?: boolean;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		icon?: Snippet;
		onclick?: (e: MouseEvent) => void;
		'on:click'?: (e: MouseEvent) => void;
		onchange?: (e: CustomEvent<{ checked: boolean }>) => void;
		'on:change'?: (e: CustomEvent<{ checked: boolean }>) => void;
		children?: Snippet;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label = '',
		size = 'md',
		icon,
		onclick,
		'on:click': onEventClick,
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	const checkSize = $derived(size === 'sm' ? 12 : size === 'lg' ? 16 : 14);

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { checked } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		checked = !checked;
		dispatchChange();
		onclick?.(e);
		onEventClick?.(e);
	}
</script>

<button
	type="button"
	class="iv-toggle"
	class:iv-checked={checked}
	class:iv-disabled={disabled}
	class:iv-sm={size === 'sm'}
	class:iv-lg={size === 'lg'}
	aria-pressed={checked}
	aria-label={label || undefined}
	{disabled}
	onclick={handleClick}
	{...restProps}
>
	{#if checked}
		<span class="iv-check" aria-hidden="true">
			<IconCheck size={checkSize} stroke={2.5} />
		</span>
	{/if}
	{#if icon}
		<span class="iv-icon" aria-hidden="true">{@render icon()}</span>
	{/if}
	{@render children?.()}
</button>

<style>
	.iv-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_control-pad-y) var(--iv_btn-pad-x);
		border-radius: var(--iv_radius);
		border: 1px solid var(--iv_border);
		background: var(--iv_surface-elevated);
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-btn);
		font-weight: var(--iv_weight-semibold);
		cursor: pointer;
		transition:
			border-color var(--iv_transition-base),
			color var(--iv_transition-base),
			background var(--iv_transition-base),
			transform var(--iv_transition-fast);

		&:hover:not(:disabled) {
			border-color: var(--iv_border-hover);
			background: var(--iv_surface-hover);
		}

		&:active:not(:disabled) {
			transform: scale(0.98);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
		}

		&.iv-checked {
			background: var(--iv_accent-surface);
			border-color: var(--iv_accent);
			color: var(--iv_accent);

			&:hover:not(:disabled) {
				background: var(--iv_accent-surface);
				border-color: var(--iv_accent);
			}
		}

		&.iv-disabled,
		&[disabled] {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}

		&.iv-sm {
			padding: var(--iv_control-pad-y-sm) var(--iv_btn-pad-x-sm);
			font-size: var(--iv_text-btn-sm);
			gap: var(--iv_spacing-xs);
			border-radius: var(--iv_radius-sm);
		}

		&.iv-lg {
			padding: var(--iv_control-pad-y-lg) var(--iv_btn-pad-x-lg);
			font-size: var(--iv_text-lg);
			border-radius: var(--iv_radius-lg);
		}
	}

	.iv-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.iv-check {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
</style>
