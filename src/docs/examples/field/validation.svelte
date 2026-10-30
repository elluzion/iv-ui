<script lang="ts">
	import { Field } from '$lib';

	let slug = $state('');
	const error = $derived(slug.length === 0 ? 'A slug is required.' : '');
</script>

<div class="field-row">
	<Field
		label="Slug"
		htmlFor="field-validation"
		required
		{error}
		helper="Lowercase letters, numbers, and dashes."
	>
		<input id="field-validation" class="native" bind:value={slug} placeholder="orbital" />
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
