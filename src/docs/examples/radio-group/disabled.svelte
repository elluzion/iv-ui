<script lang="ts">
	import { RadioGroup } from '$lib';

	let plan = $state('pro');
</script>

<div class="field-row">
	<RadioGroup
		label="Plan"
		items={[
			{ value: 'free', label: 'Free' },
			{ value: 'pro', label: 'Pro' },
			{ value: 'enterprise', label: 'Enterprise — sales only', disabled: true }
		]}
		bind:value={plan}
	/>
	<RadioGroup label="Region" items={['eu-west', 'us-east']} value="eu-west" disabled />
</div>

<style>
	.field-row {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-xl);
		width: 100%;
		max-width: 320px;
	}
</style>
