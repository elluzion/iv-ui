<script lang="ts">
	import { Checkbox } from '$lib';

	let checked = $state(false);
	let changes = $state(0);
</script>

<div class="stack">
	<Checkbox label="Watch this repository" bind:checked onchange={() => changes++} />
	<p class="readout">checked {checked} · changes {changes}</p>
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
