<script lang="ts">
	import '../lib/theme/theme.css';
	import '../docs/docs.css';
	import MobileNav from '../docs/ui/MobileNav.svelte';
	import SearchPalette from '../docs/ui/SearchPalette.svelte';
	import SiteFooter from '../docs/ui/SiteFooter.svelte';
	import Topbar from '../docs/ui/Topbar.svelte';

	let { children } = $props();
</script>

<a class="iv-docs-skip" href="#content">Skip to content</a>
<Topbar />

{@render children()}

<SiteFooter />
<MobileNav />
<SearchPalette />
