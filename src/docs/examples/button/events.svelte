<script lang="ts">
	import { Button } from '$lib';

	let clicks = $state(0);
	let legacy = $state(0);

	// Both props receive the same native event.
	const handlers = {
		onclick: () => clicks++,
		'on:click': () => legacy++
	};
</script>

<div class="stack">
	<Button variant="primary" {...handlers}>Click me</Button>
	<p class="readout">onclick {clicks} · on:click {legacy}</p>
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
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
		font-variant-numeric: tabular-nums;
	}
</style>
