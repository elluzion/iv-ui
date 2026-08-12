<script lang="ts">
	import { dialogState } from '../stores/dialog.js';
	import { reducedMotion } from '../stores/motion.js';
	import { fade, scale } from 'svelte/transition';
	import Button from './button.svelte';
	import { focusTrap } from '../utils/focus-trap.js';

	const uid = $props.id();
	const descId = `iv-confirm-${uid}-desc`;

	function confirm() {
		$dialogState?.onconfirm();
		dialogState.set(null);
	}

	function cancel() {
		$dialogState?.oncancel();
		dialogState.set(null);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') cancel();
	}
</script>

{#if $dialogState}
	<div
		class="iv-backdrop"
		role="alertdialog"
		aria-modal="true"
		aria-describedby={descId}
		tabindex="-1"
		onkeydown={handleKeydown}
		transition:fade={{ duration: $reducedMotion ? 0 : 150 }}
	>
		<div
			class="iv-dialog"
			use:focusTrap={{ initial: true }}
			transition:scale={{ duration: $reducedMotion ? 0 : 150, start: 0.95 }}
		>
			<p id={descId}>{$dialogState.message}</p>
			<div class="iv-actions">
				<Button variant="outline" onclick={cancel}>No</Button>
				<Button onclick={confirm}>Yes</Button>
			</div>
		</div>
	</div>
{/if}
