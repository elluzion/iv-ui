<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './badge.svelte';

	const { Story } = defineMeta({
		title: 'Feedback & Status/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['neutral', 'success', 'error', 'accent', 'info'] },
			size: { control: 'select', options: ['sm', 'md'] }
		}
	});
</script>

<Story name="Default" args={{ variant: 'neutral' }}>Beta</Story>

{#snippet variantsTemplate()}
	<div style="display:flex;flex-wrap:wrap;gap:0.75rem">
		<Badge variant="neutral">Neutral</Badge>
		<Badge variant="success">Success</Badge>
		<Badge variant="error">Error</Badge>
		<Badge variant="accent">Accent</Badge>
		<Badge variant="info">Info</Badge>
	</div>
{/snippet}

<Story name="Variants" template={variantsTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;align-items:center;gap:0.75rem">
		<Badge size="sm">Small</Badge>
		<Badge size="md">Medium</Badge>
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet dismissibleTemplate()}
	<div style="display:flex;flex-wrap:wrap;gap:0.75rem">
		<Badge variant="accent" dismissible>Filter: open</Badge>
		<Badge variant="neutral" dismissible>Draft</Badge>
	</div>
{/snippet}

<Story name="Dismissible" template={dismissibleTemplate} />
