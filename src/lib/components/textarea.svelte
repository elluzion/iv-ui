<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		name?: string;
		rows?: number;
		maxlength?: number;
		label?: string;
		error?: string;
		helper?: string;
		resizable?: 'none' | 'vertical' | 'horizontal' | 'both';
		showCount?: boolean;
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
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		name = '',
		rows = 4,
		maxlength,
		label = '',
		error = '',
		helper = '',
		resizable = 'vertical',
		showCount = false,
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

	function handleInput(e: Event) {
		value = (e.target as HTMLTextAreaElement).value;
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

	const hasError = $derived(error.length > 0);
	const charCount = $derived(value.length);
	const showCharCount = $derived(showCount && maxlength !== undefined);
	const isOverLimit = $derived(maxlength !== undefined && charCount > maxlength);
</script>

<div class="iv-textarea-container">
	{#if label}
		<label class="iv-label" for={name || undefined}>
			{label}
			{#if required}
				<span class="iv-required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div
		class="iv-textarea-wrapper"
		class:iv-has-error={hasError || isOverLimit}
		class:iv-disabled={disabled}
		style:--textarea-resize={resizable}
	>
		<textarea
			{name}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{rows}
			{maxlength}
			{value}
			oninput={handleInput}
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
			aria-invalid={hasError || isOverLimit || undefined}
			aria-describedby={hasError ? `${name}-error` : helper ? `${name}-helper` : undefined}
		></textarea>
	</div>

	<div class="iv-footer-row">
		{#if hasError || isOverLimit}
			<p class="iv-message iv-error-message" id={name ? `${name}-error` : undefined}>
				{isOverLimit ? `${charCount} / ${maxlength} — limit exceeded` : error}
			</p>
		{:else if helper}
			<p class="iv-message iv-helper-message" id={name ? `${name}-helper` : undefined}>{helper}</p>
		{:else}
			<span></span>
		{/if}

		{#if showCharCount}
			<span class="iv-char-count" class:iv-over-limit={isOverLimit}>{charCount} / {maxlength}</span>
		{/if}
	</div>
</div>

<style>
	.iv-textarea-container {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.iv-textarea-wrapper {
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

		&.iv-has-error {
			border-color: var(--iv_error);

			&:focus-within {
				box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_error-surface);
			}
		}

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}

	textarea {
		all: unset;
		display: block;
		width: 100%;
		box-sizing: border-box;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-base);
		color: var(--iv_foreground);
		padding: 9px 13px;
		resize: var(--textarea-resize, vertical);
		line-height: 1.5;

		&::placeholder {
			color: var(--iv_foreground-dim);
		}

		&:disabled {
			cursor: not-allowed;
		}
	}

	.iv-label {
		display: block;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: var(--iv_spacing-sm);
	}

	.iv-required-mark {
		color: var(--iv_error);
		margin-left: var(--iv_spacing-2xs);
	}

	.iv-footer-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--iv_spacing-sm);
	}

	.iv-message {
		margin: 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-sm);
	}

	.iv-error-message {
		color: var(--iv_error);
	}

	.iv-helper-message {
		color: var(--iv_foreground-dim);
	}

	.iv-char-count {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
		flex-shrink: 0;

		&.iv-over-limit {
			color: var(--iv_error);
		}
	}
</style>
