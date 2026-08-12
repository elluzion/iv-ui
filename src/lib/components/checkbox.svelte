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

<label class="iv-root" class:iv-disabled={disabled}>
	<input
		bind:this={inputEl}
		type="checkbox"
		class="iv-native"
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
		class="iv-box"
		class:iv-checked={checked}
		class:iv-indeterminate={indeterminate}
		class:iv-sm={size === 'sm'}
		class:iv-md={size === 'md'}
		aria-hidden="true"
	>
		{#if indeterminate}
			<IconMinus size={iconSize} stroke={3} />
		{:else if checked}
			<IconCheck size={iconSize} stroke={3} />
		{/if}
	</span>
	{#if children || label}
		<span class="iv-label" id={boxId}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</span>
	{/if}
</label>

<style>
	.iv-root {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		cursor: pointer;
		user-select: none;

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}

	.iv-native {
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

	.iv-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-inverse);
		transition:
			background var(--iv_transition-fast),
			border-color var(--iv_transition-fast);

		&.iv-sm {
			width: var(--iv_control-sm);
			height: var(--iv_control-sm);
		}

		&.iv-md {
			width: var(--iv_control-md);
			height: var(--iv_control-md);
		}

		&.iv-checked,
		&.iv-indeterminate {
			background: var(--iv_foreground);
			border-color: var(--iv_foreground);
		}
	}

	.iv-native:focus-visible + .iv-box {
		outline: var(--iv_outline-width) solid var(--iv_foreground);
		outline-offset: var(--iv_outline-offset);
	}

	.iv-label {
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground);
		line-height: var(--iv_leading-tight);
	}
</style>
