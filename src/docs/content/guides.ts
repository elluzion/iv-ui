import type { GuideDoc } from '../types';

export const guideDocs: GuideDoc[] = [
	{
		slug: 'installation',
		title: 'Installation',
		summary: 'Configure GitHub Packages, install the package, and import the theme once.',
		section: 'guides',
		blocks: [
			{ kind: 'h2', text: 'Registry' },
			{
				kind: 'p',
				text: 'iv-ui is published to GitHub Packages. Add the scoped registry to `.npmrc` and authenticate with a token that has `read:packages`.'
			},
			{
				kind: 'code',
				lang: 'ini',
				title: '.npmrc',
				code: '@elluzion:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}'
			},
			{
				kind: 'callout',
				tone: 'note',
				title: 'CI',
				text: 'Export `GITHUB_TOKEN` in CI. Locally, `gh auth token` works if the GitHub CLI is signed in.'
			},
			{ kind: 'h2', text: 'Install' },
			{ kind: 'install' },
			{
				kind: 'p',
				text: '`@tabler/icons-svelte` is a peer dependency and must be installed alongside the library.'
			},
			{ kind: 'h2', text: 'Theme' },
			{
				kind: 'p',
				text: 'Import the full theme once, in the root layout. It bundles tokens, base styles, and the prose typeset.'
			},
			{
				kind: 'code',
				lang: 'svelte',
				title: 'src/routes/+layout.svelte',
				code: '<script lang="ts">\n\timport \'@elluzion/iv-ui/theme.css\';\n\tlet { children } = $props();\n</script>\n\n{@render children()}'
			},
			{
				kind: 'p',
				text: 'CSS can also be imported piecemeal: `tokens.css` (variables only), `base.css` (reset and base elements), `typeset.css` (prose styles).'
			},
			{ kind: 'h2', text: 'Mount the globals' },
			{
				kind: 'p',
				text: '`Toast` and `AlertDialog` listen to their stores, so each app mounts them once. Everything else is rendered where you use it.'
			},
			{
				kind: 'code',
				lang: 'svelte',
				title: 'src/routes/+layout.svelte',
				code: "<script lang=\"ts\">\n\timport { AlertDialog, Toast } from '@elluzion/iv-ui';\n\timport '@elluzion/iv-ui/theme.css';\n\tlet { children } = $props();\n</script>\n\n{@render children()}\n<Toast />\n<AlertDialog />"
			},
			{ kind: 'h2', text: 'Requirements' },
			{
				kind: 'checklist',
				items: [
					{ label: 'Svelte 5.20 or newer', detail: 'Components are authored with runes.' },
					{ label: 'Node 18 or newer', detail: 'For the package build and SSR.' },
					{
						label: '@tabler/icons-svelte',
						detail: 'Peer dependency used by menus, selects, and overlays.'
					}
				]
			}
		],
		related: ['quickstart', 'theming', 'for-agents']
	},
	{
		slug: 'quickstart',
		title: 'Quickstart',
		summary: 'From an empty SvelteKit route to a working form with feedback in five minutes.',
		section: 'guides',
		blocks: [
			{ kind: 'h2', text: '1. Install' },
			{ kind: 'install' },
			{ kind: 'h2', text: '2. Root layout' },
			{ kind: 'p', text: 'Import the theme and mount the two store-driven globals.' },
			{
				kind: 'code',
				lang: 'svelte',
				title: 'src/routes/+layout.svelte',
				code: "<script lang=\"ts\">\n\timport { AlertDialog, Toast } from '@elluzion/iv-ui';\n\timport '@elluzion/iv-ui/theme.css';\n\tlet { children } = $props();\n</script>\n\n{@render children()}\n<Toast />\n<AlertDialog />"
			},
			{ kind: 'h2', text: '3. A form' },
			{
				kind: 'p',
				text: 'Components are controlled with `bind:` or with explicit event handlers. Labels, helper text, and errors are part of the field components.'
			},
			{
				kind: 'code',
				lang: 'svelte',
				title: 'src/routes/+page.svelte',
				code: "<script lang=\"ts\">\n\timport { Button, Field, Input, showToast } from '@elluzion/iv-ui';\n\n\tlet email = $state('');\n\tlet error = $state('');\n\n\tfunction submit(e: SubmitEvent) {\n\t\te.preventDefault();\n\t\terror = email.includes('@') ? '' : 'Enter a valid email address.';\n\t\tif (!error) showToast('Invite sent to ' + email, 'success');\n\t}\n</script>\n\n<form onsubmit={submit} novalidate>\n\t<Field label=\"Email\" error={error} required>\n\t\t<Input type=\"email\" placeholder=\"you@example.com\" bind:value={email} />\n\t</Field>\n\t<Button type=\"submit\" variant=\"primary\">Send invite</Button>\n</form>"
			},
			{
				kind: 'callout',
				tone: 'note',
				title: 'Forms',
				text: 'Field wraps any control and connects its label, helper text, and error to the control through `aria-describedby`.'
			},
			{ kind: 'h2', text: '4. An overlay' },
			{
				kind: 'code',
				lang: 'svelte',
				code: '<script lang="ts">\n\timport { Button, Dialog } from \'@elluzion/iv-ui\';\n\tlet open = $state(false);\n</script>\n\n<Button variant="primary" onclick={() => (open = true)}>Delete project</Button>\n\n<Dialog bind:open title="Delete project?" size="sm">\n\t<p>This removes the project and every deployment. It cannot be undone.</p>\n\t{#snippet footer()}\n\t\t<Button variant="ghost">Cancel</Button>\n\t\t<Button variant="danger">Delete</Button>\n\t{/snippet}\n</Dialog>'
			},
			{
				kind: 'callout',
				tone: 'warn',
				title: 'Destructive actions',
				text: 'For confirmation flows that must block the page, use `showAlertDialog` instead of a plain dialog. It mounts once at the root and handles focus and escape.'
			},
			{ kind: 'h2', text: 'Next' },
			{
				kind: 'list',
				items: [
					'Browse all [components](/components) — every page lists props, events, and copyable examples.',
					'Read [theming](/docs/theming) before overriding colors or spacing.',
					'Point an agent at [llms.txt](/llms.txt) or the API corpus at [llms-api.txt](/llms-api.txt).'
				]
			}
		],
		related: ['installation', 'theming', 'accessibility']
	},
	{
		slug: 'theming',
		title: 'Theming',
		summary: 'Override semantic tokens once and every component follows — light, dark, and custom.',
		section: 'guides',
		blocks: [
			{ kind: 'h2', text: 'Semantic tokens' },
			{
				kind: 'p',
				text: 'Components never reference raw colors. They read `--iv_*` tokens, grouped as surface/foreground pairs. Overriding a token restyles every component that uses it.'
			},
			{
				kind: 'p',
				text: 'Try it: the controls below write to `:root` immediately. Nothing is persisted.'
			},
			{ kind: 'theme-editor' },
			{ kind: 'h2', text: 'Override' },
			{
				kind: 'code',
				lang: 'css',
				title: 'src/app.css',
				code: ':root {\n\t--iv_accent: #c7a24a;\n\t--iv_accent-dim: #8a6f2f;\n\t--iv_surface: #000000;\n\t--iv_radius: 2px;\n}'
			},
			{
				kind: 'callout',
				tone: 'note',
				title: 'Specificity',
				text: 'Import your overrides after `theme.css`, or scope them under `:root` — the theme uses `:root` and `[data-theme]`, so later declarations win.'
			},
			{ kind: 'h2', text: 'Dark and light' },
			{
				kind: 'p',
				text: 'Dark is the default. Light is applied by the OS preference, or forced with `data-theme="light"` on `<html>`. Set it before first paint to avoid a flash.'
			},
			{
				kind: 'code',
				lang: 'html',
				title: 'src/app.html — before %sveltekit.head%',
				code: "<script>\n\tconst stored = localStorage.getItem('theme');\n\tconst dark = stored ? stored === 'dark' : true;\n\tdocument.documentElement.dataset.theme = dark ? 'dark' : 'light';\n</script>"
			},
			{ kind: 'h2', text: 'Radius and density' },
			{
				kind: 'p',
				text: '`--iv_radius` derives the whole radius scale, so override `--iv_radius-lg` to change containers without touching the square controls. Spacing is a fixed 2–24px scale; `--iv_spacing-lg` sets the gap inside panels and forms.'
			},
			{
				kind: 'code',
				lang: 'css',
				code: ':root {\n\t--iv_radius-lg: 4px;\n\t--iv_spacing-lg: 20px;\n}'
			},
			{ kind: 'h2', text: 'Typography' },
			{
				kind: 'p',
				text: 'The UI voice is IBM Plex Mono; Sora is reserved for headings and prose. Point the font tokens at self-hosted faces to drop the Google Fonts request.'
			},
			{
				kind: 'code',
				lang: 'css',
				code: `@font-face {
	font-family: 'Plex Mono Local';
	src: url('/fonts/plex-mono.woff2') format('woff2');
	font-display: swap;
}

:root {
	--iv_font-mono: 'Plex Mono Local', monospace;
}`
			},
			{ kind: 'h2', text: 'Component scope' },
			{
				kind: 'p',
				text: 'Tokens cascade. Set them on any container to theme a subtree, for example a dense panel.'
			},
			{
				kind: 'code',
				lang: 'svelte',
				code: '<div class="dense">\n\t<Button variant="primary">Save</Button>\n</div>\n\n<style>\n\t.dense {\n\t\t--iv_spacing-md: 8px;\n\t\t--iv_radius: 0px;\n\t}\n</style>'
			}
		],
		related: ['installation', 'foundations-tokens', 'foundations-color']
	},
	{
		slug: 'accessibility',
		title: 'Accessibility',
		summary: 'What every component guarantees, and what your app still has to provide.',
		section: 'guides',
		blocks: [
			{
				kind: 'p',
				text: 'Every component ships with the same contract: accessible names, keyboard operation, visible focus, and reduced-motion handling. The library covers the mechanics; you provide the meaning.'
			},
			{ kind: 'h2', text: 'Contract' },
			{
				kind: 'checklist',
				items: [
					{
						label: 'Keyboard complete',
						detail:
							'Every control is reachable with Tab and operable with Enter, Space, or arrow keys.'
					},
					{
						label: 'Focus is visible',
						detail:
							'Focus rings use `--iv_ring` and are never removed. Overlays trap focus and restore it on close.'
					},
					{
						label: 'Names come from content',
						detail:
							'Labels, `aria-label`, and `aria-labelledby` are wired internally where the component renders text.'
					},
					{
						label: 'Reduced motion is respected',
						detail: 'Transitions collapse to 0.01ms when `prefers-reduced-motion: reduce` is set.'
					},
					{
						label: 'State is announced',
						detail:
							'`aria-expanded`, `aria-selected`, `aria-busy`, `aria-invalid`, and live regions are set by the components.'
					}
				]
			},
			{ kind: 'h2', text: 'Your responsibilities' },
			{
				kind: 'list',
				items: [
					'Icon-only buttons need an `aria-label` — there is no text to derive a name from.',
					'Images and avatars need `alt`; decorative icons should be `aria-hidden="true"`.',
					'Color is never the only signal: badges and alerts also carry text.',
					'One `h1` per page, and headings in order. Component titles are `h2` in docs, but your app controls its own outline.'
				]
			},
			{ kind: 'h2', text: 'Testing' },
			{
				kind: 'p',
				text: 'The standalone Vitest browser suite renders components in Chromium, checks them with axe, and exercises their primary interactions with Testing Library. Violations fail the run; Storybook is only for browsing stories.'
			},
			{
				kind: 'code',
				lang: 'sh',
				code: 'bun run test        # axe + interaction tests\nbun run storybook    # inspect manually at :6006'
			},
			{ kind: 'h2', text: 'Reduced motion' },
			{
				kind: 'p',
				text: 'Component transitions read the `reducedMotion` store. When you build custom motion, do the same with the CSS media query or the store.'
			},
			{
				kind: 'code',
				lang: 'css',
				code: '@media (prefers-reduced-motion: reduce) {\n\t.animated {\n\t\ttransition: none;\n\t}\n}'
			}
		],
		related: ['installation', 'components-button', 'for-agents']
	},
	{
		slug: 'for-agents',
		title: 'For agents',
		summary: 'Machine-readable entry points: llms.txt, full corpus, API-only corpus, and JSON.',
		section: 'guides',
		blocks: [
			{
				kind: 'p',
				text: 'Every page has a Markdown twin and every component has a JSON API document. Both are generated from the same registry as this page, so they cannot drift.'
			},
			{ kind: 'h2', text: 'Entry points' },
			{
				kind: 'table',
				head: ['URL', 'Contents'],
				rows: [
					['`/llms.txt`', 'Index, install rules, and links to every page as Markdown.'],
					['`/llms-full.txt`', 'The complete documentation in one file.'],
					['`/llms-api.txt`', 'Imports and API tables only — no examples.'],
					['`/api/index.json`', 'Every component with slug, category, summary, and URL.'],
					[
						'`/api/<slug>.json`',
						'Structured props, events, snippets, types, tokens, and examples.'
					],
					['`/<page>.md`', 'The Markdown twin of any page.'],
					['`/search.json`', 'The client search index, plain JSON.']
				]
			},
			{ kind: 'h2', text: 'Ground rules' },
			{
				kind: 'list',
				items: [
					'Svelte 5 runes only: `$props()`, `$state()`, `$derived()`, `$effect()`.',
					'Import from `@elluzion/iv-ui`; import `@elluzion/iv-ui/theme.css` once at the root.',
					'Never hardcode hex colors in app code — override `--iv_*` tokens.',
					'Mount `<Toast />` and `<AlertDialog />` once; use `showToast()` and `showAlertDialog()`.',
					'Prefer the library component over a hand-built control.',
					'Pass `aria-label` for icon-only buttons and `alt` for avatars.',
					'All components forward `class`, `id`, `style`, `aria-*`, and `data-*` through rest props.'
				]
			},
			{ kind: 'h2', text: 'Fetch' },
			{
				kind: 'code',
				lang: 'sh',
				code: 'curl https://iv-ui.vercel.app/llms-api.txt\ncurl https://iv-ui.vercel.app/api/button.json\ncurl https://iv-ui.vercel.app/components/button.md'
			},
			{ kind: 'h2', text: 'What the API JSON contains' },
			{
				kind: 'code',
				lang: 'json',
				code: `{
	"slug": "button",
	"name": "Button",
	"category": "Form & Input",
	"summary": "Triggers an action or submits a form.",
	"status": "stable",
	"since": "0.1.0",
	"import": "import { Button } from '@elluzion/iv-ui';",
	"usage": ["…"],
	"props": [{ "name": "variant", "type": "…", "default": "…", "description": "…", "required": false, "bindable": false }],
	"events": [{ "name": "click", "type": "(e: MouseEvent) => void", "default": null, "description": "…", "required": false, "bindable": false }],
	"snippets": [{ "name": "children", "type": "Snippet", "default": null, "description": "…", "required": true, "bindable": false }],
	"types": [],
	"manual": [],
	"tokens": ["--iv_radius-sm"],
	"cssHooks": [".iv-btn"],
	"accessibility": { "keyboard": [["Tab", "…"]], "notes": ["…"] },
	"related": [{ "title": "…", "summary": "…", "url": "/components/…", "kind": "Component" }],
	"examples": [{ "id": "variants", "title": "Variants", "description": "…", "code": "…" }],
	"markdown": "/components/button.md",
	"page": "/components/button"
}`
			},
			{
				kind: 'callout',
				tone: 'note',
				title: 'Canonical URLs',
				text: 'Links inside `llms.txt` are absolute. Set `PUBLIC_SITE_URL` at build time when the docs move to a custom domain.'
			}
		],
		related: ['installation', 'quickstart', 'accessibility']
	}
];
