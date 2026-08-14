<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './radio-group.svelte';

	const fruits = ['apple', 'banana', 'cherry'];
	const plans = [
		{ value: 'free', label: 'Free — Basic features' },
		{ value: 'pro', label: 'Pro — Advanced features' },
		{ value: 'enterprise', label: 'Enterprise — Everything included', disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Form & Input/RadioGroup',
		component: RadioGroup,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md'] },
			orientation: { control: 'select', options: ['vertical', 'horizontal'] }
		}
	});
</script>

<script>
	import { expect, userEvent, within } from 'storybook/test';

	let bound = $state('banana');
</script>

<Story name="Default" args={{ items: fruits, label: 'Pick a fruit' }} />

<Story name="WithValue" args={{ items: fruits, label: 'Pick a fruit', value: 'banana' }} />

<Story name="ObjectItems" args={{ items: plans, label: 'Choose a plan' }} />

<Story name="Horizontal" args={{ items: fruits, orientation: 'horizontal' }} />

<Story name="Small" args={{ items: fruits, label: 'Pick a fruit', size: 'sm' }} />

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;max-width:300px">
		<RadioGroup items={fruits} label="Interactive group" bind:value={bound} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			value: {bound}
		</p>
	</div>
{/snippet}

<Story
	name="Interactive"
	template={interactiveTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('apple'));
		await expect(canvas.getByRole('radio', { name: 'apple' })).toBeChecked();
		await expect(canvas.getByText(/value: apple/)).toBeVisible();
		await userEvent.click(canvas.getByText('cherry'));
		await expect(canvas.getByText(/value: cherry/)).toBeVisible();
	}}
/>

{#snippet allStatesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1.5rem;max-width:300px">
		<RadioGroup items={fruits} label="String items" value="cherry" />
		<RadioGroup items={plans} label="With disabled item" value="free" />
		<RadioGroup items={fruits} label="Small" size="sm" value="apple" />
		<RadioGroup items={fruits} label="Horizontal" orientation="horizontal" value="banana" />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />
