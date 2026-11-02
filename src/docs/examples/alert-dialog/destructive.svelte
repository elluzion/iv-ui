<script lang="ts">
	import { Button, showAlertDialog } from '$lib';

	let deleted = $state(false);

	function remove() {
		showAlertDialog({
			title: 'Delete project?',
			message: 'Orbital and its deployments will be removed. This cannot be undone.',
			actions: [
				{ label: 'Cancel', variant: 'ghost' },
				{
					label: 'Delete project',
					variant: 'danger',
					onClick: () => (deleted = true)
				}
			]
		});
	}
</script>

<div class="stack">
	<Button variant="danger" onclick={remove}>Delete project</Button>
	{#if deleted}<p class="readout">project deleted</p>{/if}
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
		color: var(--iv_error);
	}
</style>
