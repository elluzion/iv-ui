<script lang="ts">
	import { Textarea } from '$lib';

	let summary = $state('Tightened the focus ring and reduced the dialog entry by 40 ms.');
</script>

<div class="field-row">
	<Textarea label="Summary" maxlength={120} showCount bind:value={summary} />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 420px;
	}
</style>
