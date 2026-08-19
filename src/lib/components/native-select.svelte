<script lang="ts">
	import { IconChevronDown } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	export type NativeSelectOption = string | { value: string; label?: string; disabled?: boolean };

	interface Props {
		options?: NativeSelectOption[];
		value?: string;
		placeholder?: string;
		label?: string;
		error?: string;
		helper?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		size?: 'sm' | 'md' | 'lg';
		id?: string;
		className?: string;
		onchange?: (e: Event) => void;
		'on:change'?: (e: Event) => void;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		options = [],
		value = $bindable(''),
		placeholder = '',
		label = '',
		error = '',
		helper = '',
		name = '',
		disabled = false,
		required = false,
		size = 'md',
		id = '',
		className = '',
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const selectId = $derived(id || `iv-native-select-${uid}`);

	const normalized = $derived(
		options.map((o) =>
			typeof o === 'string'
				? { value: o, label: o, disabled: false }
				: { value: o.value, label: o.label ?? o.value, disabled: o.disabled ?? false }
		)
	);

	const hasError = $derived(error.length > 0);

	function handleChange(e: Event) {
		onchange?.(e);
		onEventChange?.(e);
	}
</script>

{#if label}
	<label class="iv-label" for={selectId}>
		{label}
		{#if required}
			<span class="iv-required-mark" aria-hidden="true">*</span>
		{/if}
	</label>
{/if}

<div
	class="iv-native-select {className}"
	class:iv-has-error={hasError}
	class:iv-disabled={disabled}
	class:iv-sm={size === 'sm'}
	class:iv-lg={size === 'lg'}
>
	<select
		id={selectId}
		{name}
		{disabled}
		{required}
		bind:value
		onchange={handleChange}
		aria-invalid={hasError || undefined}
		aria-describedby={hasError ? selectId + '-error' : helper ? selectId + '-helper' : undefined}
		aria-label={label ? undefined : placeholder || undefined}
		{...restProps}
	>
		{#if placeholder}
			<option value="" disabled>{placeholder}</option>
		{/if}
		{#if children}
			{@render children()}
		{:else}
			{#each normalized as o (o.value)}
				<option value={o.value} disabled={o.disabled}>{o.label}</option>
			{/each}
		{/if}
	</select>
	<span class="iv-chevron" aria-hidden="true"><IconChevronDown size={16} /></span>
</div>

{#if hasError}
	<p class="iv-message iv-error-message" id={selectId + '-error'}>{error}</p>
{:else if helper}
	<p class="iv-message iv-helper-message" id={selectId + '-helper'}>{helper}</p>
{/if}

<style>
	.iv-native-select {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		transition:
			border-color var(--iv_transition-base),
			box-shadow var(--iv_transition-base);

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
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		flex: 1;
		min-width: 0;
		width: 100%;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-base);
		color: var(--iv_foreground);
		background: transparent;
		padding: var(--iv_control-pad-y) var(--iv_control-pad-x);
		padding-right: calc(var(--iv_control-pad-x) + var(--iv_spacing-lg));
		border: none;
		outline: none;
		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
		}
	}

	option {
		background: var(--iv_surface-raised);
		color: var(--iv_foreground);
	}

	.iv-sm {
		& select {
			font-size: var(--iv_text-body-sm);
			padding: var(--iv_control-pad-y-sm) var(--iv_control-pad-x-sm);
			padding-right: calc(var(--iv_control-pad-x-sm) + var(--iv_spacing-lg));
		}

		& .iv-chevron {
			right: var(--iv_control-pad-x-sm);
		}
	}

	.iv-lg {
		& select {
			font-size: var(--iv_text-lg);
			padding: var(--iv_control-pad-y-lg) var(--iv_control-pad-x-lg);
			padding-right: calc(var(--iv_control-pad-x-lg) + var(--iv_spacing-lg));
		}

		& .iv-chevron {
			right: var(--iv_control-pad-x-lg);
		}
	}

	.iv-chevron {
		position: absolute;
		right: var(--iv_control-pad-x);
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		pointer-events: none;
		color: var(--iv_foreground-dim);
		flex-shrink: 0;
	}

	.iv-label {
		display: block;
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-label);
		font-weight: var(--iv_weight-medium);
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
