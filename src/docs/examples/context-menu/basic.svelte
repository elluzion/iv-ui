<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { ContextMenu } from '$lib';

	let last = $state('none');

	const entries: MenuEntry[] = [
		{ type: 'header', id: 'file', label: 'File' },
		{ type: 'item', id: 'open', item: { label: 'Open', shortcut: '⏎' } },
		{ type: 'item', id: 'rename', item: { label: 'Rename', shortcut: 'F2' } },
		{ type: 'separator', id: 'sep' },
		{ type: 'item', id: 'delete', item: { label: 'Delete', shortcut: '⌫' } }
	];

	function handle(_event: MouseEvent, entry: MenuEntry) {
		last = entry.type === 'item' ? entry.item.label : entry.type;
	}
</script>

<div class="stack">
	<ContextMenu {entries} label="File actions" onclick={handle}>
		<div class="area">
			<strong>Right-click this panel</strong>
			<span>or focus it and press Shift+F10</span>
		</div>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-2xs);
		width: 100%;
		max-width: 360px;
		padding: var(--iv_spacing-2xl);
		border: 1px dashed var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
	}

	.area strong {
		color: var(--iv_foreground);
		font-weight: 500;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
