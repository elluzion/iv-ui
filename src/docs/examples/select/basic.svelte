<script lang="ts">
	import { Select } from '$lib';

	let branch = $state('');
</script>

<div class="field-row">
	<Select
		label="Branch"
		placeholder="Choose a branch"
		options={['main', 'release', 'feat/docs-site']}
		bind:value={branch}
		helper="Deploys use the selected branch."
	/>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 320px;
	}
</style>
