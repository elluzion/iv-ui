<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';

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
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
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
			class="dialog"
			class:dialog-sm={size === 'sm'}
			class:dialog-lg={size === 'lg'}
			transition:scale={{ duration: 150, start: 0.95 }}
		>
			{#if title || icon}
				<div class="header">
					<div class="title-area">
						{#if icon}
							<span class="icon-slot">{@render icon()}</span>
						{/if}
						{#if title}
							<h2>{title}</h2>
						{/if}
					</div>
					<button class="icon close-btn" onclick={close} aria-label="Close dialog"
						><IconX size={20} /></button
					>
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
		background: var(--overlay);
		backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: 1rem;
	}

	.dialog {
		background: var(--ink-2);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		width: 100%;
		max-width: 520px;
		max-height: calc(100dvh - 4rem);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&.dialog-sm {
			max-width: 400px;
		}

		&.dialog-lg {
			max-width: 640px;
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
			color: var(--paper);
		}

		h2 {
			margin: 0;
			font-size: 1.1rem;
			font-weight: 600;
			color: var(--paper);
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
		color: var(--paper-dim);

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
