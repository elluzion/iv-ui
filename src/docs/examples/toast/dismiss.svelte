<script lang="ts">
	import { Button, hideToast, showToast } from '$lib';
</script>

<div class="row">
	<Button variant="outline" onclick={() => showToast('Waiting for your response…', 'info', 30000)}>
		Show
	</Button>
	<Button variant="ghost" onclick={() => hideToast()}>Dismiss</Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
