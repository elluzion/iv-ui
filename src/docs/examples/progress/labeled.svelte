<script lang="ts">
	import { Progress } from '$lib';

	let completed = $state(68);
</script>

<div class="stack">
	<Progress value={completed} label="Migration" showValue />
	<div class="row">
		<button class="step" onclick={() => (completed = Math.max(0, completed - 10))}>−10</button>
		<button class="step" onclick={() => (completed = Math.min(100, completed + 10))}>+10</button>
	</div>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
		max-width: 380px;
	}

	.row {
		display: flex;
		gap: var(--iv_spacing-sm);
	}

	.step {
		padding: var(--iv_spacing-2xs) var(--iv_spacing-sm);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		cursor: pointer;
	}
</style>
