<script lang="ts">
	import { ToggleGroup } from '$lib';

	let columns = $state<string[]>(['status', 'owner']);
</script>

<div class="stack">
	<ToggleGroup
		label="Columns"
		mode="multiple"
		items={['status', 'owner', 'updated', 'branch']}
		bind:value={columns}
	/>
	<p class="readout">shown: {columns.join(', ') || '—'}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: var(--iv_spacing-sm);
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
