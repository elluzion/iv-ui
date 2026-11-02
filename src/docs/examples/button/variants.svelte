<script lang="ts">
	import { IconDots } from '@tabler/icons-svelte';
	import { Button } from '$lib';
</script>

<div class="row">
	<Button variant="primary">Primary</Button>
	<Button>Secondary</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="danger">Danger</Button>
	<Button variant="icon" aria-label="More actions"><IconDots size={16} /></Button>
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
