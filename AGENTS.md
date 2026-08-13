## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: prettier, storybook, eslint, vitest (browser tests via Storybook), svelte opencode plugin (`@sveltejs/opencode` + Impeccable skill)

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
| `src/lib/components/` | Library components (Button, Card, Article, Accordion, Checkbox, Dialog, Sheet, ConfirmDialog, Popover, Menu, Shortcut, Input, Textarea, RadioGroup, Separator, Select, Tabs, Slider, Switch, Tooltip, Toast, LoadingSpinner, Field, InputGroup, NativeSelect, ButtonGroup, Skeleton, Alert, Progress, Badge, EmptyState, Avatar) |
| `src/lib/theme/`      | CSS tokens + base styles (`tokens.css`, `base.css`, `typeset.css`, `theme.css` bundling all)                                                                                                                                |
| `src/lib/stores/`     | Global state stores (toast, dialog, motion)                                                                                                                                                                                  |
| `src/lib/utils/`      | Shared helpers (focus-trap)                                                                                                                                                                                                  |
| `src/lib/foundation/` | Foundation showcase stories (tokens, colors, typography, states)                                                                                                                                                             |
| `src/lib/index.ts`    | Library entry point — re-exports components and stores                                                                                                                                                                       |
| `src/routes/`         | Showcase/preview SvelteKit app (not part of the distributed package)                                                                                                                                                         |

Svelte 5 runes mode is forced for all project code (but not `node_modules`) via `vite.config.ts`.

## Commands

```sh
bun dev                 # dev server (showcase app)
bun run build           # build showcase + package (svelte-package + publint)
bun run storybook       # storybook at :6006
bun run check           # type-check with svelte-check
bun run lint            # prettier --check + eslint
bun run format          # prettier --write
```

**Before committing:** run `bun run lint && bun run check`. There is no dedicated test command; tests run through Storybook + Vitest browser tests (playwright/chromium).

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

**Read `DESIGN.md` before writing or modifying any component.** It defines a monochrome dark UI: pure black canvas, hairline borders, pill-shaped controls, one accent color (brass). Hardcoded hex/rgba values in components are forbidden — always reference tokens from `src/lib/theme/tokens.css`.

Component APIs must follow the universal contract in **`COMPONENTS.md`** (see Roadmap & Contracts above) — `size`/`variant`/`disabled` conventions, `$props()`/`$bindable` runes, dual events, accessible names, focus-visible rings, and reduced-motion.

DESIGN.md references design token files; if paths are stale, the authoritative locations are:

- Tokens: `src/lib/theme/tokens.css`
- Base/reset: `src/lib/theme/base.css`
- Typeset (prose): `src/lib/theme/typeset.css`
- Component styles: scoped inside `src/lib/components/*.svelte`

## Code Style

Prettier: tabs, single quotes, no trailing commas, 100 print width, svelte plugin.

**All class names are prefixed `iv-`** (e.g. `iv-btn`, `iv-card`, `iv-dialog`) to scope component styles and avoid collisions with consumer styles. Variant/state classes use the same prefix (`iv-primary`, `iv-selected`, `iv-disabled`), and token names use `--iv_` (see DESIGN.md). Never introduce unprefixed class names in components.

**CSS nesting is used everywhere** — in both plain `.css` files (`base.css`) and Svelte `<style>` blocks. Use `&` to scope pseudo-classes (`&:hover`, `&:focus`, `&:active`), variant classes (`&.iv-primary`, `&.iv-danger`), attribute selectors (`&[disabled]`), pseudo-elements (`&::placeholder`), and structural selectors (`&:has(.leading)`). This is the project convention — never write flat/duplicated selector chains for variant or state overrides.

Components accept both `onclick` and `on:click` props to support Svelte 5 $props() and legacy event forwarding. Event handlers chain both callbacks when present.

## Testing

**Create a Storybook story file for every component.** Whenever you add or modify a component, you must write (or update) its stories alongside it as `*.stories.svelte` / `*.stories.ts`. Stories should cover the component's variants, states, and props.

Tests are Storybook stories with the `@storybook/addon-vitest` integration (browser tests via Playwright/Chromium). Story files live alongside components (`*.stories.svelte`, `*.stories.ts`). Run via `vitest` or the Storybook test runner.