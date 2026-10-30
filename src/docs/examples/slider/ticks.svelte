<script lang="ts">
	import { Slider } from '$lib';

	let replicas = $state(3);
</script>

<div class="field-row">
	<Slider label="Replicas" min={1} max={9} step={1} tickMarks bind:value={replicas} showValue />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 360px;
	}
</style>
