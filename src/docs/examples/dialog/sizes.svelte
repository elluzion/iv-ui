<script lang="ts">
	import { Button, Dialog } from '$lib';

	let open = $state(false);
	let size = $state<'sm' | 'md' | 'lg'>('md');
</script>

<div class="stack">
	<div class="row">
		<Button size="sm" variant="outline" onclick={() => ((size = 'sm'), (open = true))}>Small</Button
		>
		<Button size="sm" variant="outline" onclick={() => ((size = 'md'), (open = true))}
			>Medium</Button
		>
		<Button size="sm" variant="outline" onclick={() => ((size = 'lg'), (open = true))}>Large</Button
		>
	</div>
	<Dialog {open} title="Dialog size" {size} onclose={() => (open = false)}>
		<p class="body">The width is capped at the chosen step; content wraps inside it.</p>
	</Dialog>
</div>

<style>
	.stack {
		display: flex;
		justify-content: center;
	}

	.row {
		display: flex;
		gap: var(--iv_spacing-sm);
	}

	.body {
		margin: 0;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
	}
</style>
