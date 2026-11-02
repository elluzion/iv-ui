<script lang="ts">
	import { Slider } from '$lib';

	let quota = $state(70);
</script>

<div class="field-row">
	<Slider label="Storage quota" bind:value={quota} showValue disabled />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 360px;
	}
</style>
