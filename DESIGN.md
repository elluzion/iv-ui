---
name: iv-ui
description: A monochrome, hairline-bordered Svelte 5 component library with a single brass accent and color used only as signal.
colors:
  primary: '#c7a24a'
  primary-dim: '#7d6a3c'
  success: '#7c9b7c'
  success-dim: '#5a7a5a'
  error: '#f08858'
  error-dim: '#da7550'
  info: '#5d8ee8'
  info-dim: '#3a6fcc'
  neutral-bg: '#000000'
  neutral-raised: '#141415'
  neutral-elevated: '#1e1e20'
  neutral-hover: '#242427'
  foreground: '#fafafa'
  foreground-dim: '#8e8e93'
  foreground-hover: '#e4e4e4'
  border: '#2a2a2d'
  border-hover: '#3a3a3d'
  border-focus: '#4a4a4d'
typography:
  title:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: '1.1rem'
    fontWeight: 600
  body:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: '0.9rem'
    fontWeight: 400
  label:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: '0.85rem'
    fontWeight: 500
  mono:
    fontFamily: "'IBM Plex Mono', monospace"
rounded:
  sm: '10px'
  md: '14px'
  lg: '20px'
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
    rounded: '{rounded.pill}'
    padding: '9px 18px'
  button-primary-hover:
    backgroundColor: '{colors.foreground-hover}'
  button-secondary:
    backgroundColor: '{colors.neutral-elevated}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.pill}'
    padding: '9px 18px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    rounded: '{rounded.pill}'
    padding: '9px 18px'
  button-danger:
    backgroundColor: '{colors.error}'
    textColor: '{colors.neutral-bg}'
    rounded: '{rounded.pill}'
  card:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.md}'
    padding: '16px 14px'
  input:
    backgroundColor: '{colors.neutral-raised}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
  checkbox:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.sm}'
  chip:
    backgroundColor: '{colors.neutral-elevated}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.pill}'
  dialog:
    backgroundColor: '{colors.neutral-raised}'
    rounded: '{rounded.lg}'
---

# Design System: iv-ui

## Overview

**Creative North Star: "The Monochrome Atelier"**

iv-ui is a component library for quiet, precise, tool-like interfaces. It is black-and-white by conviction, not by neglect: the interface is a black workbench where structure comes from hairline seams rather than shadow, and the only brass in the room is reserved for the few instruments that must be found instantly. This is a shadcn/ui-inspired monochrome dark system — pure black canvas, 1px borders instead of drop-shadow depth, pill-shaped controls, and color used only as a sparing signal, never as decoration.

Density is tight and intentional: buttons, chips, and the search trigger are full pills; cards, inputs, and list rows are rounded rectangles in a 10–20px band; nothing on screen has a sharp or near-sharp corner. The default theme is dark (`#000000` canvas), with a full light-theme mirror (`#ffffff`) applied automatically via `prefers-color-scheme` or explicitly through `data-theme` / `.theme-*` classes. Radii, shadows, and fonts are theme-agnostic — only colors flip.

The aesthetic philosophy is restraint as craft. Depth is communicated by a four-layer surface stack, each layer one step lighter than the one below, never by gradients, never by hover-lift. Interaction feedback is physical but muted: buttons press down (`scale(0.98)` on `:active`), borders brighten on hover, and nothing floats unless it genuinely overlays the page. Confirmed visual rejection: generic AI "lift" patterns — drop shadows or `translateY` motion on page-level cards.

**Key Characteristics:**

- Pure black canvas (dark) / pure white canvas (light), built up through exactly four gray surface layers.
- Hairline `1px` borders create all on-page structure; shadows belong only to overlays.
- Every interactive shape is a pill or a rounded rectangle — nothing sharper than a 10px radius.
- Exactly one accent (brass) plus three semantic tones (success / error / info), applied to small marks only.
- One sans-serif family for all UI; monospace reserved for literal data.
- Short, physical motion (120–180ms) that brightens borders and presses down — no lifts, no reveals.

---

## Colors

The palette is a monochrome gray ladder with one brass accent and three semantic tones. Dark-theme values below are canonical (dark is the default); a mirrored light theme lives in `src/lib/theme/tokens.css` and swaps values under `prefers-color-scheme: light` or `[data-theme="light"]`.

### Primary

- **Brass** (#c7a24a): The single accent. Status dots (≤8px), citation markers in chat, links, the selected-card border, and low-opacity focus rings. Never a button fill, never a card background.
- **Brass-dim** (#7d6a3c): Muted accent for hovered/subdued accent treatments.

### Neutral

- **Surface (Canvas)** (#000000): The page background. Sidebar, center panel, chat panel. Pure black, not dark gray — this is a doctrine, not a choice.
- **Surface-raised** (#141415): First layer. Cards, list rows, dialogs, the search trigger, chat input — anything that reads as a discrete block on the page.
- **Surface-elevated** (#1e1e20): Second layer. Button backgrounds, controls nested inside a raised element (e.g. an input inside a dialog).
- **Surface-hover** (#242427): Hover state of an elevated surface (secondary button hover).
- **Foreground** (#fafafa): Primary text, headings, active icons, and the primary button fill.
- **Foreground-dim** (#8e8e93): Secondary text, placeholders, meta, inactive icons.
- **Foreground-hover** (#e4e4e4): Primary button hover fill + border.
- **Border** (#2a2a2d): The default hairline, everywhere.
- **Border-hover** (#3a3a3d): Border color on hover.
- **Border-focus** (#4a4a4d): Border color on focus (inputs).

### Semantic

- **Success** (#7c9b7c): Positive/active state only — status dots, positive deltas, toast icons.
- **Error** (#f08858): Error, destructive, and attention states — error borders, danger buttons, error toasts. (Doubles as the error border color.)
- **Info** (#5d8ee8): Informational signals — toasts, badges.

### Named Rules

**The Signal Rule.** Color appears on roughly 2% of visible pixels. The primary accent is used on ≤10% of any given screen; its rarity is the point. If unsure whether something should be colored, it shouldn't be.

**The One-Accent Rule.** Exactly one accent hue and three semantic tones — that is the entire palette. No second accent "for variety," no color gradients, ever.

---

## Typography

**Body Font:** Atkinson Hyperlegible Next (with `system-ui, sans-serif` fallback) — used for everything, including headings. Headings are the same family at heavier weight (600–700) and larger size; there is no display serif.
**Label Font:** Atkinson Hyperlegible Next, weight 500, for form labels and small meta.
**Mono Font:** IBM Plex Mono (with `monospace` fallback) — for data only: timestamps, keyboard shortcuts, code fragments, source counts, and input/textarea values.

**Character:** A single warm-humanist sans carries the whole interface; the only typographic contrast is the cold precision of the mono face reserved for literal data. The pairing reads as "human voice, machine numbers."

### Hierarchy

- **Title** (600, 1.1rem, no cap): Dialog and sheet titles. Truncates with ellipsis on overflow.
- **Body** (400, 0.9rem): Default text, radio/checkbox/switch labels.
- **Label** (500, 0.85rem): Form labels, card descriptions, select empty state.
- **Mono** (400, 1rem): Input, textarea, and select trigger values; chips use `--iv_text-chips` (10.5px) or `--iv_text-chips-sm` (13px).

Text scale is tokenized (`--iv_text-xs` 0.75rem through `--iv_text-xl` 1.1rem); never set a raw `rem`/`px` in a component.

### Named Rules

**The One-Family Rule.** Never pair a display serif with the body sans, never introduce a second UI typeface. One sans, one mono, nothing else.

**The Mono-For-Data Rule.** Monospace is for literal data only — never a page title, button label, or prose.

---

## Layout

The spatial model is a compact three-pane workbench: a fixed-width left sidebar (~230px), a fluid center panel, and a fixed-width right panel (~340px) for contextual chat. Below ~980px the right panel collapses and the sidebar shrinks to icon-only — the sidebar is never hidden entirely.

Content columns are capped at ~880px and centered even inside a fluid panel; unbounded line length is a readability bug.

Spacing follows a tight 4px-based rhythm (`4 / 8 / 12 / 16 / 20 / 24px`): card padding uses 14–20px on x, 10–20px on y; section gaps run 8–16px; component-internal gaps run 4–8px. Density is compact — this is a workbench, not a magazine.

### Named Rules

**The Grid-or-List Rule.** A screen is either a two-column card grid (browse-and-pick, e.g. a dashboard project list) or single-column bordered list rows (scan-many-act-on-one, e.g. a sources or activity list) — never both for the same collection.

**The Icon-Label Rule.** When a sidebar collapses to icon-only, never hide labels with a bare element selector (`span`/`div`) — you will hide the icon spans too. Give icons a dedicated class and scope the hiding rule to it.

---

## Elevation & Depth

Depth is tonal layering, not shadow. The interface is a stack of exactly four gray layers — Canvas, Raised, Elevated, Hover — each one step lighter than the layer beneath it. A discrete element sits one layer above its parent; its hover state sits one layer above its resting state. Never skip a layer, and never make a hover state darker than its resting state. A translucent `surface-overlay` (white 8–10%) provides hover tinting on raised surfaces.

Shadows exist for one job only: proving that something floats above the page. Overlays — modal dialogs, the command palette, popovers, tooltips, toasts — cast the deep shadows below. Page-level cards and rows never do.

### Shadow Vocabulary

- **Ambient-low** (`0 1px 2px rgba(0,0,0,0.5)`): Subtle overlay.
- **Ambient-md** (`0 4px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.4)`): Toasts, tooltips, popovers.
- **Ambient-lg** (`0 24px 60px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)`): Modal dialogs, the command palette.

Dialog backdrops combine a 40% black scrim with a 12px backdrop blur.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Hover state is a brighter border or lighter fill, never a shadow and never a lift. Shadows appear only on elements that genuinely overlay the page.

---

## Shapes

The form language is "pill or rounded rectangle — nothing sharp." Interactive controls that a finger or cursor presses — buttons, chips, badges, the search trigger, tooltips — are full pills (`999px` radius). Structural containers — cards, inputs, selects, list rows — are rounded rectangles in a 10–20px band (`sm` 10px, `md` 14px, `lg` 20px). No corner on any surface is sharper than 10px.

Selected states are signaled with the brass border rather than a fill; checkboxes and small controls use the 10px `sm` radius; dialogs and large cards use the 20px `lg` radius.

---

## Components

### Buttons

- **Shape:** Full pill (`999px` radius), 1px border, 9px 18px padding at default size (sm 5px 13px, lg 12px 24px). Font weight 600 (700 for primary).
- **Primary:** Foreground fill (`#fafafa`), inverse text (`#000000`). Hover brightens to `foreground-hover`. Used once per view, for the single most important action.
- **Secondary (default):** Elevated fill (`#1e1e20`), foreground text, hairline border. This is the workhorse — most buttons on screen are secondary. Hover: brighter border + `surface-hover` fill.
- **Outline:** Secondary but transparent background (rare third tier).
- **Ghost:** No border, transparent background.
- **Icon:** Transparent, no padding, dim icon brightening to foreground on hover.
- **Danger:** Error fill (`#f08858`), inverse text, darkens to `error-dim` on hover.
- **Hover / Focus:** Border brightens and fill lightens (120–150ms). `:active` presses down to `scale(0.98)`. Focus shows a 3px neutral ring (`0 0 0 3px rgba(255,255,255,0.06)`).
- **Disabled:** Raised background, dim text, 50% opacity, `not-allowed` cursor.

**Never** give a button a brass or colored fill; **never** use a corner radius that isn't a full pill.

### Cards / Containers

- **Corner Style:** 14px default, 20px for large cards.
- **Background:** Raised surface (`#141415`), 1px border.
- **Shadow Strategy:** None — Flat-By-Default (§Elevation).
- **Internal Padding:** 16px x-axis / 14px y-axis default (12/10 sm, 20/20 lg).
- **States:** Hover brightens the border only; selected swaps the border to brass; clickable cards are keyboard-accessible and press with the same border-brighten treatment. Header carries a hairline bottom border; footer a hairline top border.

### Inputs / Fields

- **Style:** Rounded rectangle (`14px`), raised background, 1px border, mono values, 9px 13px padding. Buttons and chips are pills; fields are rounded rects — never the reverse.
- **Focus:** Border shifts to `border-focus` plus a 3px neutral ring (`0 0 0 3px rgba(255,255,255,0.1)`). Neutral ring, not accent — accent rings only on a control that is accent-accented elsewhere (rare).
- **Hover:** Border brightens (`border-hover`).
- **Error:** Border turns error (`#f08858`); focus ring becomes a soft error tint.
- **Placeholder / Helper:** Always `foreground-dim`; error message text in error color.
- **Disabled:** 50% opacity. Inside a dialog, fields step up a layer to `surface-elevated`.

### Chips / Badges / Pills

- **Style:** Full pill, `surface-elevated` fill, 1px border, 10.5px bold (600) text (`--iv_text-chips`). Multi-select chips in a select use a translucent overlay fill, mono 10.5px (`--iv_text-chips`), and a 1px border.
- **Rule:** Text color may carry a semantic tone (success/error/accent) to convey meaning, but the chip background stays neutral gray — never fill a chip with a semantic color.

### Checkbox / Radio / Switch

- Small 10px-radius boxes (16px sm / 20px md) with a raised fill and 1px border; the checked state fills with `foreground` and inverse check glyph. Focus draws a 2px `foreground` outline at 2px offset.

### Dialog / Sheet

- **Shape:** 20px radius, raised fill, hairline border, `ambient-lg` shadow, 400/520/640px widths (small/default/large).
- **Backdrop:** 40% black scrim with 12px blur; content fades in, the panel scales from 0.95 (150ms). Title at 1.1rem/600; footer buttons right-aligned with 8px gaps.

### Tooltip / Toast

- Tooltips are full pills (elevated fill, 4px 12px padding, 8px gap from the anchor, `ambient-md` shadow, 300ms hover delay). Toasts are 14px rounded rects with a raised fill, hairline border, `ambient-md` shadow, a semantic icon (success/error/info), and a dim close button; they fly up 16px in 160ms.

### Navigation / Tabs

- Text-based tabs with the active tab in `foreground` and a dim inactive state; optional bordered container (14px radius). No underline/pill fill — selection is signaled by color and weight.

---

## Do's and Don'ts

### Do:

- **Do** keep the canvas pure black (dark) / pure white (light) and build depth with the four-layer surface stack.
- **Do** make every button and chip a full pill and every card/input a rounded rectangle in the 10–20px band.
- **Do** use hairline `1px` borders for on-page depth; save shadows for dialogs, popovers, tooltips, and toasts.
- **Do** keep color to one accent + three semantic tones, applied to small marks only.
- **Do** brighten a border or fill on hover; press buttons down with `scale(0.98)` on `:active`.
- **Do** reference every color through `--iv_*` tokens from `src/lib/theme/tokens.css` — never hardcode a hex/rgba in a component.

### Don't:

- **Don't** fill a button or a large surface with the accent color.
- **Don't** add a second typeface (serif, display font, alternate sans) for "personality."
- **Don't** use drop shadows or `translateY` hover-lift on inline cards or list rows — that "lift" reads as generic AI-generated UI.
- **Don't** use sharp or barely-rounded corners anywhere; minimum radius is 10px, except full pills.
- **Don't** introduce gradients, color fills for whole sections, or a second accent hue.
- **Don't** hide sidebar labels with a bare element selector inside a component that also contains an icon in that same element type — scope hiding rules to a dedicated icon class.
- **Don't** mix card-grid and list-row treatments for the same collection on the same screen.
- **Don't** set a raw `rem`/`px` font size in a component — use the tokenized `--iv_text-*` scale.
