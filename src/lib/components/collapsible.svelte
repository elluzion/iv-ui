<script lang="ts">
	import { IconChevronDown } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';

	interface Props {
		title?: string;
		trigger?: Snippet;
		open?: boolean;
		defaultOpen?: boolean;
		disabled?: boolean;
		className?: string;
		onchange?: (e: CustomEvent<{ open: boolean }>) => void;
		'on:change'?: (e: CustomEvent<{ open: boolean }>) => void;
		children: Snippet;
	}

	let {
		title = '',
		trigger,
		open = $bindable<boolean>(),
		defaultOpen = false,
		disabled = false,
		className = '',
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const triggerId = `iv-collapsible-${uid}-trigger`;
	const contentId = `iv-collapsible-${uid}-content`;

	// svelte-ignore state_referenced_locally (uncontrolled initial value, captured once)
	const initialOpen = defaultOpen;

	let internal = $state(initialOpen);

	const isOpen = $derived(open !== undefined ? open : internal);

	function toggle() {
		if (disabled) return;
		const next = !isOpen;
		if (open !== undefined) {
			open = next;
		} else {
			internal = next;
		}
		const e = new CustomEvent('change', { detail: { open: next } });
		onchange?.(e);
		onEventChange?.(e);
	}
</script>

<div
	class="iv-collapsible {className}"
	class:iv-open={isOpen}
	class:iv-disabled={disabled}
	{...restProps}
>
	<button
		type="button"
		id={triggerId}
		class="iv-trigger"
		class:iv-open={isOpen}
		aria-expanded={isOpen}
		aria-controls={contentId}
		{disabled}
		onclick={toggle}
	>
		<span class="iv-trigger-label">
			{#if trigger}
				{@render trigger()}
			{:else}
				{title}
			{/if}
		</span>
		<span class="iv-chevron" class:iv-open={isOpen} aria-hidden="true">
			<IconChevronDown size={16} />
		</span>
	</button>

	{#if isOpen}
		<div transition:fade={{ duration: $reducedMotion ? 0 : 120 }}>
			<div
				id={contentId}
				class="iv-panel"
				role="region"
				aria-labelledby={triggerId}
				transition:slide={{ duration: $reducedMotion ? 0 : 180 }}
			>
				{@render children()}
			</div>
		</div>
	{/if}
</div>

<style>
	.iv-collapsible {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		overflow: hidden;
	}

	.iv-trigger {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-lg);
		width: 100%;
		padding: var(--iv_spacing-md) var(--iv_spacing-lg);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-btn);
		font-weight: var(--iv_weight-medium);
		color: var(--iv_foreground);
		text-align: left;
		cursor: pointer;
		transition: background var(--iv_transition-fast);

		&:hover:not(:disabled) {
			background: var(--iv_surface-overlay);
		}

		&:disabled {
			cursor: not-allowed;
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: -2px;
		}
	}

	.iv-trigger-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.iv-chevron {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);
		transition: transform var(--iv_transition-fast);

		&.iv-open {
			transform: rotate(180deg);
			color: var(--iv_foreground);
		}
	}

	.iv-panel {
		padding: 0 var(--iv_spacing-lg) var(--iv_spacing-lg);
		border-top: 1px solid var(--iv_border);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
		line-height: var(--iv_leading-base);
		overflow: hidden;
	}
</style>
