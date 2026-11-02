<script lang="ts">
	import { tokens } from '../lib/data';

	const motion = tokens.filter((token) => token.group === 'Motion');
	const durations = motion.filter((token) => /^--iv_(transition|motion)-/.test(token.name));
	const easings = motion.filter((token) => token.name.startsWith('--iv_ease-'));
	const spinners = motion.filter((token) => token.name.startsWith('--iv_spin'));

	function swatchTransition(token: { name: string }): string {
		if (token.name.startsWith('--iv_ease-')) {
			return `transform 0.8s var(${token.name})`;
		}
		return `transform var(${token.name}) var(--iv_ease-out)`;
	}

	function spinnerStyle(token: { name: string }): string {
		const parts = [
			'border-width: var(--iv_spinner-border)',
			'animation-duration: var(--iv_spin-duration)',
			'animation-timing-function: var(--iv_spin-easing)'
		];
		if (token.name === '--iv_spinner-border') {
			parts[0] = `border-width: var(${token.name})`;
		} else if (token.name === '--iv_spin-duration') {
			parts[1] = `animation-duration: var(${token.name})`;
		} else if (token.name === '--iv_spin-easing') {
			parts[2] = `animation-timing-function: var(${token.name})`;
		}
		return parts.join('; ');
	}
</script>

<div class="iv-docs-motion-group">
	<h3 class="iv-docs-motion-title">Duration</h3>
	<div class="iv-docs-motion-list">
		{#each durations as token (token.name)}
			<div class="iv-docs-motion-row">
				<div class="iv-docs-motion-swatch" aria-hidden="true">
					<i style:transition={swatchTransition(token)}></i>
				</div>
				<b>{token.name}</b>
				<code>{token.dark}</code>
			</div>
		{/each}
	</div>
</div>

<div class="iv-docs-motion-group">
	<h3 class="iv-docs-motion-title">Easing</h3>
	<div class="iv-docs-motion-list">
		{#each easings as token (token.name)}
			<div class="iv-docs-motion-row">
				<div class="iv-docs-motion-swatch" aria-hidden="true">
					<i style:transition={swatchTransition(token)}></i>
				</div>
				<b>{token.name}</b>
				<code>{token.dark}</code>
			</div>
		{/each}
	</div>
</div>

<div class="iv-docs-motion-group">
	<h3 class="iv-docs-motion-title">Spinner</h3>
	<div class="iv-docs-motion-list">
		{#each spinners as token (token.name)}
			<div class="iv-docs-motion-row">
				<div class="iv-docs-motion-spinner" aria-hidden="true">
					<i style={spinnerStyle(token)}></i>
				</div>
				<b>{token.name}</b>
				<code>{token.dark}</code>
			</div>
		{/each}
	</div>
</div>
