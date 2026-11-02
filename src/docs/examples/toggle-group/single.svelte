<script lang="ts">
	import { ToggleGroup } from '$lib';

	let view = $state('list');
</script>

<div class="stack">
	<ToggleGroup label="View" mode="single" items={['list', 'grid', 'table']} bind:value={view} />
	<p class="readout">view: {view}</p>
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
