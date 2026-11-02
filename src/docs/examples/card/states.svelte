<script lang="ts">
	import { Card } from '$lib';
</script>

<div class="grid">
	<Card title="Selected" description="Chosen in the current step." selected>
		<p class="body">Reverse-video border and cursor marker.</p>
	</Card>
	<Card title="Hoverable" description="Hover is visual only." hoverable>
		<p class="body">No button role, no tab stop.</p>
	</Card>
	<Card title="Disabled" description="Interaction is blocked." disabled onclick={() => {}}>
		<p class="body">Still readable.</p>
	</Card>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--iv_spacing-md);
		width: 100%;
	}

	.body {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
