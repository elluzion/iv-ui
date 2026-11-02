<script lang="ts">
	import { Badge } from '$lib';
</script>

<div class="row">
	<Badge size="sm" variant="success">stable</Badge>
	<Badge variant="success">stable</Badge>
	<Badge size="sm" variant="accent">beta</Badge>
	<Badge variant="accent">beta</Badge>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}
</style>
