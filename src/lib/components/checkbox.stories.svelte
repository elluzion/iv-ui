<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Common/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md'] },
			disabled: { control: 'boolean' },
			checked: { control: 'boolean' },
			indeterminate: { control: 'boolean' }
		}
	});
</script>

<script>
	let binding = $state(false);
</script>

<Story name="Default" args={{ label: 'Accept terms and conditions' }} />

<Story name="Checked" args={{ checked: true, label: 'Subscribe to newsletter' }} />

<Story name="Indeterminate" args={{ indeterminate: true, label: 'Select all notifications' }} />

<Story name="Disabled" args={{ label: 'Cannot change this', disabled: true }} />

<Story name="DisabledChecked" args={{ checked: true, label: 'Locked in', disabled: true }} />

<Story name="Small" args={{ size: 'sm', label: 'Dark mode' }} />

<Story name="SmallChecked" args={{ size: 'sm', checked: true, label: 'Dark mode' }} />

<Story name="WithoutLabel" args={{ name: 'nofruit', value: 'apple' }} />

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Checkbox label="Toggle me" bind:checked={binding} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			checked: {binding}
		</p>
	</div>
{/snippet}

<Story name="Interactive" template={interactiveTemplate} />

{#snippet childrenTemplate()}
	<Checkbox>
		I agree to the <a href="https://example.com">privacy policy</a> and
		<a href="https://example.com">terms of service</a>
	</Checkbox>
{/snippet}

<Story name="WithChildrenSnippet" template={childrenTemplate} />

{#snippet allStatesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Checkbox label="Default unchecked" />
		<Checkbox label="Checked" checked />
		<Checkbox label="Indeterminate" indeterminate />
		<Checkbox label="Disabled unchecked" disabled />
		<Checkbox label="Disabled checked" checked disabled />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />

{#snippet allSizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Checkbox size="sm" label="Small checkbox" checked />
		<Checkbox size="md" label="Medium checkbox (default)" checked />
	</div>
{/snippet}

<Story name="AllSizes" template={allSizesTemplate} />
