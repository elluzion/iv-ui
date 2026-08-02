<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './toast.svelte';
	import { toastState } from '../stores/toast.js';

	const { Story } = defineMeta({
		component: Toast,
		title: 'Common/Toast',
		tags: ['autodocs']
	});

	function showToast(id: number, message: string, type: 'success' | 'info' | 'error') {
		toastState.set({ id, message, type });
	}
</script>

{#snippet successTemplate()}
	{showToast(1, 'Article saved successfully.', 'success')}
	<Toast />
{/snippet}

<Story name="Success" template={successTemplate} />

{#snippet infoTemplate()}
	{showToast(2, 'Syncing data from server...', 'info')}
	<Toast />
{/snippet}

<Story name="Info" template={infoTemplate} />

{#snippet errorTemplate()}
	{showToast(3, 'Failed to save. Please try again.', 'error')}
	<Toast />
{/snippet}

<Story name="Error" template={errorTemplate} />
