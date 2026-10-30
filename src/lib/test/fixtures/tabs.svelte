<script lang="ts">
	import { Tab, TabList, TabPanel, Tabs } from '../../index.js';

	let value = $state('overview');
</script>

<Tabs bind:value>
	<TabList label="Workspace sections">
		<Tab value="overview">Overview</Tab>
		<Tab value="analytics">Analytics</Tab>
		<Tab value="reports">Reports</Tab>
	</TabList>
	<TabPanel value="overview">Overview panel</TabPanel>
	<TabPanel value="analytics">Analytics panel</TabPanel>
	<TabPanel value="reports">Reports panel</TabPanel>
</Tabs>
