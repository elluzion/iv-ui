<script lang="ts">
	import { LoadingSpinner } from '$lib';
</script>

<div class="row">
	<LoadingSpinner size={14} />
	<LoadingSpinner />
	<LoadingSpinner size={36} />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-lg);
	}
</style>
