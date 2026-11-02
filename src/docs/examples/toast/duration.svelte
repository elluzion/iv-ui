<script lang="ts">
	import { Button, showToast } from '$lib';
</script>

<div class="row">
	<Button variant="outline" onclick={() => showToast('Quick confirmation', 'success', 2000)}>
		2 seconds
	</Button>
	<Button variant="outline" onclick={() => showToast('Longer confirmation', 'info', 10000)}>
		10 seconds
	</Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
