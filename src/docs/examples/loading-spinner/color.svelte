<script lang="ts">
	import { LoadingSpinner } from '$lib';
</script>

<div class="row">
	<LoadingSpinner size={22} color="var(--iv_success)" />
	<LoadingSpinner size={22} color="var(--iv_error)" />
	<LoadingSpinner size={22} color="var(--iv_foreground-dim)" />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-lg);
	}
</style>
