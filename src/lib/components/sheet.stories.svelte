<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconInfoCircle } from '@tabler/icons-svelte';
	import Sheet from './sheet.svelte';

	const { Story } = defineMeta({
		title: 'Common/Sheet',
		component: Sheet,
		tags: ['autodocs'],
		argTypes: {
			side: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
			size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] }
		}
	});
</script>

<script>
	let show = $state(true);
</script>

<Story name="Default" args={{ title: 'Example Sheet' }}>
	{#snippet template(args)}
		<Sheet bind:open={show} {...args}>
			<p>This is the sheet body content. Use the controls below to toggle properties.</p>
		</Sheet>
	{/snippet}
</Story>

{#snippet iconTemplate()}
	<Sheet open title="Example Sheet with Icon">
		{#snippet icon()}
			<IconInfoCircle size="1.125rem" />
		{/snippet}
		<p>This sheet has an icon in the header alongside the title.</p>
	</Sheet>
{/snippet}

<Story name="WithIcon" template={iconTemplate} />

<Story name="Left" args={{ open: true, title: 'Left Sheet', side: 'left' }}>
	<p>A sheet anchored to the left edge of the viewport.</p>
</Story>

<Story name="Top" args={{ open: true, title: 'Top Sheet', side: 'top' }}>
	<p>A sheet anchored to the top edge of the viewport.</p>
</Story>

<Story name="Bottom" args={{ open: true, title: 'Bottom Sheet', side: 'bottom' }}>
	<p>A sheet anchored to the bottom edge of the viewport.</p>
</Story>

<Story name="Full" args={{ open: true, title: 'Full Sheet', size: 'full' }}>
	<p>A sheet that fills the entire viewport.</p>
</Story>

<Story name="Small" args={{ open: true, title: 'Small Sheet', size: 'sm' }}>
	<p>A compact sheet for simple settings or short forms.</p>
</Story>

<Story name="Large" args={{ open: true, title: 'Large Sheet', size: 'lg' }}>
	<p>A spacious sheet for complex forms or detailed content.</p>
</Story>

<Story name="NoTitle" args={{ open: true }}>
	<p>This sheet has no title — the header is hidden entirely.</p>
</Story>

<Story name="NoCloseButton" args={{ open: true, title: 'No Close Button', showCloseButton: false }}>
	<p>The close button is hidden. Close via Escape or the backdrop, or bind `open`.</p>
</Story>

{#snippet template()}
	{#if show}
		<Sheet open title="Edit Profile" size="sm" onclose={() => (show = false)}>
			<p>Update your profile information below.</p>
			{#snippet footer()}
				<button class="outline" onclick={() => (show = false)}>Cancel</button>
				<button class="primary" onclick={() => (show = false)}>Save Changes</button>
			{/snippet}
		</Sheet>
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
