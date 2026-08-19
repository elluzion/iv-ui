<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';
	import { focusTrap } from '../utils/focus-trap.js';

	export type SheetSide = 'left' | 'right' | 'top' | 'bottom';
	export type SheetSize = 'sm' | 'md' | 'lg' | 'full';

	interface Props {
		open: boolean;
		side?: SheetSide;
		size?: SheetSize;
		title?: string;
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
		showCloseButton?: boolean;
		className?: string;
		onclose?: () => void;
		children: Snippet;
		icon?: Snippet;
		footer?: Snippet;
		[key: string]: unknown;
	}

	let {
		open = $bindable(false),
		side = 'bottom',
		size = 'md',
		title = '',
		closeOnBackdrop = true,
		closeOnEscape = true,
		showCloseButton = true,
		className = '',
		onclose,
		children,
		icon,
		footer,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const titleId = `iv-sheet-${uid}-title`;
	const descId = `iv-sheet-${uid}-desc`;

	const flyParams = $derived(
		side === 'left'
			? { x: '-100%', y: 0, duration: $reducedMotion ? 0 : 180 }
			: side === 'right'
				? { x: '100%', y: 0, duration: $reducedMotion ? 0 : 180 }
				: side === 'top'
					? { x: 0, y: '-100%', duration: $reducedMotion ? 0 : 180 }
					: { x: 0, y: '100%', duration: $reducedMotion ? 0 : 180 }
	);

	function close() {
		open = false;
		onclose?.();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (closeOnBackdrop && e.target === e.currentTarget) close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape') close();
	}

	$effect(() => {
		if (open) {
			const prev = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = prev;
			};
		}
	});
</script>

{#if open}
	<div
		class="iv-backdrop"
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? titleId : undefined}
		aria-describedby={descId}
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		use:focusTrap={{ initial: true }}
		transition:fade={{ duration: $reducedMotion ? 0 : 150 }}
		{...restProps}
	>
		<div
			class="iv-sheet {className}"
			class:iv-side-left={side === 'left'}
			class:iv-side-top={side === 'top'}
			class:iv-side-bottom={side === 'bottom'}
			class:iv-sheet-sm={size === 'sm'}
			class:iv-sheet-lg={size === 'lg'}
			class:iv-sheet-full={size === 'full'}
			transition:fly={flyParams}
		>
			{#if title || icon || showCloseButton}
				<div class="iv-header">
					<div class="iv-title-area">
						{#if icon}
							<span class="iv-icon-slot">{@render icon()}</span>
						{/if}
						{#if title}
							<h2 id={titleId}>{title}</h2>
						{/if}
					</div>
					{#if showCloseButton}
						<button class="iv-icon iv-close-btn" onclick={close} aria-label="Close panel"
							><IconX size={20} /></button
						>
					{/if}
				</div>
			{/if}
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div class="iv-body" class:iv-body-no-title={!title} id={descId} tabindex="0">
				{@render children()}
			</div>
			{#if footer}
				<div class="iv-footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.iv-backdrop {
		position: fixed;
		inset: 0;
		background: var(--iv_overlay);
		backdrop-filter: blur(var(--iv_blur));
		z-index: var(--iv_z-overlay);
	}

	.iv-sheet {
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		box-shadow: var(--iv_shadow-lg);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&.iv-side-left,
		&.iv-side-right {
			width: var(--iv_sheet-md);
			height: 100%;

			&.iv-sheet-sm {
				width: var(--iv_sheet-sm);
			}

			&.iv-sheet-lg {
				width: var(--iv_sheet-lg);
			}

			&.iv-sheet-full {
				width: 100%;
			}
		}

		&.iv-side-top,
		&.iv-side-bottom {
			width: min(100%, var(--iv_sheet-lg));
			height: var(--iv_sheet-md);
			left: 0;
			right: 0;
			margin: 0 auto 0;

			&.iv-sheet-sm {
				height: var(--iv_sheet-sm);
			}

			&.iv-sheet-lg {
				height: var(--iv_sheet-lg);
			}

			&.iv-sheet-full {
				width: 100%;
				height: 100%;
				margin: 0;
			}
		}

		&.iv-side-left {
			left: 0;
			border-radius: 0 var(--iv_radius-lg) var(--iv_radius-lg) 0;
		}

		&.iv-side-right {
			right: 0;
			border-radius: var(--iv_radius-lg) 0 0 var(--iv_radius-lg);
		}

		&.iv-side-top {
			top: 0;
			border-radius: 0 0 var(--iv_radius-lg) var(--iv_radius-lg);
		}

		&.iv-side-bottom {
			bottom: 0;
			border-radius: var(--iv_radius-lg) var(--iv_radius-lg) 0 0;
		}

		&.iv-sheet-full {
			border-radius: var(--iv_radius-lg);
		}
	}

	.iv-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--iv_spacing-xl);
		flex-shrink: 0;
		gap: var(--iv_spacing-md);

		.iv-title-area {
			display: flex;
			align-items: center;
			gap: var(--iv_spacing-lg);
			min-width: 0;
		}

		.iv-icon-slot {
			display: flex;
			align-items: center;
			flex-shrink: 0;
			color: var(--iv_foreground);
		}

		h2 {
			margin: 0;
			font-family: var(--iv_font-sans);
			font-size: var(--iv_text-xl);
			font-weight: 600;
			color: var(--iv_foreground);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.iv-close-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			background: transparent;
			border: none;
			color: var(--iv_foreground-dim);
			padding: 0 var(--iv_spacing-sm);
			margin-right: calc(var(--iv_spacing-sm) * -1);
			cursor: pointer;
			transition: color var(--iv_transition-base);

			&:hover {
				color: var(--iv_foreground);
			}

			&:focus-visible {
				outline: none;
				box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
				border-radius: var(--iv_radius-sm);
			}
		}
	}

	.iv-body {
		padding: var(--iv_spacing-xl);
		padding-top: 0;
		overflow-y: auto;
		flex: 1;
		color: var(--iv_foreground-dim);

		&.iv-body-no-title {
			padding-top: var(--iv_spacing-xl);
		}

		:global(p:first-child) {
			margin-top: 0;
		}

		:global(p:last-child) {
			margin-bottom: 0;
		}
	}

	.iv-footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--iv_spacing-sm);
		padding: 0 var(--iv_spacing-2xl) var(--iv_spacing-2xl);
		flex-shrink: 0;
	}
</style>
