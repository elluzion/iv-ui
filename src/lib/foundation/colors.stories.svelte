<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Foundation/Colors',
		tags: ['autodocs']
	});
</script>

<Story name="Surfaces">
	<div class="section">
		<h3>Surface stack — black canvas up through four raised layers</h3>
		<div class="foundation-grid">
			{#each ['--iv_surface', '--iv_surface-raised', '--iv_surface-elevated', '--iv_surface-hover', '--iv_surface-overlay'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Borders & Rings">
	<div class="section">
		<h3>Hairlines — structure from 1px seams, never shadow</h3>
		<div class="foundation-grid">
			{#each ['--iv_border', '--iv_border-hover', '--iv_border-focus', '--iv_border-error', '--iv_ring'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Foregrounds">
	<div class="section">
		<h3>Text — dim carries meta, hover carries the brightened control</h3>
		<div class="foundation-grid">
			{#each ['--iv_foreground', '--iv_foreground-dim', '--iv_foreground-hover', '--iv_foreground-inverse'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Accent & Semantic">
	<div class="section">
		<h3>One brass signal plus three semantic tones — small marks only</h3>
		<div class="foundation-grid">
			{#each ['--iv_accent', '--iv_accent-dim', '--iv_accent-surface', '--iv_success', '--iv_error', '--iv_info'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Reverse Video">
	<div class="section">
		<h3>Terminal cursor surfaces — the block that marks selection</h3>
		<div class="foundation-grid">
			{#each ['--iv_reverse-bg', '--iv_reverse-fg', '--iv_reverse-hover', '--iv_cursor', '--iv_caret', '--iv_bracket'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Semantic Pairs">
	<div class="section">
		<h3>Surface/foreground pairs — theme by overriding the primitives they reference</h3>
		<div class="foundation-grid">
			{#each ['--iv_background', '--iv_card', '--iv_popover', '--iv_muted', '--iv_primary', '--iv_secondary', '--iv_input'] as t (t)}
				<div class="swatch">
					<div class="swatch-chip" style="background: var({t})"></div>
					<div class="swatch-meta">
						<p class="swatch-name">{t.replace('--iv_', '')}</p>
						<p class="swatch-token">{t}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Story>

<style>
	.foundation-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: var(--iv_spacing-lg);
	}

	.swatch {
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-sm);
		overflow: hidden;
		background: var(--iv_surface-raised);
	}

	.swatch-chip {
		height: 64px;
		border-bottom: 1px solid var(--iv_border);
	}

	.swatch-meta {
		padding: var(--iv_spacing-sm) var(--iv_spacing-md);
	}

	.swatch-name {
		margin: 0;
		font-size: var(--iv_text-label);
		font-weight: 600;
		color: var(--iv_foreground);
	}

	.swatch-token {
		margin: var(--iv_spacing-2xs) 0 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
	}

	.section {
		margin: 0 0 var(--iv_spacing-2xl);
	}

	.section h3 {
		margin: 0 0 var(--iv_spacing-md);
		font-size: var(--iv_text-base);
		font-weight: 600;
		color: var(--iv_foreground);
	}
</style>
