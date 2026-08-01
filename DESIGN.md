# Design System — Archive UI

This document defines the visual language for this product. Read it before building or
modifying any screen, component, or dialog. The goal is a **monochrome, shadcn/ui-inspired
dark interface**: pure black canvas, hairline borders instead of shadows-as-depth, pill-shaped
controls, and color used only as a sparing signal — never as decoration.

**The single source of truth for tokens and base styles lives in four CSS files:**

- [`src/lib/theme/tokens.css`](src/lib/theme/tokens.css) — all design tokens (`:root` custom properties).
- [`src/lib/theme/base.css`](src/lib/theme/base.css) — body reset, selection color, scrollbar styles.
- [`src/lib/theme/components.css`](src/lib/theme/components.css) — base component styles: buttons, inputs, selects, textareas.
- [`src/lib/theme/theme.css`](src/lib/theme/theme.css) — bundling entry: imports Google Fonts, tokens, base, and components.

Hardcoded hex/rgba values do **not** belong in components. Reference the tokens defined in
`tokens.css` or the pre-built classes in `components.css`.

---

## 1. Core principles

1. **Black is the base, not a "dark theme."** The canvas is `#000000`, not a dark gray. Depth
   comes from layering slightly lighter panels on top of it, not from shadows or gradients.
2. **Borders create structure, shadows are for overlays only.** Cards, inputs, and list rows are
   separated by a 1px hairline border. Reserve `box-shadow` for things that float above the
   page: dialogs, the command palette, popovers.
3. **Color is a signal, not a palette.** There is exactly one accent (brass/amber) and two
   semantic colors (moss = success/positive, rust = warning/attention). They mark a handful of
   specific things — an active project, a citation, a status dot. Everything else is grayscale.
4. **Every interactive shape is a pill or a rounded rectangle — never sharp corners.** Buttons,
   badges, chips, and the search trigger are fully rounded (`border-radius: 999px`). Cards and
   inputs use large-but-finite radii (10–20px). Nothing in the interface has a 0–4px radius.
5. **One font family for everything.** Do not pair a display serif with a body sans, and do not
   introduce a second UI typeface. Monospace is reserved for data, not for prose or labels.

---

## 2. Design tokens

Defined in [`src/lib/theme/tokens.css`](src/lib/theme/tokens.css) under `:root`. Never hardcode a hex value in a
component — reference the token.

### Surface layers

| Token     | Value     | Usage                                                                                                                      |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--ink`   | `#000000` | Page canvas. Sidebar, center panel, chat panel background.                                                                 |
| `--ink-2` | `#141415` | First layer: cards, list rows, dialogs, search trigger, chat input. Anything that reads as "a discrete block on the page." |
| `--ink-3` | `#1e1e20` | Second layer: hover states, nested surfaces, inputs inside dialogs.                                                        |

### Borders

| Token          | Value     | Usage                                |
| -------------- | --------- | ------------------------------------ |
| `--line`       | `#2a2a2d` | Default hairline border, everywhere. |
| `--line-hover` | `#3a3a3d` | Border color on hover.               |
| `--line-focus` | `#4a4a4d` | Border color on focus (inputs).      |

### Text

| Token         | Value     | Usage                                               |
| ------------- | --------- | --------------------------------------------------- |
| `--paper`     | `#fafafa` | Primary text, headings, active icons.               |
| `--paper-dim` | `#8e8e93` | Secondary text, placeholders, meta, inactive icons. |

### Accent & semantic colors

| Token          | Value                 | Usage                                                       | Sparing use only — see §4 |
| -------------- | --------------------- | ----------------------------------------------------------- | ------------------------- |
| `--brass`      | `#c7a24a`             | Single accent: status dots, citation markers, accent icons. |                           |
| `--brass-dim`  | `#7d6a3c`             | Muted accent.                                               |                           |
| `--moss`       | `#7c9b7c`             | Success / positive state.                                   |                           |
| `--rust`       | `#e8734a`             | Attention / destructive / pending state.                    |                           |
| `--rust-bg`    | `rgba(232,115,74,.1)` | Destructive action hover background.                        |                           |
| `--rust-hover` | `#d1653c`             | Destructive button hover fill.                              |                           |
| `--info`       | `#5d8ee8`             | Informational signals (toasts, badges).                     |                           |

### Interaction states

| Token           | Value     | Usage                               |
| --------------- | --------- | ----------------------------------- |
| `--ink-3-hover` | `#242427` | Secondary button hover background.  |
| `--paper-hover` | `#e4e4e4` | Primary button hover fill + border. |

### Overlays & focus

| Token             | Value                   | Usage                            |
| ----------------- | ----------------------- | -------------------------------- |
| `--overlay`       | `rgba(0,0,0,.4)`        | Modal/dialog backdrop.           |
| `--ring`          | `rgba(255,255,255,.06)` | Neutral focus ring.              |
| `--surface-hover` | `rgba(255,255,255,.08)` | Light overlay for hover effects. |

### Radii

| Token           | Value   | Usage                                                           |
| --------------- | ------- | --------------------------------------------------------------- |
| `--radius`      | `14px`  | Cards, inputs, list rows, dialogs' inner controls.              |
| `--radius-sm`   | `10px`  | Small controls: selects, icon buttons, chips-that-aren't-pills. |
| `--radius-lg`   | `20px`  | Dialogs, the command palette, large cards.                      |
| `--radius-pill` | `999px` | Every button, the search trigger, tag chips.                    |

### Shadows — overlays only

| Token         | Usage                          |
| ------------- | ------------------------------ |
| `--shadow-sm` | Subtle overlay.                |
| `--shadow-md` | Toast, popover.                |
| `--shadow-lg` | Modal dialog, command palette. |

### Typography

- **Sans-serif family** for all UI: `--font-sans` (`'Atkinson Hyperlegible Next', system-ui, sans-serif`).
  Headings use the same family as body text, just heavier weight (600–700) and larger size.
- **Monospace family** for data only: `--font-mono` (`'IBM Plex Mono', monospace`). Used for
  timestamps, keyboard shortcuts, code fragments, source counts. Never used for a page title,
  a button label, or prose.

---

## 3. Surface layering

Think of the interface as three stacked layers, each one shade lighter than the one below:

| Layer              | Token     | Used for                                                                                                                  |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| 0 — Canvas         | `--ink`   | The page background. Sidebar, center panel, and chat panel background.                                                    |
| 1 — Raised         | `--ink-2` | Cards, list rows, dialogs, the search trigger, chat input. Anything that reads as "a discrete block sitting on the page." |
| 2 — Nested / hover | `--ink-3` | Hover state of a layer-1 element, or a control nested inside a layer-1 element (e.g. an input inside a dialog).           |

**Rule of thumb:** an element's resting state is one layer lighter than its parent; its hover
state is one layer lighter than its resting state. Never skip a layer (e.g. canvas straight to
`--ink-3`), and never make a hover state darker than its resting state.

---

## 4. Color usage — the strict part

The reference screenshot this system is built from uses color on maybe 2% of visible pixels.
Match that ratio.

**Allowed uses of `--brass`:**

- A small (≤8px) status dot identifying one specific project/category among several
- A citation marker number in chat (`[1]`, `[2]`)
- A focus ring, at low opacity, on the one currently-focused input —
  and only if you're not already using the neutral focus ring (`--ring`)
- Small accent icons in an otherwise-monochrome badge (e.g. a "file" type badge's icon color)

**Allowed uses of `--moss` / `--rust`:**

- Semantic status only: positive/active state (moss), attention/pending state (rust). E.g. a
  "Pending Setup" dot, a positive delta.

**Never:**

- Fill a button background with `--brass`. Buttons are neutral (§6).
- Use color for a whole card background, a whole section background, or a large decorative
  block.
- Introduce a second accent hue "for variety." One accent color, two semantic colors + one info.
  That's the whole palette.
- Use color gradients anywhere.

If you're unsure whether something should be colored, it shouldn't be.

---

## 5. Borders, not shadows, for page content

Base styles live in [`src/lib/theme/components.css`](src/lib/theme/components.css). Every card, list row, input, and
panel divider gets a `1px solid var(--line)` border with an `--ink-2` background.

On hover, brighten the border (`--line-hover`) rather than adding a shadow or lifting the
element. The only motion on hover is a border/background color shift and standard `:active`
scale-down on buttons (`scale(.98)`).

**Do not** add `transform: translateY(...)` or a drop shadow to page-level cards on hover. That
"lift" pattern reads as generic AI-generated UI, not as this system.

**Shadows are reserved for things that overlay the page**: the command palette, modal dialogs,
popovers. These get `--shadow-lg` and nothing else on the page should compete with them
visually.

---

## 6. Buttons

Defined in [`src/lib/theme/components.css`](src/lib/theme/components.css). Three variants, all fully rounded
(`--radius-pill`), all the same padding and font-weight:

- **Primary** (`.primary`) — white/light fill (`--paper`), black text (`--ink`). Used once per
  view, for the single most important action.
- **Secondary** (default) — dark gray fill (`--ink-3`), light text, hairline border. This is
  the default button — most buttons on screen are this variant.
- **Outline** (`.outline`) — same as secondary but transparent background. A third tier (rare).
- **Ghost** (`.ghost`) — no border, transparent background.
- **Icon** (`.icon`) — transparent, no padding.
- **Danger** (`.danger`) — `--rust` fill, `--rust-hover` on hover.
- **Disabled** (`.disabled` / `[disabled]`) — `--ink-2` background, `--paper-dim` text, reduced opacity.

**Never** give a button a brass/colored fill. **Never** use a sharp-cornered or barely-rounded
button — if the corner radius isn't full pill, it's wrong.

---

## 7. Inputs, selects, textareas

Defined in [`src/lib/theme/components.css`](src/lib/theme/components.css). Shared rules:

- Rounded rectangles (`--radius`), not pills — buttons and chips are pills; fields and cards
  are rounded rects.
- Background `--ink-2` (or `--ink-3` when nested inside a dialog that's already `--ink-2`).
- Border `1px solid var(--line)`, hover `--line-hover`, focus `--line-focus`.
- Neutral focus ring (`--ring`), not brass. Only use a brass focus ring on a control that is
  specifically brass-accented elsewhere (rare — see §4).
- Placeholder text always uses `--paper-dim`, never a lighter/dimmer custom gray.
- Font family is `--font-mono` for input elements.

---

## 8. Chips, badges, and pills

- Badges/chips are filled with `--ink-3`, bordered with `--line`.
- Fully rounded (`--radius-pill`), small font (10.5px), bold (600).
- They do **not** use an outline-only style with `border: 1px solid currentColor`.
- Text color on a chip can use a semantic color (moss/rust/brass) to convey meaning, but the
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
- **Stat rows**: small bordered boxes in a horizontal row, each with a large number (`--paper`,
  700 weight) and a small dim label beneath. No colored numbers except when the number itself is
  the semantic signal (rare).

---

## 10. Icons

- Prefer simple geometric glyphs (▤ ◧ ◆ ⌂ ✎) over an icon font or SVG icon library unless the
  product already has one. They should read as quiet, not decorative.
- Icons inherit `--paper-dim` by default; only the active/selected item's icon switches to
  `--paper`.
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
- Keep the canvas pure black; build depth with the three-layer surface system (§3).
- Make every button and chip a full pill; every card/input a rounded rect (14–20px).
- Use hairline borders for on-page depth; save shadows for dialogs/overlays.
- Keep color to one accent + two semantic tones + one info, applied to small marks only.
- Brighten a border on hover, don't lift or shadow the element.

**Don't**

- Don't fill a button or a large surface with the accent color.
- Don't add a second typeface (serif, display font, alternate sans) for "personality."
- Don't use drop shadows or `translateY` hover-lift on inline cards/rows.
- Don't use sharp or barely-rounded corners anywhere (min radius is `--radius-sm`, 10px, except
  full pills).
- Don't introduce gradients.
- Don't write a `display:none` rule against a bare element selector (`span`, `div`) inside a
  component that also contains an icon in that same element type — you will hide the icon. Scope
  hiding rules to a specific class.
- Don't mix card-grid and list-row treatments for the same collection on the same screen.

---

## 13. Before shipping a new screen or component, check

1. Does every background come from `--ink`, `--ink-2`, or `--ink-3` — no other grays introduced?
2. Is every corner either a full pill or one of the three defined radii?
3. Is color used in fewer than a handful of places on this screen, and only for signal (status,
   selection, citation) rather than decoration?
4. Do hover states brighten a border/background rather than adding shadow or lift?
5. Is there exactly one font family in play (plus mono for data only)?
6. If this is a responsive/collapsed state, did you verify icon spans survive any label-hiding
   CSS rules?
7. Are all color values referenced via tokens from `tokens.css` — no hardcoded hex/rgba?

(End of file — 340 lines)
