<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-svelte';
	import ToggleGroup from './toggle-group.svelte';

	const { Story } = defineMeta({
		title: 'Common/ToggleGroup',
		component: ToggleGroup,
		tags: ['autodocs'],
		argTypes: {
			mode: { control: 'select', options: ['single', 'multiple', 'none'] },
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			orientation: { control: 'select', options: ['horizontal', 'vertical'] },
			disabled: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let single = $state('week');
	let multiple = $state(['bold']);
</script>

<Story
	name="SingleSelect"
	args={{ label: 'Time range', mode: 'single', value: 'week', items: ['day', 'week', 'month'] }}
/>

<Story
	name="MultipleSelect"
	args={{
		label: 'Text style',
		mode: 'multiple',
		value: ['bold'],
		items: ['bold', 'italic', 'underline']
	}}
/>

<Story name="None" args={{ label: 'Segmented buttons', items: ['Day', 'Week', 'Month'] }} />

<Story
	name="Disabled"
	args={{
		label: 'Locked',
		mode: 'single',
		disabled: true,
		value: 'day',
		items: ['day', 'week', 'month']
	}}
/>

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:1rem">
		<ToggleGroup size="sm" label="Small" mode="single" value="a" items={['a', 'b', 'c']} />
		<ToggleGroup size="md" label="Medium" mode="single" value="a" items={['a', 'b', 'c']} />
		<ToggleGroup size="lg" label="Large" mode="single" value="a" items={['a', 'b', 'c']} />
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet verticalTemplate()}
	<ToggleGroup
		label="Alignment"
		mode="single"
		orientation="vertical"
		value="left"
		items={['left', 'center', 'right']}
	/>
{/snippet}

<Story name="Vertical" template={verticalTemplate} />

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start">
		<ToggleGroup
			label="Time range"
			mode="single"
			bind:value={single}
			items={[
				{ value: 'day', label: 'Day' },
				{ value: 'week', label: 'Week' },
				{ value: 'month', label: 'Month' }
			]}
		/>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			value: {single}
		</p>
	</div>
{/snippet}

<Story
	name="Interactive"
	template={interactiveTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const month = canvas.getByRole('button', { name: 'Month' });
		await userEvent.click(month);
		await expect(month).toHaveAttribute('aria-pressed', 'true');
		await expect(canvas.getByText(/value: month/)).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'Day' }));
		await expect(canvas.getByText(/value: day/)).toBeVisible();
	}}
/>

{#snippet multipleInteractiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start">
		<ToggleGroup
			label="Text style"
			mode="multiple"
			bind:value={multiple}
			items={[
				{ value: 'bold', label: 'Bold', icon: IconBold },
				{ value: 'italic', label: 'Italic', icon: IconItalic },
				{ value: 'underline', label: 'Underline', icon: IconUnderline }
			]}
		/>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			value: [{multiple.join(', ')}]
		</p>
	</div>
{/snippet}

<Story
	name="MultipleInteractive"
	template={multipleInteractiveTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Underline' }));
		await expect(canvas.getByText(/value: \[bold, underline\]/)).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'Bold' }));
		await expect(canvas.getByText(/value: \[underline\]/)).toBeVisible();
	}}
/>
