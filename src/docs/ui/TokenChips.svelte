<script lang="ts">
	import { tokenByName, tokenSlug } from '../lib/data';

	interface Props {
		names: string[];
		label?: string;
	}

	let { names, label }: Props = $props();

	const isColor = (value: string) => /^#|^rgba?\(|^hsl/.test(value);
</script>

{#if names.length}
	<div class="iv-docs-token-block">
		{#if label}<div class="iv-docs-rail-label">{label}</div>{/if}
		<div class="iv-docs-tokens">
			{#each names as name (name)}
				{@const token = tokenByName.get(name)}
				{#if token}
					<a class="iv-docs-token" href={`/foundations/tokens#token-${tokenSlug(name)}`}>
						{#if isColor(token.dark)}
							<span class="iv-docs-token-swatch" style:background={token.dark} aria-hidden="true"
							></span>
						{/if}
						{name}
					</a>
				{:else}
					<code class="iv-docs-token">{name}</code>
				{/if}
			{/each}
		</div>
	</div>
{/if}
