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
		id?: string;
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
		[key: string]: unknown;
	}

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		name = '',
		id = '',
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
		'on:keydown': onEventKeydown,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const inputId = $derived(id || `iv-input-${uid}`);

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
	<label class="iv-label" for={inputId}>
		{label}
		{#if required}
			<span class="iv-required-mark" aria-hidden="true">*</span>
		{/if}
	</label>
{/if}

<div
	class="iv-input-wrapper"
	class:iv-input-sm={size === 'sm'}
	class:iv-input-lg={size === 'lg'}
	class:iv-has-error={hasError}
	class:iv-disabled={disabled}
>
	{#if hasLeading}
		<span class="iv-icon iv-leading">{@render leadingIcon!()}</span>
	{/if}

	<input
		bind:this={inputEl}
		id={inputId}
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
		aria-describedby={hasError ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
		aria-label={label ? undefined : placeholder || undefined}
		{...restProps}
	/>

	{#if hasTrailing}
		<span class="iv-icon iv-trailing">
			{#if trailingIcon}
				{@render trailingIcon()}
			{/if}
			{#if showClear}
				<button class="iv-clear-btn" onclick={clear} aria-label="Clear input" tabindex="-1"
					><IconX size={14} /></button
				>
			{/if}
		</span>
	{/if}
</div>

{#if hasError}
	<p class="iv-message iv-error-message" id={inputId ? `${inputId}-error` : undefined}>{error}</p>
{:else if helper}
	<p class="iv-message iv-helper-message" id={inputId ? `${inputId}-helper` : undefined}>
		{helper}
	</p>
{/if}

<style>
	.iv-input-wrapper {
		display: flex;
		align-items: center;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
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
			box-shadow:
				inset 0 0 0 var(--iv_ring-width) var(--iv_ring),
				inset 3px 0 0 var(--iv_cursor);
		}

		&.iv-has-error {
			border-color: var(--iv_border-error);

			&:focus-within {
				box-shadow: inset 0 0 0 var(--iv_ring-width) var(--iv_error-surface);
			}
		}

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}

		&:has(.iv-leading) input {
			padding-left: var(--iv_spacing-sm);
		}

		&:has(.iv-trailing) input {
			padding-right: var(--iv_spacing-sm);
		}
	}

	.iv-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);

		&.iv-leading {
			padding-left: var(--iv_spacing-md);
		}
	}

	input {
		all: unset;
		flex: 1;
		min-width: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-base);
		color: var(--iv_foreground);
		padding: var(--iv_control-pad-y) var(--iv_control-pad-x);
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

	.iv-input-sm {
		--input-padding-y: var(--iv_control-pad-y-sm);

		& input {
			font-size: var(--iv_text-body-sm);
			padding: var(--iv_control-pad-y-sm) var(--iv_control-pad-x-sm);
		}

		& .iv-icon.iv-leading {
			padding-left: var(--iv_control-pad-x-sm);
		}

		& .iv-icon.iv-trailing {
			padding-right: var(--iv_control-pad-x-sm);
		}
	}

	.iv-input-lg {
		--input-padding-y: var(--iv_control-pad-y-lg);

		& input {
			font-size: var(--iv_text-lg);
			padding: var(--iv_control-pad-y-lg) var(--iv_control-pad-x-lg);
		}

		& .iv-icon.iv-leading {
			padding-left: var(--iv_control-pad-x-lg);
		}

		& .iv-icon.iv-trailing {
			padding-right: var(--iv_control-pad-x-lg);
		}
	}

	.iv-clear-btn {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--iv_control-md);
		height: var(--iv_control-md);
		border-radius: var(--iv_radius-sm);
		color: var(--iv_foreground-dim);
		flex-shrink: 0;

		&:hover {
			color: var(--iv_foreground);
			background: var(--iv_surface-overlay);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
			color: var(--iv_foreground);
		}
	}

	.iv-label {
		display: block;
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-label);
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: var(--iv_spacing-sm);
	}

	.iv-required-mark {
		color: var(--iv_error);
		margin-left: var(--iv_spacing-2xs);
	}

	.iv-message {
		margin: var(--iv_spacing-xs) 0 0 0;
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-sm);
	}

	.iv-error-message {
		color: var(--iv_error);
	}

	.iv-helper-message {
		color: var(--iv_foreground-dim);
	}
</style>
