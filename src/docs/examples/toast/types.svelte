<script lang="ts">
	import { Button, showToast, Toast } from '$lib';
</script>

<div class="row">
	<Button variant="outline" onclick={() => showToast('Build queued for main.', 'info')}>
		Info
	</Button>
	<Button variant="outline" onclick={() => showToast('Deployed to production.', 'success')}>
		Success
	</Button>
	<Button variant="outline" onclick={() => showToast('Deploy failed: exit code 1.', 'error')}>
		Error
	</Button>
	<Toast />
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
