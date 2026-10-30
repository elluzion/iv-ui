<script lang="ts">
	import { Input, InputGroup } from '$lib';
</script>

<div class="stack">
	<InputGroup size="sm">
		{#snippet prefix()}<span>sm</span>{/snippet}
		<Input size="sm" placeholder="Small" aria-label="Small size" />
	</InputGroup>
	<InputGroup>
		{#snippet prefix()}<span>md</span>{/snippet}
		<Input placeholder="Medium" aria-label="Medium size" />
	</InputGroup>
	<InputGroup size="lg">
		{#snippet prefix()}<span>lg</span>{/snippet}
		<Input size="lg" placeholder="Large" aria-label="Large size" />
	</InputGroup>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
		max-width: 340px;
	}
</style>
