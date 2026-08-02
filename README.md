# iv-ui

A Svelte 5 component library with a monochrome dark design system.

## Components

Button, Input, Dialog, ConfirmDialog, Toast, LoadingSpinner — all following the design system defined in [DESIGN.md](./DESIGN.md).

## Developing

```sh
bun run storybook     # component explorer at :6006
```

`src/lib/` is the library; `src/routes/` is the (yet empty) showcase app (not part of the distributed package).

## Building

```sh
bun run build         # vite build + svelte-package + publint
```

## Linting & Type-Checking

```sh
bun run lint          # prettier --check + eslint
bun run check         # svelte-check type-check
bun run format        # prettier --write
```

## Testing

Tests run through Storybook + Vitest browser tests (playwright/chromium). Story files live alongside components as `*.stories.svelte` / `*.stories.ts`.

## Usage

```ts
import { Button, Dialog, showToast } from 'iv-ui';
import '@iv-ui/theme.css';
```

CSS can also be imported piecemeal: `@iv-ui/tokens.css`, `@iv-ui/base.css`.

Requires `@tabler/icons-svelte` as a peer dependency.
