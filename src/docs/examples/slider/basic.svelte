<script lang="ts">
	import { Slider } from '$lib';

	let volume = $state(64);
</script>

<div class="field-row">
	<Slider label="Volume" bind:value={volume} showValue />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 360px;
	}
</style>
