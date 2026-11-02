import type { GuideDoc } from '../types';

export const foundationDocs: GuideDoc[] = [
	{
		slug: 'tokens',
		title: 'Tokens',
		summary: 'Every design decision is a CSS custom property. This is the full generated list.',
		section: 'foundations',
		blocks: [
			{
				kind: 'p',
				text: 'Tokens are the only source of color, type, space, and motion. Components reference them; apps override them. Values below are read from `tokens.css` at build time.'
			},
			{ kind: 'tokens' },
			{
				kind: 'callout',
				tone: 'note',
				title: 'Naming',
				text: 'All tokens use the `--iv_` prefix. Color tokens come in pairs: a surface (`--iv_surface`, `--iv_accent-surface`) and a foreground (`--iv_foreground`, `--iv_accent`).'
			}
		],
		related: ['colors', 'typography', 'motion']
	},
	{
		slug: 'colors',
		title: 'Color',
		summary: 'A monochrome canvas with one brass accent and three status families.',
		section: 'foundations',
		blocks: [
			{
				kind: 'p',
				text: 'The canvas is pure black in dark mode and near-white in light. Brass marks the cursor, selection, and the single most important action. Status colors are muted — never neon.'
			},
			{ kind: 'colors' },
			{ kind: 'h2', text: 'Pairs' },
			{
				kind: 'p',
				text: 'Each surface has a matching foreground. Use the pair; do not mix a light surface with a dark-mode foreground.'
			},
			{
				kind: 'table',
				head: ['Surface', 'Foreground', 'Use'],
				rows: [
					['`--iv_surface`', '`--iv_foreground`', 'Page canvas and primary text.'],
					['`--iv_surface-raised`', '`--iv_foreground`', 'Cards, panels, code blocks.'],
					['`--iv_surface-elevated`', '`--iv_foreground`', 'Controls, menus, popovers.'],
					[
						'`--iv_accent`',
						'`--iv_foreground-inverse`',
						'Brass cursor blocks and selection marks.'
					],
					[
						'`--iv_error`',
						'`--iv_surface`',
						'Destructive actions and error text on raised surfaces.'
					],
					['`--iv_reverse-bg`', '`--iv_reverse-fg`', 'Reverse-video selection and active rows.']
				]
			},
			{ kind: 'h2', text: 'Rules' },
			{
				kind: 'list',
				items: [
					'Brass is an accent, not a fill. One brass mark per view is usually enough.',
					'Never use color alone to signal state — pair it with text or an icon.',
					'Hardcoded hex values in app code break light mode. Override tokens instead.',
					'Status colors are tuned for 4.5:1 on their intended surface.'
				]
			}
		],
		related: ['tokens', 'theming', 'accessibility']
	},
	{
		slug: 'typography',
		title: 'Typography',
		summary: 'IBM Plex Mono is the interface voice; Sora is reserved for headings and prose.',
		section: 'foundations',
		blocks: [
			{
				kind: 'p',
				text: 'The UI is mono-forward: labels, buttons, tables, and metadata are all Plex Mono. Sora appears only where a document needs a headline or a paragraph.'
			},
			{ kind: 'type-scale' },
			{ kind: 'h2', text: 'Roles' },
			{
				kind: 'table',
				head: ['Token', 'Size', 'Role'],
				rows: [
					['`--iv_text-xs`', '0.75rem', 'Metadata, badges, timestamps.'],
					['`--iv_text-sm`', '0.8rem', 'Helper text and dense labels.'],
					['`--iv_text-body`', '0.9rem', 'Default interface text.'],
					['`--iv_text-lg`', '1.05rem', 'Section titles.'],
					['`--iv_text-xl`', '1.1rem', 'Dialog titles.'],
					['`--iv_text-h1`', '1.5rem', 'Page titles.'],
					['`--iv_text-display`', '2rem', 'Reserved for large numerals.']
				]
			},
			{ kind: 'h2', text: 'Weights and tracking' },
			{
				kind: 'list',
				items: [
					'Three weights: 400 body, 500 medium labels, 600 headings. 700 is reserved for numerals.',
					'Tracking is tight (`-0.01em`) for headings, neutral for body, wide (`0.05em`) for uppercase micro-labels.',
					'Uppercase labels never exceed 0.75rem and always add tracking.'
				]
			},
			{ kind: 'h2', text: 'Prose' },
			{
				kind: 'p',
				text: 'Wrap rendered Markdown in `.iv-prose` (from `typeset.css`) to get container-aware type. Its three controls are `--iv_typeset-size`, `--iv_typeset-leading`, and `--iv_typeset-flow`.'
			},
			{
				kind: 'code',
				lang: 'html',
				code: '<article class="iv-prose">\n\t<!-- rendered markdown -->\n</article>'
			}
		],
		related: ['tokens', 'colors']
	},
	{
		slug: 'motion',
		title: 'Motion',
		summary: 'Short, decisive transitions — and an immediate stop when the user asks for less.',
		section: 'foundations',
		blocks: [
			{
				kind: 'p',
				text: 'Motion explains where a layer came from. It never decorates, never bounces, and never delays an action. Durations are 200–480ms with a quint or cubic ease-out. Hover a row below to compare the durations, each easing curve, and the spinner.'
			},
			{ kind: 'motion' },
			{ kind: 'h2', text: 'Token map' },
			{
				kind: 'table',
				head: ['Token', 'Value', 'Use'],
				rows: [
					['`--iv_transition-fast`', '0.2s', 'Hover, color, border.'],
					['`--iv_transition-base`', '0.32s', 'Focus, selection, state.'],
					['`--iv_transition-slow`', '0.48s', 'Larger surface changes.'],
					['`--iv_motion-fade`', '0.28s', 'Backdrops and tooltips.'],
					['`--iv_motion-scale`', '0.36s', 'Dialogs entering.'],
					['`--iv_motion-fly`', '0.34s', 'Sheets and popovers.']
				]
			},
			{ kind: 'h2', text: 'Reduced motion' },
			{
				kind: 'p',
				text: 'The `reducedMotion` store reads the OS preference and flips live. Component transitions use it; the token values also collapse to `0.01ms` under `prefers-reduced-motion: reduce`.'
			},
			{
				kind: 'code',
				lang: 'svelte',
				code: '<script lang="ts">\n\timport { reducedMotion } from \'@elluzion/iv-ui\';\n</script>\n\n<div transition:fade={{ duration: $reducedMotion ? 0 : 200 }}>…</div>'
			}
		],
		related: ['tokens', 'typography']
	}
];
