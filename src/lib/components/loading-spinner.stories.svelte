<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingSpinner from './loading-spinner.svelte';

	const { Story } = defineMeta({
		component: LoadingSpinner,
		title: 'Feedback & Status/LoadingSpinner',
		tags: ['autodocs'],
		argTypes: {
			size: { control: { type: 'number', min: 8, max: 96, step: 4 } },
			color: { control: 'color' }
		}
	});
</script>

<Story name="Default" />

<Story name="Small" args={{ size: 16 }} />

<Story name="Large" args={{ size: 48 }} />

<Story name="CustomColor" args={{ color: 'var(--iv_success)' }} />
