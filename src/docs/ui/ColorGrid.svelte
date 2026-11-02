<script lang="ts">
	import { tokens } from '../lib/data';

	const isColor = (value: string) => /^#|^rgba?\(|^hsl/.test(value);
	const colorTokens = tokens.filter(
		(token) => token.group === 'Color' && (isColor(token.dark) || isColor(token.light))
	);
</script>

<div class="iv-docs-color-grid">
	{#each colorTokens as token (token.name)}
		<article class="iv-docs-color-card">
			<div class="iv-docs-color-card-head">
				<span>{token.name}</span>
			</div>
			<div class="iv-docs-color-swatch" style:background={token.dark}></div>
			<div class="iv-docs-color-swatch" data-half="light" style:background={token.light}></div>
			<div class="iv-docs-color-values">
				<span>dark {token.dark}</span>
				<span>light {token.light}</span>
			</div>
		</article>
	{/each}
</div>
