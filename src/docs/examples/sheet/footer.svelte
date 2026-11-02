<script lang="ts">
	import { Button, Field, Input, Sheet } from '$lib';

	let open = $state(false);
	let name = $state('Orbital');
	let saved = $state(false);
</script>

<div class="stack">
	<Button onclick={() => (open = true)}>Edit workspace</Button>
	<Sheet bind:open title="Workspace" side="right">
		<Field label="Name" htmlFor="sheet-name">
			<Input id="sheet-name" bind:value={name} />
		</Field>
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
	</Sheet>
	{#if saved}<p class="readout">saved {name}</p>{/if}
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
		color: var(--iv_success);
	}
</style>
