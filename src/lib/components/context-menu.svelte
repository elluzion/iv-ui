<script lang="ts">
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';
	import Menu, { type MenuEntry } from './menu.svelte';

	interface Props {
		entries: MenuEntry[];
		label?: string;
		id?: string;
		className?: string;
		touchTrigger?: 'longpress' | 'dblclick' | 'click';
		onclick?: (e: MouseEvent, entry: MenuEntry) => void;
		'on:click'?: (e: MouseEvent, entry: MenuEntry) => void;
		onopen?: () => void;
		onclose?: () => void;
		children: Snippet;
	}

	let {
		entries,
		label = '',
		id = '',
		className = '',
		touchTrigger = 'longpress',
		onclick,
		'on:click': onEventClick,
		onopen,
		onclose,
		children
	}: Props = $props();

	const MARGIN = 8;

	let triggerEl = $state<HTMLElement>();
	let panelEl = $state<HTMLDivElement>();
	let open = $state(false);
	let positioned = $state(false);
	let rawPos = $state({ x: 0, y: 0 });
	let pos = $state({ left: 0, top: 0 });
	let restoreEl: HTMLElement | null = null;

	function menuItems() {
		return Array.from(panelEl?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []).filter(
			(el) => el.getAttribute('aria-disabled') !== 'true'
		);
	}

	function openAt(x: number, y: number) {
		restoreEl = document.activeElement as HTMLElement | null;
		rawPos = { x, y };
		positioned = false;
		open = true;
		onopen?.();
	}

	function close() {
		if (!open) return;
		open = false;
		positioned = false;
		onclose?.();
		restoreEl?.focus();
	}

	function layout() {
		const panel = panelEl;
		if (!panel) return;
		const rect = panel.getBoundingClientRect();
		pos.left = Math.max(MARGIN, Math.min(rawPos.x, window.innerWidth - rect.width - MARGIN));
		pos.top = Math.max(MARGIN, Math.min(rawPos.y, window.innerHeight - rect.height - MARGIN));
		positioned = true;
	}

	function focusFirst() {
		menuItems()[0]?.focus();
	}

	function moveFocus(dir: 1 | -1) {
		const items = menuItems();
		if (items.length === 0) return;
		const current = items.indexOf(document.activeElement as HTMLElement);
		const next =
			current === -1
				? dir === 1
					? 0
					: items.length - 1
				: (current + dir + items.length) % items.length;
		items[next].focus();
	}

	function handleTriggerContextMenu(e: MouseEvent) {
		if (longpressFired) {
			longpressFired = false;
			e.preventDefault();
			return;
		}
		e.preventDefault();
		openAt(e.clientX, e.clientY);
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			e.preventDefault();
			close();
			return;
		}
		if (e.key === 'Menu' || (e.shiftKey && e.key === 'F10')) {
			e.preventDefault();
			const rect = triggerEl?.getBoundingClientRect();
			openAt(rect ? rect.left : 0, rect ? rect.bottom : 0);
		}
	}

	function handlePanelKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			moveFocus(1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			moveFocus(-1);
		} else if (e.key === 'Home') {
			e.preventDefault();
			menuItems()[0]?.focus();
		} else if (e.key === 'End') {
			e.preventDefault();
			const items = menuItems();
			items[items.length - 1]?.focus();
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			const active = document.activeElement as HTMLElement | null;
			if (active?.getAttribute('aria-haspopup')) return;
			active?.click();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	let longpressTimer: ReturnType<typeof setTimeout> | undefined;
	let longpressFired = false;

	function handleTouchStart(e: TouchEvent) {
		const touch = e.touches[0];
		if (!touch) return;
		longpressFired = false;
		longpressTimer = setTimeout(() => {
			if (!open) {
				longpressFired = true;
				openAt(touch.clientX, touch.clientY);
			}
		}, 500);
	}

	function handleTouchEnd() {
		clearTimeout(longpressTimer);
		longpressTimer = undefined;
	}

	function handleToggle(e: MouseEvent) {
		if (open) {
			close();
		} else {
			openAt(e.clientX, e.clientY);
		}
	}

	function onDocMouseDown(e: MouseEvent) {
		const target = e.target as Node;
		if (triggerEl?.contains(target) || panelEl?.contains(target)) return;
		close();
	}

	$effect(() => {
		if (!open || !panelEl) return;
		const raf = requestAnimationFrame(() => {
			layout();
			tick().then(focusFirst);
		});
		document.addEventListener('mousedown', onDocMouseDown);
		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener('mousedown', onDocMouseDown);
		};
	});

	$effect(() => {
		return () => clearTimeout(longpressTimer);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (trigger opens on contextmenu / menu key) -->
<span
	bind:this={triggerEl}
	class="iv-cm-trigger {className}"
	class:iv-longpress={touchTrigger === 'longpress'}
	aria-haspopup="menu"
	oncontextmenu={handleTriggerContextMenu}
	onkeydown={handleTriggerKeydown}
	onclick={touchTrigger === 'click' ? handleToggle : undefined}
	ondblclick={touchTrigger === 'dblclick' ? handleToggle : undefined}
	ontouchstart={touchTrigger === 'longpress' ? handleTouchStart : undefined}
	ontouchend={touchTrigger === 'longpress' ? handleTouchEnd : undefined}
	ontouchmove={touchTrigger === 'longpress' ? handleTouchEnd : undefined}
	ontouchcancel={touchTrigger === 'longpress' ? handleTouchEnd : undefined}
>
	{@render children()}
</span>

{#if open}
	<div
		bind:this={panelEl}
		class="iv-cm-panel"
		class:iv-ready={positioned}
		id={id || undefined}
		role="none"
		style="left: {pos.left}px; top: {pos.top}px"
		onkeydown={handlePanelKeydown}
		transition:fade={{ duration: $reducedMotion ? 0 : 120 }}
	>
		<Menu
			{entries}
			semantic="menu"
			{label}
			onclick={(e, entry) => {
				onclick?.(e, entry);
				onEventClick?.(e, entry);
				close();
			}}
		/>
	</div>
{/if}

<style>
	.iv-cm-trigger {
		display: inline-block;
		max-width: 100%;

		&.iv-longpress {
			touch-action: none;
			user-select: none;
			-webkit-user-select: none;
			-webkit-touch-callout: none;
		}
	}

	.iv-cm-panel {
		position: fixed;
		z-index: var(--iv_z-dropdown);
		min-width: var(--iv_popover-min-w);
		max-width: min(var(--iv_popover-max-w), calc(100vw - 1rem));
		box-sizing: border-box;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		box-shadow: var(--iv_shadow-md);
		padding: var(--iv_spacing-xs);
		visibility: hidden;

		&.iv-ready {
			visibility: visible;
		}

		:global(.iv-menu) {
			padding: 0;
		}
	}
</style>
