# Design System

This document defines the visual language for this library. The goal is a **monochrome, shadcn/ui-inspired
dark interface**: pure black canvas, hairline borders instead of shadows-as-depth, pill-shaped
controls, and color used only as a sparing signal — never as decoration.

**The single source of truth for tokens and base styles lives in four CSS files:**

- [`src/lib/theme/tokens.css`](src/lib/theme/tokens.css) — all design tokens. Defines both dark (default) and light theme via `:root`, `@media (prefers-color-scheme: light)`, `[data-theme]`, and `.theme-*` classes.
- [`src/lib/theme/base.css`](src/lib/theme/base.css) — body reset, selection color, scrollbar styles.
- [`src/lib/theme/components.css`](src/lib/theme/components.css) — base component styles: buttons, inputs, selects, textareas.
- [`src/lib/theme/theme.css`](src/lib/theme/theme.css) — bundling entry: imports Google Fonts, tokens, base, and components.

Hardcoded hex/rgba values do **not** belong in components. Reference the tokens defined in
`tokens.css` or the pre-built classes in `components.css`.

---

## 0. Theming

All tokens are prefixed `--iv_`. The system supports **dark** and **light** themes.

- **Dark** is the default (`:root`). Explicitly set via `[data-theme="dark"]` or `.theme-dark`.
- **Light** is applied when the system prefers light (`prefers-color-scheme: light`) **and** no explicit dark override is set. Explicitly set via `[data-theme="light"]` or `.theme-light`.

To force a theme, add `data-theme="dark"` or `data-theme="light"` to the `<html>` element, or add the `.theme-dark` / `.theme-light` class.

Radii, shadows, and font families are theme-agnostic (same value in both themes).

---

## 1. Core principles

1. **Black is the base, not a "dark theme."** The dark canvas is `#000000`, not a dark gray. Depth
   comes from layering slightly lighter panels on top of it, not from shadows or gradients. The
   light canvas is `#ffffff` with the same layering principle.
2. **Borders create structure, shadows are for overlays only.** Cards, inputs, and list rows are
   separated by a 1px hairline border. Reserve `box-shadow` for things that float above the
   page: dialogs, the command palette, popovers.
3. **Color is a signal, not a palette.** There is exactly one accent (brass/amber) and two
   semantic colors (success = positive, error = warning/attention). They mark a handful of
   specific things — an active project, a citation, a status dot. Everything else is grayscale.
4. **Every interactive shape is a pill or a rounded rectangle — never sharp corners.** Buttons,
   badges, chips, and the search trigger are fully rounded (`border-radius: 999px`). Cards and
   inputs use large-but-finite radii (10–20px). Nothing in the interface has a 0–4px radius.
5. **One font family for everything.** Do not pair a display serif with a body sans, and do not
   introduce a second UI typeface. Monospace is reserved for data, not for prose or labels.

---

## 2. Design tokens

Defined in [`src/lib/theme/tokens.css`](src/lib/theme/tokens.css). Never hardcode a hex value in a
component — reference the token.

### Surface layers

| Token                   | Dark value               | Light value        | Usage                                                                                                                      |
| ----------------------- | ------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `--iv_surface`          | `#000000`                | `#ffffff`          | Page canvas. Sidebar, center panel, chat panel background.                                                                 |
| `--iv_surface-raised`   | `#141415`                | `#f4f4f5`          | First layer: cards, list rows, dialogs, search trigger, chat input. Anything that reads as "a discrete block on the page." |
| `--iv_surface-elevated` | `#1e1e20`                | `#e4e4e7`          | Second layer: button backgrounds, nested controls inside dialogs.                                                          |
| `--iv_surface-hover`    | `#242427`                | `#d4d4d8`          | Hover state of elevated surfaces (secondary button hover).                                                                 |
| `--iv_surface-overlay`  | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.05)` | Semi-transparent hover overlay on raised surfaces.                                                                         |

### Borders

| Token               | Dark value | Light value | Usage                                |
| ------------------- | ---------- | ----------- | ------------------------------------ |
| `--iv_border`       | `#2a2a2d`  | `#d4d4d8`   | Default hairline border, everywhere. |
| `--iv_border-hover` | `#3a3a3d`  | `#a1a1aa`   | Border color on hover.               |
| `--iv_border-focus` | `#4a4a4d`  | `#71717a`   | Border color on focus (inputs).      |
| `--iv_border-error` | `#f08858`  | `#b03308`   | Border color for error state inputs. |

### Text / foreground

| Token                     | Dark value | Light value | Usage                                               |
| ------------------------- | ---------- | ----------- | --------------------------------------------------- |
| `--iv_foreground`         | `#fafafa`  | `#18181b`   | Primary text, headings, active icons.               |
| `--iv_foreground-dim`     | `#8e8e93`  | `#71717a`   | Secondary text, placeholders, meta, inactive icons. |
| `--iv_foreground-inverse` | `#000000`  | `#ffffff`   | Text on primary buttons / inverted surfaces.        |
| `--iv_foreground-hover`   | `#e4e4e4`  | `#d4d4d8`   | Primary button hover fill + border.                 |

### Accent & semantic colors

Every semantic color follows a `main / dim / surface` pattern:

| Token                  | Dark value              | Light value            | Usage                                                              |
| ---------------------- | ----------------------- | ---------------------- | ------------------------------------------------------------------ |
| `--iv_accent`          | `#c7a24a`               | `#b0851a`              | Single accent: status dots, citation markers, accent icons, links. |
| `--iv_accent-dim`      | `#7d6a3c`               | `#8b6914`              | Muted accent.                                                      |
| `--iv_accent-surface`  | `rgba(199,162,74,0.1)`  | `rgba(176,133,26,0.1)` | Accent background tint.                                            |
| `--iv_success`         | `#7c9b7c`               | `#3b7a3b`              | Success / positive state.                                          |
| `--iv_success-dim`     | `#5a7a5a`               | `#2d5e2d`              | Muted success.                                                     |
| `--iv_success-surface` | `rgba(124,155,124,0.1)` | `rgba(59,122,59,0.1)`  | Success background tint.                                           |
| `--iv_error`           | `#f08858`               | `#b03308`              | Error / destructive / attention.                                   |
| `--iv_error-dim`       | `#da7550`               | `#892a0d`              | Darker error (danger button hover).                                |
| `--iv_error-surface`   | `rgba(240,136,88,0.1)`  | `rgba(176,51,8,0.1)`   | Error background tint.                                             |
| `--iv_info`            | `#5d8ee8`               | `#2563eb`              | Informational signals (toasts, badges).                            |
| `--iv_info-dim`        | `#3a6fcc`               | `#1d4ed8`              | Muted info.                                                        |
| `--iv_info-surface`    | `rgba(93,142,232,0.1)`  | `rgba(37,99,235,0.1)`  | Info background tint.                                              |

### Overlays & focus

| Token          | Dark value               | Light value        | Usage                  |
| -------------- | ------------------------ | ------------------ | ---------------------- |
| `--iv_overlay` | `rgba(0,0,0,0.4)`        | `rgba(0,0,0,0.3)`  | Modal/dialog backdrop. |
| `--iv_ring`    | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.06)` | Neutral focus ring.    |

### Radii

| Token              | Value   | Usage                                                           |
| ------------------ | ------- | --------------------------------------------------------------- |
| `--iv_radius`      | `14px`  | Cards, inputs, list rows, dialogs' inner controls.              |
| `--iv_radius-sm`   | `10px`  | Small controls: selects, icon buttons, chips-that-aren't-pills. |
| `--iv_radius-lg`   | `20px`  | Dialogs, the command palette, large cards.                      |
| `--iv_radius-pill` | `999px` | Every button, the search trigger, tag chips.                    |

### Shadows — overlays only

| Token            | Value (theme-agnostic)                                   | Usage                          |
| ---------------- | -------------------------------------------------------- | ------------------------------ |
| `--iv_shadow-sm` | `0 1px 2px rgba(0,0,0,0.5)`                              | Subtle overlay.                |
| `--iv_shadow-md` | `0 4px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.4)` | Toast, popover.                |
| `--iv_shadow-lg` | `0 24px 60px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)` | Modal dialog, command palette. |

### Typography

- **Sans-serif family** for all UI: `--iv_font-sans` (`'Atkinson Hyperlegible Next', system-ui, sans-serif`).
  Headings use the same family as body text, just heavier weight (600–700) and larger size.
- **Monospace family** for data only: `--iv_font-mono` (`'IBM Plex Mono', monospace`). Used for
  timestamps, keyboard shortcuts, code fragments, source counts. Never used for a page title,
  a button label, or prose.

### Text sizes

All component font sizes come from this scale via `tokens.css` — never a raw `rem`/`px` in a component:

| Token               | Value      | Usage                                                   |
| ------------------- | ---------- | ------------------------------------------------------- |
| `--iv_text-xs`      | `0.75rem`  | Character counts, tiny mono meta.                       |
| `--iv_text-sm`      | `0.8rem`   | Helper/error messages, separator labels, slider values. |
| `--iv_text-btn-sm`  | `0.825rem` | Small buttons, sm tabs, sm checkbox/radio labels.       |
| `--iv_text-label`   | `0.85rem`  | Form labels, card descriptions, select empty state.     |
| `--iv_text-body-sm` | `0.875rem` | Sm inputs/selects, sm search input.                     |
| `--iv_text-body`    | `0.9rem`   | Default body text, large radio/checkbox/switch labels.  |
| `--iv_text-btn`     | `0.95rem`  | Accordion trigger.                                      |
| `--iv_text-base`    | `1rem`     | Inputs, textareas, select trigger, form fields.         |
| `--iv_text-lg`      | `1.05rem`  | lg buttons, lg inputs.                                  |
| `--iv_text-xl`      | `1.1rem`   | Dialog titles.                                          |
| `--iv_text-chips`   | `10.5px`   | Chip / badge / pill labels.                             |

### Motion, focus, and misc system values

Theme-agnostic tokens that standardize repeated values:

| Token                   | Value                           | Usage                                                         |
| ----------------------- | ------------------------------- | ------------------------------------------------------------- |
| `--iv_transition-fast`  | `0.12s`                         | Micro-interactions: chevrons, checkboxes, toggles, tab color. |
| `--iv_transition-base`  | `0.15s`                         | Borders / backgrounds / box-shadows on hover and focus.       |
| `--iv_spin-duration`    | `0.75s`                         | Loading spinner one revolution.                               |
| `--iv_spin-easing`      | `cubic-bezier(0.3,0.7,0.7,0.3)` | Loading spinner easing.                                       |
| `--iv_outline-width`    | `2px`                           | Focus outline width (`outline`).                              |
| `--iv_outline-offset`   | `2px`                           | Default focus outline offset.                                 |
| `--iv_ring-width`       | `3px`                           | Focus/`box-shadow` ring width (`box-shadow: 0 0 0 <width>`).  |
| `--iv_blur`             | `12px`                          | Backdrop blur behind dialogs.                                 |
| `--iv_disabled-opacity` | `0.5`                           | Disabled element opacity.                                     |
| `--iv_z-dropdown`       | `50`                            | Select dropdown popover.                                      |
| `--iv_z-overlay`        | `100`                           | Dialog / modal backdrop.                                      |
| `--iv_z-toast`          | `110`                           | Toast layer.                                                  |
| `--iv_dialog-sm`        | `400px`                         | Small dialog max-width.                                       |
| `--iv_dialog-md`        | `520px`                         | Default dialog max-width.                                     |
| `--iv_dialog-lg`        | `640px`                         | Large dialog max-width.                                       |
| `--iv_sheet-sm`         | `320px`                         | Small sheet width (side) / height (top-bottom).               |
| `--iv_sheet-md`         | `440px`                         | Default sheet width (side) / height (top-bottom).             |
| `--iv_sheet-lg`         | `560px`                         | Large sheet width (side) / height (top-bottom).               |
| `--iv_scrollbar-size`   | `8px`                           | Custom scrollbar width/height.                                |

---

## 3. Surface layering

Think of the interface as four stacked layers, each one shade lighter than the one below:

| Layer             | Token                   | Used for                                                                                                                  |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 0 — Canvas        | `--iv_surface`          | The page background. Sidebar, center panel, and chat panel background.                                                    |
| 1 — Raised        | `--iv_surface-raised`   | Cards, list rows, dialogs, the search trigger, chat input. Anything that reads as "a discrete block sitting on the page." |
| 2 — Elevated      | `--iv_surface-elevated` | Button background, controls nested inside a layer-1 element (e.g. an input inside a dialog).                              |
| 3 — Hover overlay | `--iv_surface-hover`    | Hover state of an elevated surface (secondary button hover).                                                              |

Additionally, `--iv_surface-overlay` provides a translucent overlay for hover effects on raised
surfaces (e.g. clear button hover, toast close button hover).

**Rule of thumb:** an element's resting state is one layer lighter than its parent; its hover
state is one layer lighter than its resting state. Never skip a layer (e.g. canvas straight to
`--iv_surface-elevated`), and never make a hover state darker than its resting state.

---

## 4. Color usage — the strict part

The reference screenshot this system is built from uses color on maybe 2% of visible pixels.
Match that ratio.

**Allowed uses of `--iv_accent`:**

- A small (≤8px) status dot identifying one specific project/category among several
- A citation marker number in chat (`[1]`, `[2]`)
- Links (`a[href]`)
- A focus ring, at low opacity, on the one currently-focused input —
  and only if you're not already using the neutral focus ring (`--iv_ring`)
- Small accent icons in an otherwise-monochrome badge (e.g. a "file" type badge's icon color)

**Allowed uses of `--iv_success` / `--iv_error` / `--iv_info`:**

- Semantic status only: positive/active state (success), attention/pending/error state (error), informational (info).
  E.g. a "Pending Setup" dot, a positive delta, a toast icon.

**Never:**

- Fill a button background with `--iv_accent`. Buttons are neutral (§6).
- Use color for a whole card background, a whole section background, or a large decorative
  block.
- Introduce a second accent hue "for variety." One accent color, three semantic colors.
  That's the whole palette.
- Use color gradients anywhere.

If you're unsure whether something should be colored, it shouldn't be.

---

## 5. Borders, not shadows, for page content

Base styles live in [`src/lib/theme/components.css`](src/lib/theme/components.css). Every card, list row, input, and
panel divider gets a `1px solid var(--iv_border)` border with an `--iv_surface-raised` background.

On hover, brighten the border (`--iv_border-hover`) rather than adding a shadow or lifting the
element. The only motion on hover is a border/background color shift and standard `:active`
scale-down on buttons (`scale(.98)`).

**Do not** add `transform: translateY(...)` or a drop shadow to page-level cards on hover. That
"lift" pattern reads as generic AI-generated UI, not as this system.

**Shadows are reserved for things that overlay the page**: the command palette, modal dialogs,
popovers. These get `--iv_shadow-lg` and nothing else on the page should compete with them
visually.

---

## 6. Buttons

Defined in [`src/lib/theme/components.css`](src/lib/theme/components.css). Three variants, all fully rounded
(`--iv_radius-pill`), all the same padding and font-weight:

- **Primary** (`.primary`) — foreground fill (`--iv_foreground`), inverse text (`--iv_foreground-inverse`). Used once per
  view, for the single most important action.
- **Secondary** (default) — elevated fill (`--iv_surface-elevated`), foreground text, hairline border. This is
  the default button — most buttons on screen are this variant.
- **Outline** (`.outline`) — same as secondary but transparent background. A third tier (rare).
- **Ghost** (`.ghost`) — no border, transparent background.
- **Icon** (`.icon`) — transparent, no padding.
- **Danger** (`.danger`) — `--iv_error` fill, `--iv_error-dim` on hover.
- **Disabled** (`.disabled` / `[disabled]`) — `--iv_surface-raised` background, `--iv_foreground-dim` text, reduced opacity.

**Never** give a button a brass/colored fill. **Never** use a sharp-cornered or barely-rounded
button — if the corner radius isn't full pill, it's wrong.

---

## 7. Inputs, selects, textareas

Defined in [`src/lib/theme/components.css`](src/lib/theme/components.css). Shared rules:

- Rounded rectangles (`--iv_radius`), not pills — buttons and chips are pills; fields and cards
  are rounded rects.
- Background `--iv_surface-raised` (or `--iv_surface-elevated` when nested inside a dialog that's already `--iv_surface-raised`).
- Border `1px solid var(--iv_border)`, hover `--iv_border-hover`, focus `--iv_border-focus`.
- Neutral focus ring (`--iv_ring`), not accent. Only use an accent focus ring on a control that is
  specifically accent-accented elsewhere (rare — see §4).
- Error state border: `--iv_border-error` (or `--iv_error` for custom input wrappers).
- Placeholder text always uses `--iv_foreground-dim`, never a lighter/dimmer custom gray.
- Font family is `--iv_font-mono` for input elements.

---

## 8. Chips, badges, and pills

- Badges/chips are filled with `--iv_surface-elevated`, bordered with `--iv_border`.
- Fully rounded (`--iv_radius-pill`), small font (10.5px), bold (600).
- They do **not** use an outline-only style with `border: 1px solid currentColor`.
- Text color on a chip can use a semantic color (success/error/accent) to convey meaning, but the
  chip's background stays neutral gray. Don't fill the chip background with the semantic color.

---

## 9. Layout patterns

- **Three-pane shell**: fixed-width left sidebar (~230px), fluid center panel, fixed-width right
  panel (~340px) for contextual chat. Collapse the right panel and shrink the sidebar to
  icon-only below ~980px — never just hide the sidebar entirely.
- **Center content max-width**: cap prose/content columns at ~880px and center them, even though
  the panel itself is fluid. Unbounded line length is a readability bug.
- **List rows vs. grid cards**: use a two-column card grid for "browse and pick one" contexts
  (dashboard project list). Use single-column bordered list rows for "scan many, act on one"
  contexts (sources list, artifacts list, activity feed). Don't mix — a screen is either
  grid-of-cards or list-of-rows, not both for the same collection.
- **Stat rows**: small bordered boxes in a horizontal row, each with a large number (`--iv_foreground`,
  700 weight) and a small dim label beneath. No colored numbers except when the number itself is
  the semantic signal (rare).

---

## 10. Icons

- Prefer simple geometric glyphs (▤ ◧ ◆ ⌂ ✎) over an icon font or SVG icon library unless the
  product already has one. They should read as quiet, not decorative.
- Icons inherit `--iv_foreground-dim` by default; only the active/selected item's icon switches to
  `--iv_foreground`.
- Never color an icon with the accent unless it's specifically marking status (see §4).
- **Sizing discipline in responsive/collapsed states**: when a sidebar collapses to icon-only on
  small viewports, audit _every_ `<span>` inside a nav item before writing a blanket
  `nav-item span { display: none }` rule. If the icon itself is also a `<span>`, that rule hides
  the icon along with the label — always give icon spans a dedicated class (e.g. `.ic`) and
  explicitly exclude it: `.nav-item span:not(.ic)`. This has broken this exact UI twice; check
  it explicitly any time you touch the responsive rules.

---

## 11. Motion

- Transitions are short (120–180ms) and limited to `border-color`, `background`,
  `box-shadow`, and `transform` on `:active` only.
- No hover-lift (`translateY`) on cards or list rows — border/background shift only (§5).
- No entrance animations, no staggered reveals, no skeleton shimmer unless explicitly asked for.
  This system is quiet by default.

---

## 12. Do / Don't summary

**Do**

- Use one sans-serif family everywhere; mono only for literal data.
- Keep the canvas pure black (dark) / pure white (light); build depth with the four-layer surface system (§3).
- Make every button and chip a full pill; every card/input a rounded rect (14–20px).
- Use hairline borders for on-page depth; save shadows for dialogs/overlays.
- Keep color to one accent + three semantic tones, applied to small marks only.
- Brighten a border on hover, don't lift or shadow the element.

**Don't**

- Don't fill a button or a large surface with the accent color.
- Don't add a second typeface (serif, display font, alternate sans) for "personality."
- Don't use drop shadows or `translateY` hover-lift on inline cards/rows.
- Don't use sharp or barely-rounded corners anywhere (min radius is `--iv_radius-sm`, 10px, except
  full pills).
- Don't introduce gradients.
- Don't write a `display:none` rule against a bare element selector (`span`, `div`) inside a
  component that also contains an icon in that same element type — you will hide the icon. Scope
  hiding rules to a specific class.
- Don't mix card-grid and list-row treatments for the same collection on the same screen.
- Don't hardcode hex or rgba values in components — always use `--iv_*` tokens.

---

## 13. Before shipping a new screen or component, check

1. Does every background come from `--iv_surface`, `--iv_surface-raised`, `--iv_surface-elevated`, or `--iv_surface-hover` — no other grays introduced?
2. Is every corner either a full pill or one of the three defined radii?
3. Is color used in fewer than a handful of places on this screen, and only for signal (status,
   selection, citation) rather than decoration?
4. Do hover states brighten a border/background rather than adding shadow or lift?
5. Is there exactly one font family in play (plus mono for data only)?
6. If this is a responsive/collapsed state, did you verify icon spans survive any label-hiding
   CSS rules?
7. Are all color values referenced via `--iv_*` tokens from `tokens.css` — no hardcoded hex/rgba?

(End of file — 352 lines)
