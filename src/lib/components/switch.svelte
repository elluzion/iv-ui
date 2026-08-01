<script lang="ts">
	interface Props {
		checked?: boolean;
		disabled?: boolean;
		label?: string;
		size?: 'sm' | 'md';
		onchange?: (e: CustomEvent<{ checked: boolean }>) => void;
		'on:change'?: (e: CustomEvent<{ checked: boolean }>) => void;
		onfocus?: (e: FocusEvent) => void;
		'on:focus'?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
		'on:blur'?: (e: FocusEvent) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label = '',
		size = 'md',
		onchange,
		'on:change': onEventChange,
		onfocus,
		'on:focus': onEventFocus,
		onblur,
		'on:blur': onEventBlur
	}: Props = $props();

	const uid = $props.id();
	const labelId = `iv-switch-${uid}-label`;

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { checked } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			checked = !checked;
			dispatchChange();
		}
	}

	function handleClick() {
		if (disabled) return;
		checked = !checked;
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
</script>

<div class="root" class:disabled>
	<div
		class="switch"
		class:checked
		class:disabled
		class:sm={size === 'sm'}
		class:md={size === 'md'}
		role="switch"
		tabindex={disabled ? -1 : 0}
		aria-checked={checked}
		aria-labelledby={label ? labelId : undefined}
		onclick={handleClick}
		onkeydown={handleKeydown}
		onfocus={handleFocus}
		onblur={handleBlur}
	>
		<span class="thumb" aria-hidden="true"></span>
	</div>

	{#if label}
		<span class="label" id={labelId}>{label}</span>
	{/if}
</div>

<style>
	.root {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.switch {
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-elevated);
		border: 1px solid var(--iv_border);
		cursor: pointer;
		transition: background 0.12s;

		&:focus-visible {
			outline: 2px solid var(--iv_foreground);
			outline-offset: 2px;
		}

		&.sm {
			width: 32px;
			height: 18px;
		}

		&.md {
			width: 40px;
			height: 22px;
		}

		&.checked {
			background: var(--iv_accent-dim);
			border-color: var(--iv_accent-dim);
		}

		&.disabled {
			cursor: not-allowed;
		}
	}

	.thumb {
		position: absolute;
		left: 2px;
		border-radius: 50%;
		background: var(--iv_foreground);
		transition: transform 0.12s;

		.switch.sm & {
			width: 14px;
			height: 14px;
		}

		.switch.md & {
			width: 18px;
			height: 18px;
		}

		.switch.checked & {
			transform: translateX(calc(100% - 4px));
		}

		.switch.sm.checked & {
			transform: translateX(14px);
		}

		.switch.md.checked & {
			transform: translateX(18px);
		}
	}

	.label {
		font-family: var(--iv_font-sans);
		font-size: 0.9rem;
		color: var(--iv_foreground);
		line-height: 1.4;
		cursor: pointer;
	}
</style>
