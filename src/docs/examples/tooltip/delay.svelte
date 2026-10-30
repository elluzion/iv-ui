<script lang="ts">
	import { Button, Tooltip } from '$lib';
</script>

<div class="row">
	<Tooltip label="Opens immediately" delay={0}>
		<Button variant="outline" size="sm">No delay</Button>
	</Tooltip>
	<Tooltip label="Opens after 700 ms" delay={700}>
		<Button variant="outline" size="sm">Long delay</Button>
	</Tooltip>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--iv_spacing-sm);
	}
</style>
