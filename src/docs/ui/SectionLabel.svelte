<script lang="ts">
	interface Props {
		label: string;
		number?: string;
	}

	let { label, number }: Props = $props();
</script>

<div class="iv-docs-section-label">
	{#if number}<b>{number}</b>{/if}
	{label}
</div>
