<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Icon } from '@tabler/icons-svelte';
	import Toggle from './toggle.svelte';

	export type ToggleGroupMode = 'single' | 'multiple' | 'none';

	export type ToggleGroupItem =
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
		items?: ToggleGroupItem[];
		mode?: ToggleGroupMode;
		value?: string | string[];
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		onchange?: (e: CustomEvent<{ value: string | string[] }>) => void;
		'on:change'?: (e: CustomEvent<{ value: string | string[] }>) => void;
		children?: Snippet;
	}

	function normalize(o: ToggleGroupItem): NormalizedItem {
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
		size = 'md',
		orientation = 'horizontal',
		disabled = false,
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
	class="iv-toggle-group"
	class:iv-vertical={orientation === 'vertical'}
	class:iv-sm={size === 'sm'}
	class:iv-lg={size === 'lg'}
	class:iv-disabled={disabled}
	role="group"
	aria-label={label || undefined}
	{...restProps}
>
	{#if normalizedItems.length > 0}
		{#each normalizedItems as item (item.value)}
			<Toggle
				{size}
				disabled={disabled || item.disabled}
				checked={isSelected(item.value)}
				label={item.label}
				onclick={() => handleSelect(item.value)}
			>
				{#if item.icon}
					<item.icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
				{/if}
				{item.label}
			</Toggle>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</div>

<style>
	.iv-toggle-group {
		--iv_tg-radius: var(--iv_radius);

		display: inline-flex;
		align-items: stretch;

		&.iv-sm {
			--iv_tg-radius: var(--iv_radius-sm);
		}

		&.iv-lg {
			--iv_tg-radius: var(--iv_radius-lg);
		}

		> :global(.iv-toggle) {
			border-radius: 0;
		}

		> :global(.iv-toggle:first-child) {
			border-radius: var(--iv_tg-radius) 0 0 var(--iv_tg-radius);
		}

		> :global(.iv-toggle:last-child) {
			border-radius: 0 var(--iv_tg-radius) var(--iv_tg-radius) 0;
		}

		> :global(.iv-toggle:only-child) {
			border-radius: var(--iv_tg-radius);
		}

		> :global(.iv-toggle:not(:first-child)) {
			margin-left: -1px;
		}

		> :global(.iv-toggle:focus-visible),
		> :global(.iv-toggle.iv-checked) {
			position: relative;
			z-index: 1;
		}

		&.iv-vertical {
			flex-direction: column;
			align-items: stretch;

			> :global(.iv-toggle:first-child) {
				border-radius: var(--iv_tg-radius) var(--iv_tg-radius) 0 0;
			}

			> :global(.iv-toggle:last-child) {
				border-radius: 0 0 var(--iv_tg-radius) var(--iv_tg-radius);
			}

			> :global(.iv-toggle:not(:first-child)) {
				margin-left: 0;
				margin-top: -1px;
			}
		}

		&.iv-disabled {
			cursor: not-allowed;
		}
	}
</style>
