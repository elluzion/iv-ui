<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';
	import { alertDialogState } from '../stores/alert-dialog.js';
	import { focusTrap } from '../utils/focus-trap.js';
	import type { AlertDialogAction } from '../types.js';
	import Button from './button.svelte';

	interface Props {
		[key: string]: unknown;
	}

	let { ...restProps }: Props = $props();

	const uid = $props.id();
	const titleId = `iv-alert-${uid}-title`;
	const descId = `iv-alert-${uid}-desc`;

	const actions: AlertDialogAction[] = $derived.by(() => {
		const state = $alertDialogState;
		if (!state) return [];
		return state.actions && state.actions.length > 0
			? state.actions
			: [{ label: 'OK', variant: 'primary' }];
	});

	function close() {
		const state = $alertDialogState;
		alertDialogState.set(null);
		state?.onclose?.();
	}

	function handleAction(action: AlertDialogAction) {
		action.onClick?.();
		if (action.closeOnClick !== false) close();
	}

	function handleBackdropClick(e: MouseEvent) {
		if ($alertDialogState?.closeOnBackdrop !== false && e.target === e.currentTarget) {
			close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ($alertDialogState?.closeOnEscape !== false && e.key === 'Escape') close();
	}

	$effect(() => {
		if ($alertDialogState) {
			const prev = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = prev;
			};
		}
	});
</script>

{#if $alertDialogState}
	<div
		class="iv-backdrop"
		role="alertdialog"
		aria-modal="true"
		aria-labelledby={$alertDialogState.title ? titleId : undefined}
		aria-describedby={$alertDialogState.message ? descId : undefined}
		aria-label={$alertDialogState.title ? undefined : 'Alert dialog'}
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		use:focusTrap={{ initial: true }}
		transition:fade={{ duration: $reducedMotion ? 0 : 150 }}
		{...restProps}
	>
		<div
			class="iv-alertdialog"
			transition:scale={{ duration: $reducedMotion ? 0 : 150, start: 0.95 }}
		>
			{#if $alertDialogState.title}
				<h2 id={titleId} class="iv-alertdialog-title">{$alertDialogState.title}</h2>
			{/if}
			{#if $alertDialogState.message}
				<p id={descId} class="iv-alertdialog-message">{$alertDialogState.message}</p>
			{/if}
			<div class="iv-alertdialog-actions">
				{#each actions as action, i (i)}
					<Button
						variant={action.variant}
						size={action.size}
						disabled={action.disabled}
						onclick={() => handleAction(action)}
					>
						{action.label}
					</Button>
				{/each}
			</div>
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

	.iv-alertdialog {
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-lg);
		box-shadow: var(--iv_shadow-lg);
		width: 100%;
		max-width: var(--iv_dialog-sm);
		max-height: calc(100dvh - var(--iv_dialog-gap));
		overflow-y: auto;
		padding: var(--iv_spacing-2xl);
	}

	.iv-alertdialog-title {
		margin: 0;
		font-size: var(--iv_text-xl);
		font-weight: 600;
		color: var(--iv_foreground);
	}

	.iv-alertdialog-message {
		margin: var(--iv_spacing-md) 0 0;
		color: var(--iv_foreground-dim);
		line-height: var(--iv_leading-base);
	}

	.iv-alertdialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--iv_spacing-sm);
		margin-top: var(--iv_spacing-xl);
	}
</style>
