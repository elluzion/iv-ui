<script lang="ts">
	import { Tab, TabList, TabPanel, Tabs } from '$lib';
</script>

<Tabs defaultValue="logs" bordered>
	<TabList label="Output">
		<Tab value="logs">Logs</Tab>
		<Tab value="trace">Trace</Tab>
	</TabList>
	<TabPanel value="logs">12:04:18 deploy started</TabPanel>
	<TabPanel value="trace">build → test → publish (4.2s)</TabPanel>
</Tabs>
