<script lang="ts">
	import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-svelte';
	import { Toggle } from '$lib';

	let bold = $state(true);
	let italic = $state(false);
	let underline = $state(false);
</script>

<div class="row">
	<Toggle bind:checked={bold} label="Bold"><IconBold size={14} /></Toggle>
	<Toggle bind:checked={italic} label="Italic"><IconItalic size={14} /></Toggle>
	<Toggle bind:checked={underline} label="Underline"><IconUnderline size={14} /></Toggle>
</div>

<style>
	.row {
		display: flex;
		gap: var(--iv_spacing-sm);
	}
</style>
