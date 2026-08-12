<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';
	import { focusTrap } from '../utils/focus-trap.js';

	interface Props {
		open: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
		onclose?: () => void;
		children: Snippet;
		icon?: Snippet;
		footer?: Snippet;
	}

	let {
		open = false,
		title = '',
		size = 'md',
		closeOnBackdrop = true,
		closeOnEscape = true,
		onclose,
		children,
		icon,
		footer
	}: Props = $props();

	const uid = $props.id();
	const titleId = `iv-dialog-${uid}-title`;
	const descId = `iv-dialog-${uid}-desc`;

	function close() {
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
	>
		<div
			class="iv-dialog"
			class:iv-dialog-sm={size === 'sm'}
			class:iv-dialog-lg={size === 'lg'}
			transition:scale={{ duration: $reducedMotion ? 0 : 150, start: 0.95 }}
		>
			{#if title || icon}
				<div class="iv-header">
					<div class="iv-title-area">
						{#if icon}
							<span class="iv-icon-slot">{@render icon()}</span>
						{/if}
						{#if title}
							<h2 id={titleId}>{title}</h2>
						{/if}
					</div>
					<button class="iv-icon iv-close-btn" onclick={close} aria-label="Close dialog"
						><IconX size={20} /></button
					>
				</div>
			{/if}
			<div class="iv-body" class:iv-body-no-title={!title} id={descId}>
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
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: var(--iv_z-overlay);
		padding: var(--iv_spacing-lg);
	}

	.iv-dialog {
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-lg);
		box-shadow: var(--iv_shadow-lg);
		width: 100%;
		max-width: var(--iv_dialog-md);
		max-height: calc(100dvh - var(--iv_dialog-gap));
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&.iv-dialog-sm {
			max-width: var(--iv_dialog-sm);
		}

		&.iv-dialog-lg {
			max-width: var(--iv_dialog-lg);
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
