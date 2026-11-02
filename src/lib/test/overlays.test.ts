import { act, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AlertDialog from '../components/alert-dialog.svelte';
import ContextMenu from '../components/context-menu.svelte';
import Dialog from '../components/dialog.svelte';
import Menu, { type MenuEntry } from '../components/menu.svelte';
import Sheet from '../components/sheet.svelte';
import Toast from '../components/toast.svelte';
import Tooltip from '../components/tooltip.svelte';
import { showAlertDialog } from '../stores/alert-dialog.js';
import { showToast } from '../stores/toast.js';
import PopoverFixture from './fixtures/popover.svelte';
import { expectAccessible, snippet } from './helpers.js';

const menuEntries: MenuEntry[] = [
	{ type: 'header', id: 'header', label: 'Account' },
	{ type: 'item', id: 'profile', item: { label: 'Profile', shortcut: '⇧⌘P' } },
	{ type: 'item', id: 'billing', item: { label: 'Billing' } }
];

describe('Dialog', () => {
	it('opens accessibly and reports close requests', async () => {
		const onclose = vi.fn();
		render(Dialog, {
			props: {
				open: true,
				title: 'Edit project',
				onclose,
				children: snippet('<p>Project settings</p>')
			}
		});

		const dialog = await screen.findByRole('dialog', { name: 'Edit project' });
		expect(dialog).toBeVisible();
		await expectAccessible();

		await userEvent.keyboard('{Escape}');
		expect(onclose).toHaveBeenCalled();
	});
});

describe('Sheet', () => {
	it('anchors a right sheet at its configured width', async () => {
		const onclose = vi.fn();
		render(Sheet, {
			props: {
				open: true,
				side: 'right',
				size: 'md',
				title: 'Filters',
				onclose,
				children: snippet('<p>Filter controls</p>')
			}
		});

		const panel = document.querySelector<HTMLElement>('.iv-sheet');
		expect(panel).toBeVisible();
		expect(panel).toHaveClass('iv-side-right');
		expect(panel?.getBoundingClientRect().width).toBeLessThanOrEqual(window.innerWidth);
		await expectAccessible();

		await userEvent.keyboard('{Escape}');
		expect(onclose).toHaveBeenCalled();
	});
});

describe('Popover', () => {
	it('toggles on anchor click, closes on Escape and outside presses', async () => {
		render(PopoverFixture);
		const trigger = screen.getByRole('button', { name: 'Filters' });

		await userEvent.click(trigger);
		const panel = await screen.findByRole('dialog', { name: 'Popover' });
		expect(panel).toBeVisible();
		await expectAccessible();

		await userEvent.click(trigger);
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

		await userEvent.click(trigger);
		await screen.findByRole('dialog');
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

		await userEvent.click(trigger);
		await screen.findByRole('dialog');
		await fireEvent.mouseDown(document.body);
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});
});

describe('Menu', () => {
	it('activates an item and forwards the entry', async () => {
		const onclick = vi.fn();
		render(Menu, { props: { entries: menuEntries, label: 'Account menu', onclick } });

		await userEvent.click(screen.getByRole('menuitem', { name: /Profile/ }));
		expect(onclick).toHaveBeenCalledOnce();
		expect(onclick.mock.calls[0][1]).toMatchObject({ id: 'profile' });
		await expectAccessible();
	});
});

describe('ContextMenu', () => {
	it('opens on right click and activates an item', async () => {
		const onclick = vi.fn();
		const onopen = vi.fn();
		render(ContextMenu, {
			props: {
				entries: menuEntries,
				label: 'Context menu',
				onclick,
				onopen,
				children: snippet('<button type="button">Right-click this row</button>')
			}
		});

		await userEvent.pointer({
			keys: '[MouseRight]',
			target: screen.getByRole('button', { name: 'Right-click this row' })
		});

		await screen.findByRole('menu');
		expect(onopen).toHaveBeenCalled();
		await userEvent.click(screen.getByRole('menuitem', { name: 'Billing' }));
		expect(onclick).toHaveBeenCalledOnce();
		await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
	});
});

describe('Tooltip', () => {
	it('shows on hover and hides on blur', async () => {
		render(Tooltip, {
			props: {
				label: 'Adds a new project',
				delay: 0,
				children: snippet('<button type="button">New project</button>')
			}
		});

		const trigger = screen.getByRole('button', { name: 'New project' });
		await userEvent.hover(trigger);
		const tooltip = await screen.findByRole('tooltip');
		expect(tooltip).toHaveTextContent('Adds a new project');

		await userEvent.unhover(trigger);
		await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
	});
});

describe('Toast', () => {
	it('announces success politely and can be dismissed', async () => {
		render(Toast);
		await act(() => showToast('Deployed to production.', 'success'));

		const status = await screen.findByRole('status');
		expect(status).toHaveTextContent('Deployed to production.');
		await expectAccessible();

		await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
		await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
	});

	it('uses an assertive alert for errors', async () => {
		render(Toast);
		await act(() => showToast('Deploy failed.', 'error'));
		const alert = await screen.findByRole('alert');
		expect(alert).toHaveTextContent('Deploy failed.');
	});
});

describe('AlertDialog', () => {
	it('runs the chosen action and closes', async () => {
		const onClick = vi.fn();
		const onclose = vi.fn();
		render(AlertDialog);
		await act(() =>
			showAlertDialog({
				title: 'Delete project',
				message: 'This cannot be undone.',
				onclose,
				actions: [
					{ label: 'Cancel', variant: 'outline' },
					{ label: 'Delete', variant: 'danger', onClick }
				]
			})
		);

		const dialog = await screen.findByRole('alertdialog', { name: 'Delete project' });
		expect(dialog).toBeVisible();
		await expectAccessible();

		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
		expect(onClick).toHaveBeenCalledOnce();
		expect(onclose).toHaveBeenCalledOnce();
		await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
	});
});
