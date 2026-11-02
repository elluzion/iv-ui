<script lang="ts">
	import { Separator } from '$lib';
</script>

<div class="stack">
	<p>Read access is inherited from the organization.</p>
	<Separator label="Write access" />
	<p>Members listed below can deploy and roll back.</p>
</div>

<style>
	.stack {
		width: 100%;

		p {
			margin: 0;
			font-family: var(--iv_font-ui);
			font-size: var(--iv_text-body);
			color: var(--iv_foreground-dim);
		}
	}
</style>
