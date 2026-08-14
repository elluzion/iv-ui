<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import {
		IconChevronRight,
		IconCopy,
		IconMail,
		IconPencil,
		IconShare,
		IconTrash
	} from '@tabler/icons-svelte';
	import Menu, { type MenuEntry } from './menu.svelte';

	const accountEntries: MenuEntry[] = [
		{ type: 'header', id: 'account-header', label: 'My Account' },
		{ type: 'item', id: 'profile', item: { label: 'Profile', shortcut: '⇧⌘P' } },
		{ type: 'item', id: 'billing', item: { label: 'Billing', shortcut: '⌘B' } },
		{ type: 'item', id: 'settings', item: { label: 'Settings', shortcut: '⌘S' } },
		{ type: 'separator', id: 'sep-account-1' },
		{ type: 'header', id: 'team-header', label: 'Team' },
		{
			type: 'item',
			id: 'invite-users',
			item: { label: 'Invite users', trailingIcon: IconChevronRight }
		},
		{ type: 'item', id: 'new-team', item: { label: 'New Team', shortcut: '⌘T' } },
		{ type: 'separator', id: 'sep-account-2' },
		{ type: 'item', id: 'github', item: { label: 'GitHub' } },
		{ type: 'item', id: 'support', item: { label: 'Support' } },
		{ type: 'item', id: 'api', item: { label: 'API', dim: true } },
		{ type: 'separator', id: 'sep-account-3' },
		{ type: 'item', id: 'logout', item: { label: 'Log out', shortcut: '⇧⌘Q' } }
	];

	const iconEntries: MenuEntry[] = [
		{ type: 'item', id: 'rename', item: { label: 'Rename', icon: IconPencil, shortcut: 'F2' } },
		{ type: 'item', id: 'duplicate', item: { label: 'Duplicate', icon: IconCopy, shortcut: '⌘D' } },
		{ type: 'separator', id: 'sep-icons' },
		{
			type: 'item',
			id: 'delete',
			item: { label: 'Delete', icon: IconTrash, shortcut: '⌫', dim: true }
		}
	];

	const submenuEntries: MenuEntry[] = [
		{ type: 'header', id: 'file-header', label: 'File' },
		{
			type: 'submenu',
			id: 'share',
			label: 'Share',
			icon: IconShare,
			children: [
				{ type: 'item', id: 'copy-link', item: { label: 'Copy link' } },
				{ type: 'item', id: 'email', item: { label: 'Email', icon: IconMail } },
				{ type: 'separator', id: 'sep-share' },
				{ type: 'item', id: 'invite-collaborators', item: { label: 'Invite collaborators' } }
			]
		},
		{
			type: 'submenu',
			id: 'open-with',
			label: 'Open with',
			children: [
				{ type: 'item', id: 'sublime', item: { label: 'Sublime Text' } },
				{ type: 'item', id: 'vscode', item: { label: 'VS Code' } },
				{
					type: 'submenu',
					id: 'more-editors',
					label: 'More editors',
					children: [
						{ type: 'item', id: 'neovim', item: { label: 'Neovim' } },
						{ type: 'item', id: 'emacs', item: { label: 'Emacs' } }
					]
				}
			]
		},
		{ type: 'separator', id: 'sep-submenu' },
		{ type: 'item', id: 'duplicate', item: { label: 'Duplicate', icon: IconCopy } },
		{
			type: 'submenu',
			id: 'export',
			label: 'Export',
			disabled: true,
			children: [{ type: 'item', id: 'pdf', item: { label: 'PDF' } }]
		},
		{ type: 'item', id: 'delete', item: { label: 'Delete', icon: IconTrash, dim: true } }
	];

	const listboxEntries: MenuEntry[] = [
		{ type: 'item', id: 'apple', item: { label: 'Apple', selected: true } },
		{ type: 'item', id: 'banana', item: { label: 'Banana' } },
		{ type: 'item', id: 'cherry', item: { label: 'Cherry' } },
		{ type: 'item', id: 'grape', item: { label: 'Grape', disabled: true } },
		{ type: 'item', id: 'orange', item: { label: 'Orange', selected: true } }
	];

	const { Story } = defineMeta({
		title: 'Overlays & Dialog/Menu',
		component: Menu,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let lastClicked = $state('');
</script>

{#snippet shell(props: ComponentProps<typeof Menu>)}
	<div class="iv-shell">
		<Menu {...props} />
	</div>
{/snippet}

{#snippet clickShell()}
	<div class="iv-shell iv-shell-click">
		<Menu entries={accountEntries} onclick={(_, entry) => (lastClicked = entry.id)} />
		{#if lastClicked}
			<p class="iv-clicked">Clicked: {lastClicked}</p>
		{/if}
	</div>
{/snippet}

<Story name="Default" template={shell} args={{ entries: accountEntries }} />

<Story name="WithIcons" template={shell} args={{ entries: iconEntries }} />

<Story name="WithSubmenus" template={shell} args={{ entries: submenuEntries }} />

<Story
	name="Listbox"
	args={{
		entries: listboxEntries,
		semantic: 'listbox',
		multiselect: true,
		label: 'Choose a fruit'
	}}
	template={shell}
/>

<Story
	name="ClickHandling"
	template={clickShell}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('Profile'));
		await expect(canvas.getByText('Clicked: profile')).toBeVisible();
	}}
/>

{#snippet emptyShell()}
	<div class="iv-shell">
		<Menu entries={[]} emptyLabel="No options found" />
	</div>
{/snippet}

<Story name="Empty" template={emptyShell} />

<style>
	.iv-shell {
		display: inline-flex;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
		box-shadow: var(--iv_shadow-md);
	}

	.iv-shell-click {
		flex-direction: column;
	}

	.iv-clicked {
		margin: 0.5rem 0.25rem 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
