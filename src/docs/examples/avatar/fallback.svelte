<script lang="ts">
	import { Avatar } from '$lib';
</script>

<div class="row">
	<Avatar fallback="AL" alt="Ada Lovelace" />
	<Avatar src="data:image/png;base64,invalid" fallback="GH" alt="Grace Hopper" />
	<Avatar src="data:image/png;base64,invalid" fallback="AT" alt="Alan Turing" />
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
	}
</style>
