<script lang="ts">
	import { IconChevronRight } from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type BreadcrumbItem = {
		label: string;
		href?: string;
		icon?: Snippet;
	};

	interface Props extends HTMLAttributes<HTMLElement> {
		items: BreadcrumbItem[];
		separator?: Snippet;
		ariaLabel?: string;
		className?: string;
	}

	let {
		items,
		separator,
		ariaLabel = 'Breadcrumb',
		className = '',
		...restProps
	}: Props = $props();
</script>

<nav class="iv-breadcrumb {className}" aria-label={ariaLabel} {...restProps}>
	<ol>
		{#each items as item, i (i)}
			{#if i > 0}
				<li class="iv-breadcrumb-sep" aria-hidden="true">
					{#if separator}
						{@render separator()}
					{:else}
						<IconChevronRight size={12} />
					{/if}
				</li>
			{/if}
			<li class="iv-breadcrumb-item">
				{#if item.href}
					<a href={item.href}>
						{#if item.icon}
							{@render item.icon()}
						{/if}
						{item.label}
					</a>
				{:else}
					<span aria-current="page">
						{#if item.icon}
							{@render item.icon()}
						{/if}
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.iv-breadcrumb {
		ol {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: var(--iv_spacing-xs);
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

	.iv-breadcrumb-item {
		display: inline-flex;
		align-items: center;

		a,
		span {
			display: inline-flex;
			align-items: center;
			gap: var(--iv_spacing-xs);
			font-family: var(--iv_font-mono);
			font-size: var(--iv_text-sm);
			line-height: var(--iv_leading-base);
			text-decoration: none;
		}

		a {
			color: var(--iv_foreground-dim);
			border-radius: var(--iv_radius-sm);
			padding: 2px 6px;
			transition:
				color var(--iv_transition-base),
				background var(--iv_transition-base);

			&:hover {
				color: var(--iv_foreground);
				background: var(--iv_surface-overlay);
			}

			&:focus-visible {
				outline: none;
				background: var(--iv_surface-overlay);
				box-shadow: inset 0 0 0 var(--iv_ring-width) var(--iv_ring);
			}
		}

		span {
			color: var(--iv_foreground);
			font-weight: var(--iv_weight-medium);
		}
	}

	.iv-breadcrumb-sep {
		display: inline-flex;
		align-items: center;
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-mono);
	}
</style>
