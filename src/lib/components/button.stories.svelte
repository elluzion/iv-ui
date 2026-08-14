<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconPlus, IconTrash, IconDownload, IconSearch, IconDots } from '@tabler/icons-svelte';
	import Button from './button.svelte';

	const { Story } = defineMeta({
		title: 'Form & Input/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'outline', 'ghost', 'icon', 'danger']
			},
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let modern = $state(0);
	let legacy = $state(0);
	let disabledClicks = $state(0);
	let loadingClicks = $state(0);
</script>

<Story name="Primary" args={{ variant: 'primary' }}>Create Article</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>Cancel</Story>

<Story name="Outline" args={{ variant: 'outline' }}>View Details</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>Dismiss</Story>

<Story name="Danger" args={{ variant: 'danger' }}>Delete Project</Story>

<Story name="Small" args={{ variant: 'secondary', size: 'sm' }}>Small Button</Story>

<Story name="Large" args={{ variant: 'primary', size: 'lg' }}>Get Started</Story>

<Story name="Disabled" args={{ variant: 'secondary', disabled: true }}>Unavailable</Story>

<Story name="Loading" args={{ variant: 'primary', loading: true }}>Saving…</Story>

<Story name="LoadingSecondary" args={{ variant: 'secondary', loading: true }}>Processing…</Story>

{#snippet iconTemplate()}
	<Button variant="icon" aria-label="Add item">
		<IconPlus size="1.125rem" />
	</Button>
{/snippet}

<Story name="Icon" template={iconTemplate} />

{#snippet iconWithTextTemplate()}
	<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
		<Button variant="secondary">
			<IconDownload size={16} />
			Download
		</Button>
		<Button variant="outline">
			<IconSearch size={16} />
			Search
		</Button>
		<Button variant="danger">
			<IconTrash size={16} />
			Delete
		</Button>
		<Button variant="ghost" size="sm">
			<IconDots size={14} />
			More
		</Button>
	</div>
{/snippet}

<Story name="IconWithText" template={iconWithTextTemplate} />

{#snippet allVariantsTemplate()}
	<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="danger">Danger</Button>
	</div>
{/snippet}

<Story name="AllVariants" template={allVariantsTemplate} />

{#snippet allSizesTemplate()}
	<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
		<Button variant="primary" size="sm">Small</Button>
		<Button variant="primary" size="md">Medium</Button>
		<Button variant="primary" size="lg">Large</Button>
	</div>
{/snippet}

<Story name="AllSizes" template={allSizesTemplate} />

{#snippet eventsTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start">
		<Button {...{ onclick: () => modern++, 'on:click': () => legacy++ }}>Click me</Button>
		<Button disabled onclick={() => disabledClicks++}>Disabled</Button>
		<Button loading onclick={() => loadingClicks++}>Loading</Button>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			modern:{modern} legacy:{legacy} disabled:{disabledClicks} loading:{loadingClicks}
		</p>
	</div>
{/snippet}

<Story
	name="Events"
	template={eventsTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const [active, disabled, loading] = canvas.getAllByRole('button');
		await expect(active).toHaveAttribute('type', 'button');
		await userEvent.click(active);
		await userEvent.click(active);
		await userEvent.click(disabled);
		await userEvent.click(loading);
		await expect(canvas.getByText(/modern:2 legacy:2 disabled:0 loading:0/)).toBeVisible();
	}}
/>
