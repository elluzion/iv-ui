<script lang="ts">
	import { Button, Popover } from '$lib';

	let open = $state(false);
</script>

<div class="stack">
	<div>
		<Button id="popover-click-trigger" variant="outline">Filters</Button>
	</div>
	<Popover bind:open anchor="#popover-click-trigger" placement="bottom" align="start">
		<div class="panel">
			<p class="title">Active filters</p>
			<p class="body">Branch: main · Status: failed · Author: any</p>
		</div>
	</Popover>
</div>

<style>
	.stack {
		display: flex;
		justify-content: center;
	}

	.panel {
		padding: var(--iv_spacing-md);
		max-width: 260px;
	}

	.title {
		margin: 0 0 var(--iv_spacing-xs);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground);
	}

	.body {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
