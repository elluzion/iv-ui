<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { tabsContextKey, type TabsContext } from './tabs-context.js';

	interface Props {
		label?: string;
		className?: string;
		children: Snippet;
	}

	let { label = '', className = '', children, ...restProps }: Props = $props();

	const ctx = getContext<TabsContext>(tabsContextKey);

	let rootEl = $state<HTMLDivElement>();

	function handleKeydown(e: KeyboardEvent) {
		if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
		const tabs = Array.from(
			rootEl?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
		);
		if (tabs.length === 0) return;
		const current = tabs.findIndex((t) => ctx.isActive(t.dataset.value ?? ''));
		let next = current;
		switch (e.key) {
			case 'ArrowRight':
				next = (current + 1) % tabs.length;
				break;
			case 'ArrowLeft':
				next = (current - 1 + tabs.length) % tabs.length;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = tabs.length - 1;
				break;
		}
		e.preventDefault();
		ctx.select(tabs[next].dataset.value ?? '');
		tabs[next].focus();
	}
</script>

<div
	class="iv-tab-list {className}"
	role="tablist"
	aria-label={label || undefined}
	aria-orientation="horizontal"
	bind:this={rootEl}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children()}
</div>

<style>
	.iv-tab-list {
		display: flex;
		align-items: flex-end;
		gap: var(--iv_spacing-xs);
		border-bottom: 1px solid var(--iv_border);
	}
</style>
