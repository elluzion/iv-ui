<script lang="ts">
	import { Button, Dialog } from '$lib';

	let open = $state(false);
</script>

<div class="stack">
	<Button onclick={() => (open = true)}>Rename project</Button>
	<Dialog {open} title="Rename project" onclose={() => (open = false)}>
		<p class="body">The new name appears in the switcher and in every deploy record.</p>
	</Dialog>
</div>

<style>
	.stack {
		display: flex;
		justify-content: center;
	}

	.body {
		margin: 0;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body);
	}
</style>
