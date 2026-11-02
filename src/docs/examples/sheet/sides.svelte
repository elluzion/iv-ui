<script lang="ts">
	import type { SheetSide } from '$lib';
	import { Button, Sheet } from '$lib';

	let open = $state(false);
	let side = $state<SheetSide>('right');
</script>

<div class="stack">
	<div class="row">
		{#each ['left', 'right', 'top', 'bottom'] as edge (edge)}
			<Button
				size="sm"
				variant="outline"
				onclick={() => {
					side = edge as SheetSide;
					open = true;
				}}>{edge}</Button
			>
		{/each}
	</div>
	<Sheet bind:open {side} title="Sheet from the {side}">
		<p class="body">The panel slides in from the chosen edge and traps focus until it closes.</p>
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
