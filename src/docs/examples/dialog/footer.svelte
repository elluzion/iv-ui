<script lang="ts">
	import { Button, Dialog } from '$lib';

	let open = $state(false);
	let saved = $state(false);
</script>

<div class="stack">
	<Button variant="primary" onclick={() => (open = true)}>Edit retention</Button>
	<Dialog {open} title="Retention policy" onclose={() => (open = false)}>
		<p class="body">Logs older than the selected window are removed at the next sweep.</p>
		{#snippet footer()}
			<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
			<Button
				variant="primary"
				onclick={() => {
					open = false;
					saved = true;
				}}>Save</Button
			>
		{/snippet}
	</Dialog>
	{#if saved}<p class="readout">policy saved</p>{/if}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.body {
		margin: 0;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_success);
	}
</style>
