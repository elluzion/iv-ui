<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { tabsContextKey, type TabsContext } from './tabs-context.js';

	interface Props {
		value?: string;
		defaultValue?: string;
		size?: 'sm' | 'md';
		bordered?: boolean;
		className?: string;
		onchange?: (e: CustomEvent<{ value: string }>) => void;
		'on:change'?: (e: CustomEvent<{ value: string }>) => void;
		children: Snippet;
	}

	let {
		value = $bindable<string>(),
		defaultValue = '',
		size = 'md',
		bordered = false,
		className = '',
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	const uid = $props.id();

	// svelte-ignore state_referenced_locally (uncontrolled initial value, captured once)
	const initialValue = defaultValue;

	let internal = $state(initialValue);

	const current = $derived(value !== undefined ? value : internal);

	function dispatch() {
		const e = new CustomEvent('change', { detail: { value: current } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function select(v: string) {
		if (v === current) return;
		if (value !== undefined) {
			value = v;
		} else {
			internal = v;
		}
		dispatch();
	}

	function isActive(v: string) {
		return v === current;
	}

	setContext<TabsContext>(tabsContextKey, {
		uid,
		get size() {
			return size;
		},
		get bordered() {
			return bordered;
		},
		isActive,
		select
	});
</script>

<div class="tabs {className}" class:bordered {...restProps}>
	{@render children()}
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
		width: 100%;

		&.bordered {
			border: 1px solid var(--iv_border);
			border-radius: var(--iv_radius);
			overflow: hidden;
		}
	}
</style>
