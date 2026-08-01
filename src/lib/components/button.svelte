<script lang="ts">
	import type { Snippet } from 'svelte';
	import LoadingSpinner from './loading-spinner.svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		className?: string;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (e: MouseEvent) => void;
		'on:click'?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		disabled = false,
		loading = false,
		className = '',
		type = 'button',
		onclick,
		'on:click': onEventClick,
		children
	}: Props = $props();

	function handleClick(e: MouseEvent) {
		if (loading || disabled) return;
		onclick?.(e);
		onEventClick?.(e);
	}
</script>

<button
	class="btn {className}"
	class:primary={variant === 'primary'}
	class:outline={variant === 'outline'}
	class:ghost={variant === 'ghost'}
	class:icon={variant === 'icon'}
	class:danger={variant === 'danger'}
	class:btn-sm={size === 'sm'}
	class:btn-lg={size === 'lg'}
	class:loading
	{disabled}
	{type}
	onclick={handleClick}
	aria-busy={loading}
>
	{#if loading}
		<LoadingSpinner size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} color="currentColor" />
	{/if}
	{@render children()}
</button>

<style>
	.btn-sm {
		padding: 5px 13px;
		font-size: 0.825rem;
		gap: 0.375rem;
	}

	.btn-lg {
		padding: 12px 24px;
		font-size: 1.05rem;
		gap: 0.625rem;
	}

	.loading {
		cursor: wait;
	}
</style>
