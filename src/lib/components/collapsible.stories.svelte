<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Collapsible from './collapsible.svelte';

	const { Story } = defineMeta({
		title: 'Misc/Collapsible',
		component: Collapsible,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' },
			defaultOpen: { control: 'boolean' },
			disabled: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, waitFor, within } from 'storybook/test';

	let open = $state(true);
</script>

<Story name="Default" args={{ title: 'What is iv-ui?' }}>
	<p>
		iv-ui is a token-pure Svelte 5 component library built around a monochrome dark design system.
	</p>
</Story>

<Story name="DefaultOpen" args={{ title: 'Already expanded', defaultOpen: true }}>
	<p>
		This panel is open on first render because <code>defaultOpen</code> is true. Toggle it to close.
	</p>
</Story>

<Story name="Disabled" args={{ title: 'Locked panel', disabled: true }}>
	<p>This panel cannot be toggled.</p>
</Story>

{#snippet customTriggerTemplate()}
	<Collapsible>
		{#snippet trigger()}
			<span style="display:inline-flex;align-items:center;gap:0.5rem">System status</span>
		{/snippet}
		<p>All services operational. No incidents reported in the last 24 hours.</p>
	</Collapsible>
{/snippet}

<Story name="CustomTrigger" template={customTriggerTemplate} />

{#snippet controlledTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;max-width:480px">
		<Collapsible title="Controlled panel" bind:open>
			<p>Driven by <code>bind:open</code> from the parent component.</p>
		</Collapsible>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			open: {open}
		</p>
	</div>
{/snippet}

<Story name="Controlled" template={controlledTemplate} />

<Story
	name="Interactive"
	args={{ title: 'Toggle me' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: 'Toggle me' });
		await userEvent.click(trigger);
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await waitFor(() => expect(canvas.getByRole('region')).toBeVisible());
		await userEvent.click(trigger);
		await waitFor(() => expect(canvas.queryByRole('region')).not.toBeInTheDocument());
	}}
>
	<p>This content appears and disappears when the trigger is toggled.</p>
</Story>
