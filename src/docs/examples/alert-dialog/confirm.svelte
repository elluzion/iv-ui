<script lang="ts">
	import { AlertDialog, Button, showAlertDialog } from '$lib';

	let published = $state(0);

	function confirm() {
		showAlertDialog({
			title: 'Publish release?',
			message: 'The build will be promoted to production and the current version will be archived.',
			actions: [
				{ label: 'Cancel', variant: 'ghost' },
				{
					label: 'Publish',
					variant: 'primary',
					onClick: () => (published += 1)
				}
			]
		});
	}
</script>

<div class="stack">
	<Button variant="primary" onclick={confirm}>Publish release</Button>
	<p class="readout">published {published} times</p>
	<AlertDialog />
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
