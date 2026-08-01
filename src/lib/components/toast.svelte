<script lang="ts">
	import { IconCheck, IconInfoCircle, IconMoodSadDizzy, IconX } from '@tabler/icons-svelte';
	import { hideToast, toastState } from '../stores/toast';
	import { fade, fly } from 'svelte/transition';
</script>

{#if $toastState}
	<div class="toast-layer" role="status" aria-live="polite" transition:fade={{ duration: 120 }}>
		<div class="toast toast-{$toastState.type}" transition:fly={{ y: 16, duration: 160 }}>
			<div class="content">
				{#if $toastState.type === 'error'}
					<IconMoodSadDizzy stroke={2} size="1.1rem" color="var(--rust)" />
				{:else if $toastState.type === 'success'}
					<IconCheck stroke={2} size="1.1rem" color="var(--moss)" />
				{:else}
					<IconInfoCircle stroke={2} size="1.1rem" color="var(--info)" />
				{/if}
				<span>{$toastState.message}</span>
			</div>
			<button
				class="close"
				onclick={() => hideToast($toastState?.id)}
				aria-label="Dismiss notification"
			>
				<IconX size="1.1rem" />
			</button>
		</div>
	</div>
{/if}

<style>
	.toast-layer {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 110;
		pointer-events: none;
	}

	.toast {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 260px;
		max-width: min(520px, calc(100dvw - 2rem));
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--ink-2);
		box-shadow: var(--shadow-md);
	}

	.content {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		font-size: 0.9rem;
		min-width: 0;

		span {
			overflow-wrap: anywhere;
		}
	}

	.close {
		all: unset;
		cursor: pointer;
		border-radius: var(--radius-sm);
		font-weight: 700;
		opacity: 0.6;
		display: flex;
		height: 32px;
		align-items: center;
		justify-content: center;
		width: 32px;

		&:hover {
			opacity: 1;
			background: var(--surface-hover);
		}
	}

	@media (max-width: 640px) {
		.toast-layer {
			left: 1rem;
			right: 1rem;
		}

		.toast {
			max-width: none;
			min-width: 0;
		}
	}
</style>
