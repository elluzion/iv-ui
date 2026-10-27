# iv-ui

A Svelte 5 component library with a monochrome dark design system.

## Components

All components follow the design system in [DESIGN.md](./DESIGN.md) and the API contract in [COMPONENTS.md](./COMPONENTS.md).

- **Form & Input** — Button, ButtonGroup, Input, Textarea, InputGroup, Field, Checkbox, RadioGroup, Switch, Slider, Select, NativeSelect
- **Layout & Navigation** — Card, Article, Tabs (+ TabList, Tab, TabPanel), Accordion (+ AccordionItem), Separator, Breadcrumb, Collapsible
- **Overlays** — Dialog, AlertDialog, Sheet, Popover, Tooltip, Menu, ContextMenu, Toast
- **Feedback** — Alert, Progress, Skeleton, LoadingSpinner, EmptyState, Badge
- **Display & Misc** — Avatar, Shortcut, Toggle, ToggleGroup

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
import '@elluzion/iv-ui/typeset.css';
```

## Developing

```sh
bun dev               # showcase app (dev server)
bun run storybook     # component explorer at :6006
```

`src/lib/` is the library; `src/routes/` is the showcase app (not part of the distributed package).

## Building

```sh
bun run build         # vite build + svelte-package + publint
```

## Linting & Type-Checking

```sh
bun run lint          # oxfmt --check + oxlint
bun run check         # svelte-check type-check
bun run format        # oxfmt --write
```

## Testing

```sh
bun run test          # Storybook stories as Vitest browser tests (Playwright/Chromium)
bun run test:watch    # same, in watch mode
```

Every story renders under `@storybook/addon-a11y` (violations fail the run), and interactive components add a `play` function for their primary interaction.

## Publishing

This package is published to **GitHub Packages**. To release:

1. Log in / configure auth for `https://npm.pkg.github.com` (a `NODE_AUTH_TOKEN` with `write:packages` in CI).
2. Create a version commit + `v*` tag (e.g. `v0.2.0`) and push; the release workflow builds and publishes.

## License

MIT
