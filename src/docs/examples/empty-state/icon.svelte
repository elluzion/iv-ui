<script lang="ts">
	import { IconArchive } from '@tabler/icons-svelte';
	import { EmptyState } from '$lib';
</script>

<EmptyState
	title="Archive is empty"
	description="Archived projects are kept for 90 days before they are removed."
>
	{#snippet icon()}<IconArchive size={20} />{/snippet}
</EmptyState>
