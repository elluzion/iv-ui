<script lang="ts">
	import { Textarea } from '$lib';

	let notes = $state('');
</script>

<div class="field-row">
	<Textarea
		label="Release notes"
		placeholder="What changed in this deploy?"
		bind:value={notes}
		helper="Markdown is supported."
	/>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 420px;
	}
</style>
