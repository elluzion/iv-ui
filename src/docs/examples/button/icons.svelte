<script lang="ts">
	import { IconArrowRight, IconDownload, IconSearch, IconTrash } from '@tabler/icons-svelte';
	import { Button } from '$lib';
</script>

<div class="row">
	<Button variant="primary"><IconDownload size={16} /> Export</Button>
	<Button variant="outline">Continue <IconArrowRight size={16} /></Button>
	<Button variant="ghost"><IconSearch size={16} /> Search</Button>
	<Button variant="danger"><IconTrash size={16} /> Delete</Button>
</div>
<div class="row">
	<Button variant="icon" aria-label="Search"><IconSearch size={18} /></Button>
	<Button variant="icon" aria-label="Export"><IconDownload size={18} /></Button>
	<Button variant="icon" aria-label="Delete" disabled><IconTrash size={18} /></Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
