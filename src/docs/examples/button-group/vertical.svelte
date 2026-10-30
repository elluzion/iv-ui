<script lang="ts">
	import { ButtonGroup } from '$lib';

	let action = $state('deploy');
</script>

<ButtonGroup
	label="Run"
	mode="single"
	orientation="vertical"
	variant="outline"
	items={['deploy', 'rollback', 'restart']}
	bind:value={action}
/>
