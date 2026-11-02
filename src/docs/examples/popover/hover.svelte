<script lang="ts">
	import { Button, Popover } from '$lib';
</script>

<div class="stack">
	<div>
		<Button id="popover-hover-trigger" variant="ghost">Hover or focus me</Button>
	</div>
	<Popover
		anchor="#popover-hover-trigger"
		placement="top"
		showOn={['hover', 'focus']}
		hideOn={['hover', 'blur']}
		interactive
	>
		<p class="body">The panel stays open while the pointer is inside it.</p>
	</Popover>
</div>

<style>
	.stack {
		display: flex;
		justify-content: center;
	}

	.body {
		margin: 0;
		padding: var(--iv_spacing-sm) var(--iv_spacing-md);
		max-width: 240px;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
