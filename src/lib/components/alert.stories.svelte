<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './alert.svelte';

	const { Story } = defineMeta({
		title: 'Common/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
			title: { control: 'text' },
			dismissible: { control: 'boolean' }
		}
	});
</script>

<Story name="Info" args={{ type: 'info', title: 'Heads up' }}>
	This is the default informational alert.
</Story>

<Story name="Success" args={{ type: 'success', title: 'Saved' }}>Changes saved successfully.</Story>

<Story name="Warning" args={{ type: 'warning', title: 'Storage almost full' }}>
	You are using 85% of your storage quota.
</Story>

<Story name="Error" args={{ type: 'error', title: 'Connection lost' }}>
	We couldn't reach the server. Check your connection.
</Story>

{#snippet withTitleOnlyTemplate()}
	<Alert type="info">No title, just a body message in a single paragraph.</Alert>
{/snippet}

<Story name="WithTitleOnly" template={withTitleOnlyTemplate} />

{#snippet dismissibleTemplate()}
	<Alert type="warning" title="Beta" dismissible>Some features may change during the beta.</Alert>
{/snippet}

<Story name="Dismissible" template={dismissibleTemplate} />

{#snippet allTypesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.75rem;max-width:560px">
		<Alert type="info" title="Heads up">This is the default informational alert.</Alert>
		<Alert type="success" title="Saved">Changes saved successfully.</Alert>
		<Alert type="warning" title="Storage almost full">
			You are using 85% of your storage quota.
		</Alert>
		<Alert type="error" title="Connection lost">
			We couldn't reach the server. Check your connection.
		</Alert>
	</div>
{/snippet}

<Story name="AllTypes" template={allTypesTemplate} />
