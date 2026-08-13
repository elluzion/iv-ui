<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		IconAlignCenter,
		IconAlignLeft,
		IconAlignRight,
		IconBold,
		IconItalic,
		IconUnderline
	} from '@tabler/icons-svelte';
	import Button from './button.svelte';
	import ButtonGroup from './button-group.svelte';

	const { Story } = defineMeta({
		title: 'Common/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let single = $state('week');
	let multiple = $state(['bold', 'italic']);
	let lastChange = $state('');

	function onSingleChange(e: CustomEvent<{ value: string | string[] }>) {
		lastChange = `single → ${e.detail.value}`;
	}

	function onMultipleChange(e: CustomEvent<{ value: string | string[] }>) {
		lastChange = `multiple → ${e.detail.value}`;
	}
</script>

{#snippet pairTemplate()}
	<ButtonGroup>
		<Button variant="secondary">Cancel</Button>
		<Button variant="primary">Save</Button>
	</ButtonGroup>
{/snippet}

<Story name="Pair" template={pairTemplate} />

{#snippet threeSegmentsTemplate()}
	<ButtonGroup>
		<Button variant="secondary">Day</Button>
		<Button variant="primary">Week</Button>
		<Button variant="secondary">Month</Button>
	</ButtonGroup>
{/snippet}

<Story name="ThreeSegments" template={threeSegmentsTemplate} />

{#snippet iconOnlyTemplate()}
	<ButtonGroup>
		<Button variant="icon" aria-label="Align left"><IconAlignLeft size={16} /></Button>
		<Button variant="icon" aria-label="Center"><IconAlignCenter size={16} /></Button>
		<Button variant="icon" aria-label="Align right"><IconAlignRight size={16} /></Button>
	</ButtonGroup>
{/snippet}

<Story name="IconOnly" template={iconOnlyTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<ButtonGroup>
			<Button variant="secondary" size="sm">Small</Button>
			<Button variant="secondary" size="sm">Small</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="secondary" size="md">Medium</Button>
			<Button variant="secondary" size="md">Medium</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="secondary" size="lg">Large</Button>
			<Button variant="secondary" size="lg">Large</Button>
		</ButtonGroup>
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet singleTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<ButtonGroup
			label="Time range"
			mode="single"
			bind:value={single}
			items={[
				{ value: 'day', label: 'Day' },
				{ value: 'week', label: 'Week' },
				{ value: 'month', label: 'Month' }
			]}
			onchange={onSingleChange}
		/>
		<span style="color:var(--iv_foreground-dim);font-size:var(--iv_text-btn-sm)"
			>Selected: {single} {lastChange}</span
		>
	</div>
{/snippet}

<Story
	name="SingleSelect"
	template={singleTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Day' }));
		await expect(canvas.getByText(/Selected: day single → day/)).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'Month' }));
		await expect(canvas.getByText(/Selected: month single → month/)).toBeVisible();
	}}
/>

{#snippet multipleTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<ButtonGroup
			label="Text style"
			mode="multiple"
			bind:value={multiple}
			items={[
				{ value: 'bold', label: 'Bold', icon: IconBold },
				{ value: 'italic', label: 'Italic', icon: IconItalic },
				{ value: 'underline', label: 'Underline', icon: IconUnderline }
			]}
			onchange={onMultipleChange}
		/>
		<span style="color:var(--iv_foreground-dim);font-size:var(--iv_text-btn-sm)"
			>Selected: {multiple} {lastChange}</span
		>
	</div>
{/snippet}

<Story name="MultipleSelect" template={multipleTemplate} />

{#snippet verticalTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<ButtonGroup
			label="Alignment"
			mode="single"
			orientation="vertical"
			bind:value={single}
			items={[
				{ value: 'left', label: 'Align left', icon: IconAlignLeft },
				{ value: 'center', label: 'Center', icon: IconAlignCenter },
				{ value: 'right', label: 'Align right', icon: IconAlignRight }
			]}
		/>
	</div>
{/snippet}

<Story name="Vertical" template={verticalTemplate} />

{#snippet fullWidthTemplate()}
	<ButtonGroup
		label="Plan"
		mode="single"
		fullWidth
		bind:value={single}
		items={['Free', 'Pro', 'Team']}
	/>
{/snippet}

<Story name="FullWidth" template={fullWidthTemplate} />

{#snippet disabledTemplate()}
	<div style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem">
		<ButtonGroup label="Disabled group" mode="single" disabled items={['Day', 'Week', 'Month']} />
		<ButtonGroup
			label="Disabled item"
			mode="single"
			items={[
				{ value: 'day', label: 'Day' },
				{ value: 'week', label: 'Week', disabled: true },
				{ value: 'month', label: 'Month' }
			]}
		/>
	</div>
{/snippet}

<Story name="Disabled" template={disabledTemplate} />
