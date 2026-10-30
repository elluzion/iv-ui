<script lang="ts">
	import { LoadingSpinner } from '$lib';
</script>

<p class="status">
	<LoadingSpinner size={14} />
	Syncing the edge configuration…
</p>

<style>
	.status {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground-dim);
	}
</style>
