<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconDots, IconSettings } from '@tabler/icons-svelte';
	import Button from './button.svelte';
	import Card from './card.svelte';

	const { Story } = defineMeta({
		title: 'Layout & Navigation/Card',
		component: Card,
		tags: ['autodocs'],
		argTypes: {
			padding: { control: 'select', options: ['sm', 'md', 'lg', 'none'] },
			radius: { control: 'select', options: ['md', 'lg'] },
			hoverable: { control: 'boolean' },
			selected: { control: 'boolean' },
			disabled: { control: 'boolean' },
			title: { control: 'text' },
			description: { control: 'text' }
		}
	});
</script>

<script lang="ts">
	let selectedCard = $state(false);
</script>

<Story name="Default" args={{ title: 'Project Metrics' }}>
	<p>
		Body content goes here. Cards are a raised surface separated from the canvas by a hairline
		border.
	</p>
</Story>

<Story
	name="WithDescription"
	args={{ title: 'Active Projects', description: 'Three of four workspaces are in progress' }}
>
	<p>An optional description can sit under the title.</p>
</Story>

{#snippet actionTemplate()}
	<Card title="Application Settings" description="Tune the editor to your taste">
		{#snippet action()}
			<Button variant="ghost" size="sm" onclick={() => {}} aria-label="Settings"
				><IconSettings size={16} /></Button
			>
		{/snippet}
		<p>Header actions sit on the right, opposite the title.</p>
	</Card>
{/snippet}

<Story name="WithAction" template={actionTemplate} />

{#snippet footerTemplate()}
	<Card title="Unread Notifications">
		<p>You have three unread notifications from the last 24 hours.</p>
		{#snippet footer()}
			<Button variant="ghost" size="sm">Dismiss</Button>
			<Button size="sm">View all</Button>
		{/snippet}
	</Card>
{/snippet}

<Story name="WithFooter" template={footerTemplate} />

{#snippet paddingTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:420px">
		<Card title="Padding sm" padding="sm">
			<p>Compact spacing for dense dashboards.</p>
		</Card>
		<Card title="Padding md" padding="md">
			<p>The default padding — balanced for most content.</p>
		</Card>
		<Card title="Padding lg" padding="lg">
			<p>Spacious padding for feature panels or onboarding.</p>
		</Card>
		<Card padding="none">
			<p style="padding:1rem 1.25rem">Full-bleed content with padding removed.</p>
		</Card>
	</div>
{/snippet}

<Story name="PaddingSizes" template={paddingTemplate} />

<Story
	name="LargeRadius"
	args={{ title: 'Rounded Panel', radius: 'lg', description: '20px corners' }}
>
	<p>Large-radius cards suit hero panels and feature highlights.</p>
</Story>

<Story
	name="Hoverable"
	args={{ title: 'Hover me', description: 'The border brightens, never lifts', hoverable: true }}
>
	<p>Move the pointer over this card to see the border respond.</p>
</Story>

<Story
	name="Selected"
	args={{ title: 'Selected Project', description: 'Active workspace', selected: true }}
>
	<p>A selected card highlights its border with the accent color.</p>
</Story>

<Story name="Disabled" args={{ title: 'Locked Panel', disabled: true }}>
	<p>This card is not interactive and renders at reduced opacity.</p>
</Story>

{#snippet clickableTemplate()}
	<div style="display:flex;flex-wrap:wrap;gap:1rem;max-width:520px">
		<Card
			title="Clickable card"
			description="Selectable on the go"
			hoverable
			selected={selectedCard}
			onclick={() => (selectedCard = !selectedCard)}
		>
			<p>
				This card toggles its selected state when clicked. Try it with keyboard too (Tab, then Enter
				or Space).
			</p>
		</Card>
	</div>
{/snippet}

<Story name="ClickableCard" template={clickableTemplate} />

{#snippet customHeaderTemplate()}
	<Card>
		{#snippet header()}
			<div style="display:flex;align-items:center;justify-content:space-between;width:100%">
				<span style="font-weight:600">Custom header</span>
				<Button variant="ghost" size="sm" onclick={() => {}} aria-label="More options"
					><IconDots size={16} /></Button
				>
			</div>
		{/snippet}
		<p>Pass a <code>header</code> snippet to take full control of the header area.</p>
	</Card>
{/snippet}

<Story name="CustomHeader" template={customHeaderTemplate} />
