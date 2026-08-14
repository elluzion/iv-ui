<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import { IconInfoCircle } from '@tabler/icons-svelte';
	import Button from './button.svelte';
	import Tooltip from './tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Overlays & Dialog/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
			delay: { control: 'number' },
			disabled: { control: 'boolean' },
			label: { control: 'text' }
		}
	});
</script>

<Story
	name="Default"
	args={{ label: 'Adds a new project' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.hover(canvas.getByRole('button', { name: 'Hover me' }));
		const tooltip = await canvas.findByRole('tooltip');
		await expect(tooltip).toHaveTextContent('Adds a new project');
	}}
>
	<Button variant="secondary">Hover me</Button>
</Story>

<Story name="Bottom" args={{ label: 'Appears below the trigger', position: 'bottom' }}>
	<Button variant="secondary">Hover me</Button>
</Story>

<Story name="Left" args={{ label: 'Appears to the left', position: 'left' }}>
	<Button variant="secondary">Hover me</Button>
</Story>

<Story name="Right" args={{ label: 'Appears to the right', position: 'right' }}>
	<Button variant="secondary">Hover me</Button>
</Story>

<Story name="LongDelay" args={{ label: 'Waits a while before showing', delay: 800 }}>
	<Button variant="secondary">Hover me</Button>
</Story>

<Story name="Disabled" args={{ label: 'This should never show', disabled: true }}>
	<Button variant="secondary">Hover me</Button>
</Story>

{#snippet richContent()}
	<div style="display:flex;align-items:center;gap:0.375rem">
		<IconInfoCircle size={13} color="var(--iv_foreground-dim)" />
		<span>Hold Ctrl to add multiple</span>
	</div>
{/snippet}

<Story name="RichContent" args={{ content: richContent }}>
	<Button variant="secondary">Hover me</Button>
</Story>

{#snippet allPositionsTemplate()}
	<div style="display:flex;gap:1.5rem;align-items:center;padding:2.5rem">
		<Tooltip label="Top (default)" position="top">
			<Button variant="secondary">Top</Button>
		</Tooltip>
		<Tooltip label="Bottom" position="bottom">
			<Button variant="secondary">Bottom</Button>
		</Tooltip>
		<Tooltip label="Left" position="left">
			<Button variant="secondary">Left</Button>
		</Tooltip>
		<Tooltip label="Right" position="right">
			<Button variant="secondary">Right</Button>
		</Tooltip>
	</div>
{/snippet}

<Story name="AllPositions" template={allPositionsTemplate} />
