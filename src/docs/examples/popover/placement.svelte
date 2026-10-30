<script lang="ts">
	import type { PopoverPlacement } from '$lib';
	import { Button, Popover } from '$lib';

	let open = $state(false);
	let placement = $state<PopoverPlacement>('bottom');
</script>

<div class="stack">
	<div class="row">
		{#each ['top', 'bottom', 'left', 'right'] as side (side)}
			<Button
				size="sm"
				variant={placement === side ? 'primary' : 'outline'}
				onclick={() => (placement = side as PopoverPlacement)}
			>
				{side}
			</Button>
		{/each}
	</div>
	<div>
		<Button id="popover-placement-trigger" variant="ghost">Toggle panel</Button>
	</div>
	<Popover bind:open anchor="#popover-placement-trigger" {placement} closeOnOutside={false}>
		<p class="body">Preferred side: {placement}. The panel flips when space runs out.</p>
	</Popover>
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
		gap: var(--iv_spacing-xs);
	}

	.body {
		margin: 0;
		padding: var(--iv_spacing-sm) var(--iv_spacing-md);
		max-width: 220px;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
