<script lang="ts">
	import { Select } from '$lib';

	let member = $state('');

	const options = [
		'Ada Lovelace',
		'Grace Hopper',
		'Alan Turing',
		'Katherine Johnson',
		'Margaret Hamilton',
		'Radia Perlman'
	];
</script>

<div class="field-row">
	<Select label="Reviewer" searchable placeholder="Search people…" {options} bind:value={member} />
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 320px;
	}
</style>
