<script lang="ts">
	import { Input } from '$lib';
</script>

<div class="fields">
	<Input size="sm" label="Small" placeholder="sm" />
	<Input size="md" label="Medium" placeholder="md" />
	<Input size="lg" label="Large" placeholder="lg" />
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
