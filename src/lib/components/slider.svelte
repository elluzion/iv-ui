<script lang="ts">
	interface Props {
		value?: number | [number, number];
		range?: boolean;
		min?: number;
		max?: number;
		step?: number;
		tickMarks?: boolean;
		label?: string;
		disabled?: boolean;
		showValue?: boolean;
		size?: 'sm' | 'md';
		onchange?: (e: CustomEvent<{ value: number | [number, number] }>) => void;
		'on:change'?: (e: CustomEvent<{ value: number | [number, number] }>) => void;
	}

	let {
		value = $bindable(0),
		range = false,
		min = 0,
		max = 100,
		step = 1,
		tickMarks = false,
		label = '',
		disabled = false,
		showValue = false,
		size = 'md',
		onchange,
		'on:change': onEventChange
	}: Props = $props();

	const uid = $props.id();
	const labelId = `iv-slider-${uid}-label`;

	let trackEl = $state<HTMLDivElement>();
	let dragging = $state<'single' | 'lower' | 'upper' | null>(null);

	const safeLower = $derived(range ? (Array.isArray(value) ? value[0] : min) : min);

	const safeUpper = $derived(range ? (Array.isArray(value) ? value[1] : max) : max);

	const safeSingle = $derived(range ? min : typeof value === 'number' ? value : min);

	const displayValue = $derived(
		range ? `${Math.round(safeLower)} — ${Math.round(safeUpper)}` : `${Math.round(safeSingle)}`
	);

	function clamp(v: number) {
		return Math.max(min, Math.min(max, v));
	}

	function snap(v: number) {
		if (step <= 0) return clamp(v);
		return clamp(Math.round(v / step) * step);
	}

	function toPercent(v: number) {
		if (max === min) return 0;
		return ((v - min) / (max - min)) * 100;
	}

	function fromPercent(p: number) {
		return snap(min + (p / 100) * (max - min));
	}

	function getPointerPercent(e: PointerEvent) {
		if (!trackEl) return 0;
		const rect = trackEl.getBoundingClientRect();
		return Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
	}

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { value } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function updateFromEvent(e: PointerEvent) {
		if (!dragging) return;
		const p = getPointerPercent(e);
		const v = fromPercent(p);
		if (range) {
			if (dragging === 'lower') {
				const upper = safeUpper;
				value = [Math.min(v, upper), upper];
			} else {
				const lower = safeLower;
				value = [lower, Math.max(v, lower)];
			}
		} else {
			value = v;
		}
	}

	function endDrag(e: PointerEvent) {
		if (!dragging) return;
		dragging = null;
		trackEl?.releasePointerCapture(e.pointerId);
		dispatchChange();
	}

	function handleTrackPointerDown(e: PointerEvent) {
		if (disabled) return;
		e.preventDefault();
		const p = getPointerPercent(e);
		const v = fromPercent(p);

		if (range) {
			const lower = safeLower;
			const upper = safeUpper;
			const distLower = Math.abs(v - lower);
			const distUpper = Math.abs(v - upper);
			const which = distLower <= distUpper ? 'lower' : 'upper';
			if (which === 'lower') {
				value = [Math.min(v, upper), upper];
			} else {
				value = [lower, Math.max(v, lower)];
			}
			dragging = which;
		} else {
			value = v;
			dragging = 'single';
		}
		trackEl?.setPointerCapture(e.pointerId);
	}

	function handleThumbPointerDown(e: PointerEvent, which: 'single' | 'lower' | 'upper') {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		trackEl?.setPointerCapture(e.pointerId);
		dragging = which;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (range) return;

		const increment =
			e.key === 'ArrowRight' || e.key === 'ArrowUp'
				? step
				: e.key === 'ArrowLeft' || e.key === 'ArrowDown'
					? -step
					: e.key === 'Home'
						? min - safeSingle
						: e.key === 'End'
							? max - safeSingle
							: null;

		if (increment !== null) {
			e.preventDefault();
			value = clamp(safeSingle + increment);
			dispatchChange();
		}
	}

	function handlePointerMove(e: PointerEvent) {
		updateFromEvent(e);
	}

	function handlePointerUp(e: PointerEvent) {
		endDrag(e);
	}

	const thumbSize = $derived(size === 'sm' ? 14 : 18);

	const ticks = $derived.by(() => {
		if (!tickMarks || step <= 0) return [];
		const count = Math.floor((max - min) / step) + 1;
		const limit = Math.min(count, 100);
		return Array.from({ length: limit }, (_, i) => min + (i / (limit - 1)) * (max - min));
	});
</script>

<div class="root" class:disabled>
	{#if label || showValue}
		<div class="header">
			{#if label}
				<span class="label" id={labelId}>{label}</span>
			{/if}
			{#if showValue}
				<span class="value">{displayValue}</span>
			{/if}
		</div>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		bind:this={trackEl}
		class="track"
		class:sm={size === 'sm'}
		class:md={size === 'md'}
		class:disabled={range ? null : 'disabled-class'}
		role={range ? 'group' : 'slider'}
		tabindex={disabled || range ? -1 : 0}
		aria-valuemin={range ? undefined : min}
		aria-valuemax={range ? undefined : max}
		aria-valuenow={range ? undefined : safeSingle}
		aria-valuetext={range ? undefined : `${Math.round(safeSingle)}`}
		aria-labelledby={label ? labelId : undefined}
		aria-disabled={disabled || undefined}
		onpointerdown={handleTrackPointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onkeydown={handleKeydown}
	>
		{#if range}
			{@const lowerPct = toPercent(safeLower)}
			{@const upperPct = toPercent(safeUpper)}

			<div class="fill" style="left: {lowerPct}%; width: {upperPct - lowerPct}%"></div>

			<div
				class="thumb"
				class:active={dragging === 'lower'}
				style="left: {lowerPct}%; --thumb-size: {thumbSize}px"
				role="slider"
				tabindex={disabled ? -1 : 0}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={Math.round(safeLower)}
				aria-labelledby={label ? labelId : undefined}
				onpointerdown={(e: PointerEvent) => handleThumbPointerDown(e, 'lower')}
			></div>

			<div
				class="thumb"
				class:active={dragging === 'upper'}
				style="left: {upperPct}%; --thumb-size: {thumbSize}px"
				role="slider"
				tabindex={disabled ? -1 : 0}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={Math.round(safeUpper)}
				aria-labelledby={label ? labelId : undefined}
				onpointerdown={(e: PointerEvent) => handleThumbPointerDown(e, 'upper')}
			></div>
		{:else}
			{@const singlePct = toPercent(safeSingle)}

			<div class="fill" style="width: {singlePct}%"></div>

			<div
				class="thumb"
				class:active={dragging === 'single'}
				style="left: {singlePct}%; --thumb-size: {thumbSize}px"
			></div>
		{/if}

		{#if ticks.length > 0}
			<div class="ticks" aria-hidden="true">
				{#each ticks as t (t)}
					<span
						class="tick"
						class:active={range ? t >= safeLower && t <= safeUpper : t <= safeSingle}
						style="left: {toPercent(t)}%"
					></span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.root {
		width: 100%;
		box-sizing: border-box;

		&.disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 6px;
	}

	.label {
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		font-weight: 500;
		color: var(--iv_foreground);
	}

	.value {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		flex-shrink: 0;
	}

	.track {
		position: relative;
		width: 100%;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-elevated);
		cursor: pointer;
		touch-action: none;
		user-select: none;

		--thumb-size: 18px;

		&.sm {
			height: 4px;
		}

		&.md {
			height: 6px;
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: 4px;
		}
	}

	.fill {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_foreground-dim);
		pointer-events: none;
	}

	.thumb {
		position: absolute;
		top: 50%;
		width: var(--thumb-size);
		height: var(--thumb-size);
		border-radius: 50%;
		background: var(--iv_foreground);
		transform: translate(-50%, -50%);
		transition: box-shadow var(--iv_transition-base);
		cursor: pointer;

		&.active {
			box-shadow: var(--iv_shadow-md);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: 3px;
		}
	}

	.ticks {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.tick {
		position: absolute;
		top: 50%;
		width: 2px;
		height: 4px;
		transform: translate(-50%, -50%);
		border-radius: 1px;
		background: var(--iv_border);

		&.active {
			background: var(--iv_foreground-dim);
		}
	}
</style>
