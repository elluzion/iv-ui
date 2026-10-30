<script lang="ts">
	import { Field } from '$lib';

	let color = $state('#b08d57');
</script>

<div class="field-row">
	<Field label="Cursor accent" htmlFor="field-color" helper="Used for carets and active markers.">
		<input id="field-color" class="native color" type="color" bind:value={color} />
	</Field>
	<code class="readout">{color}</code>
</div>

<style>
	.field-row {
		display: flex;
		align-items: end;
		gap: var(--iv_spacing-lg);
		width: 100%;
		max-width: 360px;
	}

	.native {
		width: 100%;
		box-sizing: border-box;
		padding: var(--iv_control-pad-y) var(--iv_control-pad-x);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground);
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-body);
	}

	.color {
		height: var(--iv_control-md);
		padding: var(--iv_spacing-2xs);
	}

	.readout {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
