<script lang="ts">
	import type { MenuEntry } from '$lib';
	import { Menu } from '$lib';

	let selected = $state<string[]>(['logs']);

	const options = [
		{ id: 'logs', label: 'Logs' },
		{ id: 'metrics', label: 'Metrics' },
		{ id: 'traces', label: 'Traces' }
	];

	const entries = $derived<MenuEntry[]>(
		options.map((option) => ({
			type: 'item' as const,
			id: option.id,
			item: { label: option.label, selected: selected.includes(option.id) }
		}))
	);

	function handle(_event: MouseEvent, entry: MenuEntry) {
		if (entry.type !== 'item') return;
		selected = selected.includes(entry.id)
			? selected.filter((id) => id !== entry.id)
			: [...selected, entry.id];
	}
</script>

<div class="stack">
	<div class="surface">
		<Menu {entries} semantic="listbox" multiselect label="Signals" onclick={handle} />
	</div>
	<p class="readout">selected: {selected.join(', ') || '—'}</p>
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
