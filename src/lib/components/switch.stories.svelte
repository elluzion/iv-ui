<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './switch.svelte';

	const { Story } = defineMeta({
		title: 'Common/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md'] },
			disabled: { control: 'boolean' },
			checked: { control: 'boolean' }
		}
	});
</script>

<script>
	let bound = $state(false);
</script>

<Story name="Default" args={{ label: 'Airplane mode' }} />

<Story name="Checked" args={{ checked: true, label: 'Dark mode' }} />

<Story name="Disabled" args={{ label: 'Unavailable', disabled: true }} />

<Story name="DisabledChecked" args={{ checked: true, label: 'Locked on', disabled: true }} />

<Story name="Small" args={{ size: 'sm', label: 'Notifications' }} />

<Story name="SmallChecked" args={{ size: 'sm', checked: true, label: 'Notifications' }} />

<Story name="WithoutLabel" />

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Switch label="Toggle me" bind:checked={bound} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			checked: {bound}
		</p>
	</div>
{/snippet}

<Story name="Interactive" template={interactiveTemplate} />

{#snippet allStatesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Switch label="Unchecked (default)" />
		<Switch label="Checked" checked />
		<Switch label="Disabled unchecked" disabled />
		<Switch label="Disabled checked" checked disabled />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />

{#snippet allSizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem">
		<Switch size="sm" label="Small switch" checked />
		<Switch size="md" label="Medium switch (default)" checked />
	</div>
{/snippet}

<Story name="AllSizes" template={allSizesTemplate} />
