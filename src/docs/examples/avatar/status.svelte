<script lang="ts">
	import { Avatar } from '$lib';
</script>

<div class="row">
	<Avatar fallback="AL" alt="Ada Lovelace" status="success" />
	<Avatar fallback="GH" alt="Grace Hopper" status="error" />
	<Avatar fallback="AT" alt="Alan Turing" status="info" />
	<Avatar fallback="KJ" alt="Katherine Johnson" status="accent" />
	<Avatar fallback="MH" alt="Margaret Hamilton" status="neutral" />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
	}
</style>
