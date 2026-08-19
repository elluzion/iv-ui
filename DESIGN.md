---
name: iv-ui
description: A mono-forward, sharp-cornered Svelte 5 component library: a black console built on hairline frames, reverse-video selection, and one hardened brass cursor.
colors:
  primary: '#c7a24a'
  primary-dim: '#8a6f2f'
  neutral-bg: '#000000'
  neutral-raised: '#101011'
  neutral-elevated: '#18181a'
  neutral-hover: '#1f1f22'
  foreground: '#f2f2f2'
  foreground-dim: '#8a8a90'
  foreground-hover: '#dcdcdc'
  border: '#26262a'
  border-hover: '#3a3a3f'
  border-focus: '#4a4a50'
  success: '#7c9b7c'
  error: '#e0503a'
  info: '#5d8ee8'
  reverse-bg: '#f2f2f2'
  reverse-fg: '#000000'
  cursor: '#c7a24a'
typography:
  title:
    fontFamily: "'Sora', system-ui, sans-serif"
    fontSize: '1.1rem'
    fontWeight: 600
  body:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: '0.9rem'
    fontWeight: 400
  label:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: '0.85rem'
    fontWeight: 500
  mono:
    fontFamily: "'IBM Plex Mono', monospace"
rounded:
  sm: '0px'
  md: '4px'
  lg: '8px'
  pill: '999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '20px'
  xl: '24px'
components:
  button-primary:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.neutral-bg}'
    rounded: '{rounded.sm}'
    padding: '10px 20px'
  button-primary-hover:
    backgroundColor: '{colors.foreground-hover}'
  button-secondary:
    backgroundColor: '{colors.neutral-elevated}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '10px 20px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '10px 20px'
  button-danger:
    backgroundColor: '{colors.error}'
    textColor: '{colors.neutral-bg}'
    rounded: '{rounded.sm}'
  card:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.md}'
    padding: '14px 16px'
  input:
    backgroundColor: '{colors.neutral-raised}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
  checkbox:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.sm}'
  chip:
    backgroundColor: '{colors.neutral-elevated}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
  dialog:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.lg}'
---

# Design System: iv-ui

## Overview

**Creative North Star: "The Instrument Console"**

iv-ui is a component library for tool-like interfaces built as a terminal console.
The Monochrome Atelier is gone; in its place a black workbench where structure
comes from sharp hairline frames, selection is a reverse-video cursor block, and
the single brass accent is hardened into block carets and bracket marks — never a
glow, never a pill. This is the anti-shadcn: no soft rounded cards, no layered
pastel surfaces, no accent-glowing buttons.

Density stays tight and intentional: every control and container is a sharp
square (`0px` controls, `4px` containers, `8px` dialogs); circles survive only
where shape is semantic (avatars, radio, status dots, spinners). The canvas is
pure black by default, with a full light-theme mirror applied via
`prefers-color-scheme` or `data-theme` / `.theme-*`. Radii, fonts, and cues are
theme-agnostic — only colors flip.

The aesthetic philosophy is instrument discipline: depth from hairline seams,
feedback from cursor-state changes (hover brightens a border, active toggles
reverse-video), and motion cut short and physical. Confirmed rejections: drop
shadows on page-level surfaces, pill-shaped anything, gradient/generic AI
lift patterns, and brass used as a decorative fill.

**Key Characteristics:**

- Pure black canvas (dark) / pure white canvas (light), four gray surface layers.
- Hairline `1px` borders create all on-page structure; shadows belong to overlays.
- Every control is a sharp square; containers rest at 4px, dialogs and sheets at 8px.
- Exactly one accent (brass) plus three semantic tones, hard-edged and small.
- Mono-forward type: IBM Plex Mono is the UI voice; Sora is reserved for headings and prose.
- Terminal state grammar: reverse-video selection, block cursors, box-drawing brackets.
- Short, physical motion (100–180ms) — no lifts, no reveals, all zeroed under reduced motion.

---

## Colors

The palette is a monochrome gray ladder with one brass accent and three semantic
tones. Dark-theme values below are canonical; the mirrored light theme lives in
`src/lib/theme/tokens.css` and swaps values under `prefers-color-scheme: light`
or `[data-theme="light"]`.

### Primary

- **Brass** (#c7a24a): The single accent. Block cursors, active nav marks, slider
  fill, progress fill, checked switch, focus carets, bracket accents. Never a
  button fill, never a card background, never a glow.
- **Brass-dim** (#8a6f2f): Muted accent for hovered/subdued treatments and link underlines.

### Neutral

- **Surface (Canvas)** (#000000): The page background. Pure black, not dark gray.
- **Surface-raised** (#101011): First layer. Cards, dialogs, menus, inputs.
- **Surface-elevated** (#18181a): Second layer. Button and control backgrounds.
- **Surface-hover** (#1f1f22): Hover state of an elevated surface.
- **Foreground** (#f2f2f2): Primary text, active icons, the primary button fill.
- **Foreground-dim** (#8a8a90): Secondary text, placeholders, meta, inactive icons.
- **Foreground-hover** (#dcdcdc): Primary button hover fill.
- **Border** (#26262a): The default hairline, everywhere.
- **Border-hover** (#3a3a3f): Border color on hover.
- **Border-focus** (#4a4a50): Border color on focus (inputs).
- **Ring** (white 12%): Focus ring backdrop.

### Reverse Video

The terminal distinction: `--iv_reverse-bg` (foreground) filling a block with
`--iv_reverse-fg` (surface) text — the material of active menu items, selected
listbox options, active tabs, and checked toggles. Hover keeps `--iv_reverse-hover`.

### Semantic

- **Success** (#7c9b7c): Positive/active states — status dots, positive deltas, toasts.
- **Error** (#e0503a): Error, destructive, and attention states. (Doubles as the error border.)
- **Info** (#5d8ee8): Informational signals — toasts, badges, alerts.

### Named Rules

**The Signal Rule.** Color appears on roughly 2% of visible pixels. The primary
accent is used on ≤10% of any screen; its rarity is the point.

**The One-Accent Rule.** Exactly one accent hue (brass) and three semantic tones
— that is the entire palette. No second accent, no gradients, ever.

---

## Typography

**UI Voice: IBM Plex Mono** (`--iv_font-ui`) is the default face for the entire
interface — labels, buttons, tabs, menu items, form values, meta, navigation.
This reverses the old mono-for-data-only rule: here the console speaks in mono.

**Heading & Prose Face: Sora** (`--iv_font-sans`) is reserved for page titles,
dialog/sheet/card titles, alert titles, empty-state titles, and article prose.
Prose body and headings render in Sora via the `iv-prose` typeset.

**Character:** The cold precision of the mono face carries the work; the warm
geometric sans speaks only when something needs a voice. The pairing reads as
"machine console, human heading."

### Hierarchy

- **Title** (Sora, 600, 1.1rem): Dialog/sheet/card titles. Truncates with ellipsis.
- **Heading 1–3** (Sora, 600, 1.5 → 1.1rem): Page and section headings.
- **Button / Tab** (Plex Mono, 600, 0.95rem): Control labels.
- **Label** (Plex Mono, 500, 0.85rem): Form labels, menu section headers (uppercase, tracked).
- **Body** (Plex Mono, 400, 0.9rem): Default text.
- **Small / Caption** (Plex Mono, 400, 0.8/0.75rem): Secondary and meta text.
- **Mono values** (Plex Mono, tabular-nums): All data, SHAs, timestamps, code.

Text scale is tokenized (`--iv_text-xs` 0.75rem through `--iv_text-xl` 1.1rem,
plus the display/heading scale); never set a raw `rem`/`px` in a component.

### Named Rules

**The Mono-Is-The-Voice Rule.** The UI speaks in Plex Mono. Sora appears only on
headings and prose — never a button, a menu item, or a label.

**The Measure Rule.** Prose lines are capped at ~68ch; content columns at ~880px.

---

## Layout

The spatial model is a three-pane workbench: a fixed left sidebar (~232px), a
fluid center panel, and a contextual right panel — used by the showcase and left
to consumer apps. Content columns are capped and centered even inside a fluid
panel; unbounded line length is a readability bug.

Spacing follows a tight 4px-based rhythm (`2 / 4 / 8 / 12 / 16 / 20 / 24px`):
card padding 14–20px on x; section gaps 8–16px; component-internal gaps 4–8px.

### Named Rules

**The Grid-or-List Rule.** A screen is either a two-column card grid (browse-and-
pick) or single-column bordered list rows (scan-many-act-on-one) — never both for
the same collection.

**The Icon-Label Rule.** When a sidebar collapses to icon-only, never hide labels
with a bare element selector — scope hiding rules to a dedicated icon class.

---

## Shapes

The form language is "sharp square, or tiny container radius — never a pill."
Controls — buttons, inputs, chips, tabs, toggles, switch tracks and thumbs,
slider thumbs, progress rails, select triggers and dropdowns — are `0px` squares.
Containers — cards, menus, popovers, tooltips, toasts, alerts — rest at `4px`.
Large surfaces — dialogs and sheets — use `8px`. Circles (`pill`) exist only where
shape carries semantic meaning: avatars, radio dots, status dots, spinners,
skeleton circles. Nothing else rounds.

### Named Rules

**The Sharp-By-Default Rule.** When in doubt, square. A corner rounds only when a
container needs to read as a discrete object at rest, and even then it is 4px.
A pill is never the answer.

---

## Elevation & Depth

Depth is tonal layering plus hairline seams, not shadow. The interface is a
stack of exactly four gray layers — Canvas, Raised, Elevated, Hover. A discrete
element sits one layer above its parent; its hover state one layer above its
resting state. Never skip a layer, never make a hover darker than rest.

Shadows exist for one job: proving something floats above the page. Overlays —
dialogs, popovers, menus, tooltips, toasts — cast the ambient shadows below.
Page-level surfaces never do.

### Shadow Vocabulary

- **Ambient-low** (`0 1px 2px rgba(0,0,0,0.55)`): subtle overlay.
- **Ambient-md** (`0 4px 20px rgb(0,0,0,.5), 0 1px 3px rgb(0,0,0,.45)`): toasts, tooltips, popovers.
- **Ambient-lg** (`0 24px 60px rgb(0,0,0,.65), 0 2px 6px rgb(0,0,0,.45)`): modal dialogs, sheets.

Dialog backdrops combine a 50% black scrim with a 12px backdrop blur.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest; hover is a brighter
border or lighter fill, never a shadow and never a lift. Shadows appear only on
elements that genuinely overlay the page.

---

## Components

### Buttons

- **Shape:** Sharp square (`0px`), 1px border, 10px 20px padding at default size
  (sm 6px 14px, lg 14px 26px). Plex Mono, weight 600 (700 for primary). Presses to
  `scale(0.98)` on `:active`.
- **Primary:** Foreground fill (`#f2f2f2`), inverse text (`#000000`). Hover to `foreground-hover`.
- **Secondary (default):** Elevated fill, foreground text, hairline border. The workhorse.
- **Outline:** Secondary but transparent background.
- **Ghost:** No border, transparent background.
- **Icon:** Transparent, no padding, dim icon brightening to foreground on hover.
- **Danger:** Error fill, inverse text, keeps the error fill on hover with a slight
  brighten (never darkens below the inverse-text contrast floor).
- **Hover / Focus:** Border brightens and fill lightens (100–150ms); focus shows a
  1px ring with the ring token.
- **Disabled:** Dimmed to `--iv_disabled-opacity`, `not-allowed` cursor.

**Never** give a button a brass or colored fill; **never** round it beyond `0px`.

### Cards / Containers

- **Corner Style:** 4px default; `radius="lg"` raises to 8px.
- **Background:** Raised surface (`#101011`), 1px border, no shadow.
- **Internal Padding:** 14px y / 16px x default (10/12 sm, 20/20 lg).
- **Header / Footer:** Hairline bottom/top borders; title in Sora, description in Plex Mono.
- **States:** Hover brightens the border; selected swaps to brass border + a brass
  inset cursor bar; clickable cards are keyboard-accessible.

### Inputs / Fields

- **Style:** Sharp square (`0px`), raised background, 1px border, Plex Mono values,
  10px 15px padding.
- **Focus:** Border shifts to `border-focus`, a 1px neutral ring, and a hard
  `3px` brass cursor bar on the inline-start edge — the terminal prompt marker.
- **Hover:** Border brightens (`border-hover`).
- **Error:** Border turns error; focus ring tints to `error-surface` (no brass bar).
- **Placeholder / Helper:** Always `foreground-dim`; error message text in error color.
- **Disabled:** Dimmed. Inside a dialog, fields step up a layer to `surface-elevated`.

### Chips / Badges

- **Style:** Sharp square, elevated fill, 1px border, Plex Mono, semibold. Multi-select
  chips in a select use an overlay fill and a brighter border.
- **Rule:** Text color may carry a semantic tone to convey meaning, but the chip
  background stays neutral gray — never fill a chip with a semantic color.

### Checkbox / Radio / Switch

- Checkbox: sharp square boxes (16/20px), raised fill, 1px border; checked fills
  with the foreground and an inverse check glyph. Focus = 1px outline offset.
- Radio: semantic circle (16/20px), raised fill; checked fills the dot in foreground.
- Switch: sharp rectangular track (40×22px) with a square block thumb; checked fills
  with the brass cursor and borders brass.

### Tabs

- Active tab is a **reverse-video block** (foreground fill, surface text) with a
  `3px` brass cursor bar at its foot; inactive tabs are dim. Optional bordered
  container at 4px. Keyboard: Arrow/Home/End per tablist pattern.

### Menus / Dropdowns

- Panel: raised surface, hairline border, 0px radius, `shadow-md`.
- Items: Plex Mono; **active (keyboard) and selected (value) render as a
  reverse-video block**; hover shows `surface-hover`. Section headers are
  uppercase, tracked, mono, dim. Shortcuts render as mono kbd chips.

### Dialog / Sheet / AlertDialog

- **Shape:** 8px radius, raised fill, hairline border, `ambient-lg` shadow,
  `sm/md/lg` widths 400/520/640px (sheets 320/440/560px).
- **Backdrop:** 50% black scrim with 12px blur; content fades in, the panel scales
  from 0.95 (130ms). Title in Sora at 1.1rem/600; footer actions right-aligned.

### Tooltip / Toast

- Tooltips are sharp squares (elevated fill, explicit border, `shadow-md`) in Plex
  Mono, ~4px gap from the anchor. Toasts are 0px-radius rects with a raised fill,
  hairline border, `shadow-md`, a left-edge semantic cursor bar, and a dim close
  button; they rise 16px in 140ms.

### Navigation / Tabs (top level)

- Sidebar nav items are ghost buttons with a **brass cursor bar** marking the active
  item; breadcrumbs render in mono with padded focus chips; separators may carry an
  uppercase tracked mono label (`─── LABEL ───`).

### Progress / Slider / Skeleton

- Progress: 0px rails; fill is **brass** (`--iv_cursor`) — trend and value in one bar.
- Slider: 0px track; fill brass; square block thumbs; tick marks square.
- Skeleton: 0px rects/lines, semantic circle only for avatar placeholders.

### Alerts

- 0px-radius blocks with a semantic left-edge cursor bar (success/error/info), a
  Sora title, and Plex Mono body. Semantic-toned surface fills stay muted via `-surface` tokens.

---

## Interaction & Motion

Motion is short, physical, and terminal. Durations: fast 100ms, base 130ms, slow
180ms; motion tokens fade/scale/fly/slide at 130–160ms. All durations zero out
under `@media (prefers-reduced-motion: reduce)` and the `$reducedMotion` store.
State changes read as cursor events: hover brightens a hairline, active/selected
flips reverse-video, focus draws a brass caret. No fade-in-and-lift choreography.

---

## Do's and Don'ts

### Do:

- **Do** keep the canvas pure black (dark) / pure white (light) and build depth
  with hairline seams and four surface layers.
- **Do** make every control a sharp square; rest containers at 4px, dialogs at 8px.
- **Do** use reverse-video (foreground fill, surface text) for selection and active states.
- **Do** use the brass cursor block and box-drawing brackets for the accent —
  never a soft glow or shadow-tinted ring.
- **Do** speak UI in Plex Mono (labels, buttons, menus, values) and reserve Sora
  for headings and prose.
- **Do** reference every value through `--iv_*` tokens from
  `src/lib/theme/tokens.css` — never hardcode a hex/rgba/rem/px in a component.

### Don't:

- **Don't** use friction or decorative fills; brass is a cursor, an edge, or a rail, never a button fill.
- **Don't** add a third typeface or a display serif for personality.
- **Don't** put drop shadows or `translateY` lift on inline cards or list rows.
- **Don't** round a control; pills are banned outside semantic circles (avatar, radio, status, spinner).
- **Don't** introduce gradients, glass, color fills for whole sections, or a second accent hue.
- **Don't** hide sidebar labels with a bare element selector when an icon shares that element type.
- **Don't** set a raw `rem`/`px` font size in a component — use the tokenized `--iv_text-*` scale.