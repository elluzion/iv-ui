<script lang="ts">
	let { size = 24, color = 'var(--brass)' } = $props<{
		size?: number;
		color?: string;
	}>();
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
		animation: spin 0.75s cubic-bezier(0.3, 0.7, 0.7, 0.3) infinite;
		flex-shrink: 0;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
