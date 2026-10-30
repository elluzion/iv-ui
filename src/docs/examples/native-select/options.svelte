<script lang="ts">
	import { NativeSelect } from '$lib';

	let plan = $state('pro');

	const options = [
		{ value: 'free', label: 'Free — 1 project' },
		{ value: 'pro', label: 'Pro — 10 projects' },
		{ value: 'team', label: 'Team — unlimited' },
		{ value: 'enterprise', label: 'Enterprise — contact us', disabled: true }
	];
</script>

<div class="field-row">
	<NativeSelect label="Plan" {options} bind:value={plan} helper="Change the plan at any time." />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 320px;
	}
</style>
