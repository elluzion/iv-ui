<script lang="ts">
	import { ButtonGroup } from '$lib';

	let filters = $state<string[]>(['errors']);
</script>

<div class="stack">
	<ButtonGroup
		label="Filters"
		mode="multiple"
		items={['errors', 'warnings', 'info']}
		bind:value={filters}
	/>
	<p class="readout">active: {filters.join(', ') || '—'}</p>
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
