<script lang="ts">
	import { IconTerminal2 } from '@tabler/icons-svelte';
	import { Collapsible, Shortcut } from '$lib';
</script>

<Collapsible defaultOpen>
	{#snippet trigger()}
		<span class="trigger">
			<IconTerminal2 size={14} />
			Console
			<Shortcut keys={['⌘', 'K']} />
		</span>
	{/snippet}
	<p>Open the command palette with the shortcut shown above.</p>
</Collapsible>

<style>
	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
