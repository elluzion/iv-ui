<script lang="ts">
	import { dialogState } from '../stores/dialog.js';
	import { fade, scale } from 'svelte/transition';
	import Button from './button.svelte';

	function confirm() {
		$dialogState?.onconfirm();
		dialogState.set(null);
	}

	function cancel() {
		$dialogState?.oncancel();
		dialogState.set(null);
	}
</script>

{#if $dialogState}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="iv-backdrop"
		role="dialog"
		aria-modal="true"
		onkeydown={(e) => e.key === 'Escape' && cancel()}
		transition:fade={{ duration: 150 }}
	>
		<div class="iv-dialog" transition:scale={{ duration: 150, start: 0.95 }}>
			<p>{$dialogState.message}</p>
			<div class="iv-actions">
				<Button variant="outline" onclick={cancel}>No</Button>
				<Button onclick={confirm}>Yes</Button>
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
	}

	.iv-dialog {
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-lg);
		padding: var(--iv_spacing-2xl);
		min-width: 280px;
		max-width: 400px;
		box-shadow: var(--iv_shadow-lg);

		p {
			margin: 0 0 var(--iv_spacing-xl);
		}
	}

	.iv-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--iv_spacing-sm);
	}
</style>
