<script lang="ts">
	import { IconFolder, IconHome } from '@tabler/icons-svelte';
	import { Breadcrumb } from '$lib';
</script>

{#snippet home()}<IconHome size={12} />{/snippet}
{#snippet folder()}<IconFolder size={12} />{/snippet}

<Breadcrumb
	items={[
		{ label: 'Home', href: '#', icon: home },
		{ label: 'Projects', href: '#', icon: folder },
		{ label: 'Orbital' }
	]}
/>
