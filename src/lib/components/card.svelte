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
	class="card {className}"
	class:pad-sm={padding === 'sm'}
	class:pad-md={padding === 'md'}
	class:pad-lg={padding === 'lg'}
	class:pad-none={padding === 'none'}
	class:radius-lg={radius === 'lg'}
	class:hoverable
	class:selected
	class:disabled
	class:clickable
	role={clickable ? 'button' : undefined}
	tabindex={clickable ? (disabled ? -1 : 0) : undefined}
	aria-disabled={disabled || undefined}
	onclick={clickable ? handleClick : undefined}
	onkeydown={clickable ? handleKeydown : undefined}
	{...restProps}
>
	{#if header}
		<div class="header">
			{@render header()}
		</div>
	{:else if title || action}
		<div class="header">
			<div class="header-text">
				{#if title}
					<h3 class="title">{title}</h3>
				{/if}
				{#if description}
					<p class="description">{description}</p>
				{/if}
			</div>
			{#if action}
				<div class="action">
					{@render action()}
				</div>
			{/if}
		</div>
	{/if}

	<div class="body">
		{@render children()}
	</div>

	{#if footer}
		<div class="footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.card {
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

		--pad-x: 1rem;
		--pad-y: 0.875rem;

		&.pad-sm {
			--pad-x: 0.75rem;
			--pad-y: 0.625rem;
		}

		&.pad-lg {
			--pad-x: 1.25rem;
			--pad-y: 1.25rem;
		}

		&.pad-none {
			--pad-x: 0;
			--pad-y: 0;
		}

		&.radius-lg {
			border-radius: var(--iv_radius-lg);
		}

		&.hoverable:hover:not(.disabled):not(.selected) {
			border-color: var(--iv_border-hover);
		}

		&.selected {
			border-color: var(--iv_accent);
		}

		&.clickable {
			cursor: pointer;
		}

		&.disabled {
			opacity: var(--iv_disabled-opacity);
			cursor: not-allowed;
		}

		.header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			padding: var(--pad-y) var(--pad-x);
			border-bottom: 1px solid var(--iv_border);

			.header-text {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				min-width: 0;
			}

			.title {
				margin: 0;
				font-size: var(--iv_text-base);
				font-weight: 600;
				color: var(--iv_foreground);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.description {
				margin: 0;
				font-size: var(--iv_text-label);
				color: var(--iv_foreground-dim);
			}

			.action {
				display: flex;
				align-items: center;
				flex-shrink: 0;
			}
		}

		.body {
			padding: var(--pad-y) var(--pad-x);
			flex: 1;
		}

		.footer {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: var(--pad-y) var(--pad-x);
			border-top: 1px solid var(--iv_border);
		}
	}
</style>
