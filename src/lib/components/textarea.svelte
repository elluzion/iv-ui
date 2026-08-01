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

<div class="textarea-container">
	{#if label}
		<label class="label" for={name || undefined}>
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div
		class="textarea-wrapper"
		class:has-error={hasError || isOverLimit}
		class:disabled
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

	<div class="footer-row">
		{#if hasError || isOverLimit}
			<p class="message error-message" id={name ? `${name}-error` : undefined}>
				{isOverLimit ? `${charCount} / ${maxlength} — limit exceeded` : error}
			</p>
		{:else if helper}
			<p class="message helper-message" id={name ? `${name}-helper` : undefined}>{helper}</p>
		{:else}
			<span></span>
		{/if}

		{#if showCharCount}
			<span class="char-count" class:over-limit={isOverLimit}>{charCount} / {maxlength}</span>
		{/if}
	</div>
</div>

<style>
	.textarea-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.textarea-wrapper {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--ink-2);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
		overflow: hidden;

		&:hover {
			border-color: var(--line-hover);
		}

		&:focus-within {
			border-color: var(--line-focus);
			box-shadow: 0 0 0 3px var(--ring);
		}

		&.has-error {
			border-color: var(--rust);

			&:focus-within {
				box-shadow: 0 0 0 3px rgba(232, 115, 74, 0.15);
			}
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	textarea {
		all: unset;
		display: block;
		width: 100%;
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--paper);
		padding: 9px 13px;
		resize: var(--textarea-resize, vertical);
		line-height: 1.5;

		&::placeholder {
			color: var(--paper-dim);
		}

		&:disabled {
			cursor: not-allowed;
		}
	}

	.label {
		display: block;
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--paper);
		margin-bottom: 6px;
	}

	.required-mark {
		color: var(--rust);
		margin-left: 2px;
	}

	.footer-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.message {
		margin: 0;
		font-family: var(--font-sans);
		font-size: 0.8rem;
	}

	.error-message {
		color: var(--rust);
	}

	.helper-message {
		color: var(--paper-dim);
	}

	.char-count {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--paper-dim);
		flex-shrink: 0;

		&.over-limit {
			color: var(--rust);
		}
	}
</style>
