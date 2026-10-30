<script lang="ts">
	import { Toggle } from '$lib';

	let a = $state(true);
	let b = $state(true);
	let c = $state(true);
</script>

<div class="row">
	<Toggle size="sm" bind:checked={a}>Small</Toggle>
	<Toggle bind:checked={b}>Medium</Toggle>
	<Toggle size="lg" bind:checked={c}>Large</Toggle>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
