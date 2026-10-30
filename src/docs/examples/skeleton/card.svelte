<script lang="ts">
	import { Card, Skeleton } from '$lib';
</script>

<Card padding="lg">
	<div class="head">
		<Skeleton shape="circle" width={32} height={32} />
		<div class="meta">
			<Skeleton shape="line" width="45%" />
			<Skeleton shape="line" width="30%" />
		</div>
	</div>
	<Skeleton shape="line" />
	<Skeleton shape="line" width="85%" />
	<Skeleton shape="line" width="60%" />
</Card>

<style>
	.head {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
		margin-bottom: var(--iv_spacing-lg);
	}

	.meta {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--iv_spacing-xs);
	}
</style>
