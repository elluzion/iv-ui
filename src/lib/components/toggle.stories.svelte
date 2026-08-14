<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-svelte';
	import Toggle from './toggle.svelte';

	const { Story } = defineMeta({
		title: 'Misc/Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' },
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			label: { control: 'text' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let pressed = $state(false);
</script>

<Story name="Default" args={{ label: 'Bold' }}>Bold</Story>

<Story name="Checked" args={{ checked: true, label: 'Bold' }}>Bold</Story>

<Story name="Disabled" args={{ disabled: true, label: 'Bold' }}>Bold</Story>

<Story name="DisabledChecked" args={{ checked: true, disabled: true, label: 'Bold' }}>Bold</Story>

{#snippet iconTemplate()}
	<div style="display:flex;gap:0.5rem">
		<Toggle label="Bold" checked><IconBold size={16} /></Toggle>
		<Toggle label="Italic"><IconItalic size={16} /></Toggle>
		<Toggle label="Underline"><IconUnderline size={16} /></Toggle>
	</div>
{/snippet}

<Story name="WithIcons" template={iconTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<Toggle size="sm" label="Small">Small</Toggle>
		<Toggle size="md" label="Medium">Medium</Toggle>
		<Toggle size="lg" label="Large">Large</Toggle>
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<Toggle label="Bold" bind:checked={pressed}>Bold</Toggle>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			pressed: {pressed}
		</p>
	</div>
{/snippet}

<Story
	name="Interactive"
	template={interactiveTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const toggle = canvas.getByRole('button', { name: 'Bold' });
		await userEvent.click(toggle);
		await expect(toggle).toHaveAttribute('aria-pressed', 'true');
		await expect(canvas.getByText(/pressed: true/)).toBeVisible();
		await userEvent.click(toggle);
		await expect(toggle).toHaveAttribute('aria-pressed', 'false');
	}}
/>
