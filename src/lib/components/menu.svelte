<script lang="ts">
	import { tick } from 'svelte';
	import { IconCheck, IconChevronRight, type Icon } from '@tabler/icons-svelte';
	import Menu from './menu.svelte';

	export type MenuSemantic = 'menu' | 'listbox';

	export interface MenuItem {
		label: string;
		icon?: Icon;
		shortcut?: string;
		trailingIcon?: Icon;
		disabled?: boolean;
		dim?: boolean;
		selected?: boolean;
		active?: boolean;
		onclick?: (e: MouseEvent) => void;
		onmouseenter?: (e: MouseEvent) => void;
	}

	export type MenuEntry =
		| { type: 'header'; id: string; label: string }
		| { type: 'separator'; id: string }
		| { type: 'item'; id: string; item: MenuItem }
		| {
				type: 'submenu';
				id: string;
				label: string;
				icon?: Icon;
				children: MenuEntry[];
				disabled?: boolean;
		  };

	interface Props {
		entries?: MenuEntry[];
		semantic?: MenuSemantic;
		multiselect?: boolean;
		emptyLabel?: string;
		id?: string;
		className?: string;
		onclick?: (e: MouseEvent, entry: MenuEntry) => void;
		'on:click'?: (e: MouseEvent, entry: MenuEntry) => void;
	}

	let {
		entries = [],
		semantic = 'menu',
		multiselect = false,
		emptyLabel = '',
		id = '',
		className = '',
		onclick,
		'on:click': onEventClick
	}: Props = $props();

	const containerRole = $derived(semantic === 'listbox' ? 'listbox' : 'menu');
	const itemRole = $derived(semantic === 'listbox' ? 'option' : 'menuitem');
	const hasItems = $derived(entries.some((e) => e.type === 'item' || e.type === 'submenu'));

	let openSub = $state<number | null>(null);
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	function openSubmenu(i: number) {
		const entry = entries[i];
		if (entry?.type === 'submenu' && entry.disabled) return;
		clearTimeout(closeTimer);
		openSub = i;
	}

	function scheduleClose() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => (openSub = null), 150);
	}

	function cancelClose() {
		clearTimeout(closeTimer);
	}

	function toggleSubmenu(i: number) {
		const entry = entries[i];
		if (entry?.type === 'submenu' && entry.disabled) return;
		openSub = openSub === i ? null : i;
	}

	function emitEntryClick(e: MouseEvent, entry: MenuEntry) {
		onclick?.(e, entry);
		onEventClick?.(e, entry);
	}

	function onSubmenuKeydown(e: KeyboardEvent, i: number) {
		const el = e.currentTarget as HTMLElement;
		const entry = entries[i];
		if (entry?.type === 'submenu' && entry.disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleSubmenu(i);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			openSubmenu(i);
			tick().then(() => {
				el.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
			});
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			openSub = null;
			el.focus();
		}
	}
</script>

<div
	class="iv-menu {className}"
	role={containerRole}
	id={id || undefined}
	aria-multiselectable={semantic === 'listbox' && multiselect ? 'true' : undefined}
>
	{#each entries as entry, i (entry.id)}
		{#if entry.type === 'header'}
			<div class="iv-section-header" id={entry.id}>{entry.label}</div>
		{:else if entry.type === 'separator'}
			<hr class="iv-separator" id={entry.id} aria-hidden="true" />
		{:else if entry.type === 'submenu'}
			<div
				class="iv-item iv-submenu-item"
				class:iv-active={openSub === i}
				class:iv-disabled={entry.disabled}
				id={entry.id}
				role="menuitem"
				tabindex="-1"
				aria-haspopup="menu"
				aria-expanded={openSub === i}
				aria-disabled={entry.disabled || undefined}
				onmouseenter={() => openSubmenu(i)}
				onmouseleave={scheduleClose}
				onclick={(e) => {
					toggleSubmenu(i);
					emitEntryClick(e, entry);
				}}
				onkeydown={(e) => onSubmenuKeydown(e, i)}
			>
				{#if entry.icon}
					<span class="iv-leading" aria-hidden="true">
						<entry.icon size={14} />
					</span>
				{/if}
				<span class="iv-label">{entry.label}</span>
				<span class="iv-trailing" aria-hidden="true">
					<IconChevronRight size={14} />
				</span>
				{#if openSub === i}
					<div
						class="iv-submenu"
						role="menu"
						tabindex="-1"
						onmouseenter={cancelClose}
						onmouseleave={scheduleClose}
					>
						<Menu
							{...{
								entries: entry.children,
								semantic,
								emptyLabel,
								onclick,
								'on:click': onEventClick
							}}
						/>
					</div>
				{/if}
			</div>
		{:else}
			<div
				class="iv-item"
				class:iv-selected={entry.item.selected}
				class:iv-disabled={entry.item.disabled}
				class:iv-dim={entry.item.dim}
				class:iv-active={entry.item.active}
				role={itemRole}
				id={entry.id}
				tabindex="-1"
				aria-selected={semantic === 'listbox' ? entry.item.selected : undefined}
				aria-disabled={entry.item.disabled || undefined}
				data-active={entry.item.active || undefined}
				onclick={(e) => {
					entry.item.onclick?.(e);
					emitEntryClick(e, entry);
				}}
				onmouseenter={entry.item.onmouseenter}
			>
				{#if semantic === 'listbox' || entry.item.icon || entry.item.selected}
					<span
						class="iv-leading"
						class:iv-checkbox={semantic === 'listbox'}
						class:iv-checked={entry.item.selected}
						aria-hidden="true"
					>
						{#if entry.item.selected}
							<IconCheck size={14} />
						{:else if entry.item.icon}
							<entry.item.icon size={14} />
						{/if}
					</span>
				{/if}
				<span class="iv-label">{entry.item.label}</span>
				{#if entry.item.shortcut}
					<span class="iv-shortcut">{entry.item.shortcut}</span>
				{/if}
				{#if entry.item.trailingIcon}
					<span class="iv-trailing" aria-hidden="true">
						<entry.item.trailingIcon size={14} />
					</span>
				{/if}
			</div>
		{/if}
	{/each}

	{#if !hasItems && emptyLabel}
		<div class="iv-empty">{emptyLabel}</div>
	{/if}
</div>

<style>
	.iv-menu {
		display: flex;
		flex-direction: column;
		padding: 0.25rem;

		&:empty {
			display: none;
		}
	}

	.iv-section-header {
		padding: 0.375rem 0.5rem 0.25rem;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-sm);
		font-weight: 500;
		color: var(--iv_foreground-dim);
	}

	.iv-separator {
		height: 1px;
		margin: var(--iv_spacing-xs) var(--iv_spacing-sm);
		border: 0;
		background: var(--iv_border);
	}

	.iv-item {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		padding: 0.5rem 0.75rem;
		border-radius: var(--iv_radius-sm);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground);
		cursor: pointer;
		transition: background var(--iv_transition-fast);

		&:hover,
		&.iv-active {
			background: var(--iv_surface-hover);
		}

		&.iv-disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}

		&.iv-dim .iv-label {
			color: var(--iv_foreground-dim);
		}
	}

	.iv-submenu-item {
		position: relative;
	}

	.iv-submenu {
		position: absolute;
		top: -0.375rem;
		left: calc(100% + 0.25rem);
		z-index: var(--iv_z-dropdown);
		min-width: 12rem;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		box-shadow: var(--iv_shadow-md);
	}

	.iv-leading {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		flex-shrink: 0;
		color: var(--iv_foreground);

		&.iv-checkbox {
			visibility: hidden;

			&.iv-checked {
				visibility: visible;
			}
		}
	}

	.iv-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: var(--iv_spacing-sm);
	}

	.iv-shortcut {
		flex-shrink: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
	}

	.iv-trailing {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);
	}

	.iv-empty {
		padding: 0.75rem 0.5rem;
		text-align: center;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		color: var(--iv_foreground-dim);
	}
</style>
