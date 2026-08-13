<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, waitFor, within } from 'storybook/test';
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

	async function assertDialogVisible(message: string, canvas: HTMLElement) {
		open(message);
		const dialog = await within(canvas).findByRole('alertdialog');
		await waitFor(() => expect(dialog).toBeVisible());
	}
</script>

<Story
	name="Default"
	play={async ({ canvasElement }) => {
		await assertDialogVisible('Are you sure you want to delete this article?', canvasElement);
	}}
>
	<ConfirmDialog />
</Story>

<Story
	name="LongMessage"
	play={async ({ canvasElement }) => {
		await assertDialogVisible(
			'Deleting this category will also remove all subcategories and their associated articles. This action cannot be undone.',
			canvasElement
		);
	}}
>
	<ConfirmDialog />
</Story>

<Story
	name="ConfirmDelete"
	play={async ({ canvasElement }) => {
		await assertDialogVisible(
			'Permanently delete "Draft proposal"? This cannot be undone.',
			canvasElement
		);
	}}
>
	<ConfirmDialog />
</Story>
