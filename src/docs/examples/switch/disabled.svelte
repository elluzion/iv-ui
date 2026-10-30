<script lang="ts">
	import { Switch } from '$lib';
</script>

<div class="stack">
	<Switch label="Locked by policy" checked disabled />
	<Switch label="Available" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}
</style>
