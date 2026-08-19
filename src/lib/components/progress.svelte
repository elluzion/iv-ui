<script lang="ts">
	interface Props {
		value?: number;
		max?: number;
		indeterminate?: boolean;
		label?: string;
		showValue?: boolean;
		size?: 'sm' | 'md';
		className?: string;
		[key: string]: unknown;
	}

	let {
		value = 0,
		max = 100,
		indeterminate = false,
		label = '',
		showValue = false,
		size = 'md',
		className = '',
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const labelId = `iv-progress-${uid}-label`;
	const pct = $derived(max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0);
	const displayValue = $derived(`${Math.round(pct)}%`);
</script>

<div
	class="iv-progress {className}"
	class:iv-sm={size === 'sm'}
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={max}
	aria-valuenow={indeterminate ? undefined : value}
	aria-valuetext={indeterminate ? 'Indeterminate' : displayValue}
	aria-labelledby={label ? labelId : undefined}
	{...restProps}
>
	{#if label || showValue}
		<div class="iv-progress-header">
			{#if label}
				<span class="iv-label" id={labelId}>{label}</span>
			{/if}
			{#if showValue}
				<span class="iv-value">{displayValue}</span>
			{/if}
		</div>
	{/if}
	<div class="iv-track">
		<div class="iv-fill-wrap">
			<div
				class="iv-fill"
				class:iv-indeterminate={indeterminate}
				style:transform={indeterminate ? undefined : `scaleX(${pct / 100})`}
			></div>
		</div>
	</div>
</div>

<style>
	.iv-progress {
		width: 100%;
		box-sizing: border-box;

		&.iv-sm {
			.iv-track {
				height: var(--iv_progress-h-sm);
			}
		}
	}

	.iv-progress-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--iv_spacing-sm);
		margin-bottom: var(--iv_spacing-sm);
	}

	.iv-label {
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-label);
		font-weight: var(--iv_weight-medium);
		color: var(--iv_foreground);
	}

	.iv-value {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.iv-track {
		position: relative;
		width: 100%;
		height: var(--iv_progress-h-md);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-elevated);
		overflow: hidden;
	}

	.iv-fill-wrap {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.iv-fill {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--iv_radius-sm);
		background: var(--iv_cursor);
		transform-origin: left center;
		transition: transform var(--iv_transition-base);

		&.iv-indeterminate {
			width: 40%;
			animation: iv-progress-slide 1.2s var(--iv_ease-in-out) infinite;
		}
	}

	@keyframes iv-progress-slide {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(250%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.iv-fill.iv-indeterminate {
			animation: none;
		}
	}
</style>
