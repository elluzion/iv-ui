# ROADMAP: iv-ui to a great design library

Analysis of shadcn (https://ui.shadcn.com/llms.txt) mapped onto iv-ui's existing
foundation. The goal: a quickly usable, clean, token-pure UI library for future
projects.

---

## 1. shadcn analysis — what it does well

Four pillars worth borrowing from:

- **Token convention**: semantic *surface/foreground pairs* (`background`, `card`,
  `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`,
  `input`, `ring`, plus `chart-1..5` and `sidebar*`). Components reference semantic
  tokens, not raw colors → theming = overriding tokens. A base `--radius` derives
  the whole radius scale via `calc()`.
- **Typeset (typography)**: one CSS file that styles rendered markdown from
  **three controls** — `--typeset-size`, `--typeset-leading`, `--typeset-flow` —
  everything else (heading sizes, list indents, gaps) derives from them.
  Container-aware, uses app tokens, `:where()` zero-specificity, streaming-stable
  (no `:last-child`/`:has` in layout rules), `not-typeset` opt-out.
- **Component coverage** across 6 buckets: Form & Input, Layout & Nav, Overlays,
  Feedback & Status, Display & Media, Misc.
- **Distribution/DX**: accessible primitives, copy-in/registry model, CLI,
  llms.txt, AI-readiness (skills/MCP).

---

## 2. What a great design library should have

### 2a. Foundation (the non-negotiable layer)

| Area | Requirement | iv-ui status |
|---|---|---|
| Color tokens | Semantic pairs + dark/light mirror, no raw hex in components | ✅ Done well (surface stack, accent, semantic; dark/light via `prefers-color-scheme` + `data-theme`) |
| Radius | Base token → derived scale | ✅ `--iv_radius` (4px) → `-sm` (0, controls) / `-lg` (8px, dialogs) via `calc()`, plus `-pill` (semantic circles) |
| Typography | Tokenized scale, weights, line-heights, mono + **typeset for prose** | ✅ Extended scale; `--iv_leading-*`/`--iv_tracking-*`/`--iv_weight-*`; `iv-prose` typeset (`--iv_typeset-*` controls) |
| Motion | Duration/easing tokens, reduced-motion support | ✅ Duration tokens + per-context `--iv_motion-*`; all zeroed under `prefers-reduced-motion` |
| Spacing / z-index / size | Tokens | ✅ Done |
| Accessibility | Keyboard nav, focus-visible, ARIA, contrast | ✅ Systematic pass done (focus-visible rings, roles, `aria-*`, reduced-motion) |

### 2b. Component catalog (with current state)

**Form & Input**

| Component | Status |
|---|---|
| Button | ✅ done |
| Button Group (segmented) | ✅ done |
| Input / Textarea | ✅ done |
| Input Group (prefix/suffix addons) | ✅ done |
| **Label / Field** (label + helper + error wrapper) | ✅ done |
| Checkbox / Radio / Switch / Slider / Select | ✅ done |
| Native Select | ✅ done |
| Input OTP / Date Picker / Calendar | stretch — skip unless needed |

**Layout & Navigation**

| Component | Status |
|---|---|
| Card | ✅ done |
| Article | ✅ done |
| Tabs | ✅ done |
| Accordion | ✅ done |
| Separator | ✅ done |
| Breadcrumb | ✅ done |
| Sidebar / Navigation Menu / Scroll Area / Resizable | skip (layout glue; build app-side) |

**Overlays & Dialog**

| Component | Status |
|---|---|
| Dialog | ✅ done |
| ConfirmDialog (≈ Alert Dialog) | ✅ done — renamed **AlertDialog**; configurable `actions` list, own scoped styles |
| Sheet | ✅ done |
| Popover | ✅ done |
| Tooltip | ✅ done |
| Menu (≈ Dropdown) | ✅ done |
| **Context Menu** | missing (cheap, reuses Menu internals) |
| **Drawer** (bottom mobile sheet) | stretch |
| **Command palette** | stretch (high delight) |

**Feedback & Status**

| Component | Status |
|---|---|
| Toast | ✅ done |
| LoadingSpinner | ✅ done |
| **Badge** (≈ chip, but semantic/standalone) | ✅ done |
| **Skeleton** | ✅ done |
| **Progress** | ✅ done |
| **Alert** (inline message block) | ✅ done |
| **Empty state** | ✅ done |
| Button `loading` state | ✅ done — internal spinner + `aria-busy` |

**Display & Media**

| Component | Status |
|---|---|
| Shortcut (≈ Kbd) | ✅ done |
| **Avatar** | ✅ done |
| **Table** | missing — high value |
| Pagination | missing (bundles with Table) |
| Carousel / Aspect Ratio / Charts | skip (out of scope, third-party territory) |

**Misc**

| Component | Status |
|---|---|
| **Toggle / Toggle Group** | missing |
| **Collapsible** | missing (≈ AccordionItem without list semantics) |

### 2c. The universal component contract (attributes)

Every component should expose a consistent, predictable API — this is what makes
a library feel "complete":

- **Universal**: `class`, `id`, `style`, `title`, `aria-label` forwarded to the
  root; consistent `size` (`sm|md|lg`), `variant`, `disabled`, `fullWidth`;
  Svelte 5 runes (`$props`/`$bindable`).
- **Form controls**: `bind:value`/`bind:checked`, `name`, `required`, `readonly`,
  `error` (bool/string), `helperText`, `label`, `placeholder`, leading/trailing
  icon slots, `loading`.
- **Overlays**: `open` bindable, `onOpenChange`, `placement`/`side`/`align`/
  `offset`, `portal` (bool/selector), `trapFocus`, `closeOnEscape`,
  `closeOnBackdrop`, `lockScroll`, `zIndex`, `enter`/`exit` animation,
  `restoreFocus`.
- **Buttons/actions**: variants (`primary|secondary|outline|ghost|icon|danger`),
  `type`, `loading` (spinner + `aria-busy`), icon-only.
- **Events**: dual `on:click` + `onclick` chaining (iv-ui convention),
  cancel/confirm/semantic events on overlays.
- **A11y**: correct roles (dialog, menu, tablist, switch, listbox), focus-visible
  ring token, `aria-current`/`aria-selected`, reduced-motion.

### 2d. Typography system spec

iv-ui now ships the typography system described below (implemented in
`tokens.css` + `typeset.css`):

1. **Extended scale with roles** — Display / Heading (1–3) / Subheading / Title /
   Body / Small / Caption / Mono. Each: size, weight, line-height, letter-spacing,
   all as `--iv_text-*` / `--iv_leading-*` / `--iv_tracking-*` tokens.
2. **Hierarchy rules** — body 400 / label 500 / headings 600–700 (matches
   DESIGN.md's "same family, heavier weight" rule), mono only for data (Kbd,
   inputs, code).
3. **A `typeset`/`iv-prose` stylesheet** — the shadcn idea:
   `--iv-typeset-size`, `--iv-typeset-leading`, `--iv-typeset-flow` drive all
   prose styling for markdown/renderable content; `:where()` zero-specificity;
   token colors; presets per context (docs vs chat). The existing `Article`
   component is a thin wrapper over it.
4. **Measure control** — `--iv_article-width` exists (880px) + `--iv_typeset-measure`
   (68ch) cap line length on typeset containers.

---

## 3. Phased plan (4 phases, value-ordered)

Each phase ends "shippable + documented" — new components ship with stories +
a11y checks, per AGENTS.md.

### Phase 1 — Foundations & contract (make the base complete)

*Goal: every existing component token-pure, an API contract, and a real
typography system.*

- [x] Token completion in `tokens.css`: semantic pairs for card/popover/muted/
      accent/destructive; radius derived scale from `--iv_radius`; line-height +
      tracking + weight tokens; progress/skeleton/table/avatar/badge size tokens;
      reduced-motion + per-context motion tokens.
- [x] Typography: extend scale to Display→Caption; add `iv-prose` typeset
      stylesheet with size/leading/flow controls; align `Article` to it.
- [x] Write `COMPONENTS.md`: the universal contract (2c) so all future components
      are consistent.
- [x] A11y sweep: fix focus-visible, roles, `aria-*`, reduced-motion across
      existing components (use the a11y Storybook addon as the checklist).
- [x] Add Foundation stories (tokens, type, colors, states).

**Done when:** no raw hex or raw font-size in any component, all components pass a11y
audit, typography documented and showcased.

### Phase 2 — High-value core (the gap-closers)

*Goal: the components 80% of real apps need on day one.*

- [x] **Label/Field** wrapper (label, helper, error, required, layout)
- [x] **Badge**, **Skeleton**, **Progress**, **Alert**, **Empty state**
- [x] **Button Group**, **Input Group** (prefix/suffix), Button internal `loading`
- [x] **Avatar**, **Native Select**, **Breadcrumb**
- [x] Stories for each new component (browser test runner wired via
      `@storybook/addon-vitest`; running requires chromium system deps)

**Done when:** form-building is fully covered (label→input→error) and the
feedback set is complete.

### Phase 3 — Power-user components

*Goal: advanced interactions for denser products.*

- [x] **Context Menu** (reuse Menu/Popover internals — cheap win)
- [ ] **Table** + **Pagination** (sorting-ready, token-styled, scrollable)
- [x] **Toggle / Toggle Group**, **Collapsible**
- [ ] **Drawer** (mobile sheet), **Command palette** (stretch — do last, skip if
      time-boxed)

**Done when:** the catalog matches the "complete" list in 2b with all stories
passing.

### Phase 4 — Distribution & DX polish

*Goal: make it a library people (you) can adopt in 5 minutes.*

- [ ] Showcase app → real docs: foundation pages + live per-component playground
      with dark/light toggle.
- [ ] Package polish: export every new component from `index.ts`, green `publint`,
      tree-shaking sanity, types coverage.
- [ ] Theming guide: how to override tokens / theme presets (brass variants),
      dark/light opt-out.
- [ ] CI: `lint && check && vitest` gate, semantic versioning + changelog,
      automated storybook test run.
- [ ] Optional stretch: registry/CLI or copy-paste snippets, `llms.txt` + AI docs
      for the library.

**Done when:** `bun i @elluzion/iv-ui` + one import + `theme.css` = a working
app shell.
