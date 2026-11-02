import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AccordionFixture from './fixtures/accordion.svelte';
import TabsFixture from './fixtures/tabs.svelte';
import Article from '../components/article.svelte';
import Breadcrumb from '../components/breadcrumb.svelte';
import Card from '../components/card.svelte';
import Collapsible from '../components/collapsible.svelte';
import Separator from '../components/separator.svelte';
import { expectAccessible, snippet, text } from './helpers.js';

describe('Card', () => {
	it('acts as a button when clickable and reacts to Enter', async () => {
		const onclick = vi.fn();
		render(Card, {
			props: {
				title: 'Build pipeline',
				description: 'Three stages',
				onclick,
				children: text('Last run 4 minutes ago.')
			}
		});

		const card = screen.getByRole('button', { name: /Build pipeline/ });
		await userEvent.click(card);
		card.focus();
		await userEvent.keyboard('{Enter}');
		expect(onclick).toHaveBeenCalledTimes(2);
		await expectAccessible();
	});

	it('stays a plain container when no handler is passed', () => {
		render(Card, { props: { children: text('Static content') } });
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
		expect(screen.getByText('Static content')).toBeVisible();
	});
});

describe('Article', () => {
	it('renders a titled prose document', async () => {
		render(Article, {
			props: {
				title: 'Release notes',
				description: 'What changed in 0.2.0',
				children: snippet('<p>New components and a token refresh.</p>')
			}
		});

		expect(screen.getByRole('heading', { level: 1, name: 'Release notes' })).toBeVisible();
		expect(screen.getByText('New components and a token refresh.')).toBeVisible();
		await expectAccessible();
	});
});

describe('Accordion', () => {
	it('opens multiple sections and reports state', async () => {
		render(AccordionFixture);
		const account = screen.getByRole('button', { name: 'Account' });
		const billing = screen.getByRole('button', { name: 'Billing' });

		await userEvent.click(account);
		await userEvent.click(billing);
		expect(account).toHaveAttribute('aria-expanded', 'true');
		expect(billing).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByText('Account settings')).toBeVisible();
		expect(screen.getByText('Billing settings')).toBeVisible();
		await expectAccessible();
	});
});

describe('Tabs', () => {
	it('moves selection with the keyboard and swaps panels', async () => {
		render(TabsFixture);
		const overview = screen.getByRole('tab', { name: 'Overview' });
		expect(overview).toHaveAttribute('aria-selected', 'true');

		overview.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByText('Analytics panel')).toBeVisible();

		await userEvent.keyboard('{End}');
		expect(screen.getByRole('tab', { name: 'Reports' })).toHaveAttribute('aria-selected', 'true');
		await expectAccessible();
	});
});

describe('Breadcrumb', () => {
	it('renders a labelled trail with a current page', async () => {
		render(Breadcrumb, {
			props: {
				items: [
					{ label: 'Home', href: '/' },
					{ label: 'Components', href: '/components' },
					{ label: 'Button' }
				]
			}
		});

		const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
		expect(nav).toBeVisible();
		expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '/components');
		expect(screen.getByText('Button')).toHaveAttribute('aria-current', 'page');
		await expectAccessible();
	});
});

describe('Collapsible', () => {
	it('toggles the region and reports the change', async () => {
		const onchange = vi.fn();
		render(Collapsible, {
			props: { title: 'Advanced', onchange, children: text('Hidden settings') }
		});

		const trigger = screen.getByRole('button', { name: 'Advanced' });
		await userEvent.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('region')).toBeVisible();
		expect(onchange).toHaveBeenCalled();

		await userEvent.click(trigger);
		expect(screen.queryByRole('region')).not.toBeInTheDocument();
		await expectAccessible();
	});
});

describe('Separator', () => {
	it('exposes orientation and an optional label', async () => {
		render(Separator, { props: { label: 'or', orientation: 'horizontal' } });
		expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
		expect(screen.getByText('or')).toBeVisible();
		await expectAccessible();
	});
});
