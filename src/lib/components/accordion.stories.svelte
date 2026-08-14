<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconCircleDot } from '@tabler/icons-svelte';
	import Accordion from './accordion.svelte';
	import AccordionItem from './accordion-item.svelte';

	const { Story } = defineMeta({
		title: 'Layout & Navigation/Accordion',
		component: Accordion,
		tags: ['autodocs'],
		argTypes: {
			multiple: { control: 'boolean' },
			disabled: { control: 'boolean' },
			defaultValue: { control: 'text' }
		}
	});
</script>

<script lang="ts">
	let openValue = $state<string[]>([]);
</script>

<Story name="Default">
	<AccordionItem value="billing" title="Billing">
		<p>Invoices are issued on the first of each month and payable within 14 days.</p>
	</AccordionItem>
	<AccordionItem value="limits" title="Rate limits">
		<p>Free accounts may send up to 1,000 requests per day. Paid plans scale from there.</p>
	</AccordionItem>
	<AccordionItem value="security" title="Security">
		<p>All traffic is encrypted in transit and at rest. Two-factor authentication is available.</p>
	</AccordionItem>
</Story>

<Story name="DefaultOpen" args={{ defaultValue: 'limits' }}>
	<AccordionItem value="billing" title="Billing">
		<p>Invoices are issued on the first of each month and payable within 14 days.</p>
	</AccordionItem>
	<AccordionItem value="limits" title="Rate limits">
		<p>Free accounts may send up to 1,000 requests per day. Paid plans scale from there.</p>
	</AccordionItem>
	<AccordionItem value="security" title="Security">
		<p>All traffic is encrypted in transit and at rest. Two-factor authentication is available.</p>
	</AccordionItem>
</Story>

<Story name="Multiple" args={{ multiple: true }}>
	<AccordionItem value="billing" title="Billing">
		<p>Invoices are issued on the first of each month and payable within 14 days.</p>
	</AccordionItem>
	<AccordionItem value="limits" title="Rate limits">
		<p>Free accounts may send up to 1,000 requests per day. Paid plans scale from there.</p>
	</AccordionItem>
	<AccordionItem value="security" title="Security">
		<p>All traffic is encrypted in transit and at rest. Two-factor authentication is available.</p>
	</AccordionItem>
</Story>

{#snippet customTriggerTemplate()}
	<Accordion>
		<AccordionItem value="status" title="Service status">
			<p>All systems operational. No incidents reported in the last 24 hours.</p>
		</AccordionItem>
		<AccordionItem value="endpoints">
			{#snippet trigger()}
				<span style="display:inline-flex;align-items:center;gap:0.5rem">
					<IconCircleDot size={16} style="color:var(--iv_success)" />
					API endpoints
				</span>
			{/snippet}
			<p>Base URL <code>https://api.example.com/v2</code> — see the docs for full details.</p>
		</AccordionItem>
		<AccordionItem value="tokens" title="API tokens">
			<p>Tokens can be rotated from the dashboard. Never commit them to source control.</p>
		</AccordionItem>
	</Accordion>
{/snippet}

<Story name="CustomTrigger" template={customTriggerTemplate} />

<Story name="DisabledItem">
	<AccordionItem value="billing" title="Billing">
		<p>Invoices are issued on the first of each month and payable within 14 days.</p>
	</AccordionItem>
	<AccordionItem value="limits" title="Rate limits" disabled>
		<p>This item is disabled and cannot be expanded.</p>
	</AccordionItem>
	<AccordionItem value="security" title="Security">
		<p>All traffic is encrypted in transit and at rest. Two-factor authentication is available.</p>
	</AccordionItem>
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	<AccordionItem value="billing" title="Billing">
		<p>Invoices are issued on the first of each month and payable within 14 days.</p>
	</AccordionItem>
	<AccordionItem value="limits" title="Rate limits">
		<p>Free accounts may send up to 1,000 requests per day. Paid plans scale from there.</p>
	</AccordionItem>
</Story>

{#snippet controlledTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Accordion bind:value={openValue} multiple>
			<AccordionItem value="billing" title="Billing">
				<p>Invoices are issued on the first of each month and payable within 14 days.</p>
			</AccordionItem>
			<AccordionItem value="limits" title="Rate limits">
				<p>Free accounts may send up to 1,000 requests per day. Paid plans scale from there.</p>
			</AccordionItem>
			<AccordionItem value="security" title="Security">
				<p>All traffic is encrypted in transit and at rest.</p>
			</AccordionItem>
		</Accordion>
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			value: [{openValue.join(', ')}]
		</p>
	</div>
{/snippet}

<Story name="Controlled" template={controlledTemplate} />
