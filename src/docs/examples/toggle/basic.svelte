<script lang="ts">
	import { Toggle } from '$lib';

	let pinned = $state(true);
</script>

<div class="stack">
	<Toggle bind:checked={pinned}>Pin to dashboard</Toggle>
	<p class="readout">pinned {pinned ? 'yes' : 'no'}</p>
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
