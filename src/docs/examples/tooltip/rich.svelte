<script lang="ts">
	import { Button, Shortcut, Tooltip } from '$lib';
</script>

<Tooltip position="bottom">
	{#snippet content()}
		<span class="content">Command palette <Shortcut keys={['⌘', 'K']} /></span>
	{/snippet}
	<Button variant="outline" size="sm">Open palette</Button>
</Tooltip>

<style>
	.content {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
