<script lang="ts">
	import { Progress } from '$lib';
</script>

<div class="stack">
	<Progress value={30} size="sm" label="Small" showValue />
	<Progress value={30} label="Medium" showValue />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		width: 100%;
		max-width: 380px;
	}
</style>
