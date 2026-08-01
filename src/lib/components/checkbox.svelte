<script lang="ts">
	import { IconCheck, IconMinus } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		required?: boolean;
		label?: string;
		name?: string;
		value?: string;
		size?: 'sm' | 'md';
		children?: Snippet;
		onchange?: (e: CustomEvent<{ checked: boolean }>) => void;
		'on:change'?: (e: CustomEvent<{ checked: boolean }>) => void;
		onfocus?: (e: FocusEvent) => void;
		'on:focus'?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
		'on:blur'?: (e: FocusEvent) => void;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		required = false,
		label = '',
		name = '',
		value = '',
		size = 'md',
		children,
		onchange,
		'on:change': onEventChange,
		onfocus,
		'on:focus': onEventFocus,
		onblur,
		'on:blur': onEventBlur
	}: Props = $props();

	const uid = $props.id();
	const boxId = `iv-checkbox-${uid}`;

	let inputEl = $state<HTMLInputElement>();

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { checked } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleInput(e: Event) {
		checked = (e.target as HTMLInputElement).checked;
		dispatchChange();
	}

	function handleFocus(e: FocusEvent) {
		onfocus?.(e);
		onEventFocus?.(e);
	}

	function handleBlur(e: FocusEvent) {
		onblur?.(e);
		onEventBlur?.(e);
	}

	$effect(() => {
		if (inputEl) inputEl.indeterminate = indeterminate;
	});

	const iconSize = $derived(size === 'sm' ? 12 : 14);
	const hasLabel = $derived(!!(label || children));
</script>

<label class="root" class:disabled>
	<input
		bind:this={inputEl}
		type="checkbox"
		class="native"
		{checked}
		{disabled}
		{required}
		{name}
		{value}
		aria-labelledby={hasLabel ? boxId : undefined}
		onchange={handleInput}
		onfocus={handleFocus}
		onblur={handleBlur}
	/>
	<span
		class="box"
		class:checked
		class:indeterminate
		class:sm={size === 'sm'}
		class:md={size === 'md'}
		aria-hidden="true"
	>
		{#if indeterminate}
			<IconMinus size={iconSize} stroke={3} />
		{:else if checked}
			<IconCheck size={iconSize} stroke={3} />
		{/if}
	</span>
	{#if children || label}
		<span class="label" id={boxId}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</span>
	{/if}
</label>

<style>
	.root {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		user-select: none;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.native {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-inverse);
		transition:
			background 0.12s,
			border-color 0.12s;

		&.sm {
			width: 16px;
			height: 16px;
		}

		&.md {
			width: 20px;
			height: 20px;
		}

		&.checked,
		&.indeterminate {
			background: var(--iv_foreground);
			border-color: var(--iv_foreground);
		}
	}

	.native:focus-visible + .box {
		outline: 2px solid var(--iv_foreground);
		outline-offset: 2px;
	}

	.label {
		font-family: var(--iv_font-sans);
		font-size: 0.9rem;
		color: var(--iv_foreground);
		line-height: 1.4;
	}
</style>
