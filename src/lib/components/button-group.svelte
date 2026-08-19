<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Icon } from '@tabler/icons-svelte';
	import Button from './button.svelte';

	export type ButtonGroupMode = 'single' | 'multiple' | 'none';
	export type ButtonGroupVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

	export type ButtonGroupItem =
		| string
		| {
				value: string;
				label?: string;
				icon?: Icon;
				disabled?: boolean;
		  };

	interface NormalizedItem {
		value: string;
		label: string;
		icon?: Icon;
		disabled: boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange' | 'on:change'> {
		items?: ButtonGroupItem[];
		mode?: ButtonGroupMode;
		value?: string | string[];
		label?: string;
		className?: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: ButtonGroupVariant;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		fullWidth?: boolean;
		onchange?: (e: CustomEvent<{ value: string | string[] }>) => void;
		'on:change'?: (e: CustomEvent<{ value: string | string[] }>) => void;
		children?: Snippet;
	}

	function normalize(o: ButtonGroupItem): NormalizedItem {
		if (typeof o === 'string') return { value: o, label: o, disabled: false };
		return {
			value: o.value,
			label: o.label ?? o.value,
			icon: o.icon,
			disabled: o.disabled ?? false
		};
	}

	let {
		items = [],
		mode = 'none',
		value = $bindable(mode === 'multiple' ? [] : ''),
		label = '',
		className = '',
		size = 'md',
		variant = 'secondary',
		orientation = 'horizontal',
		disabled = false,
		fullWidth = false,
		onchange,
		'on:change': onEventChange,
		children,
		...restProps
	}: Props = $props();

	const normalizedItems = $derived(items.map(normalize));

	function isSelected(v: string) {
		if (mode === 'single') return value === v;
		if (mode === 'multiple') return Array.isArray(value) && value.includes(v);
		return false;
	}

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { value } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function handleSelect(v: string) {
		if (disabled) return;
		if (mode === 'single') {
			value = v;
		} else if (mode === 'multiple') {
			const current = Array.isArray(value) ? value : [];
			value = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
		}
		dispatchChange();
	}
</script>

<div
	class="iv-btn-group {className}"
	class:iv-vertical={orientation === 'vertical'}
	class:iv-full-width={fullWidth}
	class:iv-disabled={disabled}
	role="group"
	aria-label={label || undefined}
	{...restProps}
>
	{#if normalizedItems.length > 0}
		{#each normalizedItems as item (item.value)}
			<Button
				{variant}
				{size}
				disabled={disabled || item.disabled}
				className={isSelected(item.value) ? 'iv-selected' : ''}
				aria-pressed={mode === 'none' ? undefined : isSelected(item.value)}
				onclick={() => handleSelect(item.value)}
			>
				{#if item.icon}
					<item.icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
				{/if}
				{item.label}
			</Button>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</div>

<style>
	.iv-btn-group {
		display: inline-flex;
		align-items: stretch;

		> :global(.iv-btn) {
			border-radius: 0;
		}

		> :global(.iv-btn:first-child) {
			border-radius: var(--iv_radius-sm) 0 0 var(--iv_radius-sm);
		}

		> :global(.iv-btn:last-child) {
			border-radius: 0 var(--iv_radius-sm) var(--iv_radius-sm) 0;
		}

		> :global(.iv-btn:only-child) {
			border-radius: var(--iv_radius-sm);
		}

		> :global(.iv-btn:not(:first-child)) {
			margin-left: -1px;
		}

		> :global(.iv-btn:focus-visible),
		> :global(.iv-btn.iv-selected) {
			position: relative;
			z-index: 1;
		}

		> :global(.iv-btn.iv-selected) {
			background: var(--iv_reverse-bg);
			border-color: var(--iv_reverse-bg);
			color: var(--iv_reverse-fg);
			box-shadow: inset 0 -3px 0 var(--iv_cursor);

			&:hover {
				background: var(--iv_reverse-hover);
				border-color: var(--iv_reverse-hover);
				color: var(--iv_surface);
			}
		}

		&.iv-vertical {
			flex-direction: column;
			align-items: stretch;

			> :global(.iv-btn:first-child) {
				border-radius: var(--iv_radius-sm) var(--iv_radius-sm) 0 0;
			}

			> :global(.iv-btn:last-child) {
				border-radius: 0 0 var(--iv_radius-sm) var(--iv_radius-sm);
			}

			> :global(.iv-btn:not(:first-child)) {
				margin-left: 0;
				margin-top: -1px;
			}
		}

		&.iv-full-width {
			display: flex;
			width: 100%;

			> :global(.iv-btn) {
				flex: 1 1 0;
			}
		}

		&.iv-disabled {
			cursor: not-allowed;
		}
	}
</style>
