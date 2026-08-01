<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './select.svelte';

	const fruits = [
		'apple',
		'banana',
		'cherry',
		'grape',
		'mango',
		'orange',
		'peach',
		'pear',
		'plum',
		'strawberry'
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'mx', label: 'Mexico' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'br', label: 'Brazil' },
		{ value: 'in', label: 'India' }
	];

	const plans = [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'team', label: 'Team', disabled: true },
		{ value: 'enterprise', label: 'Enterprise' }
	];

	const { Story } = defineMeta({
		title: 'Common/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			multiple: { control: 'boolean' },
			searchable: { control: 'boolean' },
			clearable: { control: 'boolean' },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' }
		}
	});
</script>

<script>
	let searchValue = $state('orange');
	let multiValue = $state(['apple', 'orange']);
	let clearValue = $state('banana');
</script>

<Story name="Default" args={{ options: fruits, placeholder: 'Choose a fruit…' }} />

<Story name="WithValue" args={{ options: fruits, value: 'banana' }} />

<Story
	name="WithLabel"
	args={{ options: fruits, label: 'Favorite fruit', placeholder: 'Pick one…' }}
/>

<Story
	name="Required"
	args={{ options: countries, label: 'Country', required: true, placeholder: 'Select a country' }}
/>

<Story
	name="WithHelper"
	args={{
		options: countries,
		label: 'Country',
		helper: 'Used for localized currency and shipping.',
		placeholder: 'Select a country'
	}}
/>

<Story
	name="WithError"
	args={{
		options: plans,
		label: 'Plan',
		error: 'Choose a plan to continue.',
		value: 'free',
		placeholder: 'Select a plan'
	}}
/>

<Story
	name="Disabled"
	args={{ options: fruits, placeholder: 'Cannot change this', disabled: true }}
/>

<Story name="StringOptions" args={{ options: fruits, value: 'peach' }} />

<Story name="ObjectOptions" args={{ options: countries, label: 'Country', value: 'de' }} />

<Story
	name="DisabledOptions"
	args={{ options: plans, label: 'Plan', placeholder: 'Select a plan' }}
/>

{#snippet searchableTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select
			options={fruits}
			searchable
			clearable
			label="Searchable fruit"
			placeholder="Type to filter…"
			bind:value={searchValue}
		/>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			value: {searchValue}
		</p>
	</div>
{/snippet}

<Story name="Searchable" template={searchableTemplate} />

{#snippet multipleTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select
			options={fruits}
			multiple
			label="Pick your fruits"
			placeholder="Select one or more…"
			bind:value={multiValue}
		/>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			value: [{multiValue.join(', ')}]
		</p>
	</div>
{/snippet}

<Story name="Multiple" template={multipleTemplate} />

{#snippet searchableMultipleTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select
			options={countries}
			multiple
			searchable
			label="Countries"
			placeholder="Add countries…"
		/>
	</div>
{/snippet}

<Story name="SearchableMultiple" template={searchableMultipleTemplate} />

{#snippet clearableTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select
			options={fruits}
			clearable
			label="Clearable fruit"
			placeholder="Pick one…"
			bind:value={clearValue}
		/>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			value: {clearValue}
		</p>
	</div>
{/snippet}

<Story name="Clearable" template={clearableTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select options={fruits} size="sm" label="Small" placeholder="Small select" />
		<Select options={fruits} size="md" label="Medium (default)" placeholder="Medium select" />
		<Select options={fruits} size="lg" label="Large" placeholder="Large select" />
	</div>
{/snippet}

<Story name="AllSizes" template={sizesTemplate} />

{#snippet allStatesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<Select options={fruits} label="Default" placeholder="Just a regular select" />
		<Select
			options={fruits}
			label="With helper"
			helper="A helpful description goes here."
			placeholder="Type…"
		/>
		<Select
			options={fruits}
			label="With error"
			error="Something went wrong. Please fix it."
			value="apple"
		/>
		<Select options={fruits} label="Disabled" placeholder="Cannot interact" disabled />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />
