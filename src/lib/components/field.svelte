<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		htmlFor?: string;
		required?: boolean;
		error?: string;
		helper?: string;
		messageId?: string;
		className?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		label = '',
		htmlFor = '',
		required = false,
		error = '',
		helper = '',
		messageId = '',
		className = '',
		children,
		...restProps
	}: Props = $props();
</script>

{#snippet labelContent()}
	{label}
	{#if required}
		<span class="iv-required-mark" aria-hidden="true">*</span>
	{/if}
{/snippet}

<div class="iv-field {className}" class:iv-has-error={!!error} {...restProps}>
	{#if label}
		{#if htmlFor}
			<label class="iv-field-label" for={htmlFor}>
				{@render labelContent()}
			</label>
		{:else}
			<span class="iv-field-label">
				{@render labelContent()}
			</span>
		{/if}
	{/if}

	<div class="iv-field-control">{@render children()}</div>

	{#if error}
		<p
			class="iv-field-message iv-field-error"
			id={messageId || (htmlFor ? htmlFor + '-message' : undefined)}
		>
			{error}
		</p>
	{:else if helper}
		<p
			class="iv-field-message iv-field-helper"
			id={messageId || (htmlFor ? htmlFor + '-message' : undefined)}
		>
			{helper}
		</p>
	{/if}
</div>

<style>
	.iv-field {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
	}

	.iv-field-label {
		display: inline-flex;
		align-items: center;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-label);
		font-weight: var(--iv_weight-medium);
		color: var(--iv_foreground);
		margin-bottom: var(--iv_spacing-sm);
	}

	.iv-required-mark {
		color: var(--iv_error);
		margin-left: var(--iv_spacing-2xs);
	}

	.iv-field-control {
		min-width: 0;
	}

	.iv-field-message {
		margin: var(--iv_spacing-xs) 0 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-sm);
		line-height: var(--iv_leading-base);
	}

	.iv-field-error {
		color: var(--iv_error);
	}

	.iv-field-helper {
		color: var(--iv_foreground-dim);
	}
</style>
