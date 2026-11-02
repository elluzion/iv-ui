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
			{ value: 'team', label: 'Team' }
		]}
		bind:value={plan}
	/>
	<p class="readout">selected: {plan}</p>
</div>

<style>
	.field-row {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
		max-width: 320px;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
