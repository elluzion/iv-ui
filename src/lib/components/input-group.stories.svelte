<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconSearch, IconAt, IconCurrencyDollar, IconWorld } from '@tabler/icons-svelte';
	import InputGroup from './input-group.svelte';
	import Input from './input.svelte';
	import Field from './field.svelte';
	import NativeSelect from './native-select.svelte';

	const { Story } = defineMeta({
		title: 'Form/InputGroup',
		component: InputGroup,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' }
		}
	});
</script>

{#snippet moneyTemplate()}
	<InputGroup>
		{#snippet prefix()}
			<IconCurrencyDollar size={16} />
		{/snippet}
		<Input placeholder="0.00" />
		{#snippet suffix()}
			USD
		{/snippet}
	</InputGroup>
{/snippet}

<Story name="Money" template={moneyTemplate} />

{#snippet urlTemplate()}
	<InputGroup>
		{#snippet prefix()}
			https://
		{/snippet}
		<Input placeholder="example.com" />
		{#snippet suffix()}
			<IconWorld size={16} />
		{/snippet}
	</InputGroup>
{/snippet}

<Story name="URL" template={urlTemplate} />

{#snippet withFieldTemplate()}
	<Field label="Search the catalog" htmlFor="ig-search" helper="Press Enter to jump to results.">
		<InputGroup>
			{#snippet prefix()}
				<IconSearch size={16} />
			{/snippet}
			<Input id="ig-search" placeholder="Search…" aria-describedby="ig-search-message" />
			{#snippet suffix()}
				⌘K
			{/snippet}
		</InputGroup>
	</Field>
{/snippet}

<Story name="WithField" template={withFieldTemplate} />

{#snippet variantsTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:360px">
		<InputGroup>
			{#snippet prefix()}
				<IconCurrencyDollar size={16} />
			{/snippet}
			<NativeSelect options={['USD', 'EUR', 'GBP']} value="USD" aria-label="Currency" />
			<Input placeholder="Amount" />
		</InputGroup>
		<InputGroup size="sm">
			{#snippet prefix()}
				<IconAt size={14} />
			{/snippet}
			<Input placeholder="username" />
		</InputGroup>
		<InputGroup size="lg">
			<Input placeholder="Large" />
			{#snippet suffix()}
				units
			{/snippet}
		</InputGroup>
	</div>
{/snippet}

<Story name="Variants" template={variantsTemplate} />
