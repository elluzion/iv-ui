<script lang="ts">
	import { Card } from '$lib';

	let opened = $state(0);
</script>

<Card
	title="Open the runbook"
	description="Click anywhere on the card, or focus it and press Enter."
	hoverable
	onclick={() => opened++}
>
	<p class="body">Opened {opened} times.</p>
</Card>

<style>
	.body {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground-dim);
	}
</style>
