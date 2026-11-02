<script lang="ts">
	import { RadioGroup } from '$lib';

	let cadence = $state('daily');
</script>

<div class="field-row">
	<RadioGroup
		label="Digest cadence"
		orientation="horizontal"
		items={['hourly', 'daily', 'weekly']}
		bind:value={cadence}
	/>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 420px;
	}
</style>
