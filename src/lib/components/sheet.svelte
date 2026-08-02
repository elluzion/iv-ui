<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';

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
		footer
	}: Props = $props();

	const flyParams = $derived(
		side === 'left'
			? { x: '-100%', y: 0, duration: 180 }
			: side === 'right'
				? { x: '100%', y: 0, duration: 180 }
				: side === 'top'
					? { x: 0, y: '-100%', duration: 180 }
					: { x: 0, y: '100%', duration: 180 }
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
		class="backdrop"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		transition:fade={{ duration: 150 }}
	>
		<div
			class="sheet {className}"
			class:side-left={side === 'left'}
			class:side-top={side === 'top'}
			class:side-bottom={side === 'bottom'}
			class:sheet-sm={size === 'sm'}
			class:sheet-lg={size === 'lg'}
			class:sheet-full={size === 'full'}
			transition:fly={flyParams}
		>
			{#if title || icon || showCloseButton}
				<div class="header">
					<div class="title-area">
						{#if icon}
							<span class="icon-slot">{@render icon()}</span>
						{/if}
						{#if title}
							<h2>{title}</h2>
						{/if}
					</div>
					{#if showCloseButton}
						<button class="icon close-btn" onclick={close} aria-label="Close panel"
							><IconX size={20} /></button
						>
					{/if}
				</div>
			{/if}
			<div class="body" class:body-no-title={!title}>
				{@render children()}
			</div>
			{#if footer}
				<div class="footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: var(--iv_overlay);
		backdrop-filter: blur(var(--iv_blur));
		z-index: var(--iv_z-overlay);
	}

	.sheet {
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		box-shadow: var(--iv_shadow-lg);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&.side-left,
		&.side-right {
			width: var(--iv_sheet-md);
			height: 100%;

			&.sheet-sm {
				width: var(--iv_sheet-sm);
			}

			&.sheet-lg {
				width: var(--iv_sheet-lg);
			}

			&.sheet-full {
				width: 100%;
			}
		}

		&.side-top,
		&.side-bottom {
			width: min(100%, var(--iv_sheet-lg));
			height: var(--iv_sheet-md);
			left: 0;
			right: 0;
			margin: 0 auto;

			&.sheet-sm {
				height: var(--iv_sheet-sm);
			}

			&.sheet-lg {
				height: var(--iv_sheet-lg);
			}

			&.sheet-full {
				width: 100%;
				height: 100%;
				margin: 0;
			}
		}

		&.side-left {
			left: 0;
			border-radius: 0 var(--iv_radius-lg) var(--iv_radius-lg) 0;
		}

		&.side-right {
			right: 0;
			border-radius: var(--iv_radius-lg) 0 0 var(--iv_radius-lg);
		}

		&.side-top {
			top: 0;
			border-radius: 0 0 var(--iv_radius-lg) var(--iv_radius-lg);
		}

		&.side-bottom {
			bottom: 0;
			border-radius: var(--iv_radius-lg) var(--iv_radius-lg) 0 0;
		}

		&.sheet-full {
			border-radius: var(--iv_radius-lg);
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem;
		flex-shrink: 0;
		gap: 0.75rem;

		.title-area {
			display: flex;
			align-items: center;
			gap: 1rem;
			min-width: 0;
		}

		.icon-slot {
			display: flex;
			align-items: center;
			flex-shrink: 0;
			color: var(--iv_foreground);
		}

		h2 {
			margin: 0;
			font-size: var(--iv_text-xl);
			font-weight: 600;
			color: var(--iv_foreground);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.close-btn {
			padding: 0 0.5rem;
			margin-right: -0.5rem;
		}
	}

	.body {
		padding: 1.25rem;
		padding-top: 0;
		overflow-y: auto;
		flex: 1;
		color: var(--iv_foreground-dim);

		&.body-no-title {
			padding-top: 1.25rem;
		}

		:global(p:first-child) {
			margin-top: 0;
		}

		:global(p:last-child) {
			margin-bottom: 0;
		}
	}

	.footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 0 1.5rem 1.5rem;
		flex-shrink: 0;
	}
</style>
