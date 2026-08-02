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

<div class="item" class:open class:disabled>
	<button
		type="button"
		id={triggerId}
		class="trigger"
		class:open
		aria-expanded={open}
		aria-controls={contentId}
		{disabled}
		onclick={() => ctx.toggle(value)}
	>
		<span class="trigger-label">
			{#if trigger}
				{@render trigger()}
			{:else}
				{title}
			{/if}
		</span>
		<span class="chevron" class:open aria-hidden="true">
			<IconChevronDown size={16} />
		</span>
	</button>

	{#if open}
		<div transition:fade={{ duration: 120 }}>
			<div
				id={contentId}
				class="panel"
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
	.item {
		border-top: 1px solid var(--iv_border);

		&:first-child {
			border-top: 0;
		}

		&.disabled {
			opacity: 0.5;
		}
	}

	.trigger {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.875rem 1.25rem;
		font-family: var(--iv_font-sans);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--iv_foreground);
		text-align: left;
		cursor: pointer;
		transition: background 0.12s;

		&:hover:not(:disabled) {
			background: var(--iv_surface-overlay);
		}

		&:disabled {
			cursor: not-allowed;
		}

		&:focus-visible {
			outline: 2px solid var(--iv_foreground);
			outline-offset: -2px;
		}
	}

	.trigger-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chevron {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);
		transition: transform 0.12s;

		&.open {
			transform: rotate(180deg);
			color: var(--iv_foreground);
		}
	}

	.panel {
		padding: 0 1.25rem;
		border-top: 1px solid var(--iv_border);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-size: 0.9rem;
		line-height: 1.5;
		overflow: hidden;
	}
</style>
