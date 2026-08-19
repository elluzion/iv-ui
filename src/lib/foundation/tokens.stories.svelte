<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Foundation/Tokens',
		tags: ['autodocs']
	});
</script>

<Story name="Radius">
	<div class="section">
		<h3>Sharp scale — controls at 0, containers 4px, large surfaces 8px</h3>
		{#each [['sm', 'var(--iv_radius-sm)', 'controls: buttons, inputs, chips, tabs'], ['md', 'var(--iv_radius)', 'containers: cards, menus, popovers, toasts'], ['lg', 'var(--iv_radius-lg)', 'large surfaces: dialogs, sheets'], ['pill', 'var(--iv_radius-pill)', 'semantic circles: avatars, radio, status']] as [name, token, note] (name)}
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

<Story name="Chrome">
	<div class="section">
		<h3>Instrument chrome — cursor, reverse-video, brackets, hazard</h3>
		<div class="row">
			<div class="cursor-demo" title="--iv_cursor: block cursor / caret" aria-hidden="true"></div>
			<div class="meta">
				<code>--iv_cursor</code><span> — brass block cursor & caret, hard left edge</span>
			</div>
		</div>
		<div class="row">
			<div class="reverse-demo" title="--iv_reverse-bg/-fg: terminal cursor selection">
				Reverse-video
			</div>
			<div class="meta">
				<code>--iv_reverse-bg</code><span> / </span><code>--iv_reverse-fg</code><span>
					— foreground fill, surface text</span
				>
			</div>
		</div>
		<div class="row">
			<div class="bracket-demo" title="--iv_bracket: box-drawing accent" aria-hidden="true">
				┌ ─ ┐
			</div>
			<div class="meta">
				<code>--iv_bracket</code><span> — frame corners and brackets</span>
			</div>
		</div>
		<div class="row">
			<div
				class="hazard-demo"
				title="--iv_hazard-stripe: disabled/destructive texture"
				aria-hidden="true"
			></div>
			<div class="meta">
				<code>--iv_hazard-stripe</code><span> — diagonal stripe for disabled zones</span>
			</div>
		</div>
	</div>
</Story>

<Story name="Motion">
	<div class="section">
		<h3>Durations — short cuts, block flips, all zeroed under reduced-motion</h3>
		{#each [['--iv_transition-fast', '0.10s', 'color, background, chevron rotation'], ['--iv_transition-base', '0.13s', 'borders, shadows, rings'], ['--iv_transition-slow', '0.18s', 'large surfaces'], ['--iv_motion-fade', '0.13s', 'dialog/sheet/toast backdrops'], ['--iv_motion-scale', '0.13s', 'dialog/confirm scale-in'], ['--iv_motion-fly', '0.14s', 'toast rise, popover offset'], ['--iv_motion-slide', '0.16s', 'accordion expand, sheet slide']] as [token, value, use] (token)}
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

	.cursor-demo {
		width: 12px;
		height: 20px;
		background: var(--iv_cursor);
	}

	.reverse-demo {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--iv_spacing-sm) var(--iv_spacing-lg);
		background: var(--iv_reverse-bg);
		color: var(--iv_reverse-fg);
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-body);
	}

	.bracket-demo {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-base);
		color: var(--iv_bracket);
		letter-spacing: var(--iv_tracking-wide);
	}

	.hazard-demo {
		width: 96px;
		height: 20px;
		background: var(--iv_hazard-stripe);
		border: 1px solid var(--iv_border);
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
