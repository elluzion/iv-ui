<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';

	export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
	export type PopoverAlign = 'start' | 'center' | 'end';
	export type PopoverShowEvent = 'click' | 'hover' | 'focus';
	export type PopoverHideEvent = 'click' | 'hover' | 'blur';

	interface Props {
		open?: boolean;
		anchor?: string | HTMLElement | null;
		placement?: PopoverPlacement;
		align?: PopoverAlign;
		gap?: number;
		closeOnOutside?: boolean;
		closeOnEscape?: boolean;
		interactive?: boolean;
		showOn?: PopoverShowEvent[];
		hideOn?: PopoverHideEvent[];
		className?: string;
		onopen?: () => void;
		onclose?: () => void;
		onclick?: (e: MouseEvent) => void;
		'on:click'?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		anchor = null,
		placement = 'bottom',
		align = 'center',
		gap = 8,
		closeOnOutside = true,
		closeOnEscape = true,
		interactive = true,
		showOn = ['click'],
		hideOn = ['click'],
		className = '',
		onopen,
		onclose,
		onclick,
		'on:click': onEventClick,
		children
	}: Props = $props();

	const uid = $props.id();
	const panelId = `iv-popover-${uid}`;

	let panelEl = $state<HTMLElement>();
	let pos = $state({ left: 0, top: 0 });

	function getAnchor(): HTMLElement | null {
		if (typeof anchor === 'string') return anchor ? document.querySelector(anchor) : null;
		return anchor ?? null;
	}

	function place() {
		const anchorNode = getAnchor();
		if (!anchorNode || !panelEl) return;
		const anchor = anchorNode.getBoundingClientRect();
		const panel = panelEl.getBoundingClientRect();
		const margin = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue('--iv_popover-margin')
		);
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		let left = 0;
		let top = 0;

		switch (placement) {
			case 'bottom':
				left = anchor.left;
				top = anchor.bottom + gap;
				break;
			case 'top':
				left = anchor.left;
				top = anchor.top - gap - panel.height;
				break;
			case 'left':
				left = anchor.left - gap - panel.width;
				top = anchor.top;
				break;
			case 'right':
				left = anchor.right + gap;
				top = anchor.top;
				break;
		}

		if (placement === 'top' || placement === 'bottom') {
			if (align === 'center') left = anchor.left + (anchor.width - panel.width) / 2;
			else if (align === 'end') left = anchor.right - panel.width;
		} else {
			if (align === 'center') top = anchor.top + (anchor.height - panel.height) / 2;
			else if (align === 'end') top = anchor.bottom - panel.height;
		}

		if (placement === 'bottom' && top + panel.height > vh - margin) {
			top = anchor.top - gap - panel.height;
		} else if (placement === 'top' && top < margin) {
			top = anchor.bottom + gap;
		} else if (placement === 'right' && left + panel.width > vw - margin) {
			left = anchor.left - gap - panel.width;
		} else if (placement === 'left' && left < margin) {
			left = anchor.right + gap;
		}

		left = Math.max(margin, Math.min(left, vw - panel.width - margin));
		top = Math.max(margin, Math.min(top, vh - panel.height - margin));

		pos.left = left;
		pos.top = top;
	}

	function toggle() {
		open = !open;
		if (open) onopen?.();
		else onclose?.();
	}

	function show() {
		if (open) return;
		open = true;
		onopen?.();
	}

	function close() {
		if (!open) return;
		open = false;
		onclose?.();
	}

	function applyClick() {
		if (showOn.includes('click') && hideOn.includes('click')) toggle();
		else if (showOn.includes('click')) show();
		else if (hideOn.includes('click')) close();
	}

	function onAnchorClick(e: Event) {
		onclick?.(e as MouseEvent);
		onEventClick?.(e as MouseEvent);
		applyClick();
	}

	function onAnchorKeydown(e: Event) {
		const ke = e as KeyboardEvent;
		if (ke.key === ' ' || ke.key === 'Enter') {
			ke.preventDefault();
			applyClick();
		}
	}

	let hoverTimer: ReturnType<typeof setTimeout> | undefined;

	function clearHoverTimer() {
		if (hoverTimer) {
			clearTimeout(hoverTimer);
			hoverTimer = undefined;
		}
	}

	function scheduleHoverClose() {
		clearHoverTimer();
		hoverTimer = setTimeout(() => close(), 150);
	}

	function onPanelEnter() {
		if (hideOn.includes('hover')) clearHoverTimer();
	}

	function onPanelLeave() {
		if (hideOn.includes('hover')) scheduleHoverClose();
	}

	function onDocKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') close();
	}

	const flyParams = $derived(
		placement === 'top'
			? { y: 8, duration: $reducedMotion ? 0 : 150 }
			: placement === 'bottom'
				? { y: -8, duration: $reducedMotion ? 0 : 150 }
				: placement === 'left'
					? { x: 8, duration: $reducedMotion ? 0 : 150 }
					: { x: -8, duration: $reducedMotion ? 0 : 150 }
	);

	$effect(() => {
		if (!interactive) return;
		const el = getAnchor();
		if (!el) return;

		el.setAttribute('aria-haspopup', 'true');
		el.setAttribute('aria-expanded', String(open));
		if (open) el.setAttribute('aria-controls', panelId);
		else el.removeAttribute('aria-controls');

		const attached: Array<[string, EventListener]> = [];
		const attach = (type: string, fn: EventListener) => {
			el.addEventListener(type, fn);
			attached.push([type, fn]);
		};

		if (showOn.includes('click') || hideOn.includes('click')) {
			attach('click', onAnchorClick);
			attach('keydown', onAnchorKeydown);
		}
		if (showOn.includes('hover')) {
			attach('mouseenter', () => {
				clearHoverTimer();
				show();
			});
		}
		if (hideOn.includes('hover')) attach('mouseleave', () => scheduleHoverClose());
		if (showOn.includes('focus')) attach('focusin', () => show());
		if (hideOn.includes('blur')) attach('focusout', () => close());

		return () => {
			for (const [type, fn] of attached) el.removeEventListener(type, fn);
			el.removeAttribute('aria-haspopup');
			el.removeAttribute('aria-expanded');
			el.removeAttribute('aria-controls');
		};
	});

	$effect(() => {
		if (!open) return;
		place();

		function onResize() {
			place();
		}

		function onScroll() {
			place();
		}

		function onDocMouseDown(e: MouseEvent) {
			if (!closeOnOutside) return;
			const target = e.target as Node;
			const anchor = getAnchor();
			if (anchor?.contains(target) || panelEl?.contains(target)) return;
			close();
		}

		window.addEventListener('resize', onResize);
		document.addEventListener('scroll', onScroll, true);
		document.addEventListener('mousedown', onDocMouseDown);
		document.addEventListener('keydown', onDocKeydown);
		return () => {
			window.removeEventListener('resize', onResize);
			document.removeEventListener('scroll', onScroll, true);
			document.removeEventListener('mousedown', onDocMouseDown);
			document.removeEventListener('keydown', onDocKeydown);
		};
	});
</script>

<span class="iv-root {className}" class:iv-open={open}>
	{#if open}
		<div
			class="iv-panel"
			bind:this={panelEl}
			id={panelId}
			role={interactive ? 'dialog' : undefined}
			aria-modal={interactive ? 'false' : undefined}
			aria-label={interactive ? 'Popover' : undefined}
			style:left="{pos.left}px"
			style:top="{pos.top}px"
			transition:fly={flyParams}
			onmouseenter={onPanelEnter}
			onmouseleave={onPanelLeave}
		>
			{@render children()}
		</div>
	{/if}
</span>

<style>
	.iv-root {
		display: contents;
	}

	.iv-panel {
		position: fixed;
		z-index: var(--iv_z-dropdown);
		min-width: var(--iv_popover-min-w);
		max-width: min(var(--iv_popover-max-w), calc(100vw - 1rem));
		box-sizing: border-box;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		box-shadow: var(--iv_shadow-md);
		font-family: var(--iv_font-mono);

		&:empty {
			display: none;
		}
	}
</style>
