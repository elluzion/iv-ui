<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { accordionContextKey, type AccordionContext } from './accordion-context.js';

	export type AccordionValue = string | string[];

	interface Props {
		multiple?: boolean;
		value?: AccordionValue;
		defaultValue?: AccordionValue;
		disabled?: boolean;
		className?: string;
		onchange?: (e: CustomEvent<{ value: AccordionValue }>) => void;
		'on:change'?: (e: CustomEvent<{ value: AccordionValue }>) => void;
		children: Snippet;
	}

	let {
		multiple = false,
		value = $bindable<AccordionValue>(),
		defaultValue,
		disabled = false,
		className = '',
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	// svelte-ignore state_referenced_locally (uncontrolled initial value, captured once)
	const initialValue = defaultValue;

	function toArray(v: AccordionValue | undefined): string[] {
		if (v === undefined) return [];
		return Array.isArray(v) ? v : v === '' ? [] : [v];
	}

	let internal = $state<string[]>(toArray(initialValue));

	const openValues = $derived<string[]>(value !== undefined ? toArray(value) : internal);

	function dispatchChange(next: AccordionValue) {
		const e = new CustomEvent('change', { detail: { value: next } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function toggle(itemValue: string) {
		if (disabled) return;
		let next: string[];
		if (multiple) {
			next = openValues.includes(itemValue)
				? openValues.filter((v) => v !== itemValue)
				: [...openValues, itemValue];
		} else {
			next = openValues.includes(itemValue) ? [] : [itemValue];
		}
		const nextValue: AccordionValue = multiple ? next : next.length > 0 ? next[0] : '';
		if (value !== undefined) {
			value = nextValue;
		} else {
			internal = next;
		}
		dispatchChange(nextValue);
	}

	function isOpen(itemValue: string) {
		return openValues.includes(itemValue);
	}

	setContext<AccordionContext>(accordionContextKey, { isOpen, toggle });
</script>

<div class="iv-accordion {className}" class:iv-disabled={disabled} {...restProps}>
	{@render children()}
</div>

<style>
	.iv-accordion {
		box-sizing: border-box;
		width: 100%;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		overflow: hidden;

		&.iv-disabled {
			cursor: not-allowed;
		}
	}
</style>
