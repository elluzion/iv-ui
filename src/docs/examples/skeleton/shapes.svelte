<script lang="ts">
	import { Skeleton } from '$lib';
</script>

<div class="stack">
	<Skeleton shape="rect" height={72} />
	<Skeleton shape="line" />
	<Skeleton shape="line" width="70%" />
	<Skeleton shape="circle" />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
		max-width: 320px;
	}
</style>
