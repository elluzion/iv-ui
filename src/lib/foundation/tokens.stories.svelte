<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Foundation/Tokens',
		tags: ['autodocs']
	});
</script>

<Story name="Radius">
	<div class="section">
		<h3>Derived scale — set --iv_radius and the rest follow via calc()</h3>
		{#each [['sm', 'var(--iv_radius-sm)', 'calc(radius − 4px)'], ['md', 'var(--iv_radius)', 'base, 14px'], ['lg', 'var(--iv_radius-lg)', 'calc(radius + 6px)'], ['pill', 'var(--iv_radius-pill)', '999px']] as [name, token, note] ([name, token, note])}
			<div class="row">
				<div class="radius-demo" style="border-radius: {token}"></div>
				<div class="meta">
					{name} — <code>{token}</code>
					<span> · {note}</span>
				</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Spacing">
	<div class="section">
		<h3>4px rhythm — xs 4 · sm 8 · md 12 · lg 16 · xl 20 · 2xl 24</h3>
		{#each ['--iv_spacing-2xs', '--iv_spacing-xs', '--iv_spacing-sm', '--iv_spacing-md', '--iv_spacing-lg', '--iv_spacing-xl', '--iv_spacing-2xl'] as t (t)}
			<div class="row">
				<div class="step" style="width: var({t})"></div>
				<div class="meta">
					<code>{t}</code>
					<span> — {t.replace('--iv_spacing-', '')}</span>
				</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Shadows">
	<div class="section">
		<h3>Overlays only — flat surfaces never lift</h3>
		<div class="row" style="gap: var(--iv_spacing-xl)">
			{#each ['--iv_shadow-sm', '--iv_shadow-md', '--iv_shadow-lg'] as t (t)}
				<div class="shadow-demo" style="box-shadow: var({t})"></div>
			{/each}
		</div>
		<div class="meta" style="margin-top: var(--iv_spacing-sm)">
			Ambient-low · Ambient-md (toasts, tooltips, popovers) · Ambient-lg (dialogs, sheets)
		</div>
	</div>
</Story>

<Story name="Motion">
	<div class="section">
		<h3>Durations — per-context tokens, all zeroed under prefers-reduced-motion</h3>
		{#each [['--iv_transition-fast', '0.12s', 'color, background, chevron rotation'], ['--iv_transition-base', '0.15s', 'borders, shadows, rings'], ['--iv_transition-slow', '0.2s', 'large surfaces'], ['--iv_motion-fade', '0.15s', 'dialog/sheet/toast backdrops'], ['--iv_motion-scale', '0.15s', 'dialog/confirm scale-in'], ['--iv_motion-fly', '0.16s', 'toast rise, popover offset'], ['--iv_motion-slide', '0.18s', 'accordion expand, sheet slide']] as [token, value, use] ([token, value, use])}
			<div class="row">
				<div class="meta">
					<code>{token}</code>
					<span> — {value} · {use}</span>
				</div>
			</div>
		{/each}
	</div>
</Story>

<style>
	.section {
		margin: 0 0 var(--iv_spacing-2xl);
	}

	.section h3 {
		margin: 0 0 var(--iv_spacing-md);
		font-size: var(--iv_text-base);
		font-weight: 600;
		color: var(--iv_foreground);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
		margin: var(--iv_spacing-sm) 0;
	}

	.radius-demo {
		width: 48px;
		height: 48px;
		background: var(--iv_surface-elevated);
		border: 1px solid var(--iv_border);
	}

	.step {
		height: 24px;
		background: var(--iv_surface-elevated);
		border: 1px solid var(--iv_border);
	}

	.shadow-demo {
		width: 96px;
		height: 48px;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
	}

	.meta {
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.meta code {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
	}
</style>
