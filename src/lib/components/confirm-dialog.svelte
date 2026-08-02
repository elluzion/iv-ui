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
		class="backdrop"
		role="dialog"
		aria-modal="true"
		onkeydown={(e) => e.key === 'Escape' && cancel()}
		transition:fade={{ duration: 150 }}
	>
		<div class="dialog" transition:scale={{ duration: 150, start: 0.95 }}>
			<p>{$dialogState.message}</p>
			<div class="actions">
				<Button variant="outline" onclick={cancel}>No</Button>
				<Button onclick={confirm}>Yes</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: var(--iv_overlay);
		backdrop-filter: blur(var(--iv_blur));
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: var(--iv_z-overlay);
	}

	.dialog {
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-lg);
		padding: 1.5rem;
		min-width: 280px;
		max-width: 400px;
		box-shadow: var(--iv_shadow-lg);

		p {
			margin: 0 0 1.25rem;
		}
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
</style>
