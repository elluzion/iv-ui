<script lang="ts">
	import type { PagerEntry } from '../registry';

	interface Props {
		prev?: PagerEntry | null;
		next?: PagerEntry | null;
	}

	let { prev = null, next = null }: Props = $props();
</script>

{#if prev || next}
	<nav class="iv-docs-pager" aria-label="Previous and next page">
		{#if prev}
			<a href={prev.url} class="iv-prev">
				<span>Previous</span>
				{prev.title}
			</a>
		{/if}
		{#if next}
			<a href={next.url} class="iv-next">
				<span>Next</span>
				{next.title}
			</a>
		{/if}
	</nav>
{/if}
