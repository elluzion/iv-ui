<script lang="ts">
	import { IconShieldLock } from '@tabler/icons-svelte';
	import { Accordion, AccordionItem } from '$lib';
</script>

<Accordion defaultValue="access">
	<AccordionItem value="access">
		{#snippet trigger()}
			<span class="trigger">
				<IconShieldLock size={14} />
				Access control
			</span>
		{/snippet}
		<p>Roles are inherited from the organization; overrides live on the project.</p>
	</AccordionItem>
	<AccordionItem value="audit" title="Audit log">
		<p>Every privileged action is recorded with the actor and the request id.</p>
	</AccordionItem>
</Accordion>

<style>
	.trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
