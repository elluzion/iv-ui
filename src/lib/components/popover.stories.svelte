<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconChevronRight } from '@tabler/icons-svelte';
	import Button from './button.svelte';
	import Menu, { type MenuEntry } from './menu.svelte';
	import Popover from './popover.svelte';

	const menuEntries: MenuEntry[] = [
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

	const controlledEntries: MenuEntry[] = [
		{ type: 'item', id: 'controlled', item: { label: 'Panel is driven by an external trigger' } }
	];

	const { Story } = defineMeta({
		title: 'Overlays & Dialog/Popover',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, waitFor, within } from 'storybook/test';

	let controlledOpen = $state(false);
	let interactiveAnchor = $state<HTMLButtonElement>();
	let controlledAnchor = $state<HTMLButtonElement>();
	let hoverAnchor = $state<HTMLButtonElement>();
	let focusAnchor = $state<HTMLButtonElement>();
</script>

{#snippet anchorContent()}
	<Menu entries={menuEntries} className="iv-story-menu" />
{/snippet}

<Story name="Default">
	<Button id="iv-popover-default" variant="secondary">Open popover</Button>
	<Popover open anchor="#iv-popover-default">
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="Top">
	<Button id="iv-popover-top" variant="secondary">Open popover</Button>
	<Popover open anchor="#iv-popover-top" placement="top">
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="BottomStart">
	<Button id="iv-popover-bottom-start" variant="secondary">Open popover</Button>
	<Popover open anchor="#iv-popover-bottom-start" placement="bottom" align="start">
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="Right">
	<Button id="iv-popover-right" variant="secondary">Open popover</Button>
	<Popover open anchor="#iv-popover-right" placement="right">
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="Left">
	<Button id="iv-popover-left" variant="secondary">Open popover</Button>
	<Popover open anchor="#iv-popover-left" placement="left">
		{@render anchorContent()}
	</Popover>
</Story>

<Story
	name="Interactive"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
		const panel = await canvas.findByRole('dialog');
		await waitFor(() => expect(panel).toBeVisible());
		await expect(within(panel).getByText('Profile')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
	}}
>
	<button bind:this={interactiveAnchor} class="iv-story-anchor" type="button">Open</button>
	<Popover anchor={interactiveAnchor}>
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="Controlled">
	<div class="iv-row">
		<button
			bind:this={controlledAnchor}
			class="iv-story-anchor"
			type="button"
			onclick={() => (controlledOpen = !controlledOpen)}
		>
			Toggle
		</button>
		<span class="iv-hint">open: {controlledOpen}</span>
	</div>
	<Popover
		bind:open={controlledOpen}
		anchor={controlledAnchor}
		interactive={false}
		placement="bottom"
		align="start"
	>
		<Menu entries={controlledEntries} className="iv-story-menu" />
	</Popover>
</Story>

<Story name="Hover">
	<button bind:this={hoverAnchor} class="iv-story-anchor" type="button">Hover me</button>
	<Popover anchor={hoverAnchor} showOn={['hover']} hideOn={['hover']}>
		{@render anchorContent()}
	</Popover>
</Story>

<Story name="Focus">
	<button bind:this={focusAnchor} class="iv-story-anchor" type="button">Focus me (tab)</button>
	<Popover anchor={focusAnchor} showOn={['focus']} hideOn={['blur']}>
		{@render anchorContent()}
	</Popover>
</Story>

<style>
	.iv-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.iv-story-anchor {
		display: inline-flex;
		align-items: center;
		padding: 8px 16px;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-elevated);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-btn);
		color: var(--iv_foreground);
		cursor: pointer;

		&:hover {
			border-color: var(--iv_border-hover);
		}
	}

	.iv-hint {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	:global(.iv-story-menu) {
		padding: 0.4rem;
		min-width: 16rem;
	}
</style>
