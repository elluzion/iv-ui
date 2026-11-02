<script lang="ts">
	import { Input } from '$lib';

	let filled = $state('atlas-core');
</script>

<div class="fields">
	<Input label="Project name" placeholder="atlas-core" />
	<Input label="Slug" bind:value={filled} helper="Lowercase, dashes only." />
	<Input label="Repository" value="atlas/core" error="This repository is already linked." />
	<Input label="Owner" value="elluzion" disabled />
	<Input label="Region" value="eu-west-1" readonly />
</div>

<style>
	.fields {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		width: 100%;
		max-width: 320px;
	}
</style>
