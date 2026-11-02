/** Prop descriptions shared by name across components. */
const shared: Record<string, string> = {
	className: 'Extra classes merged onto the root element.',
	children: 'Content rendered inside the component.',
	disabled: 'Disables interaction and applies the disabled treatment.',
	size: 'Control size.',
	value: 'Current value. Bind with `bind:value` for two-way state.',
	defaultValue: 'Initial value when the component is uncontrolled.',
	label: 'Visible label for the control.',
	name: 'Form field name submitted with the surrounding form.',
	id: 'Element id. A generated id is used when omitted.',
	required: 'Marks the field as required.',
	placeholder: 'Placeholder shown while the field is empty.',
	error: 'Error message. Switches the control to the error treatment.',
	helper: 'Helper text shown below the control.',
	readonly: 'Prevents editing while keeping the value focusable and readable.',
	title: 'Title text.',
	description: 'Supporting text.',
	open: 'Whether the layer is open. Bind with `bind:open`.',
	multiple: 'Allows more than one value to be selected.',
	items: 'Items rendered by the component.',
	options: 'Options rendered by the component.',
	variant: 'Visual emphasis.',
	status: 'Status treatment.',
	icon: 'Icon rendered before the label.',
	footer: 'Content rendered in the footer area.',
	header: 'Content rendered in the header area.',
	action: 'Content rendered as a trailing action.',
	trigger: 'Replaces the default trigger with custom content.',
	maxWidth: 'Maximum content width in pixels.',
	width: 'Width of the element.',
	height: 'Height of the element.',
	onclick: 'Called when the element is activated.',
	onchange: 'Called when the value changes; the new value is in `event.detail`.',
	oninput: 'Called on every input event with the native event.',
	onfocus: 'Called when the control receives focus.',
	onblur: 'Called when the control loses focus.',
	onkeydown: 'Called on keydown with the native keyboard event.',
	onclose: 'Called when the layer requests to close.',
	onopen: 'Called after the layer opens.',
	ondismiss: 'Called when the dismiss control is activated.'
};

/** Component-specific overrides, keyed by component id and prop name. */
const overrides: Record<string, Record<string, string>> = {
	accordion: {
		multiple: 'Allows several items to stay open at once.',
		value: 'Open item value(s). Bind with `bind:value` for controlled state.',
		defaultValue: 'Item(s) open on first render.',
		onchange: 'Called with `{ value }` after an item opens or closes.'
	},
	'accordion-item': {
		value: 'Unique value used by the parent accordion to track this item.',
		title: 'Trigger text. Use the `trigger` snippet for custom content.',
		trigger: 'Custom trigger content replacing the title.',
		children: 'Panel content revealed when the item is open.'
	},
	alert: {
		type: 'Status family; controls the icon and color treatment.',
		title: 'Short headline for the message.',
		dismissible: 'Shows a close button.',
		ondismiss: 'Called when the close button is pressed.',
		children: 'Message body.'
	},
	article: {
		title: 'Article heading.',
		description: 'Standfirst shown below the heading.',
		maxWidth: 'Maximum measure in pixels.'
	},
	avatar: {
		src: 'Image source. Falls back to `fallback` initials when missing or broken.',
		alt: 'Accessible name for the image. Use an empty string for decorative avatars.',
		fallback: 'Initials shown when there is no image.',
		status: 'Presence dot treatment.',
		children: 'Custom avatar content replacing the image.'
	},
	badge: {
		variant: 'Status color. `neutral` is the default.',
		size: 'Badge size.',
		dismissible: 'Shows a remove button.',
		ondismiss: 'Called when the remove button is pressed.',
		children: 'Badge text.'
	},
	breadcrumb: {
		items: 'Trail entries. The last item is rendered as the current page.',
		separator: 'Custom separator snippet; defaults to `/`.',
		ariaLabel: 'Accessible name for the navigation landmark.'
	},
	button: {
		variant: 'Visual emphasis. `secondary` is the default.',
		size: 'Button height and padding.',
		loading: 'Shows a spinner, sets `aria-busy`, and ignores clicks.',
		type: 'Native button type.',
		onclick: 'Called on activation with the native mouse event.'
	},
	'button-group': {
		items: 'Buttons to render. Items may be strings or `{ value, label, icon, disabled }`.',
		mode: 'Selection behaviour: one value, many values, or none.',
		value: 'Selected value(s). Bind with `bind:value`.',
		label: 'Accessible name for the group.',
		variant: 'Visual emphasis for every button in the group.',
		orientation: 'Stacking direction.',
		fullWidth: 'Stretches the group to the container width.',
		onchange: 'Called with `{ value }` after a selection changes.'
	},
	card: {
		padding: 'Inner padding. `none` is useful for lists that manage their own spacing.',
		radius: 'Corner radius step.',
		hoverable: 'Adds the hover treatment without making the card interactive.',
		selected: 'Renders the selected treatment.',
		onclick: 'Makes the card interactive and called on activation.',
		action: 'Slot in the header, right of the title.',
		header: 'Replaces the default header.',
		footer: 'Content rendered below the body.'
	},
	checkbox: {
		checked: 'Checked state. Bind with `bind:checked`.',
		indeterminate: 'Renders the mixed state; useful for “select all”.',
		label: 'Label text rendered next to the box.',
		value: 'Value submitted with the form when checked.',
		onchange: 'Called with `{ checked }` after the state changes.'
	},
	collapsible: {
		title: 'Trigger text.',
		trigger: 'Custom trigger content.',
		open: 'Open state. Bind with `bind:open`.',
		defaultOpen: 'Open on first render when uncontrolled.',
		onchange: 'Called with `{ open }` after the panel toggles.'
	},
	'context-menu': {
		entries: 'Menu structure: headers, items, separators, and submenus.',
		label: 'Accessible name for the menu.',
		touchTrigger: 'Gesture that opens the menu on touch devices.',
		onclick: 'Called with the native event and the activated entry.',
		children: 'The area that owns the context menu.'
	},
	dialog: {
		open: 'Whether the dialog is visible. Set it to false from `onclose` to complete the close.',
		title: 'Dialog title; also used as the accessible name.',
		size: 'Maximum dialog width.',
		closeOnBackdrop: 'Closes when the backdrop is clicked.',
		closeOnEscape: 'Closes on Escape.',
		onclose: 'Called when the dialog requests to close; set `open = false` in response.',
		icon: 'Icon rendered before the title.',
		footer: 'Actions rendered below the body.'
	},
	'empty-state': {
		icon: 'Illustration or icon shown above the title.',
		title: 'Headline for the empty state.',
		description: 'Explanation of why the area is empty.',
		action: 'Primary action, usually a button.',
		children: 'Additional content below the action.'
	},
	field: {
		label: 'Label text associated with the control.',
		htmlFor: 'Id of the control to label. Generated when omitted.',
		error: 'Error message; replaces the helper text.',
		helper: 'Helper text shown below the control.',
		messageId: 'Id used for the message element referenced by `aria-describedby`.',
		children: 'The control being labelled.'
	},
	input: {
		type: 'Native input type.',
		value: 'Current value. Bind with `bind:value`.',
		clearable: 'Shows a reset button while the field has a value.',
		leadingIcon: 'Snippet rendered inside the field, before the text.',
		trailingIcon: 'Snippet rendered inside the field, after the text.',
		oninput: 'Called on every keystroke with the native event.',
		onchange: 'Called when the value is committed.',
		autocomplete: 'Native autocomplete hint.',
		minlength: 'Minimum number of characters.',
		maxlength: 'Maximum number of characters.',
		min: 'Minimum value for numeric and date types.',
		max: 'Maximum value for numeric and date types.',
		pattern: 'Regular expression the value must match.'
	},
	'input-group': {
		size: 'Control size shared by the group and its addons.',
		prefix: 'Content rendered before the input, such as a protocol or icon.',
		suffix: 'Content rendered after the input, such as a unit or button.',
		children: 'The input control.'
	},
	'loading-spinner': {
		size: 'Diameter in pixels.',
		color: 'Stroke color; defaults to the current text color.'
	},
	menu: {
		entries: 'Menu structure: headers, items, separators, and submenus.',
		semantic: 'ARIA role: a command menu or a listbox.',
		multiselect: 'Allows several items to show as selected.',
		emptyLabel: 'Text shown when there are no entries.',
		label: 'Accessible name for the menu.',
		onclick: 'Called with the native event and the activated entry.'
	},
	'native-select': {
		options: 'Options to render. Strings are used as both value and label.',
		value: 'Selected value. Bind with `bind:value`.',
		placeholder: 'Disabled first option shown while no value is selected.',
		label: 'Visible label above the select.',
		children: 'Custom option elements, used instead of `options`.',
		onchange: 'Called with the native change event.'
	},
	popover: {
		open: 'Whether the popover is open. Bind with `bind:open`.',
		anchor: 'Element or selector the popover is positioned against.',
		placement: 'Preferred side of the anchor.',
		align: 'Alignment along the chosen side.',
		gap: 'Distance from the anchor in pixels.',
		closeOnOutside: 'Closes when a click lands outside the popover.',
		closeOnEscape: 'Closes on Escape.',
		interactive: 'Keeps the popover open while it is hovered or focused.',
		showOn: 'Events that open the popover.',
		hideOn: 'Events that close the popover.',
		onopen: 'Called after the popover opens.',
		onclose: 'Called after the popover closes.'
	},
	progress: {
		value: 'Current progress value.',
		max: 'Value that represents completion.',
		indeterminate: 'Renders an animated unknown-progress state.',
		label: 'Visible label and accessible name.',
		showValue: 'Shows the percentage at the end of the track.',
		size: 'Track thickness.'
	},
	'radio-group': {
		items: 'Radio options. Strings are used as both value and label.',
		value: 'Selected value. Bind with `bind:value`.',
		name: 'Shared name for the native radio inputs.',
		orientation: 'Layout direction.',
		onchange: 'Called with `{ value }` after the selection changes.'
	},
	select: {
		options: 'Options to render. Strings are used as both value and label.',
		value: 'Selected value(s). Bind with `bind:value`.',
		multiple: 'Allows several values; `value` becomes an array.',
		searchable: 'Adds a filter field to the option list.',
		clearable: 'Shows a reset button while a value is selected.',
		placeholder: 'Text shown while nothing is selected.',
		onchange: 'Called with `{ value }` after the selection changes.',
		onfocus: 'Called when the trigger receives focus.',
		onblur: 'Called when the trigger loses focus.',
		onkeydown: 'Called on keydown inside the trigger.'
	},
	separator: {
		orientation: 'Line direction.',
		label: 'Optional text rendered in the middle of the line.',
		spacing: 'Vertical margin around the line.'
	},
	sheet: {
		open: 'Whether the sheet is visible. Bind with `bind:open`.',
		side: 'Edge the sheet slides in from.',
		size: 'Sheet width (or height for top/bottom sheets).',
		title: 'Sheet title; also used as the accessible name.',
		showCloseButton: 'Shows the header close button.',
		closeOnBackdrop: 'Closes when the backdrop is clicked.',
		closeOnEscape: 'Closes on Escape.',
		onclose: 'Called when the sheet requests to close; set `open = false` in response.',
		icon: 'Icon rendered before the title.',
		footer: 'Actions rendered below the body.'
	},
	shortcut: {
		keys: 'Key or keys to display, in order.',
		label: 'Accessible name for the combination.',
		size: 'Key cap size.'
	},
	skeleton: {
		shape: 'Visual shape of the placeholder.',
		width: 'Width; numbers are treated as pixels.',
		height: 'Height; numbers are treated as pixels.'
	},
	slider: {
		value: 'Current value, or `[start, end]` when `range` is set.',
		range: 'Renders two handles and a `[start, end]` value.',
		min: 'Minimum value.',
		max: 'Maximum value.',
		step: 'Increment between values.',
		tickMarks: 'Draws ticks at every step.',
		showValue: 'Shows the current value next to the label.',
		label: 'Visible label and accessible name.',
		onchange: 'Called with `{ value }` while the handle moves.'
	},
	switch: {
		checked: 'On/off state. Bind with `bind:checked`.',
		label: 'Label rendered next to the switch.',
		onchange: 'Called with `{ checked }` after the state changes.'
	},
	'tab-list': {
		label: 'Accessible name for the tab list.',
		children: 'The tab buttons.'
	},
	'tab-panel': {
		value: 'Value of the tab that controls this panel.',
		children: 'Panel content.'
	},
	tab: {
		value: 'Unique value matched by a tab panel.',
		disabled: 'Prevents selection and removes the tab from the tab order.',
		children: 'Tab label.'
	},
	tabs: {
		value: 'Selected tab value. Bind with `bind:value`.',
		defaultValue: 'Selected tab value on first render when uncontrolled.',
		size: 'Tab height and padding.',
		bordered: 'Draws a border around the tab list and panel.',
		onchange: 'Called with `{ value }` after a tab is selected.'
	},
	textarea: {
		value: 'Current value. Bind with `bind:value`.',
		rows: 'Visible number of text lines.',
		maxlength: 'Maximum number of characters.',
		resizable: 'Which axes the user may resize.',
		showCount: 'Shows the character count when `maxlength` is set.',
		oninput: 'Called on every keystroke with the native event.'
	},
	toggle: {
		checked: 'Pressed state. Bind with `bind:checked`.',
		label: 'Accessible name. Visible text can be passed as children instead.',
		icon: 'Icon rendered inside the toggle.',
		onchange: 'Called with `{ checked }` after the state changes.'
	},
	'toggle-group': {
		items: 'Toggles to render. Items may be strings or `{ value, label, icon, disabled }`.',
		mode: 'Selection behaviour: one value, many values, or none.',
		value: 'Selected value(s). Bind with `bind:value`.',
		label: 'Accessible name for the group.',
		orientation: 'Stacking direction.',
		onchange: 'Called with `{ value }` after a selection changes.'
	},
	tooltip: {
		label: 'Tooltip text.',
		content: 'Custom tooltip content replacing the label.',
		position: 'Preferred side of the trigger.',
		delay: 'Delay before showing, in milliseconds.',
		children: 'The trigger element.'
	}
};

const eventDescriptions: Record<string, string> = {
	click: 'Called on activation with the native mouse event.',
	change: 'Called when the value changes; the new value is in `event.detail`.',
	input: 'Called on every input event with the native event.',
	focus: 'Called when the control receives focus.',
	blur: 'Called when the control loses focus.',
	keydown: 'Called on keydown with the native keyboard event.',
	dismiss: 'Called when the dismiss control is activated.',
	open: 'Called after the layer opens.',
	close: 'Called when the layer requests to close.'
};

const typeDescriptions: Record<string, string> = {
	'accordion.AccordionValue': 'One open item, or several when `multiple` is set.',
	'avatar.AvatarSize': 'Avatar diameter steps.',
	'avatar.AvatarStatus': 'Presence dot treatments.',
	'breadcrumb.BreadcrumbItem': 'One entry in a breadcrumb trail.',
	'button-group.ButtonGroupMode': 'Selection behaviour of a button group.',
	'button-group.ButtonGroupVariant': 'Emphasis applied to every button in the group.',
	'button-group.ButtonGroupItem': 'A button description or a plain string label.',
	'menu.MenuSemantic': 'ARIA role used for the menu container.',
	'menu.MenuItem': 'A single actionable menu row.',
	'menu.MenuEntry': 'One row of the menu structure, including headers and separators.',
	'native-select.NativeSelectOption': 'An option value or a full option object.',
	'popover.PopoverPlacement': 'Side of the anchor the popover prefers.',
	'popover.PopoverAlign': 'Alignment along the popover edge.',
	'popover.PopoverShowEvent': 'Events that can open a popover.',
	'popover.PopoverHideEvent': 'Events that can close a popover.',
	'radio-group.RadioItem': 'A radio value or a labelled radio option.',
	'select.SelectOption': 'An option value or a full option object.',
	'sheet.SheetSide': 'Edge the sheet slides in from.',
	'sheet.SheetSize': 'Sheet width or height step.',
	'toggle-group.ToggleGroupMode': 'Selection behaviour of a toggle group.',
	'toggle-group.ToggleGroupItem': 'A toggle description or a plain string label.',
	'tooltip.TooltipPosition': 'Side of the trigger the tooltip prefers.'
};

export function describeProp(componentId: string, propName: string): string {
	return overrides[componentId]?.[propName] ?? shared[propName] ?? '';
}

export function describeEvent(eventName: string): string {
	return eventDescriptions[eventName] ?? '';
}

export function describeType(componentId: string, typeName: string): string {
	return typeDescriptions[`${componentId}.${typeName}`] ?? '';
}
