<script lang="ts">
	import { Breadcrumb } from '$lib';

	const items = [
		{ label: 'Projects', href: '#' },
		{ label: 'Orbital', href: '#' },
		{ label: 'Settings' }
	];
</script>

{#snippet separator()}<span class="sep">/</span>{/snippet}

<Breadcrumb {items} {separator} />

<style>
	.sep {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_bracket);
	}
</style>
