## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: prettier, storybook, ai-tools, eslint

---

## Architecture

This is a Svelte 5 component library (`iv-ui`) wrapped in a SvelteKit app for development/showcase.

| Directory             | Purpose                                                                          |
| --------------------- | -------------------------------------------------------------------------------- |
| `src/lib/components/` | Library components (Button, Input, Dialog, ConfirmDialog, Toast, LoadingSpinner) |
| `src/lib/theme/`      | CSS tokens + base styles (`tokens.css`, `base.css`, `theme.css` bundling all)    |
| `src/lib/stores/`     | Global state stores (toast, dialog)                                              |
| `src/lib/index.ts`    | Library entry point — re-exports components and stores                           |
| `src/routes/`         | Showcase/preview SvelteKit app (not part of the distributed package)             |

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
import '@iv-ui/theme.css'       # all CSS
import '@iv-ui/tokens.css'     # design tokens only
import '@iv-ui/base.css'        # base styles only
```

Consumers must also install `@tabler/icons-svelte` (peer dependency).

## Design System

**Read `DESIGN.md` before writing or modifying any component.** It defines a monochrome dark UI: pure black canvas, hairline borders, pill-shaped controls, one accent color (brass). Hardcoded hex/rgba values in components are forbidden — always reference tokens from `src/lib/theme/tokens.css`.

DESIGN.md references design token files; if paths are stale, the authoritative locations are:

- Tokens: `src/lib/theme/tokens.css`
- Base/reset: `src/lib/theme/base.css`
- Component styles: scoped inside `src/lib/components/*.svelte`

## Code Style

Prettier: tabs, single quotes, no trailing commas, 100 print width, svelte plugin.

**CSS nesting is used everywhere** — in both plain `.css` files (`base.css`) and Svelte `<style>` blocks. Use `&` to scope pseudo-classes (`&:hover`, `&:focus`, `&:active`), variant classes (`&.primary`, `&.danger`), attribute selectors (`&[disabled]`), pseudo-elements (`&::placeholder`), and structural selectors (`&:has(.leading)`). This is the project convention — never write flat/duplicated selector chains for variant or state overrides.

Components accept both `onclick` and `on:click` props to support Svelte 5 $props() and legacy event forwarding. Event handlers chain both callbacks when present.

## Testing

**Create a Storybook story file for every component.** Whenever you add or modify a component, you must write (or update) its stories alongside it as `*.stories.svelte` / `*.stories.ts`. Stories should cover the component's variants, states, and props.

Tests are Storybook stories with the `@storybook/addon-vitest` integration (browser tests via Playwright/Chromium). Story files live alongside components (`*.stories.svelte`, `*.stories.ts`). Run via `vitest` or the Storybook test runner.
