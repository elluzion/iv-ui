<script lang="ts">
	import { IconAt, IconSearch } from '@tabler/icons-svelte';
	import { Input } from '$lib';

	let query = $state('deployments');
	let email = $state('ada@atlas.dev');
</script>

<div class="fields">
	<Input label="Search" placeholder="Search projects…" bind:value={query}>
		{#snippet leadingIcon()}
			<IconSearch size={16} />
		{/snippet}
	</Input>
	<Input
		type="email"
		label="Email"
		bind:value={email}
		clearable
		helper="Clearable shows a reset button while filled."
	>
		{#snippet leadingIcon()}
			<IconAt size={16} />
		{/snippet}
	</Input>
</div>

<style>
	.fields {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		width: 100%;
		max-width: 320px;
	}
</style>
