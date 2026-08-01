# Component Plan — iv-ui

## Phase 2 — Layout & surface

- [ ] **Card**
  - `--ink-2` bg, `--radius-lg`, `1px solid var(--line)` border
  - Optional header (title + action slot), body, footer slots
  - Padding variants: sm/md/lg
  - Hover: border brightens to `--line-hover` (never lifts, never shadows per §5)

- [ ] **Separator**
  - Horizontal or vertical: `1px solid var(--line)`
  - Optional label (horizontal only, centered text)
  - Margins: sm/md/lg

- [ ] **Tabs**
  - Tab list: horizontal row, no border container
  - Active tab: `--paper` text, optional bottom border accent (`--paper`)
  - Inactive tab: `--paper-dim` text, hover → `--paper`
  - Tab panel for content via snippets
  - Sizes: sm/md

- [ ] **Accordion**
  - Collapsible sections, single or multiple open
  - Trigger: full-width button row, chevron icon rotates 180deg on open (120ms transition)
  - Panel: `--ink-2` bg, content snippet
  - Border between items: `1px solid var(--line)`

- [ ] **Sheet / Drawer**
  - Side panel overlay (left/right/bottom)
  - Same backdrop + transition as Dialog (`fade` + directional `fly`)
  - `--ink-2` panel, `--shadow-lg`
  - Header (title + close), body content slot, optional footer
  - Sizes: sm/md/lg/full

---

## Phase 3 — Overlay & floating

- [ ] **Tooltip**
  - Small `--ink-2` pill, `--paper` text, 10.5px font, `--shadow-md`
  - 4–6px padding, `--radius-pill`, no border
  - Positions: top/bottom/left/right, auto-flip on edge collision
  - 300ms show delay, instant hide, `fade` transition
  - Trigger via hover or focus

- [ ] **Popover**
  - Floating panel: `--ink-2` bg, `--shadow-lg`, `--radius-lg`, `1px solid var(--line)`
  - Anchor to trigger element, positions top/bottom/left/right with auto-flip
  - Close on outside click + escape
  - Arbitrary content snippet inside

- [ ] **DropdownMenu**
  - Built on Popover (shared anchoring/closing logic)
  - Trigger: button or any slotted element
  - Menu items: icon + label row, hover highlights with `--surface-hover`
  - Separator between groups (`--line`)
  - Sub-menus (nested flyout), keyboard navigation (arrows, enter, escape)

- [ ] **ContextMenu**
  - Built on DropdownMenu but triggered by `contextmenu` event at cursor position
  - Same item/separator/keyboard patterns

- [ ] **Command / Palette**
  - Modal overlay (`fade` + `scale`, `--shadow-lg`, `--radius-lg`)
  - Search input at top (auto-focused, `--font-mono`)
  - Result list: rows with icon + label, optional description, optional shortcut (KBD)
  - Active item highlighted with `--surface-hover`
  - Keyboard: arrows + enter + escape, `cmd+k` to open
  - Empty state when no results

---

## Phase 4 — Data display

- [ ] **Badge / Chip**
  - `--ink-3` bg, `--line` border, `--radius-pill`, 10.5px font, 600 weight
  - Semantic text colors: moss/rust/brass/info on neutral bg (never colored fill per §8)
  - Optional dismiss button (X icon)
  - Sizes: sm/md

- [ ] **Avatar**
  - `--radius-pill` circle, `--ink-3` bg
  - Image mode: `<img>` with fallback initials
  - Initials mode: centered text, `--paper` color, 600 weight
  - Status dot overlay (bottom-right, moss/rust/paper-dim)
  - Sizes: xs/sm/md/lg

- [ ] **Table**
  - Full-width, `--ink` background (no card wrapper unless explicitly placed in one)
  - Header row: `--paper-dim` text, 600 weight, bottom border `1px solid var(--line)`
  - Body rows: alternating `--ink` / `--ink-2`, hover brightens border
  - Sortable columns (indicator icon), selectable rows (checkbox column)
  - `--font-mono` for numeric columns, `--font-sans` for text

- [ ] **Progress**
  - Horizontal bar: `--ink-3` track, `--radius-pill`
  - Fill: `--paper-dim` (not `--brass`), `--radius-pill`, no animation unless indeterminate
  - Indeterminate: animated shimmer moving left-to-right
  - Optional label (percentage) on right
  - Sizes: sm/md

- [ ] **Skeleton**
  - Animated placeholder for loading content
  - Shapes: text line, circle (avatar), rectangle (card/image)
  - Subtle pulse animation (opacity 0.1–0.2), no shimmer by default per §11
  - `--ink-2` fill, `--radius` corners
  - Accepts dimensions or auto-sizes via CSS

- [ ] **KBD**
  - Keyboard shortcut display: `--ink-3` bg, `--line` border, `--radius-sm`
  - `--font-mono`, `--paper-dim` text, 10.5px
  - Small padding, tight tracking

- [ ] **EmptyState**
  - Centered layout: optional icon (40px, `--paper-dim`), title (`--paper`, 600), description (`--paper-dim`)
  - Optional action button slot

---

## Phase 5 — Feedback

- [ ] **Alert / Banner**
  - Inline notification bar (not floating like Toast)
  - `--ink-2` bg, `--line` border, `--radius`, full width
  - Types: info (`--info` icon), success (`--moss` icon), warning (`--rust` icon), error (`--rust` bg tint)
  - Optional title + description, optional dismiss button
  - `fade` + `fly` transition on enter/exit

---

## Phase 6 — Navigation

- [ ] **Breadcrumb**
  - Horizontal list: items separated by `/` or chevron icon (`--paper-dim`)
  - Last item: `--paper` color, not a link
  - Previous items: `--paper-dim`, hover → `--paper`
  - Collapsed variant: truncates middle items with `...`

- [ ] **Pagination**
  - Row layout: prev button, page numbers (or truncation dots), next button
  - Active page: `--paper` bg pill (`--radius-pill`), `--ink` text
  - Inactive pages: ghost-style buttons
  - Sizes: sm/md
  - Compact variant: just prev/next with "Page X of Y"

- [ ] **Link**
  - Inline text link: `--paper` color, underline on hover only
  - External link variant (icon indicator)
  - Props: `href`, `target`, `disabled`
  - Accepts `on:click` for client-side routing

---

## Phase 7 — Media

- [ ] **AspectRatio**
  - Container that maintains a fixed aspect ratio (e.g. 16/9, 4/3, 1/1)
  - Children fill the container
  - `--radius` corners, `--ink-2` bg as placeholder
  - Overflow hidden

---

## Phase 8 — Polish & package

- [ ] Audit all components for hardcoded hex/rgba values — replace with token references
- [ ] Ensure all components accept both `on:event` and `onevent` props consistently
- [ ] Add `restProps` (`$$restProps` equivalent) forwarding on all components
- [ ] Write Storybook stories for every component with play functions for interaction tests
- [ ] Add Vitest browser tests for critical interaction paths (form submit, keyboard nav, focus management)
- [ ] Accessibility audit: focus traps, ARIA labels, keyboard navigation, screen-reader announcements
- [ ] Generate Svelte 5 types (`$bindable`, `Snippet`, etc.) export
- [ ] Update `src/lib/index.ts` with all new component and store exports
- [ ] Review DESIGN.md checklist (§13) for each component before shipping
- [ ] Update `package.json` exports if new CSS entry points are added
- [ ] Write migration guide / changelog for v0.1.0 release
