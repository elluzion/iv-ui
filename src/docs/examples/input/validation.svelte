<script lang="ts">
	import { Input } from '$lib';

	let email = $state('');

	const error = $derived(
		email.length === 0 ? '' : email.includes('@') ? '' : 'Enter a valid email address.'
	);
</script>

<div class="fields">
	<Input
		type="email"
		label="Email"
		placeholder="you@example.com"
		bind:value={email}
		{error}
		helper="Used for deploy notifications."
		required
	/>
</div>

<style>
	.fields {
		width: 100%;
		max-width: 320px;
	}
</style>
