<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../components/button.svelte';
	import Card from '../components/card.svelte';
	import Checkbox from '../components/checkbox.svelte';
	import Input from '../components/input.svelte';
	import Select from '../components/select.svelte';
	import Slider from '../components/slider.svelte';
	import Switch from '../components/switch.svelte';

	const { Story } = defineMeta({
		title: 'Foundation/States',
		tags: ['autodocs']
	});
</script>

<Story name="Buttons">
	<div class="section">
		<h3>Variants</h3>
		<div class="row">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="danger">Danger</Button>
		</div>

		<h3 style="margin-top: var(--iv_spacing-xl)">Sizes</h3>
		<div class="row">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>

		<h3 style="margin-top: var(--iv_spacing-xl)">Disabled & loading</h3>
		<div class="row">
			<Button disabled>Disabled</Button>
			<Button variant="primary" loading>Loading</Button>
		</div>
	</div>
</Story>

<Story name="Fields">
	<div class="section">
		<h3>Label, helper, error, disabled</h3>
		<div style="display: grid; gap: var(--iv_spacing-lg); max-width: 420px">
			<Input label="Labeled input" placeholder="Type here…" />
			<Input
				label="With helper"
				helper="Helper text keeps supporting the field."
				placeholder="Value"
			/>
			<Input label="With error" error="This field is required." placeholder="Value" />
			<Input label="Disabled" disabled placeholder="Can't touch this" />
		</div>
	</div>
</Story>

<Story name="Selection">
	<div class="section">
		<h3>Checkbox / Switch</h3>
		<div class="row">
			<Checkbox label="Checked" checked />
			<Checkbox label="Indeterminate" indeterminate />
			<Checkbox label="Disabled" disabled />
			<Switch label="On" checked />
			<Switch label="Off" />
			<Switch label="Disabled" disabled />
		</div>

		<h3 style="margin-top: var(--iv_spacing-xl)">Select</h3>
		<div style="max-width: 320px">
			<Select
				label="Pick one"
				options={['Apple', 'Banana', 'Cherry']}
				placeholder="Choose a fruit…"
			/>
		</div>
	</div>
</Story>

<Story name="Slider">
	<div class="section">
		<h3>Enabled, with value, disabled</h3>
		<div style="max-width: 420px; display: grid; gap: var(--iv_spacing-2xl)">
			<Slider label="Volume" min={0} max={100} value={42} showValue />
			<Slider range label="Range" min={0} max={100} value={[20, 70]} />
			<Slider label="Disabled" disabled value={50} />
		</div>
	</div>
</Story>

<Story name="Cards">
	<div class="section">
		<h3>Default, clickable, selected, disabled</h3>
		<div style="display: grid; gap: var(--iv_spacing-lg); max-width: 340px">
			<Card title="Resting card" description="A quiet raised surface with a hairline border."
				><p style="margin: 0">Card body content sits on a raised surface.</p></Card
			>
			<Card
				title="Clickable card"
				description="Hover brightens the border, Enter/Space activate it. Keyboard-focusable."
				><p style="margin: 0">Card body content sits on a raised surface.</p></Card
			>
			<Card title="Selected card" description="Selection swaps the border to brass." selected
				><p style="margin: 0">Card body content sits on a raised surface.</p></Card
			>
			<Card title="Disabled card" description="Dimmed and inert." disabled onclick={() => {}}
				><p style="margin: 0">Card body content sits on a raised surface.</p></Card
			>
		</div>
		<p class="focus-note">
			Focus every control with Tab (or the a11y panel's Highlight) to see the
			<code>:focus-visible</code> ring.
		</p>
	</div>
</Story>

<style>
	.section {
		margin: 0 0 var(--iv_spacing-2xl);
	}

	.section h3 {
		margin: 0 0 var(--iv_spacing-md);
		font-size: var(--iv_text-base);
		font-weight: 600;
		color: var(--iv_foreground);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-md);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface);
	}

	.focus-note {
		margin-top: var(--iv_spacing-sm);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
