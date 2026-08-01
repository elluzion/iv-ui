import type { Meta, StoryObj } from '@storybook/sveltekit';
import ConfirmDialog from './confirm-dialog.svelte';
import { dialogState } from '../stores/dialog';

const meta: Meta<typeof ConfirmDialog> = {
	component: ConfirmDialog,
	title: 'Common/ConfirmDialog',
	tags: ['autodocs'],
	decorators: [
		(_, { parameters }) => {
			const { message, onconfirm, oncancel } = parameters.dialog as {
				message: string;
				onconfirm: () => void;
				oncancel: () => void;
			};
			dialogState.set({
				message,
				onconfirm: onconfirm ?? (() => dialogState.set(null)),
				oncancel: oncancel ?? (() => dialogState.set(null))
			});
			return (storyFn: () => unknown) => storyFn();
		}
	]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		dialog: { message: 'Are you sure you want to delete this article?' }
	}
};

export const LongMessage: Story = {
	parameters: {
		dialog: {
			message:
				'Deleting this category will also remove all subcategories and their associated articles. This action cannot be undone.'
		}
	}
};

export const ConfirmDelete: Story = {
	parameters: {
		dialog: { message: 'Permanently delete "Draft proposal"? This cannot be undone.' }
	}
};
