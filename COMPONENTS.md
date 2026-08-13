# Component Contract — iv-ui

Every iv-ui component follows one predictable API. If you learn the rules below,
you already know most of the library. This is the spec all current and future
components must satisfy.

---

## 1. Universal attributes

All components forward these to the root element (via `...restProps`):

- `class` / `className` — extra classes merged onto the root (`className` is the
  iv-ui prop name, since Svelte components can't receive `class` from JS).
- `id`, `style`, `title`, `aria-label`, `aria-describedby`, `data-*` — passed
  through untouched.
- Svelte 5 runes everywhere: `$props()` for props, `$bindable()` for
  two-way values, `$derived` for computed state.

### Sizes & variants

- `size?: 'sm' | 'md' | 'lg'` — consistent across controls (Button, Input,
  Select, Slider, Switch, etc.). `'md'` is the default.
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'danger'`
  — buttons. `'secondary'` is the default.
- `disabled?: boolean`, `fullWidth?: boolean` where a control can stretch.

### Naming & CSS

- Every class name is prefixed `iv-` (`.iv-btn`, `.iv-card`, `.iv-dialog`).
- Variant/state classes share the prefix (`.iv-primary`, `.iv-selected`,
  `.iv-disabled`, `.iv-active`, `.iv-open`).
- No raw hex/rgba/rem/px in component styles — only tokens from
  `src/lib/theme/tokens.css` (`--iv_*`).

---

## 2. Events — dual dispatch convention

Components accept **both** `on:click` and `onclick` props and chain them when
present. Handlers are invoked in this order:

```ts
function handleClick(e: MouseEvent) {
	if (loading || disabled) return;
	onclick?.(e);        // modern `onclick` prop
	onEventClick?.(e);   // legacy `on:click` prop
}
```

Overlays add semantic events on top of this convention:

| Event | Meaning |
|---|---|
| `onclose` / `onopen` | Overlay lifecycle (Dialog, Sheet, Popover) |
| `onchange` | CustomEvent with `detail` payload (Select, Slider, Switch, Checkbox, RadioGroup) |
| `onconfirm` / `oncancel` | ConfirmDialog actions |

Form controls forward the native set too: `oninput`, `onchange`, `onfocus`,
`onblur`, `onkeydown` (and `on:input`, `on:change`, …).

---

## 3. Form controls

| Prop | Behavior |
|---|---|
| `value` / `checked` | `$bindable` — supports `bind:value` / `bind:checked` |
| `name`, `required`, `readonly` | Forwarded to the native control |
| `label` | Renders a `<label>` associated with the control by id (never rely on `name` for association — id is generated) |
| `error` | String. Sets `aria-invalid`, error styling, and an `aria-describedby` message |
| `helper` | Helper text, wired to `aria-describedby` |
| `placeholder` | Also used as the accessible-name fallback when `label` is omitted |
| `leadingIcon` / `trailingIcon` | Snippets for prefix/suffix adornments |
| `loading` | Spinner + `aria-busy` (Button) |
| `size` | `'sm' \| 'md' \| 'lg'` |

Accessible-name rules:

- When a `label` is present → `label[for]` + control `id` (generated, unique).
- When omitted → `aria-label` falls back to `placeholder` so the control is
  never unnamed.

---

## 4. Overlays (Dialog, Sheet, Popover, Tooltip, Menu, Toast)

| Prop | Default | Behavior |
|---|---|---|
| `open` | `false` | `$bindable` |
| `onopen` / `onclose` | — | Lifecycle callbacks |
| `closeOnEscape` | `true` | Closes on Escape |
| `closeOnBackdrop` | `true` (Dialog/Sheet) | Closes on outside click |
| `placement` / `align` / `gap` / `offset` | — | Floating positioning (Popover, Tooltip) |
| `interactive` | `true` | Popover: panel participates in the page (vs. decorative) |

Modal contracts (Dialog, Sheet, ConfirmDialog):

- `role="dialog"` / `role="alertdialog"`, `aria-modal="true"`.
- `aria-labelledby` → the title element id; `aria-describedby` → the body id.
- **Focus management** via the `focusTrap` action (`src/lib/utils/focus-trap.js`):
  initial focus moves to the first focusable child, Tab cycles within the
  modal, and focus is restored to the opener on close.
- `body { overflow: hidden }` while open; restored on close.

Toast announcement:

- `role="status"` + `aria-live="polite"` for success/info.
- `role="alert"` + `aria-live="assertive"` for errors.

---

## 5. Buttons & actions

- Variants: `primary | secondary | outline | ghost | icon | danger`.
- `type` defaults to `'button'` (safe in forms).
- `loading` shows an internal spinner and sets `aria-busy`; clicks are ignored
  while loading or disabled.
- Icon-only: `variant="icon"` with an icon snippet child.

---

## 6. Accessibility checklist

Every component must pass the Storybook a11y addon:

- **Focus**: visible `:focus-visible` indicator on every interactive element.
  Ring via `0 0 0 var(--iv_ring-width) var(--iv_ring)` or outline
  `var(--iv_outline-width) solid var(--iv_foreground)`.
- **Roles**: correct semantics — `dialog`, `menu`/`menuitem`, `tablist`/`tab`/
  `tabpanel`, `switch`, `slider`, `listbox`/`option`, `radiogroup`, `tooltip`.
- **Names**: every control has an accessible name (label, aria-label, or
  placeholder fallback).
- **Keyboard**: native controls handle their keys; custom controls implement
  the ARIA pattern (tabs arrows/Home/End, slider arrows/PageUp/Down/Home/End,
  select typeahead + Enter/Escape).
- **Reduced motion**: all Svelte transitions zero their duration when
  `$reducedMotion` (`src/lib/stores/motion.ts`) is true; CSS animations are
  gated by `@media (prefers-reduced-motion: reduce)`.
- **Motion tokens**: durations come from `--iv_transition-*` / `--iv_motion-*`
  tokens, never raw literals.

---

## 7. Adding a new component

1. Read `DESIGN.md` and `COMPONENTS.md` first.
2. Use `$props()` + `$bindable()`, forward `...restProps` to the root.
3. Prefix all classes `iv-`, reference only `--iv_*` tokens.
4. Accept both `on:event` and `onevent` props for the primary interaction.
5. Ship a `*.stories.svelte` next to the component covering variants, states,
   and a11y, with a `play` interaction test for the primary interaction (see
   Testing in `AGENTS.md`).
6. Export it from `src/lib/index.ts` and run `bun run lint && bun run check`.
