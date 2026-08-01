import type { Meta, StoryObj } from '@storybook/sveltekit';
import Toast from './toast.svelte';
import { toastState } from '../stores/toast';

function showToast(message: string, type: 'success' | 'info' | 'error') {
	toastState.set({ id: Date.now(), message, type });
}

function clearToast() {
	toastState.set(null);
}

const meta: Meta<typeof Toast> = {
	component: Toast,
	title: 'Common/Toast',
	tags: ['autodocs'],
	decorators: [
		(_, { parameters }) => {
			clearToast();
			const { message, type } = parameters.toast as {
				message: string;
				type: 'success' | 'info' | 'error';
			};
			showToast(message, type);
			return (storyFn: () => unknown) => storyFn();
		}
	]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	parameters: { toast: { message: 'Article saved successfully.', type: 'success' } }
};

export const Info: Story = {
	parameters: { toast: { message: 'Syncing data from server...', type: 'info' } }
};

export const Error: Story = {
	parameters: { toast: { message: 'Failed to save. Please try again.', type: 'error' } }
};
