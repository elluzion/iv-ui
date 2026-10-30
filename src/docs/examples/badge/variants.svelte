<script lang="ts">
	import { Badge } from '$lib';
</script>

<div class="row">
	<Badge>neutral</Badge>
	<Badge variant="success">success</Badge>
	<Badge variant="error">error</Badge>
	<Badge variant="accent">accent</Badge>
	<Badge variant="info">info</Badge>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
