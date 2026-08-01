import type { Meta, StoryObj } from '@storybook/sveltekit';
import LoadingSpinner from './loading-spinner.svelte';

const meta: Meta<typeof LoadingSpinner> = {
	component: LoadingSpinner,
	title: 'Common/LoadingSpinner',
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'number', min: 8, max: 96, step: 4 } },
		color: { control: 'color' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 16 } };

export const Large: Story = { args: { size: 48 } };

export const CustomColor: Story = { args: { color: 'var(--moss)' } };
