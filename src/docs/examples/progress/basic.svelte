<script lang="ts">
	import { Progress } from '$lib';
</script>

<div class="field-row">
	<Progress value={42} label="Upload" />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 380px;
	}
</style>
