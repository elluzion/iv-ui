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

<div class="root" class:horizontal={orientation === 'horizontal'} class:disabled>
	{#if label}
		<span class="group-label" id={groupLabelId}>{label}</span>
	{/if}

	<div class="items">
		{#each normalized as item (item.value)}
			<label class="item" class:disabled={disabled || item.disabled}>
				<input
					type="radio"
					class="native"
					checked={value === item.value}
					{name}
					disabled={disabled || item.disabled}
					aria-labelledby={label ? groupLabelId : undefined}
					onchange={() => handleChange(item.value)}
				/>
				<span
					class="circle"
					class:sm={size === 'sm'}
					class:md={size === 'md'}
					class:checked={value === item.value}
					aria-hidden="true"
				>
					{#if value === item.value}
						<span class="dot"></span>
					{/if}
				</span>
				<span class="label">{item.label}</span>
			</label>
		{/each}
	</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		&.disabled {
			cursor: not-allowed;
		}
	}

	.group-label {
		font-family: var(--iv_font-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: 2px;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.root.horizontal .items {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
	}

	.item {
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

	.circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1.5px solid var(--iv_border);
		border-radius: 50%;
		background: var(--iv_surface-raised);
		transition:
			border-color 0.12s,
			background 0.12s;

		&.sm {
			width: 16px;
			height: 16px;
		}

		&.md {
			width: 20px;
			height: 20px;
		}

		&.checked {
			border-color: var(--iv_foreground);
		}
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--iv_foreground);
	}

	.circle.sm .dot {
		width: 5px;
		height: 5px;
	}

	.native:focus-visible + .circle {
		outline: 2px solid var(--iv_foreground);
		outline-offset: 2px;
	}

	.label {
		font-family: var(--iv_font-sans);
		font-size: 0.9rem;
		color: var(--iv_foreground);
		line-height: 1.4;
	}

	.item:has(.sm) .label {
		font-size: 0.825rem;
	}
</style>
