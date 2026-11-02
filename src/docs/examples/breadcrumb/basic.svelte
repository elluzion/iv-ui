<script lang="ts">
	import { Breadcrumb } from '$lib';

	const items = [
		{ label: 'Projects', href: '#' },
		{ label: 'Orbital', href: '#' },
		{ label: 'Deployments' }
	];
</script>

<Breadcrumb {items} />
