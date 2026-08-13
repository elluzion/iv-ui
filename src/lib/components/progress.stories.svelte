<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './progress.svelte';

	const { Story } = defineMeta({
		title: 'Common/Progress',
		component: Progress,
		tags: ['autodocs'],
		argTypes: {
			value: { control: 'number', min: 0, max: 100 },
			max: { control: 'number' },
			indeterminate: { control: 'boolean' },
			label: { control: 'text' },
			showValue: { control: 'boolean' },
			size: { control: 'select', options: ['sm', 'md'] }
		}
	});
</script>

<Story name="Default" args={{ value: 60 }} />

<Story name="WithLabel" args={{ label: 'Uploading…', value: 45, showValue: true }} />

<Story name="Indeterminate" args={{ indeterminate: true, label: 'Processing' }} />

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1.5rem;max-width:420px">
		<Progress label="Small" value={40} showValue size="sm" />
		<Progress label="Medium" value={70} showValue size="md" />
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet steppedTemplate()}
	<div style="display:flex;flex-direction:column;gap:1.5rem;max-width:420px">
		<Progress label="Phase 1" value={15} showValue />
		<Progress label="Phase 2" value={55} showValue />
		<Progress label="Phase 3" value={100} showValue />
	</div>
{/snippet}

<Story name="Stepped" template={steppedTemplate} />
