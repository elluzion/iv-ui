<script lang="ts">
	import { Slider } from '$lib';

	let window = $state<[number, number]>([20, 80]);
</script>

<div class="field-row">
	<Slider label="Retention window" range bind:value={window} showValue />
	<p class="readout">{window[0]} — {window[1]} days</p>
</div>

<style>
	.field-row {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
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
