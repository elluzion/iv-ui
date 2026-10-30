<script lang="ts">
	import { Separator } from '$lib';
</script>

<div class="stack">
	<p>Build finished in 42 seconds.</p>
	<Separator />
	<p>Deploy started from the release branch.</p>
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
