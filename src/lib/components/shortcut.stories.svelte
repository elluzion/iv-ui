<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Shortcut from './shortcut.svelte';

	const { Story } = defineMeta({
		title: 'Common/Shortcut',
		component: Shortcut,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md'] }
		}
	});
</script>

<Story name="Single" args={{ keys: 'P', label: 'P' }} />

<Story name="Multiple" args={{ keys: ['⇧', '⌘', 'P'], label: 'Shift Command P' }} />

<Story name="WithoutLabel" args={{ keys: ['⌘', 'B'] }} />

<Story name="Medium" args={{ keys: ['⇧', '⌘', 'K'], label: 'Shift Command K', size: 'md' }} />

<Story name="InMenuItem">
	<div
		style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem 0.75rem; border:1px solid var(--iv_border); border-radius:var(--iv_radius); background:var(--iv_surface-raised); min-width:18rem; font-family:var(--iv_font-sans);"
	>
		<span style="flex:1; color:var(--iv_foreground); font-size:var(--iv_text-body);">
			Command palette
		</span>
		<Shortcut keys={['⇧', '⌘', 'K']} label="Shift Command K" />
	</div>
</Story>
