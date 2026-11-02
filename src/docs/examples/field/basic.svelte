<script lang="ts">
	import { Field } from '$lib';
</script>

<div class="field-row">
	<Field label="Project name" htmlFor="field-basic" helper="Shown in the project switcher.">
		<input id="field-basic" class="native" placeholder="Orbital" />
	</Field>
</div>

<style>
	.field-row {
		width: 100%;
		max-width: 320px;
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

	.native:focus-visible {
		outline: var(--iv_outline-width) solid var(--iv_foreground);
		outline-offset: 1px;
	}
</style>
