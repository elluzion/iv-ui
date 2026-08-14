<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconCopy, IconPencil, IconShare, IconTrash } from '@tabler/icons-svelte';
	import ContextMenu from './context-menu.svelte';
	import type { MenuEntry } from './menu.svelte';

	const entries: MenuEntry[] = [
		{ type: 'item', id: 'profile', item: { label: 'Profile', shortcut: '⇧⌘P' } },
		{ type: 'item', id: 'billing', item: { label: 'Billing', shortcut: '⌘B' } },
		{ type: 'item', id: 'settings', item: { label: 'Settings', shortcut: '⌘S' } },
		{ type: 'separator', id: 'sep-1' },
		{ type: 'item', id: 'duplicate', item: { label: 'Duplicate', icon: IconCopy, shortcut: '⌘D' } },
		{
			type: 'item',
			id: 'delete',
			item: { label: 'Delete', icon: IconTrash, shortcut: '⌫', dim: true }
		}
	];

	const iconEntries: MenuEntry[] = [
		{ type: 'item', id: 'rename', item: { label: 'Rename', icon: IconPencil, shortcut: 'F2' } },
		{ type: 'item', id: 'duplicate', item: { label: 'Duplicate', icon: IconCopy, shortcut: '⌘D' } },
		{ type: 'separator', id: 'sep-2' },
		{ type: 'item', id: 'delete', item: { label: 'Delete', icon: IconTrash, dim: true } }
	];

	const submenuEntries: MenuEntry[] = [
		{
			type: 'submenu',
			id: 'share',
			label: 'Share',
			icon: IconShare,
			children: [
				{ type: 'item', id: 'copy-link', item: { label: 'Copy link' } },
				{ type: 'item', id: 'email', item: { label: 'Email' } },
				{ type: 'item', id: 'invite', item: { label: 'Invite collaborators' } }
			]
		},
		{ type: 'separator', id: 'sep-3' },
		{ type: 'item', id: 'delete', item: { label: 'Delete', icon: IconTrash, dim: true } }
	];

	const { Story } = defineMeta({
		title: 'Overlays & Dialog/ContextMenu',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, waitFor, within } from 'storybook/test';

	let lastAction = $state('');
</script>

{#snippet shell(args: { entries: MenuEntry[]; hint: string })}
	<div class="iv-cm-shell">
		<ContextMenu
			entries={args.entries}
			label="Context actions"
			onclick={(_, entry) => (lastAction = entry.id)}
		>
			<button type="button" class="iv-cm-target">{args.hint}</button>
		</ContextMenu>
		{#if lastAction}
			<p class="iv-cm-result">Action: {lastAction}</p>
		{/if}
	</div>
{/snippet}

<Story
	name="Default"
	template={shell}
	args={{ entries: entries, hint: 'Right-click this area' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.pointer({
			keys: '[MouseRight]',
			target: canvas.getByRole('button', { name: 'Right-click this area' })
		});
		const item = await canvas.findByRole('menuitem', { name: /Profile/ });
		await userEvent.click(item);
		await waitFor(() => expect(canvas.queryByRole('menu')).not.toBeInTheDocument());
		await expect(canvas.getByText('Action: profile')).toBeVisible();
	}}
/>

<Story
	name="Keyboard"
	template={shell}
	args={{ entries: entries, hint: 'Focus then press Shift+F10' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const target = canvas.getByRole('button', { name: 'Focus then press Shift+F10' });
		target.focus();
		await userEvent.keyboard('{Shift>}{F10}{/Shift}');
		const items = await canvas.findAllByRole('menuitem');
		await waitFor(() => expect(items[0]).toHaveFocus());
		await userEvent.keyboard('{ArrowDown}');
		await waitFor(() => expect(items[1]).toHaveFocus());
		await userEvent.keyboard('{Enter}');
		await waitFor(() => expect(canvas.queryByRole('menu')).not.toBeInTheDocument());
		await expect(canvas.getByText('Action: billing')).toBeVisible();
	}}
/>

<Story
	name="WithIcons"
	template={shell}
	args={{ entries: iconEntries, hint: 'Right-click for actions' }}
/>

<Story
	name="WithSubmenus"
	template={shell}
	args={{ entries: submenuEntries, hint: 'Right-click for share options' }}
/>

<Story name="DisabledItem" template={shell} args={{ entries: entries, hint: 'Right-click here' }} />

<Story
	name="LongPress"
	template={shell}
	args={{ entries: entries, hint: 'Long-press to open', touchTrigger: 'longpress' }}
/>

<Story
	name="DoubleTap"
	template={shell}
	args={{ entries: entries, hint: 'Double-tap to open', touchTrigger: 'dblclick' }}
/>

<Story
	name="SingleTap"
	template={shell}
	args={{ entries: entries, hint: 'Tap to open', touchTrigger: 'click' }}
/>

<style>
	.iv-cm-shell {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.iv-cm-target {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 260px;
		height: 96px;
		border: 1px dashed var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-btn);
		cursor: pointer;
		user-select: none;

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}

	.iv-cm-result {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
