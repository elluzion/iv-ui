<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { ContextMenu } from '$lib';

	let last = $state('none');

	const entries: MenuEntry[] = [
		{ type: 'item', id: 'pin', item: { label: 'Pin to top' } },
		{ type: 'item', id: 'mute', item: { label: 'Mute alerts' } },
		{ type: 'item', id: 'leave', item: { label: 'Leave workspace' } }
	];

	function handle(_event: MouseEvent, entry: MenuEntry) {
		if (entry.type === 'item') last = entry.item.label;
	}
</script>

<div class="stack">
	<ContextMenu {entries} label="Workspace actions" touchTrigger="click" onclick={handle}>
		<button type="button" class="area">Tap for workspace actions</button>
	</ContextMenu>
	<p class="readout">last action: {last}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-sm);
		width: 100%;
	}

	.area {
		padding: var(--iv_spacing-md) var(--iv_spacing-lg);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		cursor: pointer;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
