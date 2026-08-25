<script lang="ts">
	import { IconCheck, IconInfoCircle, IconMoodSadDizzy, IconX } from '@tabler/icons-svelte';
	import { hideToast, toastState } from '../stores/toast.js';
	import { reducedMotion } from '../stores/motion.js';
	import { fade, fly } from 'svelte/transition';
</script>

{#if $toastState}
	<div
		class="iv-toast-layer"
		role={$toastState.type === 'error' ? 'alert' : 'status'}
		aria-live={$toastState.type === 'error' ? 'assertive' : 'polite'}
		transition:fade={{ duration: $reducedMotion ? 0 : 120 }}
	>
		<div
			class="iv-toast iv-toast-{$toastState.type}"
			transition:fly={{ y: 16, duration: $reducedMotion ? 0 : 160 }}
		>
			<div class="iv-content">
				{#if $toastState.type === 'error'}
					<IconMoodSadDizzy stroke={2} size="1.1rem" color="var(--iv_surface)" />
				{:else if $toastState.type === 'success'}
					<IconCheck stroke={2} size="1.1rem" color="var(--iv_surface)" />
				{:else}
					<IconInfoCircle stroke={2} size="1.1rem" color="var(--iv_surface)" />
				{/if}
				<span>{$toastState.message}</span>
			</div>
			<button
				class="iv-close"
				onclick={() => hideToast($toastState?.id)}
				aria-label="Dismiss notification"
			>
				<IconX size="1.1rem" />
			</button>
		</div>
	</div>
{/if}

<style>
	.iv-toast-layer {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: var(--iv_z-toast);
		pointer-events: none;
	}

	.iv-toast {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-md);
		min-width: var(--iv_toast-min-w);
		max-width: min(520px, calc(100dvw - 2rem));
		padding: var(--iv_spacing-sm) var(--iv_spacing-sm) var(--iv_spacing-sm) var(--iv_spacing-md);
		border-radius: var(--iv_radius-sm);
		border: 1px solid var(--iv_border);
		background: var(--iv_surface-elevated);
		box-shadow: var(--iv_shadow-md);

		&.iv-toast-success {
			background: var(--iv_success);
			border-color: var(--iv_success);
			color: var(--iv_surface);
		}

		&.iv-toast-error {
			background: var(--iv_error);
			border-color: var(--iv_error);
			color: var(--iv_surface);
		}

		&.iv-toast-info {
			background: var(--iv_info);
			border-color: var(--iv_info);
			color: var(--iv_surface);
		}
	}

	.iv-content {
		display: flex;
		gap: var(--iv_spacing-md);
		align-items: center;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		min-width: 0;

		span {
			overflow-wrap: anywhere;
		}
	}

	.iv-close {
		all: unset;
		cursor: pointer;
		border-radius: var(--iv_radius-sm);
		font-weight: 700;
		opacity: 0.6;
		display: flex;
		height: var(--iv_toast-close-size);
		align-items: center;
		justify-content: center;
		width: var(--iv_toast-close-size);

		&:hover {
			opacity: 1;
			background: var(--iv_surface-overlay);
		}

		&:focus-visible {
			opacity: 1;
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}

	.iv-toast-success .iv-close,
	.iv-toast-error .iv-close,
	.iv-toast-info .iv-close {
		color: var(--iv_surface);

		&:hover {
			background: rgba(0, 0, 0, 0.2);
		}

		&:focus-visible {
			outline-color: var(--iv_surface);
		}
	}

	@media (max-width: 640px) {
		.iv-toast-layer {
			left: 1rem;
			right: 1rem;
		}

		.iv-toast {
			max-width: none;
			min-width: 0;
		}
	}
</style>
