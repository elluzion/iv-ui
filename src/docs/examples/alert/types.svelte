<script lang="ts">
	import { Alert } from '$lib';
</script>

<div class="stack">
	<Alert type="info" title="Scheduled maintenance">
		The edge network is read-only on Sunday from 02:00 to 03:00 UTC.
	</Alert>
	<Alert type="success" title="Deploy complete">Version 0.2.0 is live in all three regions.</Alert>
	<Alert type="warning" title="Token expires soon">The deploy token expires in six days.</Alert>
	<Alert type="error" title="Build failed">
		The type check reported two errors in the docs package.
	</Alert>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		width: 100%;
	}
</style>
