<script lang="ts">
	import { Shortcut } from '$lib';
</script>

<div class="row">
	<Shortcut keys={['⌘', 'K']} />
	<Shortcut keys={['⌘', 'K']} size="md" />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-lg);
	}
</style>
