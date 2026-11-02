import type { ComponentDoc } from '../types';

export const componentDocs: ComponentDoc[] = [
	{
		slug: 'button',
		name: 'Button',
		category: 'form',
		summary: 'Triggers an action or submits a form.',
		status: 'stable',
		since: '0.1.0',
		api: ['button'],
		usage: [
			'Keep one primary action per view; everything else stays `secondary` or `outline`.',
			'Use `loading` for async work — it sets `aria-busy` and ignores clicks without removing the button from the tab order.',
			'Icon-only buttons need an `aria-label`; the `icon` variant has no text to fall back on.'
		],
		examples: [
			{
				id: 'variants',
				title: 'Variants',
				description: 'Six levels of emphasis. `secondary` is the default.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm`, `md`, and `lg` share the same shape.' },
			{
				id: 'icons',
				title: 'Icons',
				description: 'Icons inherit the text size. Icon-only buttons use `variant="icon"`.'
			},
			{
				id: 'loading',
				title: 'Loading',
				description: 'Spinner replaces the label and clicks are ignored while `loading` is true.'
			},
			{
				id: 'events',
				title: 'Events',
				description: '`onclick` and the legacy `on:click` both receive the native mouse event.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the button.'],
				['Enter', 'Activates the button.'],
				['Space', 'Activates the button.']
			],
			notes: [
				'Focus uses a visible ring; it is never removed.',
				'A disabled button is removed from the tab order and does not fire clicks.'
			]
		},
		related: ['button-group', 'toggle', 'field', 'tooltip']
	},
	{
		slug: 'input',
		name: 'Input',
		category: 'form',
		summary: 'A single-line text field with an optional label, helper, and error state.',
		status: 'stable',
		since: '0.1.0',
		api: ['input'],
		usage: [
			'Bind `value` for two-way state: `bind:value`.',
			'The label is rendered inside the field component — no external `<label>` needed.',
			'Pass `error` to switch to the error treatment; `helper` is replaced by the error message.'
		],
		examples: [
			{
				id: 'states',
				title: 'States',
				description: 'Default, filled, error, disabled, and read-only.'
			},
			{
				id: 'sizes',
				title: 'Sizes',
				description: 'The label and helper scale with the control.'
			},
			{
				id: 'validation',
				title: 'Validation',
				description: '`error` pairs with `aria-invalid` and `aria-describedby`.'
			},
			{
				id: 'icons',
				title: 'Leading and trailing icons',
				description: 'Snippets sit inside the field frame; `clearable` adds a reset button.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus into the field.'],
				['Escape', 'Clears the value when `clearable` is set.']
			],
			notes: [
				'The label is associated with the input through a generated id.',
				'Error text is announced through `aria-describedby`; the input also gets `aria-invalid`.'
			]
		},
		related: ['field', 'textarea', 'select', 'input-group']
	},
	{
		slug: 'checkbox',
		name: 'Checkbox',
		category: 'form',
		summary: 'A binary choice with an optional label and a mixed state.',
		status: 'stable',
		since: '0.1.0',
		api: ['checkbox'],
		usage: [
			'Bind `checked` for two-way state; `onchange` receives `{ checked }`.',
			'Use `indeterminate` for a parent control that represents a partial selection.',
			'Pass `label` for the visible text; the label is part of the click target.'
		],
		examples: [
			{
				id: 'states',
				title: 'States',
				description: 'Unchecked, checked, mixed, and disabled.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm` and `md`; `md` is the default.' },
			{
				id: 'events',
				title: 'Events',
				description: 'The change event carries `{ checked }` and the bound value stays in sync.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the checkbox.'],
				['Space', 'Toggles the checked state.']
			],
			notes: [
				'A native checkbox input backs the control, so form submission works without extra wiring.',
				'`indeterminate` is applied to the native input and announced as mixed.',
				'Focus is drawn on the box and is never removed.'
			]
		},
		related: ['switch', 'radio-group', 'toggle', 'field']
	},
	{
		slug: 'field',
		name: 'Field',
		category: 'form',
		summary: 'Labels a custom control and renders its helper or error message.',
		status: 'stable',
		since: '0.2.0',
		api: ['field'],
		usage: [
			'Wrap one control; `htmlFor` must match the control id to associate the label.',
			'`error` replaces `helper` and reuses the message id from `messageId` or `htmlFor`.',
			'Built-in controls such as `Input` already render a label; use `Field` for custom form elements.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'A label, a native control, and helper text.'
			},
			{
				id: 'validation',
				title: 'Validation',
				description: 'The error message takes the place of the helper.'
			},
			{
				id: 'custom-control',
				title: 'Custom control',
				description: 'The label is associated through `htmlFor`.'
			}
		],
		accessibility: {
			notes: [
				'The label is a real `<label>` when `htmlFor` is set.',
				'The message element gets an id so controls can reference it with `aria-describedby`.',
				'Required fields show a visual asterisk that is hidden from assistive technology; set `required` on the control as well.'
			]
		},
		related: ['input', 'textarea', 'select', 'checkbox']
	},
	{
		slug: 'input-group',
		name: 'InputGroup',
		category: 'form',
		summary: 'Joins an input with prefix and suffix addons inside one frame.',
		status: 'stable',
		since: '0.2.0',
		api: ['input-group'],
		usage: [
			'`prefix` and `suffix` take snippets; keep the content short, such as a protocol, unit, or icon.',
			'`size` applies to the frame; keep the inner control on the same size.',
			'Use `disabled` on the group for a consistent dimmed frame, and on the control to block input.'
		],
		examples: [
			{
				id: 'addons',
				title: 'Addons',
				description: 'A protocol prefix and a unit suffix around one input.'
			},
			{
				id: 'sizes',
				title: 'Sizes',
				description: '`sm`, `md`, and `lg` keep the addons aligned with the control.'
			},
			{
				id: 'with-button',
				title: 'With a button',
				description: 'The suffix can hold an action instead of text.'
			}
		],
		accessibility: {
			notes: [
				'The group is a visual container only; label the inner control itself.',
				'Focus styling is applied to the whole frame through `:focus-within`.'
			]
		},
		related: ['input', 'native-select', 'field', 'select']
	},
	{
		slug: 'native-select',
		name: 'NativeSelect',
		category: 'form',
		summary: 'A native select element with the library field treatment.',
		status: 'stable',
		since: '0.2.0',
		api: ['native-select'],
		usage: [
			'Use when the platform picker is preferable to the custom `Select`.',
			'`options` accepts strings or `{ value, label, disabled }`; `placeholder` adds a disabled first option.',
			'Pass `children` with `<option>` elements to replace `options`.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'A labelled select with a placeholder and helper text.'
			},
			{
				id: 'options',
				title: 'Option objects',
				description: 'Labels differ from values and individual options can be disabled.'
			},
			{
				id: 'states',
				title: 'States',
				description: 'Error and disabled treatments share the same frame.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the select.'],
				['Arrow keys', 'Move through options in the platform picker.'],
				['Enter / Space', 'Opens the picker.']
			],
			notes: [
				'The label is associated through a generated id, or pass `id` explicitly.',
				'Error text is linked with `aria-describedby` and the select gets `aria-invalid`.'
			]
		},
		related: ['select', 'input', 'field', 'input-group']
	},
	{
		slug: 'radio-group',
		name: 'RadioGroup',
		category: 'form',
		summary: 'A set of mutually exclusive options with one selected value.',
		status: 'stable',
		since: '0.1.0',
		api: ['radio-group'],
		usage: [
			'`items` accepts strings or `{ value, label, disabled }`.',
			'Bind `value`; `onchange` fires with `{ value }` after a selection changes.',
			'Use `orientation="horizontal"` for compact choice rows.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A vertical list with one selected value.' },
			{
				id: 'horizontal',
				title: 'Horizontal',
				description: 'The same group laid out as a row.'
			},
			{
				id: 'disabled',
				title: 'Disabled',
				description: 'A disabled option and a fully disabled group.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus into the group.'],
				['Arrow keys', 'Move between radios and select the focused one.'],
				['Space', 'Selects the focused radio.']
			],
			notes: [
				'The group is labelled by `label` through `aria-labelledby`.',
				'Each option is a native radio input inside a `<label>`.',
				'Only the selected radio is in the tab order, matching native behaviour.'
			]
		},
		related: ['checkbox', 'switch', 'select', 'field']
	},
	{
		slug: 'select',
		name: 'Select',
		category: 'form',
		summary: 'A custom listbox with search, multiple selection, and clearing.',
		status: 'stable',
		since: '0.1.0',
		api: ['select'],
		usage: [
			'`options` accepts strings or `{ value, label, disabled }`.',
			'`multiple` turns `value` into an array; `searchable` adds a filter field.',
			'Bind `value`; `onchange` fires with the committed selection.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'A labelled single select with a placeholder.'
			},
			{
				id: 'multiple',
				title: 'Multiple',
				description: 'Selected values render as chips and `value` is an array.'
			},
			{
				id: 'searchable',
				title: 'Searchable',
				description: '`searchable` filters the list as you type.'
			},
			{
				id: 'states',
				title: 'States',
				description: 'Clearable, error, and disabled variants.'
			}
		],
		accessibility: {
			keyboard: [
				['Enter / Space / ArrowDown', 'Opens the list.'],
				['Arrow keys', 'Move the active option.'],
				['Enter', 'Selects the active option.'],
				['Escape', 'Closes the list.']
			],
			notes: [
				'The trigger is a `combobox` with `aria-expanded`, `aria-controls`, and `aria-activedescendant`.',
				'Options use the `option` role inside a `listbox`.',
				'Error text is linked through `aria-describedby`; the trigger gets `aria-invalid`.'
			]
		},
		related: ['native-select', 'menu', 'input', 'field']
	},
	{
		slug: 'slider',
		name: 'Slider',
		category: 'form',
		summary: 'Selects a number, or a range, along a track.',
		status: 'stable',
		since: '0.1.0',
		api: ['slider'],
		usage: [
			'Bind `value`; set `range` for a `[start, end]` tuple.',
			'`min`, `max`, and `step` define the scale; `tickMarks` sketches it.',
			'`showValue` prints the current value next to the label.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A single handle with a visible value.' },
			{ id: 'range', title: 'Range', description: 'Two handles bound to a `[start, end]` tuple.' },
			{
				id: 'ticks',
				title: 'Ticks',
				description: '`step` and `tickMarks` expose the increments.'
			},
			{
				id: 'disabled',
				title: 'Disabled',
				description: 'The track stays readable but cannot be moved.'
			}
		],
		accessibility: {
			keyboard: [
				['Arrow keys', 'Change the value by one step.'],
				['Home / End', 'Jump to the minimum or maximum.'],
				['Tab', 'Moves between the handles in a range slider.']
			],
			notes: [
				'The track exposes `role="slider"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.',
				'Range handles are labelled lower and upper; pass `label` to name the scale.',
				'Values are clamped and snapped to `step` before they are emitted.'
			]
		},
		related: ['input', 'progress', 'switch', 'field']
	},
	{
		slug: 'switch',
		name: 'Switch',
		category: 'form',
		summary: 'An on/off control that applies immediately.',
		status: 'stable',
		since: '0.1.0',
		api: ['switch'],
		usage: [
			'Bind `checked`; changes apply without a submit step.',
			'Use `label` for the visible and accessible name.',
			'Prefer `Checkbox` when the choice is part of a form that is submitted later.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A labelled switch with a bound state.' },
			{ id: 'sizes', title: 'Sizes', description: '`sm` and `md` keep the same hit area.' },
			{
				id: 'disabled',
				title: 'Disabled',
				description: 'The switch is removed from interaction but keeps its value.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the switch.'],
				['Space / Enter', 'Toggles the switch.']
			],
			notes: [
				'The control exposes `role="switch"` with `aria-checked`.',
				'The label is linked through `aria-labelledby`.',
				'Focus is drawn on the track and is never removed.'
			]
		},
		related: ['checkbox', 'toggle', 'slider', 'field']
	},
	{
		slug: 'textarea',
		name: 'Textarea',
		category: 'form',
		summary: 'A multi-line text field with an optional count and error state.',
		status: 'stable',
		since: '0.1.0',
		api: ['textarea'],
		usage: [
			'Bind `value` for two-way state; `oninput` receives the native event.',
			'`showCount` needs `maxlength` and renders the used and total characters.',
			'`resizable` controls which axes the user may drag.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A labelled textarea with helper text.' },
			{
				id: 'count',
				title: 'Character count',
				description: '`maxlength` and `showCount` expose the remaining budget.'
			},
			{
				id: 'states',
				title: 'States',
				description: 'Error, disabled, and read-only treatments.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus into the textarea.'],
				['Enter', 'Inserts a new line.']
			],
			notes: [
				'The label is associated with the textarea through a generated id, or pass `id`.',
				'Error text is linked through `aria-describedby`; the control gets `aria-invalid`.',
				'The character count is part of the described-by content when `showCount` is on.'
			]
		},
		related: ['input', 'field', 'native-select', 'article']
	},
	{
		slug: 'toggle',
		name: 'Toggle',
		category: 'form',
		summary: 'A pressable button that keeps a checked state.',
		status: 'stable',
		since: '0.2.0',
		api: ['toggle'],
		usage: [
			'Use `Toggle` for formatting and view modes; use `Switch` for settings that save immediately.',
			'Pass visible children or a `label` for the accessible name.',
			'`icon` renders before the children; the check mark appears when checked.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A labelled toggle with a bound state.' },
			{
				id: 'icons',
				title: 'Icons',
				description: 'Icons inherit the current text color and size step.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm`, `md`, and `lg` share the same shape.' }
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the toggle.'],
				['Space / Enter', 'Toggles the pressed state.']
			],
			notes: [
				'The toggle is a native button with `aria-pressed`.',
				'With no visible text, pass `label` so the control has an accessible name.',
				'Focus uses the standard button ring.'
			]
		},
		related: ['toggle-group', 'button', 'switch', 'checkbox']
	},
	{
		slug: 'toggle-group',
		name: 'ToggleGroup',
		category: 'form',
		summary: 'A row of toggles with single or multiple selection.',
		status: 'stable',
		since: '0.2.0',
		api: ['toggle-group'],
		usage: [
			'`mode="single"` behaves like a segmented control; `"none"` only emits clicks.',
			'Items may be strings or `{ value, label, icon, disabled }`.',
			'Bind `value`; it is a string for single mode and an array for multiple.'
		],
		examples: [
			{
				id: 'single',
				title: 'Single',
				description: 'One pressed toggle; choosing another releases the first.'
			},
			{
				id: 'multiple',
				title: 'Multiple',
				description: 'Several toggles can stay pressed at once.'
			},
			{
				id: 'icons',
				title: 'Icons',
				description: 'Items with icons keep their labels for wide layouts.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus through the toggles.'],
				['Space / Enter', 'Toggles the focused item.']
			],
			notes: [
				'The container uses `role="group"` and is named by `label`.',
				'Each option is a button with `aria-pressed`.',
				'Selection is never changed by arrow keys, so every item stays reachable with Tab.'
			]
		},
		related: ['toggle', 'button-group', 'tabs', 'button']
	},
	{
		slug: 'button-group',
		name: 'ButtonGroup',
		category: 'form',
		summary: 'Joins related buttons into one segmented control.',
		status: 'stable',
		since: '0.2.0',
		api: ['button-group'],
		usage: [
			'`mode="none"` is a plain toolbar; `single` and `multiple` track selection.',
			'Items may be strings or `{ value, label, icon, disabled }`.',
			'`variant` applies to every button; `size` keeps the row consistent.'
		],
		examples: [
			{
				id: 'single',
				title: 'Single',
				description: 'A segmented control with one active option.'
			},
			{
				id: 'multiple',
				title: 'Multiple',
				description: 'Toggle several options and read the array value.'
			},
			{
				id: 'vertical',
				title: 'Vertical',
				description: '`orientation="vertical"` stacks the buttons.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus through the group.'],
				['Space / Enter', 'Activates the focused button.']
			],
			notes: [
				'The container uses `role="group"` and is named by `label`.',
				'Selectable options expose `aria-pressed`; toolbar mode leaves it off.',
				'`disabled` disables every button in the group.'
			]
		},
		related: ['button', 'toggle-group', 'toggle', 'tabs']
	},
	{
		slug: 'accordion',
		name: 'Accordion',
		category: 'layout',
		summary: 'A stack of collapsible sections; one or several can be open.',
		status: 'stable',
		since: '0.1.0',
		api: ['accordion', 'accordion-item'],
		usage: [
			'Each `AccordionItem` needs a unique `value`; the parent tracks the open values.',
			'Set `multiple` to keep several panels open at once.',
			'Bind `value` for controlled state, or use `defaultValue` for an uncontrolled accordion.'
		],
		examples: [
			{
				id: 'single',
				title: 'Single',
				description: 'Opening one section closes the previous one.'
			},
			{
				id: 'multiple',
				title: 'Multiple',
				description: '`multiple` keeps every opened section open.'
			},
			{
				id: 'custom-trigger',
				title: 'Custom trigger',
				description: 'The `trigger` snippet replaces the title content.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the next trigger.'],
				['Enter / Space', 'Opens or closes the focused section.']
			],
			notes: [
				'Triggers are native buttons with `aria-expanded` and `aria-controls`.',
				'Panels use `role="region"` and are labelled by their trigger.',
				'Opening and closing respects `prefers-reduced-motion`.'
			]
		},
		related: ['collapsible', 'tabs', 'card', 'separator']
	},
	{
		slug: 'article',
		name: 'Article',
		category: 'layout',
		summary: 'A readable page body with an optional title and standfirst.',
		status: 'stable',
		since: '0.2.0',
		api: ['article'],
		usage: [
			'Body content is wrapped in `iv-prose`, so plain HTML inherits the typeset.',
			'`title` and `description` render a centered header with a hairline rule.',
			'`maxWidth` narrows the body measure; the default is 880px.'
		],
		examples: [
			{
				id: 'prose',
				title: 'Prose',
				description: 'Headings, paragraphs, lists, and code receive the typeset automatically.'
			},
			{
				id: 'max-width',
				title: 'Measure',
				description: '`maxWidth` tightens the reading column without touching the header.'
			}
		],
		accessibility: {
			notes: [
				'The component renders a semantic `<article>` element.',
				'Keep heading levels in order inside the body; `title` renders an `h1`.',
				'Links and code inside the body keep the prose focus and contrast treatment.'
			]
		},
		related: ['card', 'tabs', 'accordion', 'separator']
	},
	{
		slug: 'breadcrumb',
		name: 'Breadcrumb',
		category: 'layout',
		summary: 'Shows the path to the current page.',
		status: 'stable',
		since: '0.2.0',
		api: ['breadcrumb'],
		usage: [
			'The last item without `href` renders as the current page.',
			'Pass a `separator` snippet to replace the default chevron.',
			'`ariaLabel` names the navigation landmark.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'Links for ancestors and plain text for the current page.'
			},
			{
				id: 'icons',
				title: 'Icons',
				description: 'Each item can carry an icon snippet before its label.'
			},
			{
				id: 'separator',
				title: 'Custom separator',
				description: 'The `separator` snippet replaces the chevron.'
			}
		],
		accessibility: {
			notes: [
				'The trail is a `<nav>` with an accessible name.',
				'The current page uses `aria-current="page"`.',
				'Separators are hidden from assistive technology.'
			]
		},
		related: ['tabs', 'card', 'article', 'separator']
	},
	{
		slug: 'card',
		name: 'Card',
		category: 'layout',
		summary: 'A bordered surface for grouped content and actions.',
		status: 'stable',
		since: '0.1.0',
		api: ['card'],
		usage: [
			'`title`, `description`, and `action` build the standard header; `header` replaces it.',
			'Providing `onclick` makes the whole card a keyboard-reachable button.',
			'`footer` renders below the body; `padding="none"` lets lists manage their own spacing.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A title, description, and body content.' },
			{
				id: 'header-action',
				title: 'Header action',
				description: '`action` places a control at the trailing edge of the header.'
			},
			{
				id: 'interactive',
				title: 'Interactive',
				description: '`onclick` adds the button role, tab stop, and keyboard activation.'
			},
			{
				id: 'states',
				title: 'States',
				description: 'Selected, hoverable, and disabled treatments.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to an interactive card.'],
				['Enter / Space', 'Activates an interactive card.']
			],
			notes: [
				'An interactive card gets `role="button"`, `tabindex="0"`, and `aria-disabled` when disabled.',
				'Do not place buttons or links inside a card that is itself clickable; move them to `action` or `footer` and keep the card static.',
				'`hoverable` changes only the visual treatment and does not make the card interactive.'
			]
		},
		related: ['article', 'accordion', 'empty-state', 'separator']
	},
	{
		slug: 'collapsible',
		name: 'Collapsible',
		category: 'layout',
		summary: 'A single section that expands to reveal content.',
		status: 'stable',
		since: '0.2.0',
		api: ['collapsible'],
		usage: [
			'Use for one-off disclosure; use `Accordion` when sections form a set.',
			'`open` is bindable; `defaultOpen` sets the uncontrolled initial state.',
			'`trigger` replaces the default title and chevron content.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A titled section that starts closed.' },
			{
				id: 'controlled',
				title: 'Controlled',
				description: 'Bind `open` and drive it from outside the component.'
			},
			{
				id: 'custom-trigger',
				title: 'Custom trigger',
				description: 'The trigger snippet replaces the title with custom content.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus to the trigger.'],
				['Enter / Space', 'Opens or closes the section.']
			],
			notes: [
				'The trigger is a native button with `aria-expanded` and `aria-controls`.',
				'The panel uses `role="region"` and is labelled by the trigger.',
				'Animation is skipped when reduced motion is requested.'
			]
		},
		related: ['accordion', 'card', 'tabs', 'separator']
	},
	{
		slug: 'separator',
		name: 'Separator',
		category: 'layout',
		summary: 'A hairline rule that separates content.',
		status: 'stable',
		since: '0.1.0',
		api: ['separator'],
		usage: [
			'`orientation="vertical"` needs a parent with a defined height.',
			'Add `label` for a centered caption on a horizontal rule.',
			'`spacing` controls the margin around the line.'
		],
		examples: [
			{
				id: 'horizontal',
				title: 'Horizontal',
				description: 'The default rule between stacked blocks.'
			},
			{
				id: 'labeled',
				title: 'Labeled',
				description: 'A centered caption splits the line into two segments.'
			},
			{
				id: 'vertical',
				title: 'Vertical',
				description: 'A vertical rule between inline items; the row provides the height.'
			}
		],
		accessibility: {
			notes: [
				'The element exposes `role="separator"` with the matching orientation.',
				'The label is visual text; it is not part of the accessible name.',
				'Decorative line segments are hidden from assistive technology.'
			]
		},
		related: ['card', 'breadcrumb', 'accordion', 'article']
	},
	{
		slug: 'tabs',
		name: 'Tabs',
		category: 'layout',
		summary: 'Switches between panels that share one context.',
		status: 'stable',
		since: '0.1.0',
		api: ['tabs', 'tab-list', 'tab', 'tab-panel'],
		usage: [
			'`Tabs` owns the value; `TabList` holds `Tab` buttons; `TabPanel` shows matching content.',
			'Bind `value` for controlled state, or set `defaultValue` for an uncontrolled group.',
			'`bordered` wraps the list and panel in one frame.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'An uncontrolled group with the first tab selected.'
			},
			{
				id: 'bordered',
				title: 'Bordered',
				description: '`bordered` frames the list and panel as one surface.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm` and `md` tab heights.' }
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus into the tab list.'],
				['Arrow left / right', 'Moves to the previous or next tab.'],
				['Home / End', 'Moves to the first or last tab.'],
				['Enter / Space', 'Selects the focused tab.']
			],
			notes: [
				'The list uses `role="tablist"`; each tab controls a panel through `aria-controls`.',
				'Only the active tab is in the tab order; arrow keys provide the rest of the navigation.',
				'Panels use `role="tabpanel"` and are labelled by their tab.'
			]
		},
		related: ['accordion', 'toggle-group', 'button-group', 'card']
	},
	{
		slug: 'alert-dialog',
		name: 'AlertDialog',
		category: 'overlays',
		summary: 'A blocking confirmation that returns a decision through an action.',
		status: 'stable',
		since: '0.1.0',
		api: ['alert-dialog'],
		usage: [
			'Mount `<AlertDialog />` once in the root layout, then open it with `showAlertDialog({ ... })`.',
			'`actions` defaults to a single `OK` button; give each action a `variant` that matches its weight.',
			'Set `closeOnClick: false` to keep the dialog open, then close it yourself when the work finishes.'
		],
		examples: [
			{
				id: 'confirm',
				title: 'Confirm',
				description: 'A title, a message, and a cancel/confirm pair.'
			},
			{
				id: 'destructive',
				title: 'Destructive',
				description: 'A danger action with the delete verb in the label.'
			},
			{
				id: 'custom-actions',
				title: 'Custom actions',
				description: 'Several actions, each with its own variant and handler.'
			}
		],
		manual: [
			{
				title: 'Functions',
				rows: [
					{
						name: 'showAlertDialog(config)',
						type: 'AlertDialogState',
						description: 'Opens the dialog with the given title, message, and actions.'
					},
					{
						name: 'alertDialogState',
						type: 'Writable<AlertDialogState | null>',
						description: 'Store holding the current dialog, or `null` when closed.'
					}
				]
			},
			{
				title: 'Config',
				note: 'Passed to `showAlertDialog`.',
				rows: [
					{ name: 'title', type: 'string', description: 'Dialog title and accessible name.' },
					{ name: 'message', type: 'string', description: 'Body text describing the decision.' },
					{
						name: 'actions',
						type: 'AlertDialogAction[]',
						description: 'Buttons rendered in order; defaults to one `OK` action.'
					},
					{
						name: 'closeOnBackdrop',
						type: 'boolean',
						description: 'Closes when the backdrop is clicked. Defaults to `true`.'
					},
					{
						name: 'closeOnEscape',
						type: 'boolean',
						description: 'Closes on Escape. Defaults to `true`.'
					},
					{
						name: 'onclose',
						type: '() => void',
						description: 'Called after the dialog closes for any reason.'
					}
				]
			},
			{
				title: 'Action',
				rows: [
					{ name: 'label', type: 'string', description: 'Button text.' },
					{
						name: 'variant',
						type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
						description: 'Button emphasis.'
					},
					{
						name: 'size',
						type: "'sm' | 'md' | 'lg'",
						description: 'Button size.'
					},
					{ name: 'disabled', type: 'boolean', description: 'Disables the action.' },
					{
						name: 'closeOnClick',
						type: 'boolean',
						description: 'Closes the dialog after the handler runs. Defaults to `true`.'
					},
					{
						name: 'onClick',
						type: '() => void',
						description: 'Runs before the dialog closes.'
					}
				]
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Moves focus between the actions.'],
				['Escape', 'Closes the dialog unless `closeOnEscape` is false.']
			],
			notes: [
				'The surface uses `role="alertdialog"` and `aria-modal="true"`.',
				'Focus is trapped while open and restored when the dialog closes.',
				'The title names the dialog; the message is linked through `aria-describedby`.'
			]
		},
		related: ['dialog', 'sheet', 'toast', 'button']
	},
	{
		slug: 'context-menu',
		name: 'ContextMenu',
		category: 'overlays',
		summary: 'Opens a menu at the pointer or from the keyboard Menu key.',
		status: 'stable',
		since: '0.2.0',
		api: ['context-menu'],
		usage: [
			'Wrap the area that owns the menu; `entries` uses the same shape as `Menu`.',
			'Right-click opens on pointer devices; `touchTrigger` picks the touch gesture.',
			'Shift+F10 or the Menu key opens it from the keyboard, anchored to the trigger.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'Right-click the panel, or focus it and press Shift+F10.'
			},
			{
				id: 'submenu',
				title: 'Submenu',
				description: 'A submenu opens on hover or with the right arrow key.'
			},
			{
				id: 'touch',
				title: 'Touch trigger',
				description: '`touchTrigger="click"` opens the menu with a tap.'
			}
		],
		accessibility: {
			keyboard: [
				['Shift+F10 / Menu', 'Opens the menu at the trigger.'],
				['Arrow up / down', 'Moves between items.'],
				['Arrow right / left', 'Opens or closes a submenu.'],
				['Enter / Space', 'Activates the focused item.'],
				['Escape', 'Closes the menu and returns focus to the trigger.']
			],
			notes: [
				'The panel uses `role="menu"` and items use `role="menuitem"`.',
				'Opening moves focus to the first item; closing restores the previous focus.',
				'Clicks outside the panel close it.'
			]
		},
		related: ['menu', 'popover', 'dialog', 'tooltip']
	},
	{
		slug: 'dialog',
		name: 'Dialog',
		category: 'overlays',
		summary: 'A modal surface for focused tasks and confirmations.',
		status: 'stable',
		since: '0.1.0',
		api: ['dialog'],
		usage: [
			'`open` is required and not bindable; set it to false from `onclose` to complete the close.',
			'`footer` holds the actions; `size` caps the width.',
			'Focus is trapped while open and restored on close.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'A title, body content, and the close control.'
			},
			{
				id: 'sizes',
				title: 'Sizes',
				description: 'One dialog with a switchable `sm`, `md`, or `lg` width.'
			},
			{
				id: 'footer',
				title: 'Footer',
				description: 'Cancel and primary actions rendered in the footer.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Cycles focus inside the dialog.'],
				['Escape', 'Closes the dialog unless `closeOnEscape` is false.']
			],
			notes: [
				'The surface uses `role="dialog"` and `aria-modal="true"`.',
				'`title` is used for `aria-labelledby`; the body is linked through `aria-describedby`.',
				'The backdrop click only closes when the click starts on the backdrop itself.'
			]
		},
		related: ['sheet', 'alert-dialog', 'popover', 'card']
	},
	{
		slug: 'menu',
		name: 'Menu',
		category: 'overlays',
		summary: 'A vertical list of commands, options, or links.',
		status: 'stable',
		since: '0.2.0',
		api: ['menu'],
		usage: [
			'`entries` is a typed list of headers, items, separators, and submenus.',
			'`semantic="listbox"` switches the roles for selection menus; pair it with `multiselect`.',
			'`onclick` receives the native event and the activated entry.'
		],
		examples: [
			{
				id: 'basic',
				title: 'Basic',
				description: 'A header, items with shortcuts, and a separator.'
			},
			{
				id: 'listbox',
				title: 'Listbox',
				description: 'Selection semantics with selected rows and a multiple mode.'
			},
			{
				id: 'submenu',
				title: 'Submenu',
				description: 'A nested menu that opens on hover or the right arrow key.'
			}
		],
		accessibility: {
			notes: [
				'Headers and separators are visual structure; items carry `menuitem` or `option`.',
				'Selected items expose `aria-checked` in menu mode and `aria-selected` in listbox mode.',
				'Items are not in the tab order by design — place the menu in `ContextMenu` or move focus yourself.'
			]
		},
		related: ['context-menu', 'select', 'popover', 'shortcut']
	},
	{
		slug: 'popover',
		name: 'Popover',
		category: 'overlays',
		summary: 'A floating panel anchored to an element.',
		status: 'stable',
		since: '0.2.0',
		api: ['popover'],
		usage: [
			'`anchor` takes an element or a selector; the panel is positioned against it.',
			'`showOn` and `hideOn` choose the trigger events; combine `hover` with `interactive` to keep the panel open while hovered.',
			'Bind `open` to control the panel from your own state.'
		],
		examples: [
			{
				id: 'click',
				title: 'Click',
				description: 'Click the trigger to toggle the panel; Escape or an outside click closes it.'
			},
			{
				id: 'hover',
				title: 'Hover',
				description: 'Open on hover or focus and keep the panel interactive.'
			},
			{
				id: 'placement',
				title: 'Placement',
				description: 'Change the preferred side; the panel flips when space runs out.'
			}
		],
		accessibility: {
			keyboard: [
				['Enter / Space', 'Toggles a click-triggered popover.'],
				['Escape', 'Closes the popover.']
			],
			notes: [
				'The anchor receives `aria-haspopup`, `aria-expanded`, and `aria-controls` while the panel is open.',
				'An interactive panel uses `role="dialog"` with `aria-modal="false"`.',
				'The panel is clamped to the viewport and repositioned on scroll and resize.'
			]
		},
		related: ['tooltip', 'menu', 'dialog', 'context-menu']
	},
	{
		slug: 'sheet',
		name: 'Sheet',
		category: 'overlays',
		summary: 'A panel that slides in from an edge for secondary flows.',
		status: 'stable',
		since: '0.1.0',
		api: ['sheet'],
		usage: [
			'`side` chooses the edge; `size` sets the width, or the height for top and bottom sheets.',
			'Bind `open`; the component closes itself and calls `onclose` when dismissed.',
			'Use for filters, details, or compact forms; use `Dialog` for a decision.'
		],
		examples: [
			{
				id: 'sides',
				title: 'Sides',
				description: 'One sheet that slides in from any of the four edges.'
			},
			{
				id: 'sizes',
				title: 'Sizes',
				description: '`sm`, `md`, `lg`, and `full` width steps.'
			},
			{
				id: 'footer',
				title: 'Footer',
				description: 'A sticky footer keeps the actions in reach.'
			}
		],
		accessibility: {
			keyboard: [
				['Tab', 'Cycles focus inside the sheet.'],
				['Escape', 'Closes the sheet unless `closeOnEscape` is false.']
			],
			notes: [
				'The surface uses `role="dialog"` and `aria-modal="true"`.',
				'The title names the sheet; the body is linked through `aria-describedby`.',
				'Focus is trapped while open and restored on close.'
			]
		},
		related: ['dialog', 'alert-dialog', 'popover', 'card']
	},
	{
		slug: 'toast',
		name: 'Toast',
		category: 'overlays',
		summary: 'A single transient notification driven by the toast store.',
		status: 'stable',
		since: '0.1.0',
		api: ['toast'],
		usage: [
			'Mount `<Toast />` once in the root layout.',
			'Call `showToast(message, type, durationMs)`; only one toast is visible at a time.',
			'`hideToast()` clears it immediately; an id guard stops an old timer from closing a newer toast.'
		],
		examples: [
			{
				id: 'types',
				title: 'Types',
				description: 'Info, success, and error; the last one is announced assertively.'
			},
			{
				id: 'duration',
				title: 'Duration',
				description: 'The third argument sets the visible time in milliseconds.'
			},
			{
				id: 'dismiss',
				title: 'Dismiss',
				description: '`hideToast()` closes the current toast from your own control.'
			}
		],
		manual: [
			{
				title: 'Functions',
				rows: [
					{
						name: 'showToast(message, type?, durationMs?)',
						type: '(message: string, type?: ToastType, durationMs?: number) => void',
						description:
							'Shows a toast, replacing the current one. The default duration is 5000 ms.'
					},
					{
						name: 'hideToast(id?)',
						type: '(id?: number) => void',
						description:
							'Hides the toast. With an id, only hides it when that toast is still active.'
					},
					{
						name: 'toastState',
						type: 'Writable<ToastState | null>',
						description: 'Store holding the active toast, or `null` when hidden.'
					}
				]
			},
			{
				title: 'Options',
				rows: [
					{
						name: 'type',
						type: "'info' | 'success' | 'error'",
						description: 'Controls the icon and accent. Defaults to `info`.'
					},
					{
						name: 'durationMs',
						type: 'number',
						description: 'Visible time in milliseconds; clamped to at least 800 ms.'
					}
				]
			}
		],
		accessibility: {
			notes: [
				'The layer uses `role="status"` with `aria-live="polite"` for info and success.',
				'Errors use `role="alert"` with `aria-live="assertive"`.',
				'The dismiss control has an accessible name.',
				'Only one toast exists at a time, so messages do not stack up.'
			]
		},
		related: ['alert', 'dialog', 'popover', 'badge']
	},
	{
		slug: 'tooltip',
		name: 'Tooltip',
		category: 'overlays',
		summary: 'A short label shown on hover or focus.',
		status: 'stable',
		since: '0.2.0',
		api: ['tooltip'],
		usage: [
			'Wrap the trigger; `label` is the tooltip text and the child stays the trigger.',
			'`delay` defaults to 300 ms; Escape hides an open tooltip.',
			'Tooltips supplement a visible label; they never replace one.'
		],
		examples: [
			{
				id: 'positions',
				title: 'Positions',
				description: 'The preferred side flips automatically when space runs out.'
			},
			{
				id: 'delay',
				title: 'Delay',
				description: 'A short delay for dense toolbars, a longer one for prose.'
			},
			{
				id: 'rich',
				title: 'Custom content',
				description: 'The `content` snippet can hold a shortcut, a hint, or both.'
			}
		],
		accessibility: {
			keyboard: [['Escape', 'Hides an open tooltip.']],
			notes: [
				'The wrapper points at the tooltip with `aria-describedby` only while it is visible.',
				'Focus and hover both open the tooltip; leaving or blurring closes it.',
				'Touch devices do not show hover tooltips, so keep the information available in the interface.'
			]
		},
		related: ['popover', 'shortcut', 'menu', 'button']
	},
	{
		slug: 'alert',
		name: 'Alert',
		category: 'feedback',
		summary: 'An inline message for information, success, warning, or error.',
		status: 'stable',
		since: '0.2.0',
		api: ['alert'],
		usage: [
			'`type` sets the icon and accent; `error` maps to `role="alert"`.',
			'`dismissible` adds a close button wired to `ondismiss`.',
			'Keep the body to a sentence or two; use `title` for the headline.'
		],
		examples: [
			{
				id: 'types',
				title: 'Types',
				description: 'Info, success, warning, and error share one layout.'
			},
			{
				id: 'dismissible',
				title: 'Dismissible',
				description: 'The close button calls `ondismiss`; the parent removes the alert.'
			},
			{
				id: 'body',
				title: 'Body only',
				description: 'A title is optional; children carry the message.'
			}
		],
		accessibility: {
			notes: [
				'Error alerts use `role="alert"`; the other types use `role="status"`.',
				'The icon is decorative and hidden from assistive technology.',
				'The close button has an accessible name and a visible focus ring.'
			]
		},
		related: ['toast', 'empty-state', 'badge', 'card']
	},
	{
		slug: 'empty-state',
		name: 'EmptyState',
		category: 'feedback',
		summary: 'Explains why an area has no content and offers the next step.',
		status: 'stable',
		since: '0.2.0',
		api: ['empty-state'],
		usage: [
			'`title` states the condition; `description` says what to do next.',
			'`action` holds the primary button; `icon` takes a snippet.',
			'Use `children` for secondary detail below the description.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A title and one line of explanation.' },
			{
				id: 'action',
				title: 'With action',
				description: 'The primary action sits below the description.'
			},
			{
				id: 'icon',
				title: 'With icon',
				description: 'An icon snippet anchors the state without adding noise.'
			}
		],
		accessibility: {
			notes: [
				'The title renders as an `h3`, so place the state inside a section with a higher-level heading.',
				'Use a real button or link in `action`; the empty state itself is not interactive.',
				'Keep the description text readable at small sizes; it uses the UI mono voice.'
			]
		},
		related: ['alert', 'skeleton', 'card', 'progress']
	},
	{
		slug: 'loading-spinner',
		name: 'LoadingSpinner',
		category: 'feedback',
		summary: 'An indeterminate indicator for short waits.',
		status: 'stable',
		since: '0.1.0',
		api: ['loading-spinner'],
		usage: [
			'`size` is the diameter in pixels; `color` defaults to the accent token.',
			'It announces itself as a status; add text when the wait may be long.',
			'For determinate work, use `Progress` instead.'
		],
		examples: [
			{ id: 'sizes', title: 'Sizes', description: 'Small, default, and large diameters.' },
			{
				id: 'color',
				title: 'Color',
				description: 'Pass any CSS color; the default is the brass accent.'
			},
			{
				id: 'inline',
				title: 'Inline',
				description: 'The spinner sits on the text baseline inside a status row.'
			}
		],
		accessibility: {
			notes: [
				'The spinner uses `role="status"` with the label `Loading`.',
				'It is decorative only in the sense of size; screen readers announce the status.',
				'Rotation stops when `prefers-reduced-motion` is set.'
			]
		},
		related: ['progress', 'skeleton', 'button', 'empty-state']
	},
	{
		slug: 'progress',
		name: 'Progress',
		category: 'feedback',
		summary: 'Shows how much of a task is complete.',
		status: 'stable',
		since: '0.2.0',
		api: ['progress'],
		usage: [
			'Set `max` when the scale is not 0–100; the percentage is derived.',
			'`indeterminate` hides the value and animates the track.',
			'`label` names the bar; `showValue` prints the percentage.'
		],
		examples: [
			{ id: 'basic', title: 'Basic', description: 'A bar bound to a value on a 0–100 scale.' },
			{
				id: 'labeled',
				title: 'Labeled',
				description: '`label` and `showValue` add a header above the track.'
			},
			{
				id: 'indeterminate',
				title: 'Indeterminate',
				description: 'Use when progress is unknown but the work is running.'
			},
			{
				id: 'sizes',
				title: 'Sizes',
				description: '`sm` for dense rows and `md` for page-level progress.'
			}
		],
		accessibility: {
			keyboard: [['Escape', 'Not applicable; the bar is read-only.']],
			notes: [
				'The bar uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.',
				'Indeterminate bars omit the value and use `aria-valuetext="Indeterminate"`.',
				'`label` becomes the accessible name through `aria-labelledby`.'
			]
		},
		related: ['loading-spinner', 'skeleton', 'slider', 'alert']
	},
	{
		slug: 'skeleton',
		name: 'Skeleton',
		category: 'feedback',
		summary: 'A pulsing placeholder that holds the shape of loading content.',
		status: 'stable',
		since: '0.2.0',
		api: ['skeleton'],
		usage: [
			'`shape` picks rect, line, or circle; `width` and `height` accept numbers or CSS lengths.',
			'Match the dimensions of the content that replaces it to avoid layout shift.',
			'Combine several skeletons to sketch a list or card while data loads.'
		],
		examples: [
			{
				id: 'shapes',
				title: 'Shapes',
				description: 'Rectangle, text line, and circle placeholders.'
			},
			{
				id: 'card',
				title: 'Card placeholder',
				description: 'A composition that mirrors the final card layout.'
			}
		],
		accessibility: {
			notes: [
				'Skeletons are hidden from assistive technology.',
				'The pulse stops when `prefers-reduced-motion` is set.',
				'Announce loading elsewhere, for example with `role="status"` or an `Alert`.'
			]
		},
		related: ['loading-spinner', 'progress', 'card', 'empty-state']
	},
	{
		slug: 'avatar',
		name: 'Avatar',
		category: 'display',
		summary: 'A circular identity image with initials and an optional presence dot.',
		status: 'stable',
		since: '0.2.0',
		api: ['avatar'],
		usage: [
			'`fallback` initials show when `src` is missing or fails to load.',
			'Pass an empty `alt` for decorative avatars; otherwise `alt` names the person.',
			'`status` adds a presence dot: neutral, success, error, info, or accent.'
		],
		examples: [
			{ id: 'sizes', title: 'Sizes', description: '`xs`, `sm`, `md`, and `lg` steps.' },
			{
				id: 'fallback',
				title: 'Fallback',
				description: 'Initials are used when there is no image or the image fails.'
			},
			{
				id: 'status',
				title: 'Status',
				description: 'A presence dot in the corner, with every status treatment.'
			}
		],
		accessibility: {
			notes: [
				'When the image is present, `alt` is its accessible name.',
				'The initials fallback gets `role="img"` and the same name when `alt` is set.',
				'An empty `alt` makes the avatar decorative; use it when the name is already next to the avatar.'
			]
		},
		related: ['badge', 'card', 'shortcut', 'empty-state']
	},
	{
		slug: 'badge',
		name: 'Badge',
		category: 'display',
		summary: 'A compact label for status, counts, or categories.',
		status: 'stable',
		since: '0.2.0',
		api: ['badge'],
		usage: [
			'`variant` colors the label; `neutral` stays monochrome.',
			'`dismissible` adds a remove button wired to `ondismiss`.',
			'Badges are not buttons; use `Toggle` for pressable chips.'
		],
		examples: [
			{
				id: 'variants',
				title: 'Variants',
				description: 'Neutral, success, error, accent, and info.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm` and `md` label heights.' },
			{
				id: 'dismissible',
				title: 'Dismissible',
				description: 'A trailing remove button calls `ondismiss`.'
			}
		],
		accessibility: {
			notes: [
				'Color is not the only signal; the text carries the meaning.',
				'The dismiss control is a button with an accessible name.',
				'Keep labels short; the badge truncates instead of wrapping.'
			]
		},
		related: ['avatar', 'alert', 'shortcut', 'card']
	},
	{
		slug: 'shortcut',
		name: 'Shortcut',
		category: 'display',
		summary: 'Renders a keyboard combination as key caps.',
		status: 'stable',
		since: '0.2.0',
		api: ['shortcut'],
		usage: [
			'`keys` accepts a single key or an ordered array.',
			'`label` supplies the accessible name for the combination.',
			'Use inside menus, command palettes, and help panels.'
		],
		examples: [
			{ id: 'single', title: 'Single key', description: 'One key cap.' },
			{
				id: 'combos',
				title: 'Combinations',
				description: 'Modifier keys in order, with the accessible name spelled out.'
			},
			{ id: 'sizes', title: 'Sizes', description: '`sm` inside menus, `md` for help panels.' }
		],
		accessibility: {
			notes: [
				'The component renders `<kbd>` elements, which assistive technology recognizes.',
				'Pass `label` when the visual key names are symbols rather than words.',
				'Keys are rendered in order; keep the platform convention, such as Control before K.'
			]
		},
		related: ['menu', 'tooltip', 'badge', 'button']
	}
];
