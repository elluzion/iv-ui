<script lang="ts">
	import { Tab, TabList, TabPanel, Tabs } from '$lib';
</script>

<Tabs defaultValue="overview">
	<TabList label="Project sections">
		<Tab value="overview">Overview</Tab>
		<Tab value="deploys">Deployments</Tab>
		<Tab value="settings">Settings</Tab>
	</TabList>
	<TabPanel value="overview">Runtime, regions, and the current release.</TabPanel>
	<TabPanel value="deploys">Every run, with the commit and the duration.</TabPanel>
	<TabPanel value="settings">Access, retention, and the deploy key.</TabPanel>
</Tabs>
