<script lang="ts">
	import type { SheetSize } from '$lib';
	import { Button, Sheet } from '$lib';

	let open = $state(false);
	let size = $state<SheetSize>('md');
</script>

<div class="stack">
	<div class="row">
		{#each ['sm', 'md', 'lg', 'full'] as step (step)}
			<Button
				size="sm"
				variant={size === step ? 'primary' : 'outline'}
				onclick={() => {
					size = step as SheetSize;
					open = true;
				}}>{step}</Button
			>
		{/each}
	</div>
	<Sheet bind:open {size} title="Size {size}" side="right">
		<p class="body">Width is capped by the size step; full takes the whole viewport.</p>
	</Sheet>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-md);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}

	.body {
		margin: 0;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
	}
</style>
