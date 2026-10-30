<script lang="ts">
	import { Checkbox } from '$lib';
</script>

<div class="stack">
	<Checkbox label="Small" size="sm" checked />
	<Checkbox label="Medium" checked />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}
</style>
