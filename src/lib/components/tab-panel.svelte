<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { tabsContextKey, type TabsContext } from './tabs-context.js';

	interface Props {
		value: string;
		className?: string;
		children: Snippet;
	}

	let { value, className = '', children, ...restProps }: Props = $props();

	const ctx = getContext<TabsContext>(tabsContextKey);
	const active = $derived(ctx.isActive(value));
</script>

{#if active}
	<div
		id={`${ctx.uid}-panel-${value}`}
		class="iv-tab-panel {className}"
		class:iv-bordered={ctx.bordered}
		role="tabpanel"
		aria-labelledby={`${ctx.uid}-tab-${value}`}
		tabindex="0"
		{...restProps}
	>
		{@render children()}
	</div>
{/if}

<style>
	.iv-tab-panel {
		padding: var(--iv_spacing-xl) 0;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
		line-height: var(--iv_leading-base);

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}

		&.iv-bordered {
			padding: var(--iv_spacing-xl);
		}
	}
</style>
