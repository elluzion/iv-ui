# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Svelte 5 developers building tool-like applications: dashboards, admin consoles,
dev tools, internal tooling, and automation surfaces. They want a terminal-flavored
but genuinely professional UI they can ship without hand-tuning every control.

## Product Purpose

iv-ui is a drop-in Svelte 5 component and token library: install it, import
`theme.css`, and get a complete, consistent, mono-forward working UI. Success is
a developer adopting the library and shipping a real tool interface faster than
they could assemble the same chrome by hand.

## Positioning

A single library that delivers both depth and edge: a token-pure design system
with the sharp, frame-and-cursor grammar of a terminal console, without the
novelty cost — professional by default, distinctive by design. Not another
soft-rounded shadcn clone; not a novelty terminal skin either.

## Operating Context

Developers consume the library inside SvelteKit/Svelte 5 apps, import CSS via
the package's theme/tokens/base/typeset export paths, and inspect components
through Storybook. The dark theme is default; a mirrored light theme applies via
`prefers-color-scheme` or `data-theme`/`.theme-*`.

## Capabilities and Constraints

- Svelte 5 runes throughout: `$props()`, `$bindable()`, `$derived`.
- Token-only styling: every component references `--iv_*` tokens from
  `src/lib/theme/tokens.css`; no raw hex/rgba/rem/px in component styles.
- Universal API contract per `COMPONENTS.md`: `iv-` prefixed classes, dual
  `onclick`/`on:click` events, consistent `size`/`variant`/`disabled` props,
  forwarded rest props, accessible names, focus-visible indicators,
  reduced-motion support.
- Every component ships a `*.stories.svelte` companion; stories run through
  Storybook's a11y addon (fail-on-violation) and browser tests via
  `@storybook/addon-vitest`.
- Peer dependency on `@tabler/icons-svelte` for icon support.
- Dark/light theming is a color-only flip; radii, fonts, and cues are
  theme-agnostic.

## Brand Commitments

Original product truth, function, API, and constraints are preserved. The visual
world is being replaced: sharp micro-radius controls, box-drawing/frame grammar,
reverse-video selection, mono-forward typography (IBM Plex Mono for UI voice,
Sora for headings and prose), a single hardened brass accent rendered
terminally — never a soft glow, never a pill.

## Evidence on Hand

- Current implementation in `src/lib/` (components, theme tokens, stores, utils,
  foundation/showcase stories) — the old look is evidence of what the product
  is, not authority over what it becomes.
- `DESIGN.md`, `ROADMAP.md`, `COMPONENTS.md`, `AGENTS.md` document the incumbent
  system and will be synced to the new world during the redesign.
- No real customer testimonials, benchmarks, or case studies exist; do not
  fabricate them.

## Product Principles

- Professional before edgy: the terminal grammar exists to make tool interfaces
  clearer and denser, not to decorate them.
- Token purity: theming happens by overriding tokens, never by editing a
  component's CSS.
- Refine by replacing the look, never by splitting the difference with the old
  shadcn world.
- Consistency is the product: learn one component's API and form language, and
  you know the whole library.
- Accessibility is not negotiation: focus-visible, semantic roles, accessible
  names, and reduced-motion survive every visual change.

## Accessibility & Inclusion

No product-specific requirement beyond the library's stated bar: all components
pass Storybook's a11y addon, retain keyboard operability and visible focus, and
respect `prefers-reduced-motion`.