<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconInfoCircle } from '@tabler/icons-svelte';
	import Dialog from './dialog.svelte';

	const { Story } = defineMeta({
		title: 'Common/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md', 'lg'] }
		}
	});
</script>

<script>
	let show = $state(true);
</script>

<Story name="Default" args={{ open: true, title: 'Example Dialog' }}>
	<p>This is the dialog body content. Use the controls below to toggle properties.</p>
</Story>

{#snippet iconTemplate(_args, _ctx)}
	<Dialog open title="Example Dialog with Icon">
		{#snippet icon()}
			<IconInfoCircle size="1.125rem" />
		{/snippet}
		<p>This dialog has an icon in the header alongside the title.</p>
	</Dialog>
{/snippet}

<Story name="WithIcon" template={iconTemplate} />

<Story name="Small" args={{ open: true, title: 'Small Dialog', size: 'sm' }}>
	<p>A compact dialog for simple confirmations or short forms.</p>
</Story>

<Story name="Large" args={{ open: true, title: 'Large Dialog', size: 'lg' }}>
	<p>A spacious dialog for complex forms or detailed content.</p>
</Story>

<Story name="NoTitle" args={{ open: true }}>
	<p>This dialog has no title — the header is hidden entirely.</p>
</Story>

{#snippet template(_args, _ctx)}
	{#if show}
		<Dialog open title="Edit Profile" size="sm" onclose={() => (show = false)}>
			<p>Update your profile information below.</p>
			{#snippet footer()}
				<button class="outline" onclick={() => (show = false)}>Cancel</button>
				<button class="primary" onclick={() => (show = false)}>Save Changes</button>
			{/snippet}
		</Dialog>
	{/if}
{/snippet}

<Story name="WithFooter" {template} />

<Story name="LongContent" args={{ open: true, title: 'Scrollable Content' }}>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua.
	</p>
	<p>
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
		fugiat nulla pariatur.
	</p>
	<p>
		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
		id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
		doloremque laudantium.
	</p>
	<p>
		Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
		dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
		fugit.
	</p>
	<p>
		Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
		sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
		voluptatem.
	</p>
	<p>
		Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
		ut aliquid ex ea commodi consequatur.
	</p>
</Story>
