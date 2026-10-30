<script lang="ts">
	import { NativeSelect } from '$lib';

	let errorValue = $state('');
</script>

<div class="stack">
	<NativeSelect
		label="Environment"
		placeholder="Choose an environment"
		options={['staging', 'production']}
		bind:value={errorValue}
		error="An environment is required."
	/>
	<NativeSelect
		label="Region"
		options={['eu-west', 'us-east']}
		value="eu-west"
		disabled
		helper="Locked by the organization policy."
	/>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		width: 100%;
		max-width: 320px;
	}
</style>
