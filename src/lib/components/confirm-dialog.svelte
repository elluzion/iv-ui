<script lang="ts">
	import { dialogState } from '../stores/dialog';
	import { fade, scale } from 'svelte/transition';

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
				<button class="outline" onclick={cancel}>No</button>
				<button onclick={confirm}>Yes</button>
			</div>
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
	}

	.dialog {
		background: var(--ink-2);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		min-width: 280px;
		max-width: 400px;
		box-shadow: var(--shadow-lg);

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
