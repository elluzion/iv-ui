<script lang="ts">
	interface Props {
		value: string;
		label?: string;
		className?: string;
	}

	let { value, label = 'Copy', className = '' }: Props = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1400);
		} catch {
			copied = false;
		}
	}
</script>

<button
	type="button"
	class="iv-docs-tool {className}"
	data-copied={copied}
	onclick={copy}
	aria-label={copied ? 'Copied' : `${label} to clipboard`}
>
	{copied ? 'Copied' : label}
</button>
