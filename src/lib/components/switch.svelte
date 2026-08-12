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

<div class="iv-root" class:iv-disabled={disabled}>
	<div
		class="iv-switch"
		class:iv-checked={checked}
		class:iv-disabled={disabled}
		class:iv-sm={size === 'sm'}
		class:iv-md={size === 'md'}
		role="switch"
		tabindex={disabled ? -1 : 0}
		aria-checked={checked}
		aria-labelledby={label ? labelId : undefined}
		onclick={handleClick}
		onkeydown={handleKeydown}
		onfocus={handleFocus}
		onblur={handleBlur}
	>
		<span class="iv-thumb" aria-hidden="true"></span>
	</div>

	{#if label}
		<span class="iv-label" id={labelId}>{label}</span>
	{/if}
</div>

<style>
	.iv-root {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-sm);

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}

	.iv-switch {
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-elevated);
		border: 1px solid var(--iv_border);
		cursor: pointer;
		transition: background var(--iv_transition-fast);

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}

		&.iv-sm {
			width: var(--iv_switch-w-sm);
			height: var(--iv_switch-h-sm);
		}

		&.iv-md {
			width: var(--iv_switch-w);
			height: var(--iv_switch-h);
		}

		&.iv-checked {
			background: var(--iv_accent-dim);
			border-color: var(--iv_accent-dim);
		}

		&.iv-disabled {
			cursor: not-allowed;
		}
	}

	.iv-thumb {
		position: absolute;
		left: 2px;
		border-radius: 50%;
		background: var(--iv_foreground);
		transition: transform var(--iv_transition-fast);

		.iv-switch.iv-sm & {
			width: var(--iv_thumb-sm);
			height: var(--iv_thumb-sm);
		}

		.iv-switch.iv-md & {
			width: var(--iv_thumb-md);
			height: var(--iv_thumb-md);
		}

		.iv-switch.iv-checked & {
			transform: translateX(calc(100% - 4px));
		}

		.iv-switch.iv-sm.iv-checked & {
			transform: translateX(calc(var(--iv_switch-w-sm) - var(--iv_thumb-sm) - 4px));
		}

		.iv-switch.iv-md.iv-checked & {
			transform: translateX(calc(var(--iv_switch-w) - var(--iv_thumb-md) - 4px));
		}
	}

	.iv-label {
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground);
		line-height: 1.4;
		cursor: pointer;
	}
</style>
