<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { IconBrandGithub, IconMenu2, IconMoon, IconSearch, IconSun } from '@tabler/icons-svelte';
	import { site } from '../manifest';
	import { readTheme, toggleTheme, type Theme } from '../lib/theme';
	import { ui } from '../lib/ui.svelte';

	const path = $derived(page.url.pathname);
	let theme = $state<Theme>('dark');

	onMount(() => {
		theme = readTheme();
	});

	function switchTheme() {
		theme = toggleTheme();
	}

	const links = [
		{ label: 'Docs', href: '/docs/installation', match: '/docs' },
		{ label: 'Components', href: '/components', match: '/components' },
		{ label: 'Foundations', href: '/foundations/tokens', match: '/foundations' }
	];
</script>

<header class="iv-docs-topbar">
	<button
		type="button"
		class="iv-docs-iconbtn iv-docs-mobile-menu"
		aria-label="Open navigation"
		aria-expanded={ui.nav}
		onclick={() => (ui.nav = true)}
	>
		<IconMenu2 size={18} aria-hidden="true" />
	</button>

	<a class="iv-docs-brand" href="/">
		iv-ui<span class="iv-docs-cursor" aria-hidden="true"></span>
	</a>
	<a class="iv-docs-version" href="/docs/installation">v{site.version}</a>

	<nav class="iv-docs-topbar-links" aria-label="Sections">
		{#each links as link (link.href)}
			<a href={link.href} aria-current={path.startsWith(link.match) ? 'page' : undefined}
				>{link.label}</a
			>
		{/each}
	</nav>

	<div class="iv-docs-topbar-actions">
		<button
			type="button"
			class="iv-docs-searchbtn"
			aria-label="Search documentation"
			onclick={() => (ui.search = true)}
		>
			<span class="iv-docs-search-main">
				<IconSearch size={14} aria-hidden="true" />
				<span class="iv-docs-search-label">Search docs</span>
			</span>
			<span class="iv-docs-search-hint" aria-hidden="true">
				<span class="iv-docs-kbd">⌘</span><span class="iv-docs-kbd">K</span>
			</span>
		</button>

		<button
			type="button"
			class="iv-docs-iconbtn"
			aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
			onclick={switchTheme}
		>
			{#if theme === 'dark'}
				<IconSun size={17} aria-hidden="true" />
			{:else}
				<IconMoon size={17} aria-hidden="true" />
			{/if}
		</button>

		<a
			class="iv-docs-iconbtn"
			href={site.github}
			target="_blank"
			rel="noreferrer"
			aria-label="iv-ui on GitHub"
		>
			<IconBrandGithub size={17} aria-hidden="true" />
		</a>
	</div>
</header>
