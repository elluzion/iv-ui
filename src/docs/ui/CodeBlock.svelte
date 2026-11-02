<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	interface Props {
		code: string;
		html?: string;
		title?: string;
		lang?: string;
		open?: boolean;
	}

	let { code, html = '', title, lang = 'svelte', open = $bindable(false) }: Props = $props();

	const label = $derived(title ?? 'Source');
</script>

<details class="iv-docs-code" bind:open>
	<summary>
		<span>{label}<span class="iv-docs-code-lang"> · {lang}</span></span>
		<span class="iv-docs-code-actions">
			<CopyButton value={code} />
			<span class="iv-docs-toggle">
				<span class="iv-docs-show">Show</span>
				<span class="iv-docs-hide">Hide</span>
			</span>
		</span>
	</summary>
	<div class="iv-docs-code-body">
		{#if html}
			{@html html}
		{:else}
			<pre class="shiki"><code>{code}</code></pre>
		{/if}
	</div>
</details>
