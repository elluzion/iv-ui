<script lang="ts">
	import { Shortcut } from '$lib';
</script>

<div class="stack">
	<p class="line">
		Command palette <Shortcut keys={['⌘', 'K']} label="Command K" />
	</p>
	<p class="line">
		Search files <Shortcut keys={['Ctrl', 'Shift', 'P']} label="Control Shift P" />
	</p>
	<p class="line">
		Toggle sidebar <Shortcut keys={['⌘', 'B']} label="Command B" />
	</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
	}

	.line {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
		color: var(--iv_foreground-dim);
	}
</style>
