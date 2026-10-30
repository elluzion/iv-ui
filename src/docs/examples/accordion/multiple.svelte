<script lang="ts">
	import { Accordion, AccordionItem } from '$lib';
</script>

<Accordion multiple defaultValue={['runtime', 'regions']}>
	<AccordionItem value="runtime" title="Runtime">
		<p>Node 22 on Linux, with the edge cache in front of every request.</p>
	</AccordionItem>
	<AccordionItem value="build" title="Build">
		<p>Static output is prerendered; the rest is bundled on demand.</p>
	</AccordionItem>
	<AccordionItem value="regions" title="Regions">
		<p>Three regions, one primary and two read replicas.</p>
	</AccordionItem>
</Accordion>
