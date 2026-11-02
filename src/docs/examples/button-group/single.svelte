<script lang="ts">
	import { ButtonGroup } from '$lib';

	let period = $state('week');
</script>

<div class="stack">
	<ButtonGroup label="Period" mode="single" items={['day', 'week', 'month']} bind:value={period} />
	<p class="readout">period: {period}</p>
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
