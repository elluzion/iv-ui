<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
	import AlertDialog from './alert-dialog.svelte';
	import { alertDialogState } from '../stores/alert-dialog.js';
	import type { AlertDialogState } from '../types.js';

	const { Story } = defineMeta({
		component: AlertDialog,
		title: 'Overlays & Dialog/AlertDialog',
		tags: ['autodocs']
	});

	function open(config: AlertDialogState) {
		alertDialogState.set(config);
	}

	async function settleDialog(canvas: HTMLElement): Promise<HTMLElement> {
		const dialog = await within(canvas).findByRole('alertdialog');
		await waitFor(() => expect(dialog).toBeVisible());
		await waitFor(
			() => {
				expect(Number(getComputedStyle(dialog).opacity)).toBeGreaterThan(0.99);
			},
			{ timeout: 1000 }
		);
		return dialog;
	}

	async function expectClosed(canvas: HTMLElement) {
		await waitFor(() => expect(within(canvas).queryByRole('alertdialog')).not.toBeInTheDocument());
	}
</script>

<Story
	name="Default"
	play={async ({ canvasElement }) => {
		open({ message: 'Your changes have been saved.' });
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>

<Story
	name="WithTitle"
	play={async ({ canvasElement }) => {
		open({
			title: 'Save failed',
			message: 'An unexpected error occurred while saving. Please try again.'
		});
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>

<Story
	name="ConfirmDelete"
	play={async ({ canvasElement }) => {
		const deleted = fn();
		const config: AlertDialogState = {
			title: 'Delete article',
			message: 'Permanently delete "Draft proposal"? This cannot be undone.',
			actions: [
				{ label: 'Cancel', variant: 'outline' },
				{ label: 'Delete', variant: 'danger', onClick: deleted }
			]
		};
		open(config);
		const dialog = await settleDialog(canvasElement);
		const deleteBtn = await within(dialog).findByRole('button', { name: 'Delete' });
		await userEvent.click(deleteBtn);
		await waitFor(() => expect(deleted).toHaveBeenCalled());
		await expectClosed(canvasElement);
		open(config);
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>

<Story
	name="BackdropClick"
	play={async ({ canvasElement }) => {
		const config: AlertDialogState = { message: 'Click outside the panel to dismiss.' };
		open(config);
		const dialog = await settleDialog(canvasElement);
		dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await expectClosed(canvasElement);
		open(config);
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>

<Story
	name="BackdropLocked"
	play={async ({ canvasElement }) => {
		const config: AlertDialogState = {
			message: 'This dialog cannot be dismissed by clicking outside.',
			closeOnBackdrop: false
		};
		open(config);
		const dialog = await settleDialog(canvasElement);
		dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await waitFor(() => expect(dialog).toBeVisible());
		await userEvent.keyboard('{Escape}');
		await expectClosed(canvasElement);
		open(config);
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>

<Story
	name="LongMessage"
	play={async ({ canvasElement }) => {
		open({
			message:
				'Deleting this category will also remove all subcategories and their associated articles. This action cannot be undone.'
		});
		await settleDialog(canvasElement);
	}}
>
	<AlertDialog />
</Story>
