<script lang="ts">
	interface Props {
		related: { title: string; summary: string; url: string; kind: string }[];
	}

	let { related }: Props = $props();
</script>

{#if related.length}
	<div class="iv-docs-cards">
		{#each related as item (item.url)}
			<a class="iv-docs-card" href={item.url}>
				<div class="iv-docs-card-top">
					<strong>{item.title}</strong>
					<span>{item.kind}</span>
				</div>
				<p>{item.summary}</p>
			</a>
		{/each}
	</div>
{/if}
