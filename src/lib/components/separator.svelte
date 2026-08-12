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
		--sep-space: 1rem;
		box-sizing: border-box;

		&.iv-spacing-sm {
			--sep-space: 0.5rem;
		}

		&.iv-spacing-lg {
			--sep-space: 1.5rem;
		}

		&.iv-horizontal {
			width: 100%;
			height: 1px;
			background: var(--iv_border);
			margin-block: var(--sep-space);
		}

		&.iv-vertical {
			width: 1px;
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
				height: 1px;
				background: var(--iv_border);
			}

			.iv-label-text {
				padding-inline: 0.75rem;
				font-family: var(--iv_font-sans);
				font-size: var(--iv_text-sm);
				font-weight: 500;
				color: var(--iv_foreground-dim);
				white-space: nowrap;
			}
		}
	}
</style>
