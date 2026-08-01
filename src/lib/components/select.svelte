<script lang="ts">
	import { IconCheck, IconChevronDown, IconSearch, IconX } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';

	export type SelectOption = string | { value: string; label?: string; disabled?: boolean };

	interface NormalizedOption {
		value: string;
		label: string;
		disabled: boolean;
	}

	interface Props {
		options: SelectOption[];
		value?: string | string[];
		multiple?: boolean;
		searchable?: boolean;
		clearable?: boolean;
		disabled?: boolean;
		required?: boolean;
		placeholder?: string;
		label?: string;
		error?: string;
		helper?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg';
		onchange?: (e: CustomEvent<{ value: string | string[] }>) => void;
		'on:change'?: (e: CustomEvent<{ value: string | string[] }>) => void;
		onfocus?: (e: FocusEvent) => void;
		'on:focus'?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
		'on:blur'?: (e: FocusEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
		'on:keydown'?: (e: KeyboardEvent) => void;
	}

	function normalize(o: SelectOption): NormalizedOption {
		if (typeof o === 'string') return { value: o, label: o, disabled: false };
		return { value: o.value, label: o.label ?? o.value, disabled: o.disabled ?? false };
	}

	let {
		options = [],
		value = $bindable(''),
		multiple = false,
		searchable = false,
		clearable = false,
		disabled = false,
		required = false,
		placeholder = 'Select…',
		label = '',
		error = '',
		helper = '',
		name = '',
		size = 'md',
		onchange,
		'on:change': onEventChange,
		onfocus,
		'on:focus': onEventFocus,
		onblur,
		'on:blur': onEventBlur,
		onkeydown,
		'on:keydown': onEventKeydown
	}: Props = $props();

	const uid = $props.id();

	let rootEl = $state<HTMLDivElement>();
	let triggerEl = $state<HTMLDivElement>();
	let searchEl = $state<HTMLInputElement>();
	let listEl = $state<HTMLDivElement>();
	let open = $state(false);
	let search = $state('');
	let activeIndex = $state(-1);

	const listId = `iv-select-${uid}-listbox`;
	const labelId = `iv-select-${uid}-label`;
	const triggerId = `iv-select-${uid}-combobox`;
	const optionId = (i: number) => `iv-select-${uid}-opt-${i}`;

	const normalized = $derived(options.map(normalize));
	const filtered = $derived(
		searchable && search.trim() !== ''
			? normalized.filter((o) => o.label.toLowerCase().includes(search.trim().toLowerCase()))
			: normalized
	);

	const selectedValues = $derived<string[]>(
		multiple
			? Array.isArray(value)
				? value
				: []
			: typeof value === 'string' && value !== ''
				? [value]
				: []
	);

	const selectedLabels = $derived(
		selectedValues.map((v) => normalized.find((o) => o.value === v)?.label ?? v)
	);

	const selectedItems = $derived(
		selectedValues.map((v) => ({
			value: v,
			label: normalized.find((o) => o.value === v)?.label ?? v
		}))
	);

	const triggerText = $derived(selectedLabels[0] ?? '');

	const hasSelection = $derived(selectedValues.length > 0);
	const showClear = $derived(clearable && hasSelection && !disabled);
	const hasError = $derived(error.length > 0);

	function isSelected(o: NormalizedOption) {
		return selectedValues.includes(o.value);
	}

	function dispatchChange() {
		const e = new CustomEvent('change', { detail: { value } });
		onchange?.(e);
		onEventChange?.(e);
	}

	function select(o: NormalizedOption) {
		if (o.disabled || disabled) return;
		if (multiple) {
			const current = Array.isArray(value) ? value : [];
			value = current.includes(o.value)
				? current.filter((v) => v !== o.value)
				: [...current, o.value];
		} else {
			value = o.value;
			open = false;
			triggerEl?.focus();
		}
		dispatchChange();
	}

	function clear() {
		value = multiple ? [] : '';
		dispatchChange();
		triggerEl?.focus();
	}

	function handleClearClick(e: MouseEvent) {
		e.stopPropagation();
		clear();
	}

	function toggle() {
		if (disabled) return;
		open = !open;
		if (open) {
			search = '';
			activeIndex = -1;
		} else {
			triggerEl?.focus();
		}
	}

	function firstSelectable() {
		return filtered.findIndex((o) => !o.disabled);
	}

	function lastSelectable() {
		for (let i = filtered.length - 1; i >= 0; i--) {
			if (!filtered[i].disabled) return i;
		}
		return -1;
	}

	function moveActive(dir: 1 | -1) {
		const selectable = filtered.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i !== -1);
		if (selectable.length === 0) return;
		let pos = selectable.indexOf(activeIndex);
		if (pos === -1) pos = dir === 1 ? -1 : selectable.length;
		const next =
			selectable[(((pos + dir) % selectable.length) + selectable.length) % selectable.length];
		activeIndex = next;
		scrollActiveIntoView();
	}

	function scrollActiveIntoView() {
		setTimeout(() => {
			listEl?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({
				block: 'nearest'
			});
		}, 0);
	}

	function handleKeydown(e: KeyboardEvent) {
		onkeydown?.(e);
		onEventKeydown?.(e);

		if (disabled) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!open) {
					open = true;
					search = '';
					activeIndex = firstSelectable();
					scrollActiveIntoView();
				} else {
					moveActive(1);
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (open) moveActive(-1);
				break;
			case 'Home':
				if (open) {
					e.preventDefault();
					activeIndex = firstSelectable();
					scrollActiveIntoView();
				}
				break;
			case 'End':
				if (open) {
					e.preventDefault();
					activeIndex = lastSelectable();
					scrollActiveIntoView();
				}
				break;
			case 'Enter':
				if (open && activeIndex >= 0 && filtered[activeIndex]) {
					e.preventDefault();
					select(filtered[activeIndex]);
				}
				break;
			case ' ':
				if (e.target !== searchEl) {
					e.preventDefault();
					open = !open;
					if (!open) triggerEl?.focus();
				}
				break;
			case 'Escape':
				if (open) {
					e.preventDefault();
					open = false;
					triggerEl?.focus();
				}
				break;
		}
	}

	function handleOptionEnter(i: number) {
		if (!filtered[i]?.disabled) activeIndex = i;
	}

	function handleFocus(e: FocusEvent) {
		onfocus?.(e);
		onEventFocus?.(e);
	}

	function handleBlur(e: FocusEvent) {
		onblur?.(e);
		onEventBlur?.(e);
	}

	$effect(() => {
		if (!open) return;
		function onDocMouseDown(e: MouseEvent) {
			if (rootEl && !rootEl.contains(e.target as Node)) open = false;
		}
		document.addEventListener('mousedown', onDocMouseDown);
		return () => document.removeEventListener('mousedown', onDocMouseDown);
	});

	$effect(() => {
		if (open && searchable) {
			const t = setTimeout(() => searchEl?.focus(), 0);
			return () => clearTimeout(t);
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (wrapper catches keyboard events from trigger and search) -->
<div class="root" class:disabled bind:this={rootEl} onkeydown={handleKeydown}>
	{#if label}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (label click focuses the combobox) -->
		<label class="label" id={labelId} for={triggerId} onclick={() => triggerEl?.focus()}>
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="trigger-wrap">
		<!-- svelte-ignore a11y_click_events_have_key_events (keyboard events are handled on the wrapper via aria-activedescendant) -->
		<div
			bind:this={triggerEl}
			id={triggerId}
			class="trigger"
			class:sm={size === 'sm'}
			class:lg={size === 'lg'}
			class:open
			class:has-error={hasError}
			class:disabled
			role="combobox"
			tabindex={disabled ? -1 : 0}
			aria-expanded={open}
			aria-haspopup="listbox"
			aria-controls={open ? listId : undefined}
			aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
			aria-labelledby={label ? labelId : undefined}
			aria-invalid={hasError || undefined}
			aria-disabled={disabled || undefined}
			onclick={toggle}
			onfocus={handleFocus}
			onblur={handleBlur}
			aria-describedby={hasError
				? name
					? `${name}-error`
					: undefined
				: helper
					? name
						? `${name}-helper`
						: undefined
					: undefined}
		>
			{#if multiple}
				<div class="chips" class:placeholder={!hasSelection}>
					{#if hasSelection}
						{#each selectedItems as item (item.value)}
							<span class="chip">{item.label}</span>
						{/each}
					{:else}
						<span class="chip-placeholder">{placeholder}</span>
					{/if}
				</div>
			{:else}
				<span class="trigger-label" class:placeholder={!hasSelection}>
					{hasSelection ? triggerText : placeholder}
				</span>
			{/if}

			{#if showClear}
				<button
					type="button"
					class="clear-btn"
					onclick={handleClearClick}
					aria-label="Clear selection"
					tabindex="-1"
				>
					<IconX size={14} />
				</button>
			{/if}

			<span class="chevron" class:open aria-hidden="true">
				<IconChevronDown size={16} />
			</span>
		</div>

		{#if open}
			<div
				class="dropdown"
				role="listbox"
				id={listId}
				aria-multiselectable={multiple || undefined}
				transition:fly={{ y: -16, duration: 200 }}
			>
				{#if searchable}
					<div class="search">
						<span class="search-icon" aria-hidden="true"><IconSearch size={14} /></span>
						<input
							bind:this={searchEl}
							type="text"
							bind:value={search}
							placeholder="Search options…"
							aria-label="Search options"
						/>
					</div>
				{/if}

				<div class="options" bind:this={listEl}>
					{#each filtered as option, i (option.value)}
						<!-- svelte-ignore a11y_click_events_have_key_events, a11y_mouse_events_have_key_events (keyboard navigation is handled by the combobox via aria-activedescendant) -->
						<div
							class="option"
							class:active={activeIndex === i}
							class:selected={isSelected(option)}
							class:disabled={option.disabled}
							role="option"
							id={optionId(i)}
							tabindex="-1"
							aria-selected={isSelected(option)}
							aria-disabled={option.disabled || undefined}
							data-active={activeIndex === i}
							onclick={() => select(option)}
							onmouseover={() => handleOptionEnter(i)}
						>
							<span class="check" class:checked={isSelected(option)} aria-hidden="true">
								<IconCheck size={14} />
							</span>
							<span class="option-label">{option.label}</span>
						</div>
					{:else}
						<div class="empty">No options found</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	{#if hasError}
		<p class="message error-message" id={name ? `${name}-error` : undefined}>{error}</p>
	{:else if helper}
		<p class="message helper-message" id={name ? `${name}-helper` : undefined}>{helper}</p>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;

		&.disabled {
			cursor: not-allowed;
		}
	}

	.trigger-wrap {
		position: relative;
		width: 100%;
	}

	.trigger {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		background: var(--iv_surface-raised);
		color: var(--iv_foreground);
		font-family: var(--iv_font-mono);
		font-size: 1rem;
		padding: 9px 13px;
		cursor: pointer;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;

		&:hover:not(.disabled) {
			border-color: var(--iv_border-hover);
		}

		&:focus-visible,
		&.open {
			outline: none;
			border-color: var(--iv_border-focus);
			box-shadow: 0 0 0 3px var(--iv_ring);
		}

		&.has-error {
			border-color: var(--iv_error);

			&.open {
				box-shadow: 0 0 0 3px var(--iv_error-surface);
			}
		}

		&.sm {
			padding: 5px 11px;
			font-size: 0.875rem;
		}

		&.lg {
			padding: 13px 16px;
			font-size: 1.05rem;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.trigger-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;

		&.placeholder {
			color: var(--iv_foreground-dim);
		}
	}

	.chips {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px;

		&.placeholder {
			color: var(--iv_foreground-dim);
		}
	}

	.chip {
		display: inline-flex;
		align-items: center;
		max-width: 100%;
		padding: 1px 6px;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_surface-overlay);
		border: 1px solid var(--iv_border);
		color: var(--iv_foreground);
		font-family: var(--iv_font-mono);
		font-size: 13px;
		font-weight: 500;
		line-height: 1.7;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chip-placeholder {
		color: var(--iv_foreground-dim);
	}

	.clear-btn {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: var(--iv_foreground-dim);
		cursor: pointer;
		flex-shrink: 0;

		&:hover {
			color: var(--iv_foreground);
			background: var(--iv_surface-overlay);
		}
	}

	.chevron {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--iv_foreground-dim);
		transition: transform 0.12s;

		&.open {
			transform: rotate(180deg);
			color: var(--iv_foreground);
		}
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--iv_surface-raised);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		box-shadow: var(--iv_shadow-lg);
		overflow: hidden;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 8px 10px;
		border-bottom: 1px solid var(--iv_border);

		.search-icon {
			display: flex;
			align-items: center;
			flex-shrink: 0;
			color: var(--iv_foreground-dim);
		}

		input {
			all: unset;
			flex: 1;
			min-width: 0;
			font-family: var(--iv_font-mono);
			font-size: 0.875rem;
			color: var(--iv_foreground);

			&::placeholder {
				color: var(--iv_foreground-dim);
			}
		}
	}

	.options {
		max-height: 240px;
		overflow-y: auto;
		padding: 4px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		scrollbar-color: var(--iv_border) transparent;
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--iv_border);
			border-radius: var(--iv_radius-pill);

			&:hover {
				background: var(--iv_border-hover);
			}
		}
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 7px 10px;
		border-radius: var(--iv_radius-sm);
		font-family: var(--iv_font-sans);
		font-size: 0.9rem;
		color: var(--iv_foreground);
		cursor: pointer;
		transition: background 0.12s;

		&:hover,
		&.active {
			background: var(--iv_surface-hover);
		}

		&.disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}

	.check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		flex-shrink: 0;
		color: var(--iv_foreground);
		visibility: hidden;

		&.checked {
			visibility: visible;
		}
	}

	.option-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.empty {
		padding: 12px 10px;
		text-align: center;
		font-family: var(--iv_font-sans);
		font-size: 0.85rem;
		color: var(--iv_foreground-dim);
	}

	.label {
		display: block;
		font-family: var(--iv_font-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--iv_foreground);
		margin-bottom: 6px;
	}

	.required-mark {
		color: var(--iv_error);
		margin-left: 2px;
	}

	.message {
		margin: 4px 0 0 0;
		font-family: var(--iv_font-sans);
		font-size: 0.8rem;
	}

	.error-message {
		color: var(--iv_error);
	}

	.helper-message {
		color: var(--iv_foreground-dim);
	}
</style>
