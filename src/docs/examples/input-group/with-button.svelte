<script lang="ts">
	import { Button, Input, InputGroup } from '$lib';

	let query = $state('deploy logs');
	let submitted = $state('');

	function submit() {
		submitted = query;
	}
</script>

<div class="stack">
	<InputGroup>
		<Input bind:value={query} aria-label="Search" placeholder="Search the archive" />
		{#snippet suffix()}<Button size="sm" variant="ghost" onclick={submit}>Search</Button>{/snippet}
	</InputGroup>
	<p class="readout">last search: {submitted || '—'}</p>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
		width: 100%;
		max-width: 380px;
	}

	.readout {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}
</style>
