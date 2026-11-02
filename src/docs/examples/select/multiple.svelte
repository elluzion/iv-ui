<script lang="ts">
	import { Select } from '$lib';

	let services = $state<string[]>(['logs', 'metrics']);
</script>

<div class="field-row">
	<Select
		label="Services"
		multiple
		options={['logs', 'metrics', 'traces', 'alerts', 'backups']}
		bind:value={services}
		helper="Selected services receive the retention policy."
	/>
	<p class="readout">selected: {services.join(', ') || '—'}</p>
</div>

<style>
	.field-row {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
		max-width: 360px;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
