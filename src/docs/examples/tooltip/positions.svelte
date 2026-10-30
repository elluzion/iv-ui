<script lang="ts">
	import { Button, Tooltip } from '$lib';
</script>

<div class="row">
	{#each ['top', 'bottom', 'left', 'right'] as side (side)}
		<Tooltip label="{side} tooltip" position={side as 'top' | 'bottom' | 'left' | 'right'}>
			<Button variant="outline" size="sm">{side}</Button>
		</Tooltip>
	{/each}
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
