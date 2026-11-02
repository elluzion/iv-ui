<script lang="ts">
	import { Tab, TabList, TabPanel, Tabs } from '$lib';
</script>

<div class="stack">
	<Tabs defaultValue="one" size="sm">
		<TabList label="Small tabs">
			<Tab value="one">One</Tab>
			<Tab value="two">Two</Tab>
		</TabList>
		<TabPanel value="one">Small tab content.</TabPanel>
		<TabPanel value="two">Second panel.</TabPanel>
	</Tabs>
	<Tabs defaultValue="one">
		<TabList label="Medium tabs">
			<Tab value="one">One</Tab>
			<Tab value="two">Two</Tab>
		</TabList>
		<TabPanel value="one">Medium tab content.</TabPanel>
		<TabPanel value="two">Second panel.</TabPanel>
	</Tabs>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-xl);
	}
</style>
