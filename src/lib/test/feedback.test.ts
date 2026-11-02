import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Alert from '../components/alert.svelte';
import EmptyState from '../components/empty-state.svelte';
import LoadingSpinner from '../components/loading-spinner.svelte';
import Progress from '../components/progress.svelte';
import Skeleton from '../components/skeleton.svelte';
import { expectAccessible, snippet, text } from './helpers.js';

describe('Alert', () => {
	it('announces status content and dismisses', async () => {
		const ondismiss = vi.fn();
		render(Alert, {
			props: {
				type: 'success',
				title: 'Deployment complete',
				dismissible: true,
				ondismiss,
				children: text('The build is live.')
			}
		});

		expect(screen.getByRole('status')).toHaveTextContent('Deployment complete');
		expect(screen.getByText('The build is live.')).toBeVisible();
		await expectAccessible();

		await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
		expect(ondismiss).toHaveBeenCalledOnce();
	});

	it('uses an assertive alert for errors', () => {
		render(Alert, { props: { type: 'error', title: 'Deployment failed' } });
		expect(screen.getByRole('alert')).toHaveTextContent('Deployment failed');
	});
});

describe('Progress', () => {
	it('exposes its value and label', async () => {
		render(Progress, { props: { label: 'Migration', value: 68, showValue: true } });
		const bar = screen.getByRole('progressbar', { name: 'Migration' });
		expect(bar).toHaveAttribute('aria-valuenow', '68');
		expect(bar).toHaveAttribute('aria-valuetext', '68%');
		expect(screen.getByText('68%')).toBeVisible();
		await expectAccessible();
	});

	it('omits the numeric value when indeterminate', () => {
		render(Progress, { props: { label: 'Waiting', indeterminate: true } });
		const bar = screen.getByRole('progressbar', { name: 'Waiting' });
		expect(bar).not.toHaveAttribute('aria-valuenow');
		expect(bar).toHaveAttribute('aria-valuetext', 'Indeterminate');
	});
});

describe('Skeleton', () => {
	it('is hidden from assistive technology', () => {
		render(Skeleton, { props: { width: 120, height: 16 } });
		const skeleton = document.querySelector('.iv-skeleton');
		expect(skeleton).toHaveAttribute('aria-hidden', 'true');
		expect(skeleton).toHaveStyle({ width: '120px', height: '16px' });
	});
});

describe('LoadingSpinner', () => {
	it('announces loading with an accessible name', async () => {
		render(LoadingSpinner, { props: { size: 18 } });
		expect(screen.getByRole('status', { name: 'Loading' })).toBeVisible();
		await expectAccessible();
	});
});

describe('EmptyState', () => {
	it('renders a title, description, and action', async () => {
		render(EmptyState, {
			props: {
				title: 'No deployments',
				description: 'Push to main to create the first one.',
				action: snippet('<button type="button">Connect repository</button>')
			}
		});

		expect(screen.getByRole('heading', { name: 'No deployments' })).toBeVisible();
		expect(screen.getByText('Push to main to create the first one.')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Connect repository' })).toBeVisible();
		await expectAccessible();
	});
});
