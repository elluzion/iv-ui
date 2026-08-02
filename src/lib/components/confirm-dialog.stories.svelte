<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ConfirmDialog from './confirm-dialog.svelte';
	import { dialogState } from '../stores/dialog.js';

	const { Story } = defineMeta({
		component: ConfirmDialog,
		title: 'Common/ConfirmDialog',
		tags: ['autodocs']
	});

	function open(message: string) {
		dialogState.set({
			message,
			onconfirm: () => dialogState.set(null),
			oncancel: () => dialogState.set(null)
		});
	}
</script>

{#snippet defaultDialog()}
	{open('Are you sure you want to delete this article?')}
	<ConfirmDialog />
{/snippet}

<Story name="Default" template={defaultDialog} />

{#snippet longMessageDialog()}
	{open(
		'Deleting this category will also remove all subcategories and their associated articles. This action cannot be undone.'
	)}
	<ConfirmDialog />
{/snippet}

<Story name="LongMessage" template={longMessageDialog} />

{#snippet confirmDeleteDialog()}
	{open('Permanently delete "Draft proposal"? This cannot be undone.')}
	<ConfirmDialog />
{/snippet}

<Story name="ConfirmDelete" template={confirmDeleteDialog} />
