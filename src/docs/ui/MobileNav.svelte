<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import { ui } from '../lib/ui.svelte';
	import Sidebar from './Sidebar.svelte';

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (typeof window === 'undefined' || !dialog) return;
		if (ui.nav && !dialog.open) dialog.showModal();
		if (!ui.nav && dialog.open) dialog.close();
	});
</script>

<dialog
	class="iv-docs-nav-dialog"
	bind:this={dialog}
	onclose={() => (ui.nav = false)}
	aria-label="Documentation navigation"
>
	<div class="iv-docs-nav-head">
		<span class="iv-docs-brand">iv-ui<span class="iv-docs-cursor" aria-hidden="true"></span></span>
		<button
			type="button"
			class="iv-docs-iconbtn"
			aria-label="Close navigation"
			onclick={() => (ui.nav = false)}
		>
			<IconX size={18} aria-hidden="true" />
		</button>
	</div>
	<Sidebar />
</dialog>
