## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: oxfmt, oxlint, storybook, vitest (standalone browser tests), svelte opencode plugin (`@sveltejs/opencode` + Impeccable skill)

---

## Roadmap & Contracts

Two documents govern all work in this repo. Read them before writing code:

- **`ROADMAP.md`** — the phased plan. Work is tracked against it: each phase ends "shippable + documented", with new components shipping stories + a11y checks. Check the current phase's checkboxes before starting; mark items `[x]` only when actually done.
- **`COMPONENTS.md`** — the universal component contract. Every component must satisfy it: `iv-` prefixed classes, token-only values, dual `onclick`/`on:click` events, `$props()`/`$bindable` runes, accessible names, focus-visible rings, reduced-motion handling, and a companion `*.stories.svelte` file.

## Keeping These Instructions Current

These instructions can drift out of date (new components, renamed files, changed commands). **You are expected to keep them accurate** as part of any task that causes the drift:

- When you add, remove, or rename a component, update the inventory in the Architecture table and the `COMPONENTS.md` list if it enumerates components.
- When a command, directory, or exported path changes, update the matching section here.
- If any claim in this file (or in `COMPONENTS.md`) no longer matches the codebase, fix it in the same change that causes the mismatch — don't leave stale instructions for the next run.
- Only reflect reality you can verify; don't speculate or pre-advertise unbuilt features.

---

## Architecture

This is a Svelte 5 component library (`iv-ui`) wrapped in a SvelteKit app for development/showcase.

| Directory             | Purpose                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/components/` | Library components (Button, Card, Article, Accordion (+ Item), Checkbox, Dialog, Sheet, AlertDialog, Popover, Menu, Shortcut, Input, Textarea, RadioGroup, Separator, Select, Tabs (+ List/Tab/Panel), Slider, Switch, Tooltip, Toast, LoadingSpinner, Field, InputGroup, NativeSelect, ButtonGroup, Skeleton, Alert, Progress, Badge, EmptyState, Avatar, Breadcrumb, Toggle, ToggleGroup, Collapsible, ContextMenu) |
| `src/lib/theme/`      | CSS tokens + base styles (`tokens.css`, `base.css`, `typeset.css`, `theme.css` bundling all)                                                                                                                                |
| `src/lib/stores/`     | Global state stores (toast, dialog, motion)                                                                                                                                                                                  |
| `src/lib/utils/`      | Shared helpers (focus-trap)                                                                                                                                                                                                  |
| `src/lib/foundation/` | Foundation showcase stories (tokens, colors, typography, states) |
| `src/lib/showcase/`   | Full-page composite showcase stories (one realistic page assembling many components) |
| `src/lib/test/`       | Standalone Vitest browser tests and Svelte fixtures |
| `src/lib/index.ts`    | Library entry point — re-exports components and stores |
| `src/docs/`           | Docs site content (component/guide/foundation registry, examples, UI shell, styles) — outside `src/lib`, so it is not published |
| `src/routes/`         | Docs site routes: component/guide/foundation pages, `components` index, `api` JSON, `.md` mirrors, `llms*.txt`, sitemap/robots |
| `scripts/docs-gen.ts` | Generates docs data, Markdown, API JSON, search index, and `llms*.txt` from the content registry |

Svelte 5 runes mode is forced for all project code (but not `node_modules`) via `vite.config.ts`.

## Commands

```sh
bun dev                 # docs site dev server (regenerates docs data)
bun run build           # prerender docs site + build package (svelte-package + publint)
bun run storybook       # storybook at :6006
bun run check           # type-check with svelte-check
bun run lint            # oxfmt --check + oxlint
bun run format          # oxfmt --write
bun run test            # standalone vitest browser tests (playwright/chromium)
bun run test:watch      # vitest in watch mode
bun run docs:check      # validate docs content (examples, API ids, related links)
```

**Before committing:** run `bun run lint && bun run check && bun run test`.

## Exports / Package Shape

The package exports CSS files at separate paths (see `package.json` exports):

```
import '@elluzion/iv-ui/theme.css'      # all CSS
import '@elluzion/iv-ui/tokens.css'    # design tokens only
import '@elluzion/iv-ui/base.css'       # base styles only
import '@elluzion/iv-ui/typeset.css'    # iv-prose prose styles only
```

Consumers must also install `@tabler/icons-svelte` (peer dependency).

## Design System

**Read `DESIGN.md` before writing or modifying any component.** It defines a monochrome dark console UI: pure black canvas, hairline borders, sharp (0px) controls with 4–8px container radii, reverse-video selection, one hardened brass cursor accent, mono-forward typography (IBM Plex Mono is the UI voice; Sora reserved for headings and prose). Hardcoded hex/rgba values in components are forbidden — always reference tokens from `src/lib/theme/tokens.css`.

Component APIs must follow the universal contract in **`COMPONENTS.md`** (see Roadmap & Contracts above) — `size`/`variant`/`disabled` conventions, `$props()`/`$bindable` runes, dual events, accessible names, focus-visible rings, and reduced-motion.

DESIGN.md references design token files; if paths are stale, the authoritative locations are:

- Tokens: `src/lib/theme/tokens.css`
- Base/reset: `src/lib/theme/base.css`
- Typeset (prose): `src/lib/theme/typeset.css`
- Component styles: scoped inside `src/lib/components/*.svelte`

## Code Style

Oxfmt: tabs, single quotes, no trailing commas, 100 print width, svelte plugin.

**All class names are prefixed `iv-`** (e.g. `iv-btn`, `iv-card`, `iv-dialog`) to scope component styles and avoid collisions with consumer styles. Variant/state classes use the same prefix (`iv-primary`, `iv-selected`, `iv-disabled`), and token names use `--iv_` (see DESIGN.md). Never introduce unprefixed class names in components.

**CSS nesting is used everywhere** — in both plain `.css` files (`base.css`) and Svelte `<style>` blocks. Use `&` to scope pseudo-classes (`&:hover`, `&:focus`, `&:active`), variant classes (`&.iv-primary`, `&.iv-danger`), attribute selectors (`&[disabled]`), pseudo-elements (`&::placeholder`), and structural selectors (`&:has(.leading)`). This is the project convention — never write flat/duplicated selector chains for variant or state overrides.

Components accept both `onclick` and `on:click` props to support Svelte 5 $props() and legacy event forwarding. Event handlers chain both callbacks when present.

## Testing

**Create a Storybook story file for every component.** Whenever you add or modify a component, you must write (or update) its stories alongside it as `*.stories.svelte` / `*.stories.ts`. Stories should cover the component's variants, states, and props. Stories are the interactive documentation; they do not run the test suite.

Tests are standalone Vitest browser tests in `src/lib/test/*.test.ts`, using `@testing-library/svelte` and `@testing-library/user-event` in Playwright/Chromium. Run via `bun run test` (one-shot) or `bun run test:watch`. No Storybook server or dev server is involved.

- `src/lib/test/setup.ts` loads the theme, jest-dom, Testing Library cleanup, and resets the toast/alert-dialog stores between tests.
- `src/lib/test/helpers.ts` provides `snippet()` for child content and `expectAccessible()`, which runs axe and ignores page-shell-only rules (`region`, `landmark-one-main`, `page-has-heading-one`, `html-has-lang`).
- Component fixtures that need composition (for example Tabs, Accordion, Popover) live in `src/lib/test/fixtures/`.

Every component test should cover its primary interaction (click/change/keyboard/overlay open-close) and call `expectAccessible()`. Match assertions to the contract in `COMPONENTS.md` (dual events, accessible names, focus management, reduced motion). When adding a component, add or extend a test file in `src/lib/test/` as well as its stories.
