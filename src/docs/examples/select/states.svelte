<script lang="ts">
	import { Select } from '$lib';

	let region = $state('eu-west');
	let environment = $state('');
</script>

<div class="stack">
	<Select
		label="Region"
		clearable
		options={['eu-west', 'us-east', 'ap-south']}
		bind:value={region}
	/>
	<Select
		label="Environment"
		placeholder="Choose an environment"
		options={['staging', 'production']}
		bind:value={environment}
		error="An environment is required."
	/>
	<Select label="Organization" options={['orbital']} value="orbital" disabled />
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
