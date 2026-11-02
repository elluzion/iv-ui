import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Avatar from '../components/avatar.svelte';
import Badge from '../components/badge.svelte';
import Shortcut from '../components/shortcut.svelte';
import { expectAccessible, text } from './helpers.js';

describe('Badge', () => {
	it('renders its label and dismisses', async () => {
		const ondismiss = vi.fn();
		render(Badge, {
			props: { variant: 'success', dismissible: true, ondismiss, children: text('Deployed') }
		});

		expect(screen.getByText('Deployed')).toBeVisible();
		expect(screen.getByText('Deployed').closest('.iv-badge')).toHaveClass('iv-success');
		await expectAccessible();

		await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
		expect(ondismiss).toHaveBeenCalledOnce();
	});

	it('omits the dismiss control by default', () => {
		render(Badge, { props: { children: text('Beta') } });
		expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
	});
});

describe('Avatar', () => {
	it('falls back to initials with an accessible name', async () => {
		render(Avatar, { props: { alt: 'Ada Lovelace', fallback: 'AL', size: 'lg' } });

		const image = screen.getByRole('img', { name: 'Ada Lovelace' });
		expect(image).toHaveTextContent('AL');
		expect(image.closest('.iv-avatar')).toHaveClass('iv-lg');
		await expectAccessible();
	});

	it('shows an image when a source is given', () => {
		render(Avatar, {
			props: {
				src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E',
				alt: 'Grace Hopper'
			}
		});

		const img = screen.getByRole('img', { name: 'Grace Hopper' });
		expect(img.tagName).toBe('IMG');
	});
});

describe('Shortcut', () => {
	it('renders each key and exposes the shortcut name', async () => {
		render(Shortcut, { props: { keys: ['⌘', 'K'], label: 'Command palette' } });

		expect(screen.getByLabelText('Command palette')).toBeVisible();
		expect(screen.getAllByText('⌘')).toHaveLength(1);
		expect(screen.getByText('K')).toBeVisible();
		await expectAccessible();
	});
});
