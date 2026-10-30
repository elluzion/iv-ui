<script lang="ts">
	import { Switch } from '$lib';

	let telemetry = $state(true);
</script>

<div class="stack">
	<Switch label="Send anonymous telemetry" bind:checked={telemetry} />
	<p class="readout">telemetry {telemetry ? 'on' : 'off'}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
