<script lang="ts">
	interface Props {
		shape?: 'rect' | 'line' | 'circle';
		width?: string | number;
		height?: string | number;
		className?: string;
	}

	let { shape = 'rect', width, height, className = '' }: Props = $props();

	const w = $derived(typeof width === 'number' ? width + 'px' : width);
	const h = $derived(typeof height === 'number' ? height + 'px' : height);
</script>

<span
	class="iv-skeleton {className}"
	class:iv-rect={shape === 'rect'}
	class:iv-line={shape === 'line'}
	class:iv-circle={shape === 'circle'}
	style:width={w}
	style:height={h}
	aria-hidden="true"
></span>

<style>
	.iv-skeleton {
		display: block;
		background: var(--iv_surface-elevated);
		animation: iv-skeleton-pulse 1.6s var(--iv_ease-in-out) infinite;

		&.iv-rect {
			width: 100%;
			height: 0.875rem;
			border-radius: var(--iv_radius-sm);
		}

		&.iv-line {
			width: 100%;
			height: 0.75em;
			border-radius: var(--iv_radius-sm);
		}

		&.iv-circle {
			width: var(--iv_avatar-md);
			height: var(--iv_avatar-md);
			border-radius: 50%;
		}
	}

	@keyframes iv-skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.iv-skeleton {
			animation: none;
		}
	}
</style>
