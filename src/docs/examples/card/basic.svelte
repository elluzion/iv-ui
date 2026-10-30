<script lang="ts">
	import { Card } from '$lib';
</script>

<Card title="Edge cache" description="Hit rate across the last 24 hours.">
	<p class="body">98.4% of requests were served from the nearest edge.</p>
</Card>

<style>
	.body {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground-dim);
	}
</style>
