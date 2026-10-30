<script lang="ts">
	import { Alert, Button } from '$lib';

	let visible = $state(true);
</script>

<div class="stack">
	{#if visible}
		<Alert
			type="info"
			title="New version available"
			dismissible
			ondismiss={() => (visible = false)}
		>
			Reload to pick up the latest build.
		</Alert>
	{:else}
		<Button size="sm" variant="outline" onclick={() => (visible = true)}>Restore alert</Button>
	{/if}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: var(--iv_spacing-md);
		width: 100%;
	}
</style>
