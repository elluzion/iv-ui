<script lang="ts">
	import type { Snippet } from 'svelte';

	export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
	export type AvatarStatus = 'neutral' | 'success' | 'error' | 'info' | 'accent';

	interface Props {
		src?: string;
		alt?: string;
		size?: AvatarSize;
		fallback?: string;
		status?: AvatarStatus;
		className?: string;
		children?: Snippet;
	}

	let {
		src = '',
		alt = '',
		size = 'md',
		fallback = '',
		status,
		className = '',
		children,
		...restProps
	}: Props = $props();

	let error = $state(false);
</script>

<span
	class="iv-avatar {className}"
	class:iv-xs={size === 'xs'}
	class:iv-sm={size === 'sm'}
	class:iv-lg={size === 'lg'}
	{...restProps}
>
	{#if src}
		<img
			class="iv-avatar-img"
			{src}
			{alt}
			hidden={error}
			onload={() => (error = false)}
			onerror={() => (error = true)}
		/>
	{/if}
	{#if !src || error}
		<span
			class="iv-avatar-fallback"
			role={alt || fallback ? 'img' : undefined}
			aria-label={alt || fallback || undefined}
		>
			{fallback}
		</span>
	{/if}
	{#if children}
		<span class="iv-avatar-overlay">{@render children()}</span>
	{/if}
	{#if status}
		<span
			class="iv-avatar-status"
			class:iv-neutral={status === 'neutral'}
			class:iv-success={status === 'success'}
			class:iv-error={status === 'error'}
			class:iv-info={status === 'info'}
			class:iv-accent={status === 'accent'}
		></span>
	{/if}
</span>

<style>
	.iv-avatar {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--iv_avatar-md);
		height: var(--iv_avatar-md);
		border-radius: var(--iv_radius-pill);
		border: 1px solid var(--iv_border);
		background: var(--iv_surface-elevated);
		flex-shrink: 0;

		&.iv-xs {
			width: var(--iv_avatar-xs);
			height: var(--iv_avatar-xs);

			.iv-avatar-fallback {
				font-size: var(--iv_text-xs);
			}
		}

		&.iv-sm {
			width: var(--iv_avatar-sm);
			height: var(--iv_avatar-sm);

			.iv-avatar-fallback {
				font-size: var(--iv_text-sm);
			}
		}

		&.iv-lg {
			width: var(--iv_avatar-lg);
			height: var(--iv_avatar-lg);

			.iv-avatar-fallback {
				font-size: var(--iv_text-base);
			}
		}
	}

	.iv-avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}

	.iv-avatar-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--iv_foreground-dim);
		font-size: var(--iv_text-body-sm);
		font-weight: var(--iv_weight-medium);
		line-height: var(--iv_leading-none);
		white-space: nowrap;
		user-select: none;
	}

	.iv-avatar-overlay {
		position: absolute;
		right: 0;
		bottom: 0;
		display: flex;
	}

	.iv-avatar-status {
		position: absolute;
		right: 0;
		bottom: 0;
		width: var(--iv_spacing-sm);
		height: var(--iv_spacing-sm);
		border-radius: var(--iv_radius-pill);
		border: 1.5px solid var(--iv_surface);
		background: var(--iv_foreground-dim);

		&.iv-success {
			background: var(--iv_success);
		}

		&.iv-error {
			background: var(--iv_error);
		}

		&.iv-info {
			background: var(--iv_info);
		}

		&.iv-accent {
			background: var(--iv_accent);
		}

		&.iv-neutral {
			background: var(--iv_foreground-dim);
		}
	}
</style>
