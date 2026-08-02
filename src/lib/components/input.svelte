<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel';
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		name?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		minlength?: number;
		maxlength?: number;
		min?: number | string;
		max?: number | string;
		pattern?: string;
		label?: string;
		error?: string;
		helper?: string;
		clearable?: boolean;
		size?: 'sm' | 'md' | 'lg';
		leadingIcon?: Snippet;
		trailingIcon?: Snippet;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
		'on:input'?: (e: Event) => void;
		'on:change'?: (e: Event) => void;
		'on:focus'?: (e: FocusEvent) => void;
		'on:blur'?: (e: FocusEvent) => void;
		'on:keydown'?: (e: KeyboardEvent) => void;
	}

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		name = '',
		autocomplete,
		minlength,
		maxlength,
		min,
		max,
		pattern,
		label = '',
		error = '',
		helper = '',
		clearable = false,
		size = 'md',
		leadingIcon,
		trailingIcon,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown,
		'on:input': onEventInput,
		'on:change': onEventChange,
		'on:focus': onEventFocus,
		'on:blur': onEventBlur,
		'on:keydown': onEventKeydown
	}: Props = $props();

	let inputEl = $state<HTMLInputElement>();

	function handleInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
		oninput?.(e);
		onEventInput?.(e);
	}

	function handleChange(e: Event) {
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleFocus(e: FocusEvent) {
		onfocus?.(e);
		onEventFocus?.(e);
	}

	function handleBlur(e: FocusEvent) {
		onblur?.(e);
		onEventBlur?.(e);
	}

	function handleKeydown(e: KeyboardEvent) {
		onkeydown?.(e);
		onEventKeydown?.(e);
	}

	function clear() {
		value = '';
		inputEl?.focus();
	}

	const hasError = $derived(error.length > 0);
	const showClear = $derived(clearable && value.length > 0 && !disabled && !readonly);
	const hasLeading = $derived(!!leadingIcon);
	const hasTrailing = $derived(!!trailingIcon || showClear);
</script>

{#if label}
	<label class="label" for={name || undefined}>
		{label}
		{#if required}
			<span class="required-mark" aria-hidden="true">*</span>
		{/if}
	</label>
{/if}

<div
	class="input-wrapper"
	class:input-sm={size === 'sm'}
	class:input-lg={size === 'lg'}
	class:has-error={hasError}
	class:disabled
>
	{#if hasLeading}
		<span class="icon leading">{@render leadingIcon!()}</span>
	{/if}

	<input
		bind:this={inputEl}
		{type}
		{name}
		{placeholder}
		{disabled}
		{readonly}
		{required}
		{autocomplete}
		{minlength}
		{maxlength}
		{min}
		{max}
		{pattern}
		{value}
		oninput={handleInput}
		onchange={handleChange}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeydown}
		aria-invalid={hasError || undefined}
		aria-describedby={hasError ? `${name}-error` : helper ? `${name}-helper` : undefined}
	/>

	{#if hasTrailing}
		<span class="icon trailing">
			{#if trailingIcon}
				{@render trailingIcon()}
			{/if}
			{#if showClear}
				<button class="clear-btn" onclick={clear} aria-label="Clear input" tabindex="-1"
					><IconX size={14} /></button
				>
			{/if}
		</span>
	{/if}
</div>

{#if hasError}
	<p class="message error-message" id={name ? `${name}-error` : undefined}>{error}</p>
{:else if helper}
	<p class="message helper-message" id={name ? `${name}-helper` : undefined}>{helper}</p>
{/if}

<style>
	.input-wrapper {
		display: flex;
		align-items: center;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
		transition:
			border-color var(--iv_transition-base),
			box-shadow var(--iv_transition-base);
		overflow: hidden;

		&:hover {
			border-color: var(--iv_border-hover);
		}

		&:focus-within {
			border-color: var(--iv_border-focus);
			box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
		}

		&.has-error {
			border-color: var(--iv_error);

			&:focus-within {
				box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_error-surface);
			}
		}

		&.disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}

		&:has(.leading) input {
			padding-left: 8px;
		}

		&:has(.trailing) input {
			padding-right: 8px;
		}
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);

		&.leading {
			padding-left: 13px;
		}

		&.trailing {
			padding-right: 13px;
			gap: 6px;
		}
	}

	input {
		all: unset;
		flex: 1;
		min-width: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-base);
		color: var(--iv_foreground);
		padding: 9px 13px;
		width: 100%;

		&::placeholder {
			color: var(--iv_foreground-dim);
		}

		&:disabled {
			cursor: not-allowed;
		}

		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus {
			-webkit-text-fill-color: var(--iv_foreground);
			-webkit-box-shadow: 0 0 0px 1000px var(--iv_surface-raised) inset;
			transition: background-color 5000s ease-in-out 0s;
		}
	}

	.input-sm {
		--input-padding-y: 5px;

		& input {
			font-size: var(--iv_text-body-sm);
			padding: 5px 11px;
		}

		& .icon.leading {
			padding-left: 11px;
		}

		& .icon.trailing {
			padding-right: 11px;
		}
	}

	.input-lg {
		--input-padding-y: 13px;

		& input {
			font-size: var(--iv_text-lg);
			padding: 13px 16px;
		}

		& .icon.leading {
			padding-left: 16px;
		}

		& .icon.trailing {
			padding-right: 16px;
		}
	}

	.clear-btn {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: var(--iv_foreground-dim);
		flex-shrink: 0;

		&:hover {
			color: var(--iv_foreground);
			background: var(--iv_surface-overlay);
		}
	}

	.label {
		display: block;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: 6px;
	}

	.required-mark {
		color: var(--iv_error);
		margin-left: 2px;
	}

	.message {
		margin: 4px 0 0 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-sm);
	}

	.error-message {
		color: var(--iv_error);
	}

	.helper-message {
		color: var(--iv_foreground-dim);
	}
</style>
