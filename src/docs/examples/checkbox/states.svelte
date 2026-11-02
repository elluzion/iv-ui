<script lang="ts">
	import { Checkbox } from '$lib';

	let unchecked = $state(false);
	let checked = $state(true);
	let mixed = $state(false);
</script>

<div class="stack">
	<Checkbox label="Unchecked" bind:checked={unchecked} />
	<Checkbox label="Checked" bind:checked />
	<Checkbox label="Mixed" indeterminate bind:checked={mixed} />
	<Checkbox label="Disabled" checked disabled />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}
</style>
