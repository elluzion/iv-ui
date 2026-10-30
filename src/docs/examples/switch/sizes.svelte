<script lang="ts">
	import { Switch } from '$lib';

	let a = $state(true);
	let b = $state(true);
</script>

<div class="stack">
	<Switch label="Small" size="sm" bind:checked={a} />
	<Switch label="Medium" bind:checked={b} />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}
</style>
