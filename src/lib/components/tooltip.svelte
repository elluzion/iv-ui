<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

	interface Props {
		label?: string;
		content?: Snippet;
		position?: TooltipPosition;
		delay?: number;
		disabled?: boolean;
		className?: string;
		children: Snippet;
	}

	let {
		label = '',
		content,
		position = 'top',
		delay = 300,
		disabled = false,
		className = '',
		children
	}: Props = $props();

	const uid = $props.id();
	const tipId = `iv-tooltip-${uid}`;

	let wrapperEl = $state<HTMLSpanElement>();
	let tipEl = $state<HTMLDivElement>();
	let visible = $state(false);
	let positioned = $state(false);
	let offset = $state({ left: 0, top: 0 });
	let timer: ReturnType<typeof setTimeout> | undefined;

	const hasContent = $derived(!!(label || content));

	const GAP = parseInt(
		getComputedStyle(document.documentElement).getPropertyValue('--iv_tooltip-gap')
	);
	const MARGIN = parseInt(
		getComputedStyle(document.documentElement).getPropertyValue('--iv_tooltip-margin')
	);

	function clearTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
	}

	function show() {
		if (disabled || !hasContent) return;
		clearTimer();
		timer = setTimeout(() => {
			visible = true;
		}, delay);
	}

	function hide() {
		clearTimer();
		visible = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && visible) {
			e.preventDefault();
			hide();
		}
	}

	function layout() {
		const wrap = wrapperEl;
		const tip = tipEl;
		if (!wrap || !tip) return;

		const w = wrap.getBoundingClientRect();
		const t = tip.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		let pos = position;

		if (pos === 'top' && w.top - t.height - GAP < MARGIN) pos = 'bottom';
		else if (pos === 'bottom' && w.bottom + t.height + GAP > vh - MARGIN) pos = 'top';
		else if (pos === 'left' && w.left - t.width - GAP < MARGIN) pos = 'right';
		else if (pos === 'right' && w.right + t.width + GAP > vw - MARGIN) pos = 'left';

		const cx = w.left + w.width / 2;
		const cy = w.top + w.height / 2;

		let left: number;
		let top: number;

		switch (pos) {
			case 'top':
				left = cx - t.width / 2;
				top = w.top - t.height - GAP;
				break;
			case 'bottom':
				left = cx - t.width / 2;
				top = w.bottom + GAP;
				break;
			case 'left':
				left = w.left - t.width - GAP;
				top = cy - t.height / 2;
				break;
			case 'right':
				left = w.right + GAP;
				top = cy - t.height / 2;
				break;
		}

		left = Math.max(MARGIN, Math.min(left, vw - t.width - MARGIN));
		top = Math.max(MARGIN, Math.min(top, vh - t.height - MARGIN));

		offset = { left: left - w.left, top: top - w.top };
		positioned = true;
	}

	$effect(() => {
		if (!visible) return;
		positioned = false;
		const raf = requestAnimationFrame(layout);
		window.addEventListener('resize', layout);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', layout);
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (keyboard and focus triggers are handled via focusin/focusout/keydown) -->
<span
	bind:this={wrapperEl}
	class="iv-root {className}"
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
	onkeydown={handleKeydown}
	aria-describedby={visible ? tipId : undefined}
>
	{@render children()}
	{#if visible}
		<div
			bind:this={tipEl}
			id={tipId}
			class="iv-tooltip"
			class:iv-ready={positioned}
			role="tooltip"
			style="left: {offset.left}px; top: {offset.top}px"
			transition:fade={{ duration: 100 }}
		>
			{#if content}
				{@render content()}
			{:else}
				{label}
			{/if}
		</div>
	{/if}
</span>

<style>
	.iv-root {
		position: relative;
		display: inline-block;
		max-width: 100%;
	}

	.iv-tooltip {
		position: absolute;
		left: 0;
		top: 0;
		z-index: var(--iv_z-dropdown);
		padding: var(--iv_spacing-xs) var(--iv_spacing-md);
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-elevated);
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body-sm);
		font-weight: 500;
		line-height: 1.4;
		white-space: nowrap;
		box-shadow: var(--iv_shadow-md);
		visibility: hidden;
		pointer-events: none;

		&.iv-ready {
			visibility: visible;
		}
	}
</style>
