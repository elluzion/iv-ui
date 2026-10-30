<script lang="ts">
	import { Button, Collapsible } from '$lib';

	let open = $state(false);
</script>

<div class="stack">
	<Collapsible title="Advanced options" bind:open>
		<p>Timeout, retry budget, and the cache policy for this route.</p>
	</Collapsible>
	<div class="row">
		<Button size="sm" variant="outline" onclick={() => (open = true)}>Open</Button>
		<Button size="sm" variant="ghost" onclick={() => (open = false)}>Close</Button>
	</div>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
	}

	.row {
		display: flex;
		gap: var(--iv_spacing-sm);
	}
</style>
