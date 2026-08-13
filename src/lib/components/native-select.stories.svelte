<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NativeSelect from './native-select.svelte';

	const { Story } = defineMeta({
		title: 'Form/NativeSelect',
		component: NativeSelect,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			helper: { control: 'text' },
			error: { control: 'text' },
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' }
		}
	});
</script>

<Story
	name="Default"
	args={{
		options: ['Apples', 'Bananas', 'Cherries', 'Dates'],
		value: 'Bananas',
		'aria-label': 'Fruit'
	}}
/>

<Story
	name="WithPlaceholder"
	args={{ options: ['Apples', 'Bananas', 'Cherries'], placeholder: 'Choose a fruit…' }}
/>

<Story
	name="ObjectOptions"
	args={{
		label: 'Priority',
		value: 'med',
		options: [
			{ value: 'low', label: 'Low' },
			{ value: 'med', label: 'Medium' },
			{ value: 'high', label: 'High', disabled: true }
		]
	}}
/>

<Story
	name="Required"
	args={{ label: 'Country', required: true, options: ['United States', 'Canada', 'Mexico'] }}
/>

<Story
	name="WithHelper"
	args={{
		label: 'Timezone',
		helper: 'Used to format all timestamps.',
		value: 'Central',
		options: ['Pacific', 'Mountain', 'Central', 'Eastern']
	}}
/>

<Story
	name="WithError"
	args={{
		label: 'Billing plan',
		error: 'Choose a plan to continue.',
		placeholder: 'Select a plan…',
		options: ['Starter', 'Pro', 'Team']
	}}
/>

<Story
	name="Disabled"
	args={{ label: 'Region', disabled: true, value: 'US', options: ['EU', 'US'] }}
/>

{#snippet allSizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<NativeSelect label="Small" size="sm" options={['Apples', 'Bananas', 'Cherries']} />
		<NativeSelect label="Medium" size="md" options={['Apples', 'Bananas', 'Cherries']} />
		<NativeSelect label="Large" size="lg" options={['Apples', 'Bananas', 'Cherries']} />
	</div>
{/snippet}

<Story name="AllSizes" template={allSizesTemplate} />

{#snippet customChildrenTemplate()}
	<NativeSelect label="Custom options" value="svelte" placeholder="Pick a stack…">
		<option value="svelte">Svelte 5</option>
		<option value="sveltekit">SvelteKit</option>
		<option value="typescript">TypeScript</option>
	</NativeSelect>
{/snippet}

<Story name="CustomChildren" template={customChildrenTemplate} />
