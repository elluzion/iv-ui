<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { tabsContextKey, type TabsContext } from './tabs-context.js';

	interface Props {
		value: string;
		disabled?: boolean;
		className?: string;
		children: Snippet;
	}

	let { value, disabled = false, className = '', children, ...restProps }: Props = $props();

	const ctx = getContext<TabsContext>(tabsContextKey);
	const active = $derived(ctx.isActive(value));
</script>

<button
	type="button"
	id={`${ctx.uid}-tab-${value}`}
	class="tab {className}"
	class:active
	class:disabled
	class:sm={ctx.size === 'sm'}
	class:md={ctx.size === 'md'}
	role="tab"
	aria-selected={active}
	aria-controls={`${ctx.uid}-panel-${value}`}
	tabindex={active ? 0 : -1}
	data-value={value}
	{disabled}
	onclick={() => ctx.select(value)}
	{...restProps}
>
	{@render children()}
</button>

<style>
	.tab {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		font-family: var(--iv_font-sans);
		font-weight: 500;
		color: var(--iv_foreground-dim);
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition:
			color 0.12s,
			border-color 0.12s;

		&.sm {
			padding: 0.4rem 0.625rem;
			font-size: 0.825rem;
		}

		&.md {
			padding: 0.5rem 0.875rem;
			font-size: 0.9rem;
		}

		&:hover:not(:disabled):not(.active) {
			color: var(--iv_foreground);
		}

		&.active {
			color: var(--iv_foreground);
			border-bottom-color: var(--iv_foreground);
		}

		&:focus-visible {
			outline: 2px solid var(--iv_foreground);
			outline-offset: -2px;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
