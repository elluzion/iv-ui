<script lang="ts">
	import { Accordion, AccordionItem } from '../../index.js';

	let value = $state('');
</script>

<Accordion bind:value multiple>
	<AccordionItem value="account" title="Account">Account settings</AccordionItem>
	<AccordionItem value="billing" title="Billing">Billing settings</AccordionItem>
	<AccordionItem value="security" title="Security">Security settings</AccordionItem>
</Accordion>
