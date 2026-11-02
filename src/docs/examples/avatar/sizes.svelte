<script lang="ts">
	import { Avatar } from '$lib';
</script>

<div class="row">
	<Avatar size="xs" fallback="AL" alt="Ada Lovelace" />
	<Avatar size="sm" fallback="GH" alt="Grace Hopper" />
	<Avatar fallback="AT" alt="Alan Turing" />
	<Avatar size="lg" fallback="KJ" alt="Katherine Johnson" />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
	}
</style>
