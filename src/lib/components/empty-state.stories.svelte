<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconInbox, IconSearchOff } from '@tabler/icons-svelte';
	import Button from './button.svelte';
	import EmptyState from './empty-state.svelte';

	const { Story } = defineMeta({
		title: 'Feedback & Status/EmptyState',
		component: EmptyState,
		tags: ['autodocs']
	});
</script>

{#snippet defaultTemplate()}
	<EmptyState title="No projects yet" description="Create your first project to get started." />
{/snippet}

<Story name="Default" template={defaultTemplate} />

{#snippet withIconTemplate()}
	<EmptyState title="Inbox zero" description="You're all caught up — new messages will land here.">
		{#snippet icon()}
			<IconInbox size={22} />
		{/snippet}
	</EmptyState>
{/snippet}

<Story name="WithIcon" template={withIconTemplate} />

{#snippet withActionTemplate()}
	<EmptyState title="No search results" description="Try different keywords or clear the filters.">
		{#snippet icon()}
			<IconSearchOff size={22} />
		{/snippet}
		{#snippet action()}
			<Button variant="secondary" size="sm">Clear filters</Button>
		{/snippet}
	</EmptyState>
{/snippet}

<Story name="WithAction" template={withActionTemplate} />

{#snippet withChildrenTemplate()}
	<EmptyState title="No uploads" description="Drop files here or browse to add content.">
		{#snippet icon()}
			<IconInbox size={22} />
		{/snippet}
		<span style="font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
			>PNG, JPG, or PDF up to 10MB</span
		>
	</EmptyState>
{/snippet}

<Story name="WithChildren" template={withChildrenTemplate} />
