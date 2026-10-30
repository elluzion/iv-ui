<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { Menu } from '$lib';

	let last = $state('none');

	const entries: MenuEntry[] = [
		{ type: 'header', id: 'project', label: 'Project' },
		{ type: 'item', id: 'open', item: { label: 'Open', shortcut: '⏎' } },
		{ type: 'item', id: 'duplicate', item: { label: 'Duplicate', shortcut: '⌘D' } },
		{ type: 'separator', id: 'sep' },
		{ type: 'item', id: 'archive', item: { label: 'Archive' } },
		{ type: 'item', id: 'delete', item: { label: 'Delete', disabled: true } }
	];

	function handle(_event: MouseEvent, entry: MenuEntry) {
		if (entry.type === 'item') last = entry.item.label;
	}
</script>

<div class="stack">
	<div class="surface">
		<Menu {entries} label="Project actions" onclick={handle} />
	</div>
	<p class="readout">last action: {last}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.surface {
		width: 260px;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
