<script lang="ts">
	import {
		IconAlertCircle,
		IconAlertTriangle,
		IconCheck,
		IconInfoCircle,
		IconX
	} from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { reducedMotion } from '../stores/motion.js';

	interface Props {
		type?: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		dismissible?: boolean;
		ondismiss?: () => void;
		className?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		type = 'info',
		title = '',
		dismissible = false,
		ondismiss,
		className = '',
		children,
		...restProps
	}: Props = $props();

	const Icon = $derived(
		type === 'success'
			? IconCheck
			: type === 'warning'
				? IconAlertTriangle
				: type === 'error'
					? IconAlertCircle
					: IconInfoCircle
	);
</script>

<div
	class="iv-alert iv-alert-{type} {className}"
	role={type === 'error' ? 'alert' : 'status'}
	{...restProps}
	transition:fly={{ y: 8, duration: $reducedMotion ? 0 : 150 }}
>
	<span class="iv-alert-icon" aria-hidden="true"><Icon size={18} /></span>
	<div class="iv-alert-content">
		{#if title}
			<p class="iv-alert-title">{title}</p>
		{/if}
		{#if children}
			<div class="iv-alert-body">{@render children()}</div>
		{/if}
	</div>
	{#if dismissible}
		<button type="button" class="iv-alert-close" onclick={ondismiss} aria-label="Dismiss">
			<IconX size={16} />
		</button>
	{/if}
</div>

<style>
	.iv-alert {
		display: flex;
		align-items: flex-start;
		gap: var(--iv_spacing-sm);
		width: 100%;
		box-sizing: border-box;
		padding: var(--iv_spacing-md) var(--iv_spacing-lg);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-raised);

		&.iv-alert-info {
			background: var(--iv_info-surface);
			border-color: var(--iv_border);
			box-shadow: inset 3px 0 0 var(--iv_info);
		}

		&.iv-alert-success {
			background: var(--iv_success-surface);
			border-color: var(--iv_border);
			box-shadow: inset 3px 0 0 var(--iv_success);
		}

		&.iv-alert-warning {
			background: var(--iv_error-surface);
			border-color: var(--iv_border);
			box-shadow: inset 3px 0 0 var(--iv_error);
		}

		&.iv-alert-error {
			background: var(--iv_error-surface);
			border-color: var(--iv_border);
			box-shadow: inset 3px 0 0 var(--iv_error);
		}
	}

	.iv-alert-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);
		margin-top: 2px;

		.iv-alert.iv-alert-info & {
			color: var(--iv_info);
		}

		.iv-alert.iv-alert-success & {
			color: var(--iv_success);
		}

		.iv-alert.iv-alert-warning & {
			color: var(--iv_error);
		}

		.iv-alert.iv-alert-error & {
			color: var(--iv_error);
		}
	}

	.iv-alert-content {
		flex: 1;
		min-width: 0;
	}

	.iv-alert-title {
		margin: 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		font-weight: var(--iv_weight-semibold);
		color: var(--iv_foreground);
		line-height: var(--iv_leading-tight);
	}

	.iv-alert-body {
		margin-top: 2px;
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		line-height: var(--iv_leading-base);

		:global(p) {
			margin: 0;
		}
	}

	.iv-alert-close {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--iv_spacing-xl);
		height: var(--iv_spacing-xl);
		border-radius: var(--iv_radius-sm);
		color: var(--iv_foreground-dim);
		flex-shrink: 0;

		&:hover {
			color: var(--iv_foreground);
			background: var(--iv_surface-overlay);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}
</style>
