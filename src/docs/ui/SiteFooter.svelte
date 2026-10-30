<script lang="ts">
	import { site } from '../manifest';
</script>

<footer class="iv-docs-footer">
	<span>© {new Date().getFullYear()} {site.name} · {site.license} · v{site.version}</span>
	<nav aria-label="Footer">
		<a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
		<a href="/docs/installation">Installation</a>
		<a href="/components">Components</a>
		<a href="/llms.txt">llms.txt</a>
	</nav>
</footer>
