<script lang="ts">
	import { Input, InputGroup } from '$lib';

	let host = $state('orbital');
</script>

<div class="field-row">
	<InputGroup>
		{#snippet prefix()}<span>https://</span>{/snippet}
		<Input bind:value={host} aria-label="Host" />
		{#snippet suffix()}<span>.dev</span>{/snippet}
	</InputGroup>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 340px;
	}
</style>
