<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconFileText, IconFolder, IconHome, IconSlash } from '@tabler/icons-svelte';
	import Breadcrumb from './breadcrumb.svelte';

	const { Story } = defineMeta({
		title: 'Layout & Navigation/Breadcrumb',
		component: Breadcrumb,
		tags: ['autodocs']
	});
</script>

{#snippet defaultTemplate()}
	<Breadcrumb
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Components', href: '/components' },
			{ label: 'Breadcrumb' }
		]}
	/>
{/snippet}

<Story name="Default" template={defaultTemplate} />

{#snippet linksTemplate()}
	<Breadcrumb
		items={[
			{ label: 'Home', href: '#' },
			{ label: 'Projects', href: '#' },
			{ label: 'iv-ui', href: '#' },
			{ label: 'Current' }
		]}
	/>
{/snippet}

<Story name="Links" template={linksTemplate} />

{#snippet homeIcon()}
	<IconHome size={12} />
{/snippet}

{#snippet folderIcon()}
	<IconFolder size={12} />
{/snippet}

{#snippet fileIcon()}
	<IconFileText size={12} />
{/snippet}

{#snippet withIconsTemplate()}
	<Breadcrumb
		items={[
			{ label: 'Home', href: '#', icon: homeIcon },
			{ label: 'Projects', href: '#', icon: folderIcon },
			{ label: 'iv-ui', icon: fileIcon }
		]}
	/>
{/snippet}

<Story name="WithIcons" template={withIconsTemplate} />

{#snippet slashSeparator()}
	<IconSlash size={12} />
{/snippet}

{#snippet customSeparatorTemplate()}
	<Breadcrumb
		items={[
			{ label: 'Home', href: '#' },
			{ label: 'Components', href: '#' },
			{ label: 'Breadcrumb' }
		]}
		separator={slashSeparator}
	/>
{/snippet}

<Story name="CustomSeparator" template={customSeparatorTemplate} />

{#snippet longTrailTemplate()}
	<div style="max-width:420px">
		<Breadcrumb
			items={[
				{ label: 'Home', href: '#' },
				{ label: 'Workspaces', href: '#' },
				{ label: 'Acme Inc.', href: '#' },
				{ label: 'Frontend', href: '#' },
				{ label: 'iv-ui', href: '#' },
				{ label: 'Components' }
			]}
		/>
	</div>
{/snippet}

<Story name="Wrapping" template={longTrailTemplate} />
