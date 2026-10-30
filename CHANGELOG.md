# Changelog

All notable changes to the `@elluzion/iv-ui` package are documented in this file. This project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **Docs site:** a fully prerendered SvelteKit documentation site for all 41 components (37 pages, including compound pages) plus guides and foundation pages. Each page covers import, preview, usage, examples, API, accessibility, tokens/CSS hooks, and related links. Content lives in `src/docs/` (outside the published `src/lib`), and `scripts/docs-gen.ts` generates the static data, per-page Markdown mirrors, JSON API, search index, and `llms.txt` / `llms-full.txt` / `llms-api.txt` corpora from one source.
- **Testing:** standalone Vitest browser tests in `src/lib/test/` using `@testing-library/svelte`, `@testing-library/user-event`, and axe. The suite covers every component's primary interaction and accessibility, and no longer requires Storybook. Storybook remains the interactive component explorer.

### Changed
- **Docs:** removed `PLAN.md` (superseded by `ROADMAP.md`, written against the pre-redesign token names) and a stale pre-redesign `.impeccable` critique. `ROADMAP.md` statuses now match the code (Context Menu, Toggle/ToggleGroup, Collapsible done; CI and package shape done). `README.md` lists the full catalog and `typeset.css`; `PRODUCT.md` and `DESIGN.md` no longer describe the redesign as in progress and match the shipped radii and motion tokens.

### Fixed
- **Docs:** the motion page now demonstrates each duration and easing token (plus the spinner tokens) instead of one shared transition; the mobile navigation dialog renders the full sidebar; installation, code, and callout blocks keep consistent vertical spacing; the components index lays out name, status, and summary correctly on phones; the theme editor edits `--iv_radius-lg` and `--iv_spacing-lg`, which visibly change the preview.
- **Popover:** docs examples no longer toggle `open` in the anchor handler, which closed the panel on the same click that opened it.
- **Sheet:** right-side sheets now receive `iv-side-right`, so they use their configured width instead of stretching fullscreen; left/right widths are capped to the viewport and use border-box sizing.

## [0.2.0] - 2026-09-10

### Added
- **Components (15 new):** `Avatar` (fallback, sizes, status), `Breadcrumb`, `Badge`, `ButtonGroup`, `Alert`, `Progress`, `EmptyState`, `Skeleton`, `Field` + `InputGroup` + `NativeSelect`, `Toggle` + `ToggleGroup`, `Collapsible`, `ContextMenu` + `Menu`/`Popover`, `Tooltip`, `Shortcut`, `Article` (prose wrapper). Re-exported from `src/lib/index.ts`.
- **Foundation:** semantic surface/foreground token pairs, `calc()`-derived radius scale, `leading`/`tracking`/`weight` tokens, component size tokens, `iv-prose` typeset stylesheet (`--iv_typeset-*`, `:where()` zero-specificity, `typeset.css` + export), `Article` aligned to typeset. Foundation stories for tokens/colors/typography/states.
- **Showcases:** `Dashboard` and `Mobile Field Ops` full-page stories exercising the catalog at phone/desktop width.
- **Design system:** `PRODUCT.md`, `DESIGN.md` rewrite to *Instrument Console* (mono-forward, hairline frames, reverse-video, brass cursor), `COMPONENTS.md` universal contract, `ROADMAP.md` phased plan.
- **Testing:** Storybook + Vitest browser (Playwright/Chromium) with `@storybook/addon-a11y` (`test: 'error'`, pinned dark theme) and interaction `play` functions for all interactive components.

### Changed
- **Tooling: `eslint`+`prettier` → `oxlint`+`oxfmt` (`8dd5f8d`).** `lint` is now `oxfmt --check && oxlint` (~6× faster; 40.7s → 6.7s, eslint 32.3s → 0.24s), `format` is `oxfmt`. Added `.oxlintrc.json` + `.oxfmtrc.json` (migrated from `prettier.config.js` + `.prettierignore`), removed `eslint.config.js`. Updated `AGENTS.md`, `README.md`, `.vscode/extensions.json` (`oxc.oxc-vscode`), `package.json` scripts. Benchmark 5 runs, 99 files, `bun 1.3.14`.
- **Motion: buttery smooth (`4f08744`).** Lengthened durations (fast `0.2s`, base `0.32s`, slow `0.48s`; `fade 0.28s`, `scale 0.36s`, `fly 0.34s`, `slide 0.38s`, `subtle 0.22s`) and replaced beziers with `ease-out 0.16,1,0.3,1` (quint-out), `ease-in 0.32,0,0.67,0`, `ease-in-out 0.65,0,0.35,1` plus `ease-spring`/`ease-emphasized`. All Svelte transitions (`fade`/`slide`/`fly`/`scale`) now use `quintOut`/`cubicInOut`; CSS hover/focus transitions now explicitly use the easing tokens. `DESIGN.md` *Interaction & Motion* updated.
- **Sheet:** top/bottom sheets now always `width: 100%` (`53f0d56`); flyout now mirrors flyin (`380ms` `cubicInOut`) and backdrop fade has `delay 100ms` on close (`0d2ae3c`).
- **AlertDialog replaces ConfirmDialog (`be7972a`).** `alert-dialog.svelte` → `AlertDialog` with `alertDialogState`/`showAlertDialog` (config object + `AlertDialogAction[]`), scoped styles. `dialogState`/`showDialog` and `DialogState` removed — migrate to `showAlertDialog({ title, message, actions })`.
- **Redesign: Instrument Console TUI (`b73f406`).** Inverted radius ladder (controls `0px`, containers `4px`, dialogs `8px`), `IBM Plex Mono` as UI voice, reverse-video selection/cursor, brass caret/brackets, recalibrated surfaces, hazard stripe; rebuilt foundation + dashboard showcase.
- **Styling:** centralized tokens, prefixed all classes `iv-*` (`5f77cf7`), replaced raw spacing/font values with tokens.

### Fixed
- **a11y / tests (`12dd98c`, `155961b`, `d658cf9`, `8aaa043`):** `Card` title `h3` → `h2` (heading-order), Mobile FAB `aria-label` disambiguated (`Quick add job`), `Map` play now `waitFor` heading, `Toast` restored surface-based styling (inset `3px` bar, dim icons) to avoid mid-fade `color-contrast` flakes (`#797979` on `#0c0c0d`), `Tooltip` `Default` now waits 200ms, `stores/motion.ts` forces `reducedMotion=true` in Vitest/Playwright to stabilize axe (mid-fade `#6c6c6c` on `#070807`).
- **Components:** refined `Select` styling and search, `Checkbox`/`Radio`/`Switch`/`Slider`/`Tabs`/`Menu`/`Dialog` focus/aria, `Breadcrumb`/`Avatar`/`Badge`/`ButtonGroup`/`Field` polish, `Slider` tick radius, `Input`/`Textarea` label association, `Progress`/`Skeleton` tokens. Removed button shrink on click.
- **Docs/CI:** scoped `lint` to `src`, disabled `svelte/no-navigation-without-resolve` for library, added `ROADMAP.md`, `AGENTS.md` contract, fixed `oxfmt` formatting and `publint` `import.meta.env` warning (`svelte-package`).

## [0.1.0] - 2026-08-02

### Added

- Initial publishable release as `@elluzion/iv-ui`.
- Package metadata for publishing to GitHub Packages (scoped name, `publishConfig`, `engines`, `repository`).
- `exports` now resolve to `dist/` (JS, types, and CSS subpaths); Storybook-story and test files are excluded from the published tarball.
- CI workflow (`lint`, `check`, Storybook build) and a tag-triggered release workflow.

### Components

- Button, Card, Accordion (+ Item), Checkbox, Dialog, Sheet, ConfirmDialog, Input, Textarea, RadioGroup, Separator, Select, Tabs (+ List/Tab/Panel), Slider, Switch, Toast, LoadingSpinner, plus `dialogState`/`showDialog` and `toastState`/`showToast`/`hideToast` stores.
