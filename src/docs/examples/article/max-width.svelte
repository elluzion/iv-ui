<script lang="ts">
	import { Article } from '$lib';
</script>

<Article
	title="A narrow measure"
	description="520px keeps the line length comfortable."
	maxWidth={520}
>
	<p>
		The body column is narrowed independently of the header. Use it for release notes,
		documentation, or any surface that is mostly prose. Headings, lists, and code keep the same
		typeset.
	</p>
	<p>Short lines are easier to scan; long lines lose the reader between returns.</p>
</Article>
