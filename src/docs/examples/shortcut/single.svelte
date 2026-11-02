<script lang="ts">
	import { Shortcut } from '$lib';
</script>

<p class="line">Press <Shortcut keys="Esc" /> to close the palette.</p>

<style>
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
