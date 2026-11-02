<script lang="ts">
	import { Button, showAlertDialog } from '$lib';

	let last = $state('none');

	function choose() {
		showAlertDialog({
			title: 'Unsaved changes',
			message: 'Leave the editor and lose the draft, or keep working?',
			closeOnBackdrop: false,
			actions: [
				{
					label: 'Keep editing',
					variant: 'ghost',
					onClick: () => (last = 'keep editing')
				},
				{
					label: 'Discard',
					variant: 'danger',
					onClick: () => (last = 'discarded')
				},
				{
					label: 'Save draft',
					variant: 'primary',
					onClick: () => (last = 'saved')
				}
			]
		});
	}
</script>

<div class="stack">
	<Button variant="outline" onclick={choose}>Close editor</Button>
	<p class="readout">last choice: {last}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
