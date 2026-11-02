<script lang="ts">
	import { NativeSelect } from '$lib';

	let region = $state('');
</script>

<div class="field-row">
	<NativeSelect
		label="Region"
		placeholder="Choose a region"
		options={['eu-west', 'us-east', 'ap-south']}
		bind:value={region}
		helper="Latency is measured from the nearest edge."
	/>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 320px;
	}
</style>
