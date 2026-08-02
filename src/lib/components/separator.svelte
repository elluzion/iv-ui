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
		class="separator horizontal labeled {className}"
		class:spacing-sm={spacing === 'sm'}
		class:spacing-lg={spacing === 'lg'}
		role="separator"
		aria-orientation="horizontal"
		{...restProps}
	>
		<span class="line" aria-hidden="true"></span>
		<span class="label-text">{label}</span>
		<span class="line" aria-hidden="true"></span>
	</div>
{:else}
	<div
		class="separator {orientation} {className}"
		class:spacing-sm={spacing === 'sm'}
		class:spacing-lg={spacing === 'lg'}
		role="separator"
		aria-orientation={orientation}
		{...restProps}
	></div>
{/if}

<style>
	.separator {
		--sep-space: 1rem;
		box-sizing: border-box;

		&.spacing-sm {
			--sep-space: 0.5rem;
		}

		&.spacing-lg {
			--sep-space: 1.5rem;
		}

		&.horizontal {
			width: 100%;
			height: 1px;
			background: var(--iv_border);
			margin-block: var(--sep-space);
		}

		&.vertical {
			width: 1px;
			height: 100%;
			background: var(--iv_border);
			flex-shrink: 0;
			align-self: stretch;
			margin-inline: var(--sep-space);
		}

		&.labeled {
			display: flex;
			align-items: center;
			height: auto;
			background: none;

			.line {
				flex: 1;
				height: 1px;
				background: var(--iv_border);
			}

			.label-text {
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
