<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, waitFor, within } from 'storybook/test';
	import Toast from './toast.svelte';
	import { toastState } from '../stores/toast.js';

	const { Story } = defineMeta({
		component: Toast,
		title: 'Feedback & Status/Toast',
		tags: ['autodocs']
	});

	async function assertToastVisible(
		message: string,
		type: 'success' | 'info' | 'error',
		canvas: HTMLElement
	) {
		toastState.set({ id: Math.random(), message, type });
		const role = type === 'error' ? 'alert' : 'status';
		const toast = await within(canvas).findByRole(role);
		await waitFor(() => expect(toast).toBeVisible());
	}
</script>

<Story
	name="Success"
	play={async ({ canvasElement }) => {
		await assertToastVisible('Article saved successfully.', 'success', canvasElement);
	}}
>
	<Toast />
</Story>

<Story
	name="Info"
	play={async ({ canvasElement }) => {
		await assertToastVisible('Syncing data from server...', 'info', canvasElement);
	}}
>
	<Toast />
</Story>

<Story
	name="Error"
	play={async ({ canvasElement }) => {
		await assertToastVisible('Failed to save. Please try again.', 'error', canvasElement);
	}}
>
	<Toast />
</Story>
