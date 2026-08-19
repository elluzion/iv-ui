<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		padding?: 'sm' | 'md' | 'lg' | 'none';
		radius?: 'md' | 'lg';
		hoverable?: boolean;
		selected?: boolean;
		disabled?: boolean;
		className?: string;
		onclick?: (e: MouseEvent) => void;
		'on:click'?: (e: MouseEvent) => void;
		children: Snippet;
		action?: Snippet;
		header?: Snippet;
		footer?: Snippet;
	}

	let {
		title = '',
		description = '',
		padding = 'md',
		radius = 'md',
		hoverable = false,
		selected = false,
		disabled = false,
		className = '',
		onclick,
		'on:click': onEventClick,
		children,
		action,
		header,
		footer,
		...restProps
	}: Props = $props();

	const clickable = $derived(!!onclick || !!onEventClick);

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		onclick?.(e);
		onEventClick?.(e);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!clickable || disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick(new MouseEvent('click'));
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (role=button + keyboard handler make clickable cards interactive) -->
<div
	class="iv-card {className}"
	class:iv-pad-sm={padding === 'sm'}
	class:iv-pad-md={padding === 'md'}
	class:iv-pad-lg={padding === 'lg'}
	class:iv-pad-none={padding === 'none'}
	class:iv-radius-lg={radius === 'lg'}
	class:iv-hoverable={hoverable}
	class:iv-selected={selected}
	class:iv-disabled={disabled}
	class:iv-clickable={clickable}
	role={clickable ? 'button' : undefined}
	tabindex={clickable ? (disabled ? -1 : 0) : undefined}
	aria-disabled={disabled || undefined}
	onclick={clickable ? handleClick : undefined}
	onkeydown={clickable ? handleKeydown : undefined}
	{...restProps}
>
	{#if header}
		<div class="iv-header">
			{@render header()}
		</div>
	{:else if title || action}
		<div class="iv-header">
			<div class="iv-header-text">
				{#if title}
					<h3 class="iv-title">{title}</h3>
				{/if}
				{#if description}
					<p class="iv-description">{description}</p>
				{/if}
			</div>
			{#if action}
				<div class="iv-action">
					{@render action()}
				</div>
			{/if}
		</div>
	{/if}

	<div class="iv-body">
		{@render children()}
	</div>

	{#if footer}
		<div class="iv-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.iv-card {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-width: 0;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		color: var(--iv_foreground);
		overflow: hidden;
		transition: border-color var(--iv_transition-base);

		--pad-x: var(--iv_card-pad-x);
		--pad-y: var(--iv_card-pad-y);

		&.iv-pad-sm {
			--pad-x: var(--iv_card-pad-x-sm);
			--pad-y: var(--iv_card-pad-y-sm);
		}

		&.iv-pad-lg {
			--pad-x: var(--iv_card-pad-x-lg);
			--pad-y: var(--iv_card-pad-y-lg);
		}

		&.iv-pad-none {
			--pad-x: 0;
			--pad-y: 0;
		}

		&.iv-radius-lg {
			border-radius: var(--iv_radius-lg);
		}

		&.iv-hoverable:hover:not(.iv-disabled):not(.iv-selected) {
			border-color: var(--iv_border-hover);
		}

		&.iv-selected {
			border-color: var(--iv_accent);
			box-shadow: inset 0 -3px 0 var(--iv_cursor);
			background: var(--iv_accent-surface);
		}

		&.iv-clickable {
			cursor: pointer;

			&:focus-visible {
				outline: none;
				border-color: var(--iv_border-focus);
				box-shadow: 0 0 0 var(--iv_ring-width) var(--iv_ring);
			}
		}

		&.iv-disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
			background-image: var(--iv_hazard-stripe);
		}

		.iv-header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: var(--iv_spacing-lg);
			padding: var(--pad-y) var(--pad-x);
			border-bottom: 1px solid var(--iv_border);

			.iv-header-text {
				display: flex;
				flex-direction: column;
				gap: var(--iv_spacing-xs);
				min-width: 0;
			}

			.iv-title {
				margin: 0;
				font-family: var(--iv_font-sans);
				font-size: var(--iv_text-base);
				font-weight: 600;
				color: var(--iv_foreground);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.iv-description {
				margin: 0;
				font-family: var(--iv_font-ui);
				font-size: var(--iv_text-label);
				color: var(--iv_foreground-dim);
			}

			.iv-action {
				display: flex;
				align-items: center;
				flex-shrink: 0;
			}
		}

		.iv-body {
			padding: var(--pad-y) var(--pad-x);
			flex: 1;
		}

		.iv-footer {
			display: flex;
			align-items: center;
			gap: var(--iv_spacing-sm);
			padding: var(--pad-y) var(--pad-x);
			border-top: 1px solid var(--iv_border);
		}
	}
</style>
