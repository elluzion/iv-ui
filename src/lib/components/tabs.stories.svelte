<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconChartBar, IconChartPie, IconTable } from '@tabler/icons-svelte';
	import Tab from './tab.svelte';
	import TabList from './tab-list.svelte';
	import TabPanel from './tab-panel.svelte';
	import Tabs from './tabs.svelte';

	const { Story } = defineMeta({
		title: 'Common/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			defaultValue: { control: 'text' },
			size: { control: 'select', options: ['sm', 'md'] },
			bordered: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let activeTab = $state('');
</script>

<Story
	name="Default"
	args={{ defaultValue: 'overview' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		canvas.getByRole('tab', { name: 'Overview' }).focus();
		await userEvent.keyboard('{ArrowRight}');
		await expect(canvas.getByRole('tab', { name: 'Analytics' })).toHaveAttribute(
			'aria-selected',
			'true'
		);
		await expect(canvas.getByText(/Traffic, engagement, and conversion metrics/)).toBeVisible();
		await userEvent.keyboard('{End}');
		await expect(canvas.getByRole('tab', { name: 'Reports' })).toHaveAttribute(
			'aria-selected',
			'true'
		);
	}}
>
	<TabList>
		<Tab value="overview">Overview</Tab>
		<Tab value="analytics">Analytics</Tab>
		<Tab value="reports">Reports</Tab>
	</TabList>
	<TabPanel value="overview">
		<p>An at-a-glance summary of your workspace activity over the last 30 days.</p>
	</TabPanel>
	<TabPanel value="analytics">
		<p>Traffic, engagement, and conversion metrics broken down by source.</p>
	</TabPanel>
	<TabPanel value="reports">
		<p>Exportable reports generated on demand and delivered to your inbox.</p>
	</TabPanel>
</Story>

<Story name="Bordered" args={{ defaultValue: 'overview', bordered: true }}>
	<TabList>
		<Tab value="overview">Overview</Tab>
		<Tab value="analytics">Analytics</Tab>
		<Tab value="reports">Reports</Tab>
	</TabList>
	<TabPanel value="overview">
		<p>A bordered container wraps the tab list and the active panel in one surface.</p>
	</TabPanel>
	<TabPanel value="analytics">
		<p>Traffic, engagement, and conversion metrics broken down by source.</p>
	</TabPanel>
	<TabPanel value="reports">
		<p>Exportable reports generated on demand and delivered to your inbox.</p>
	</TabPanel>
</Story>

<Story name="Small" args={{ defaultValue: 'a', size: 'sm' }}>
	<TabList>
		<Tab value="a">Tab A</Tab>
		<Tab value="b">Tab B</Tab>
		<Tab value="c">Tab C</Tab>
	</TabList>
	<TabPanel value="a">
		<p>Compact tabs for dense toolbars.</p>
	</TabPanel>
	<TabPanel value="b">
		<p>Panel B.</p>
	</TabPanel>
	<TabPanel value="c">
		<p>Panel C.</p>
	</TabPanel>
</Story>

<Story name="DisabledTab" args={{ defaultValue: 'general' }}>
	<TabList>
		<Tab value="general">General</Tab>
		<Tab value="billing">Billing</Tab>
		<Tab value="team">Team</Tab>
		<Tab value="danger" disabled>Danger zone</Tab>
	</TabList>
	<TabPanel value="general">
		<p>Workspace name, language, and timezone.</p>
	</TabPanel>
	<TabPanel value="billing">
		<p>Invoices and payment methods.</p>
	</TabPanel>
	<TabPanel value="team">
		<p>Members, roles, and invitations.</p>
	</TabPanel>
	<TabPanel value="danger">
		<p>This tab is disabled and cannot be selected.</p>
	</TabPanel>
</Story>

{#snippet iconTabsTemplate()}
	<Tabs defaultValue="table">
		<TabList>
			<Tab value="table">
				<span style="display:inline-flex;align-items:center;gap:0.375rem"
					><IconTable size={14} /> Table</span
				>
			</Tab>
			<Tab value="bars">
				<span style="display:inline-flex;align-items:center;gap:0.375rem"
					><IconChartBar size={14} /> Bars</span
				>
			</Tab>
			<Tab value="pie">
				<span style="display:inline-flex;align-items:center;gap:0.375rem"
					><IconChartPie size={14} /> Pie</span
				>
			</Tab>
		</TabList>
		<TabPanel value="table">
			<p>A tab label can carry an icon alongside text.</p>
		</TabPanel>
		<TabPanel value="bars">
			<p>Bar chart panel.</p>
		</TabPanel>
		<TabPanel value="pie">
			<p>Pie chart panel.</p>
		</TabPanel>
	</Tabs>
{/snippet}

<Story name="IconTabs" template={iconTabsTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;flex-direction:column;gap:2rem">
		<Tabs defaultValue="a" size="sm">
			<TabList>
				<Tab value="a">Small</Tab>
				<Tab value="b">Size</Tab>
			</TabList>
			<TabPanel value="a">
				<p>Compact padding, 0.825rem text.</p>
			</TabPanel>
			<TabPanel value="b">
				<p>Panel B.</p>
			</TabPanel>
		</Tabs>
		<Tabs defaultValue="a">
			<TabList>
				<Tab value="a">Medium</Tab>
				<Tab value="b">Size</Tab>
			</TabList>
			<TabPanel value="a">
				<p>Default padding, 0.9rem text.</p>
			</TabPanel>
			<TabPanel value="b">
				<p>Panel B.</p>
			</TabPanel>
		</Tabs>
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet controlledTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Tabs bind:value={activeTab}>
			<TabList>
				<Tab value="one">One</Tab>
				<Tab value="two">Two</Tab>
				<Tab value="three">Three</Tab>
			</TabList>
			<TabPanel value="one">
				<p>First panel.</p>
			</TabPanel>
			<TabPanel value="two">
				<p>Second panel.</p>
			</TabPanel>
			<TabPanel value="three">
				<p>Third panel.</p>
			</TabPanel>
		</Tabs>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			active: {activeTab || 'none'}
		</p>
	</div>
{/snippet}

<Story name="Controlled" template={controlledTemplate} />
