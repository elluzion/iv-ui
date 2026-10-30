<script lang="ts">
	import { Button } from '$lib';

	let saving = $state(false);

	async function save() {
		saving = true;
		await new Promise((resolve) => setTimeout(resolve, 1200));
		saving = false;
	}
</script>

<div class="row">
	<Button variant="primary" loading={saving} onclick={save}>
		{saving ? 'Saving…' : 'Save changes'}
	</Button>
	<Button variant="outline" loading>Syncing</Button>
	<Button variant="secondary" disabled>Unavailable</Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
