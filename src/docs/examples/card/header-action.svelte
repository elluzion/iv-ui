<script lang="ts">
	import { Button, Card } from '$lib';

	let refreshed = $state(0);
</script>

<Card title="Deployments" description="The last three runs for this project.">
	{#snippet action()}
		<Button size="sm" variant="ghost" onclick={() => refreshed++}>Refresh</Button>
	{/snippet}
	<p class="body">Refreshed {refreshed} times.</p>
</Card>

<style>
	.body {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground-dim);
	}
</style>
