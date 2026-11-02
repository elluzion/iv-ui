<script lang="ts">
	import { IconLayoutGrid, IconList, IconTable } from '@tabler/icons-svelte';
	import { ToggleGroup } from '$lib';

	let view = $state('grid');

	const items = [
		{ value: 'list', label: 'List', icon: IconList },
		{ value: 'grid', label: 'Grid', icon: IconLayoutGrid },
		{ value: 'table', label: 'Table', icon: IconTable }
	];
</script>

<ToggleGroup label="View" mode="single" {items} bind:value={view} />
