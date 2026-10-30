<script lang="ts">
	import { tokens } from '../lib/data';

	const scale = tokens
		.filter((token) => token.name.startsWith('--iv_text-'))
		.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

	const roles: Record<string, string> = {
		'--iv_text-display': 'Display numerals',
		'--iv_text-h1': 'Page title',
		'--iv_text-h2': 'Section title',
		'--iv_text-h3': 'Subsection title',
		'--iv_text-title': 'Card or dialog title',
		'--iv_text-lg': 'Large body',
		'--iv_text-base': 'Base',
		'--iv_text-body': 'Default interface',
		'--iv_text-body-sm': 'Secondary body',
		'--iv_text-label': 'Form labels',
		'--iv_text-sm': 'Helper text',
		'--iv_text-xs': 'Metadata',
		'--iv_text-caption': 'Captions',
		'--iv_text-chips': 'Chips',
		'--iv_text-chips-sm': 'Chips, small',
		'--iv_text-btn': 'Buttons',
		'--iv_text-btn-sm': 'Small buttons'
	};
</script>

<div class="iv-docs-type-list">
	{#each scale as token (token.name)}
		<div class="iv-docs-type-row">
			<span class="iv-docs-type-meta">
				<code>{token.name}</code>
				<em>{roles[token.name] ?? 'Interface text'}</em>
			</span>
			<strong style:font-size={`var(${token.name})`}>The quick brown fox</strong>
			<span>{token.dark}</span>
		</div>
	{/each}
</div>
