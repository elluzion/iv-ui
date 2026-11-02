<script lang="ts">
	import { Button, EmptyState } from '$lib';
</script>

<EmptyState
	title="No saved queries"
	description="Save a query to reuse it from the command palette."
>
	{#snippet action()}
		<Button variant="primary" size="sm">Create query</Button>
	{/snippet}
</EmptyState>
