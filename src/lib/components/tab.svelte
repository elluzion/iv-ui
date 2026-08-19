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
	class="iv-tab {className}"
	class:iv-active={active}
	class:iv-disabled={disabled}
	class:iv-sm={ctx.size === 'sm'}
	class:iv-md={ctx.size === 'md'}
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
	.iv-tab {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		font-family: var(--iv_font-ui);
		font-weight: 500;
		color: var(--iv_foreground-dim);
		white-space: nowrap;
		border-radius: var(--iv_radius-sm);
		transition:
			color var(--iv_transition-fast),
			background var(--iv_transition-fast),
			box-shadow var(--iv_transition-fast);

		&.iv-sm {
			padding: 0.4rem var(--iv_spacing-sm);
			font-size: var(--iv_text-btn-sm);
		}

		&.iv-md {
			padding: var(--iv_spacing-sm) var(--iv_spacing-md);
			font-size: var(--iv_text-body);
		}

		&:hover:not(:disabled):not(.iv-active) {
			color: var(--iv_foreground);
		}

		&.iv-active {
			color: var(--iv_reverse-fg);
			background: var(--iv_reverse-bg);
			box-shadow: inset 0 -3px 0 var(--iv_cursor);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: -2px;
		}

		&:disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}
</style>
