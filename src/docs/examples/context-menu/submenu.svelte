<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { ContextMenu } from '$lib';

	let last = $state('none');

	const entries: MenuEntry[] = [
		{ type: 'item', id: 'copy', item: { label: 'Copy id', shortcut: '⌘C' } },
		{
			type: 'submenu',
			id: 'export',
			label: 'Export as',
			children: [
				{ type: 'item', id: 'json', item: { label: 'JSON' } },
				{ type: 'item', id: 'csv', item: { label: 'CSV' } },
				{ type: 'item', id: 'yaml', item: { label: 'YAML', disabled: true } }
			]
		},
		{ type: 'item', id: 'archive', item: { label: 'Archive' } }
	];

	function handle(_event: MouseEvent, entry: MenuEntry) {
		if (entry.type === 'item') last = entry.item.label;
	}
</script>

<div class="stack">
	<ContextMenu {entries} label="Record actions" onclick={handle}>
		<div class="area">Right-click for the record actions</div>
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
		width: 100%;
		max-width: 360px;
		padding: var(--iv_spacing-2xl);
		border: 1px dashed var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		text-align: center;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
