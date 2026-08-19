<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		label?: string;
		spacing?: 'sm' | 'md' | 'lg';
		className?: string;
	}

	let {
		orientation = 'horizontal',
		label = '',
		spacing = 'md',
		className = '',
		...restProps
	}: Props = $props();
</script>

{#if orientation === 'horizontal' && label}
	<div
		class="iv-separator iv-horizontal iv-labeled {className}"
		class:iv-spacing-sm={spacing === 'sm'}
		class:iv-spacing-lg={spacing === 'lg'}
		role="separator"
		aria-orientation="horizontal"
		{...restProps}
	>
		<span class="iv-line" aria-hidden="true"></span>
		<span class="iv-label-text">{label}</span>
		<span class="iv-line" aria-hidden="true"></span>
	</div>
{:else}
	<div
		class="iv-separator iv-{orientation} {className}"
		class:iv-spacing-sm={spacing === 'sm'}
		class:iv-spacing-lg={spacing === 'lg'}
		role="separator"
		aria-orientation={orientation}
		{...restProps}
	></div>
{/if}

<style>
	.iv-separator {
		--sep-space: var(--iv_spacing-lg);
		box-sizing: border-box;

		&.iv-spacing-sm {
			--sep-space: var(--iv_spacing-sm);
		}

		&.iv-spacing-lg {
			--sep-space: var(--iv_spacing-2xl);
		}

		&.iv-horizontal {
			width: 100%;
			height: var(--iv_separator-size);
			background: var(--iv_border);
			margin-block: var(--sep-space);
		}

		&.iv-vertical {
			width: var(--iv_separator-size);
			height: 100%;
			background: var(--iv_border);
			flex-shrink: 0;
			align-self: stretch;
			margin-inline: var(--sep-space);
		}

		&.iv-labeled {
			display: flex;
			align-items: center;
			height: auto;
			background: none;

			.iv-line {
				flex: 1;
				height: var(--iv_separator-size);
				background: var(--iv_border);
			}

			.iv-label-text {
				padding-inline: var(--iv_spacing-md);
				font-family: var(--iv_font-mono);
				font-size: var(--iv_text-sm);
				font-weight: 500;
				color: var(--iv_foreground-dim);
				white-space: nowrap;
				letter-spacing: var(--iv_tracking-wide);
				text-transform: uppercase;
			}
		}
	}
</style>
