<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Foundation/Typography',
		tags: ['autodocs']
	});
</script>

<Story name="Roles">
	<div class="section">
		<h3>Two faces, one rule — Plex Mono carries the UI, Sora speaks prose and headings</h3>
		{#each [['Display', 'var(--iv_text-display)', '700', 'var(--iv_font-sans)'], ['Heading 1', 'var(--iv_text-h1)', '600', 'var(--iv_font-sans)'], ['Heading 2', 'var(--iv_text-h2)', '600', 'var(--iv_font-sans)'], ['Heading 3', 'var(--iv_text-h3)', '600', 'var(--iv_font-sans)'], ['Title', 'var(--iv_text-title)', '600', 'var(--iv_font-sans)'], ['Button / Tab', 'var(--iv_text-btn)', '600', 'var(--iv_font-ui)'], ['Label', 'var(--iv_text-label)', '500', 'var(--iv_font-ui)'], ['Body', 'var(--iv_text-body)', '400', 'var(--iv_font-ui)'], ['Small', 'var(--iv_text-sm)', '400', 'var(--iv_font-ui)'], ['Caption', 'var(--iv_text-caption)', '400', 'var(--iv_font-mono)']] as [name, token, weight, face] (name)}
			<div class="scale-row">
				<div class="sample" style="font-size: {token}; font-weight: {weight}; font-family: {face}">
					{name}
				</div>
				<div class="meta">{token} · {weight}</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Specimen">
	<div class="section">
		<h3>Specimen — the same mono voice at every step</h3>
		{#each [['var(--iv_text-xl)', '0x1F'], ['var(--iv_text-lg)', '0x1F'], ['var(--iv_text-base)', '0x1F'], ['var(--iv_text-label)', '0x1F'], ['var(--iv_text-xs)', '0x1F']] as [token, sample] (token)}
			<div class="scale-row">
				<div class="sample mono" style="font-size: {token}">{sample}</div>
				<div class="meta">{token}</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Weights & Leading">
	<div class="section">
		<h3>Weights — normal 400 · medium 500 · semibold 600 · bold 700</h3>
		<div class="weight-demo">
			{#each [['var(--iv_weight-normal)', 'Body text sits at normal weight'], ['var(--iv_weight-medium)', 'Labels and menu items carry medium'], ['var(--iv_weight-semibold)', 'Headings and strong text are semibold'], ['var(--iv_weight-bold)', 'Primary buttons and titles go bold']] as [token, sample] (token)}
				<div class="scale-row">
					<div class="sample" style="font-weight: {token}">{sample}</div>
					<div class="meta">{token}</div>
				</div>
			{/each}
		</div>
		<h3 style="margin-top: var(--iv_spacing-xl)">Line heights — tokenized</h3>
		{#each [['var(--iv_leading-tight)', '1.25 — controls and labels'], ['var(--iv_leading-heading)', '1.3 — headings'], ['var(--iv_leading-base)', '1.5 — form fields, accordions'], ['var(--iv_leading-prose)', '1.6 — reading text'], ['var(--iv_leading-loose)', '1.75 — roomy docs']] as [token, note] (token)}
			<div class="scale-row">
				<div class="sample" style="line-height: {token}">{note}</div>
				<div class="meta">{token}</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Typeset">
	<div class="section">
		<h3>iv-prose — Sora prose carries the reading voice inside containers</h3>
		<div class="typeset-demo iv-prose">
			<h1>Section heading</h1>
			<p>
				The typeset is driven by <code>--iv_typeset-size</code>,
				<code>--iv_typeset-leading</code> and <code>--iv_typeset-flow</code>. Set them on a preset
				class (<code>.iv-prose-docs</code>, <code>.iv-prose-chat</code>) to re-rhythm the whole
				document. Prose and headings read in Sora; <code>code</code> stays in Plex Mono.
			</p>
			<h2>Streaming-stable rhythm</h2>
			<p>
				Spacing flows downward with <code>margin-block-start</code>, so appended blocks never
				restyle earlier ones.
			</p>
			<ul>
				<li>Headings derive their size from the base in <code>em</code></li>
				<li>Lists, rules, and code keep the container rhythm</li>
				<li>Opt out a subtree with <code>iv-not-typeset</code></li>
			</ul>
			<blockquote>
				<p>Blockquotes sit on a raised surface with a hairline rule on the inline start.</p>
			</blockquote>
			<pre><code
					>const LEMONS = 40 + 2

for (const item of items)
	process(item)</code
				></pre>
			<p>
				Inline <code>code</code> is monospace with a hairline border, and
				<a href="https://example.com">links</a> are the one place brass appears in prose.
			</p>
		</div>
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

	.scale-row {
		display: flex;
		align-items: baseline;
		gap: var(--iv_spacing-lg);
		padding: var(--iv_spacing-sm) 0;
		border-bottom: 1px solid var(--iv_border);
	}

	.sample {
		flex: 1;
		min-width: 0;
		color: var(--iv_foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mono {
		color: var(--iv_accent);
		letter-spacing: var(--iv_tracking-wide);
	}

	.meta {
		width: 220px;
		flex-shrink: 0;
		text-align: right;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
	}

	.weight-demo {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-xs);
	}

	.typeset-demo {
		width: 100%;
		max-width: var(--iv_article-width);
		margin: 0 auto;
		padding: var(--iv_spacing-2xl);
		box-sizing: border-box;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
	}
</style>
