const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'textarea:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(', ');

function focusables(node: HTMLElement): HTMLElement[] {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(el) => el.offsetParent !== null || el === document.activeElement
	);
}

interface FocusTrapOptions {
	initial?: boolean;
	restore?: boolean;
}

/**
 * Svelte action that traps Tab focus inside `node`, optionally focusing the
 * first focusable child on mount and restoring focus to the previously focused
 * element on destroy. Use on modal containers (dialog, sheet, confirm dialog).
 */
export function focusTrap(node: HTMLElement, options: FocusTrapOptions = {}) {
	const { initial = false, restore = true } = options;
	let shouldRestore = restore;
	const previouslyFocused = document.activeElement as HTMLElement | null;

	function focusFirst() {
		const list = focusables(node);
		(list[0] ?? node).focus();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		const list = focusables(node);
		if (list.length === 0) {
			e.preventDefault();
			return;
		}
		const first = list[0];
		const last = list[list.length - 1];
		const active = document.activeElement as HTMLElement | null;
		if (e.shiftKey && (active === first || active === node)) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && active === last) {
			e.preventDefault();
			first.focus();
		}
	}

	node.addEventListener('keydown', onKeydown);
	if (initial) setTimeout(focusFirst, 0);

	return {
		update(next: FocusTrapOptions = {}) {
			if (next.restore !== undefined) shouldRestore = next.restore;
		},
		destroy() {
			node.removeEventListener('keydown', onKeydown);
			if (shouldRestore) previouslyFocused?.focus();
		}
	};
}
