<script lang="ts">
	export type RadioItem = string | { value: string; label?: string; disabled?: boolean };

	interface NormalizedRadio {
		value: string;
		label: string;
		disabled: boolean;
	}

	interface Props {
		items: RadioItem[];
		value?: string;
		label?: string;
		name?: string;
		size?: 'sm' | 'md';
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		onchange?: (e: CustomEvent<{ value: string }>) => void;
		'on:change'?: (e: CustomEvent<{ value: string }>) => void;
	}

	function normalize(o: RadioItem): NormalizedRadio {
		if (typeof o === 'string') return { value: o, label: o, disabled: false };
		return { value: o.value, label: o.label ?? o.value, disabled: o.disabled ?? false };
	}

	let {
		items = [],
		value = $bindable(''),
		label = '',
		name = '',
		size = 'md',
		orientation = 'vertical',
		disabled = false,
		onchange,
		'on:change': onEventChange
	}: Props = $props();

	const uid = $props.id();
	const groupLabelId = `iv-radio-${uid}-label`;

	const normalized = $derived(items.map(normalize));

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { value } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleChange(v: string) {
		value = v;
		dispatchChange();
	}
</script>

<div
	class="iv-root"
	class:iv-horizontal={orientation === 'horizontal'}
	class:iv-disabled={disabled}
>
	{#if label}
		<span class="iv-group-label" id={groupLabelId}>{label}</span>
	{/if}

	<div class="iv-items">
		{#each normalized as item (item.value)}
			<label class="iv-item" class:iv-disabled={disabled || item.disabled}>
				<input
					type="radio"
					class="iv-native"
					checked={value === item.value}
					{name}
					disabled={disabled || item.disabled}
					aria-labelledby={label ? groupLabelId : undefined}
					onchange={() => handleChange(item.value)}
				/>
				<span
					class="iv-circle"
					class:iv-sm={size === 'sm'}
					class:iv-md={size === 'md'}
					class:iv-checked={value === item.value}
					aria-hidden="true"
				>
					{#if value === item.value}
						<span class="iv-dot"></span>
					{/if}
				</span>
				<span class="iv-label">{item.label}</span>
			</label>
		{/each}
	</div>
</div>

<style>
	.iv-root {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);

		&.iv-disabled {
			cursor: not-allowed;
		}
	}

	.iv-group-label {
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: var(--iv_spacing-2xs);
	}

	.iv-items {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.iv-root.iv-horizontal .iv-items {
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--iv_spacing-sm) var(--iv_spacing-xl);
	}

	.iv-item {
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

	.iv-circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: var(--iv_radio-border) solid var(--iv_border);
		border-radius: 50%;
		background: var(--iv_surface-raised);
		transition:
			border-color var(--iv_transition-fast),
			background var(--iv_transition-fast);

		&.iv-sm {
			width: var(--iv_control-sm);
			height: var(--iv_control-sm);
		}

		&.iv-md {
			width: var(--iv_control-md);
			height: var(--iv_control-md);
		}

		&.iv-checked {
			border-color: var(--iv_foreground);
		}
	}

	.iv-dot {
		width: var(--iv_radio-dot);
		height: var(--iv_radio-dot);
		border-radius: 50%;
		background: var(--iv_foreground);
	}

	.iv-circle.iv-sm .iv-dot {
		width: var(--iv_radio-dot-sm);
		height: var(--iv_radio-dot-sm);
	}

	.iv-native:focus-visible + .iv-circle {
		outline: var(--iv_outline-width) solid var(--iv_foreground);
		outline-offset: var(--iv_outline-offset);
	}

	.iv-label {
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground);
		line-height: 1.4;
	}

	.iv-item:has(.iv-sm) .iv-label {
		font-size: var(--iv_text-btn-sm);
	}
</style>
