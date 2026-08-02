# iv-ui

A Svelte 5 component library with a monochrome dark design system.

## Components

Button, Card, Accordion, Checkbox, Dialog, Sheet, ConfirmDialog, Input, Textarea, RadioGroup, Separator, Select, Tabs, Slider, Switch, Toast, LoadingSpinner — all following the design system defined in [DESIGN.md](./DESIGN.md).

## Installation

```sh
bun add @elluzion/iv-ui @tabler/icons-svelte
```

`@tabler/icons-svelte` is a peer dependency and must be installed by consumers.

> **Svelte 5 runes** are required (like this project's components, the package is authored with runes).

## Usage

```ts
import { Button, Dialog, showToast } from '@elluzion/iv-ui';
import '@elluzion/iv-ui/theme.css';
```

CSS can also be imported piecemeal:

```ts
import '@elluzion/iv-ui/tokens.css';
import '@elluzion/iv-ui/base.css';
```

## Developing

```sh
bun run storybook     # component explorer at :6006
```

`src/lib/` is the library; `src/routes/` is the showcase app (not part of the distributed package).

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

## Publishing

This package is published to **GitHub Packages**. To release:

1. Log in / configure auth for `https://npm.pkg.github.com` (a `NODE_AUTH_TOKEN` with `write:packages` in CI).
2. Create a version commit + `v*` tag (e.g. `v0.1.0`) and push; the release workflow builds and publishes.

## License

MIT
