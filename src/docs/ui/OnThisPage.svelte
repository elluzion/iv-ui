<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		items: { id: string; label: string }[];
		label?: string;
	}

	let { items, label = 'On this page' }: Props = $props();

	let active = $state('');

	onMount(() => {
		active = items[0]?.id ?? '';
		const headings = items
			.map((item) => document.getElementById(item.id))
			.filter((element): element is HTMLElement => element !== null);

		if (!headings.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) active = visible[0].target.id;
			},
			{ rootMargin: '-72px 0px -68% 0px', threshold: 0 }
		);

		for (const heading of headings) observer.observe(heading);
		return () => observer.disconnect();
	});
</script>

<div class="iv-docs-rail-section">
	<div class="iv-docs-rail-label">{label}</div>
	<nav aria-label={label}>
		{#each items as item (item.id)}
			<a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
				{item.label}
			</a>
		{/each}
	</nav>
</div>
