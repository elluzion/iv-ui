# Changelog

All notable changes to the `@elluzion/iv-ui` package are documented in this file. This project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- **AlertDialog replaces ConfirmDialog** (`alert-dialog.svelte` → `AlertDialog`). The store is now `alertDialogState` / `showAlertDialog` (from `stores/alert-dialog.ts`) and takes a config object with a customizable `actions` list (`AlertDialogAction`). Styles are now scoped to the component, fixing the broken confirm-dialog CSS. `dialogState`/`showDialog` and `DialogState` are removed — migrate to `showAlertDialog({ title, message, actions })`.

## [0.1.0] - 2026-08-02

### Added

- Initial publishable release as `@elluzion/iv-ui`.
- Package metadata for publishing to GitHub Packages (scoped name, `publishConfig`, `engines`, `repository`).
- `exports` now resolve to `dist/` (JS, types, and CSS subpaths); Storybook-story and test files are excluded from the published tarball.
- CI workflow (`lint`, `check`, Storybook build) and a tag-triggered release workflow.

### Components

- Button, Card, Accordion (+ Item), Checkbox, Dialog, Sheet, ConfirmDialog, Input, Textarea, RadioGroup, Separator, Select, Tabs (+ List/Tab/Panel), Slider, Switch, Toast, LoadingSpinner, plus `dialogState`/`showDialog` and `toastState`/`showToast`/`hideToast` stores.
