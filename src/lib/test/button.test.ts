import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Button from '../components/button.svelte';
import { expectAccessible, text } from './helpers.js';

describe('Button', () => {
	it('renders an accessible button and calls both click handlers', async () => {
		const modern = vi.fn();
		const legacy = vi.fn();
		render(Button, { props: { children: text('Deploy'), onclick: modern, 'on:click': legacy } });

		const button = screen.getByRole('button', { name: 'Deploy' });
		expect(button).toHaveAttribute('type', 'button');
		await userEvent.click(button);

		expect(modern).toHaveBeenCalledOnce();
		expect(legacy).toHaveBeenCalledOnce();
		await expectAccessible();
	});

	it('does not activate when disabled', async () => {
		const onclick = vi.fn();
		render(Button, { props: { children: text('Deploy'), disabled: true, onclick } });

		await userEvent.click(screen.getByRole('button', { name: 'Deploy' }));
		expect(onclick).not.toHaveBeenCalled();
	});
});
