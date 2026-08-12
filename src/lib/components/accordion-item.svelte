<script lang="ts">
	import { IconChevronDown } from '@tabler/icons-svelte';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { accordionContextKey, type AccordionContext } from './accordion-context.js';

	interface Props {
		value: string;
		title?: string;
		disabled?: boolean;
		children: Snippet;
		trigger?: Snippet;
	}

	let { value, title = '', disabled = false, children, trigger }: Props = $props();

	const ctx = getContext<AccordionContext>(accordionContextKey);
	const uid = $props.id();

	const open = $derived(ctx.isOpen(value));
	const triggerId = `iv-acc-${uid}-trigger`;
	const contentId = `iv-acc-${uid}-content`;
</script>

<div class="iv-item" class:iv-open={open} class:iv-disabled={disabled}>
	<button
		type="button"
		id={triggerId}
		class="iv-trigger"
		class:iv-open={open}
		aria-expanded={open}
		aria-controls={contentId}
		{disabled}
		onclick={() => ctx.toggle(value)}
	>
		<span class="iv-trigger-label">
			{#if trigger}
				{@render trigger()}
			{:else}
				{title}
			{/if}
		</span>
		<span class="iv-chevron" class:iv-open={open} aria-hidden="true">
			<IconChevronDown size={16} />
		</span>
	</button>

	{#if open}
		<div transition:fade={{ duration: 120 }}>
			<div
				id={contentId}
				class="iv-panel"
				role="region"
				aria-labelledby={triggerId}
				transition:slide={{ duration: 180 }}
			>
				{@render children()}
			</div>
		</div>
	{/if}
</div>

<style>
	.iv-item {
		border-top: 1px solid var(--iv_border);

		&:first-child {
			border-top: 0;
		}

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
		}
	}

	.iv-trigger {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-lg);
		width: 100%;
		padding: 0.875rem var(--iv_spacing-xl);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-btn);
		font-weight: 500;
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
		padding: 0 var(--iv_spacing-xl);
		border-top: 1px solid var(--iv_border);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
		line-height: 1.5;
		overflow: hidden;
	}
</style>
