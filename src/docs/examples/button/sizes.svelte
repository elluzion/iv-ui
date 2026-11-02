<script lang="ts">
	import { IconPlus } from '@tabler/icons-svelte';
	import { Button } from '$lib';
</script>

<div class="row">
	<Button size="sm" variant="primary">Small</Button>
	<Button size="md" variant="primary">Medium</Button>
	<Button size="lg" variant="primary">Large</Button>
</div>
<div class="row">
	<Button size="sm" variant="outline"><IconPlus size={14} /> New</Button>
	<Button size="md" variant="outline"><IconPlus size={16} /> New</Button>
	<Button size="lg" variant="outline"><IconPlus size={18} /> New</Button>
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
