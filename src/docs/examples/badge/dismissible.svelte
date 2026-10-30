<script lang="ts">
	import { Badge, Button } from '$lib';

	let tags = $state(['edge', 'cache', 'read-only']);

	function remove(tag: string) {
		tags = tags.filter((value) => value !== tag);
	}
</script>

<div class="stack">
	<div class="row">
		{#each tags as tag (tag)}
			<Badge variant="neutral" dismissible ondismiss={() => remove(tag)}>{tag}</Badge>
		{/each}
		{#if tags.length === 0}<span class="empty">no tags</span>{/if}
	</div>
	{#if tags.length < 3}
		<Button size="sm" variant="ghost" onclick={() => (tags = ['edge', 'cache', 'read-only'])}>
			Restore
		</Button>
	{/if}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: var(--iv_spacing-sm);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.empty {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
