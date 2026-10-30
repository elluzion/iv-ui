<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { Menu } from '$lib';

	let last = $state('none');

	const entries: MenuEntry[] = [
		{ type: 'item', id: 'rename', item: { label: 'Rename' } },
		{
			type: 'submenu',
			id: 'share',
			label: 'Share',
			children: [
				{ type: 'item', id: 'link', item: { label: 'Copy link' } },
				{ type: 'item', id: 'email', item: { label: 'Email invite' } }
			]
		},
		{ type: 'item', id: 'details', item: { label: 'Details' } }
	];

	function handle(_event: MouseEvent, entry: MenuEntry) {
		if (entry.type === 'item') last = entry.item.label;
	}
</script>

<div class="stack">
	<div class="surface">
		<Menu {entries} label="Item actions" onclick={handle} />
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
