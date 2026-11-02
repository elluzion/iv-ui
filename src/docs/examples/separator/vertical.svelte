<script lang="ts">
	import { Separator } from '$lib';
</script>

<div class="row">
	<div class="cell"><span class="label">Build</span><span class="value">42s</span></div>
	<Separator orientation="vertical" />
	<div class="cell"><span class="label">Tests</span><span class="value">118</span></div>
	<Separator orientation="vertical" />
	<div class="cell"><span class="label">Size</span><span class="value">84 kB</span></div>
</div>

<style>
	.row {
		display: flex;
		align-items: stretch;
		padding: var(--iv_spacing-md) 0;
		width: 100%;
		max-width: 420px;
	}

	.cell {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-2xs);
		flex: 1;
	}

	.label {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
		text-transform: uppercase;
		letter-spacing: var(--iv_tracking-wide);
	}

	.value {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-lg);
		color: var(--iv_foreground);
	}
</style>
