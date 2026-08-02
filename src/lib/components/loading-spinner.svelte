<script lang="ts">
	interface Props {
		size?: number;
		color?: string;
	}

	let { size = 24, color = 'var(--iv_accent)' }: Props = $props();
</script>

<span
	class="spinner"
	style:width="{size}px"
	style:height="{size}px"
	style:border-color="{color} transparent transparent transparent"
	role="status"
	aria-label="Loading"
></span>

<style>
	.spinner {
		display: inline-block;
		border-width: 2px;
		border-style: solid;
		border-radius: 50%;
		animation: spin var(--iv_spin-duration) var(--iv_spin-easing) infinite;
		flex-shrink: 0;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
