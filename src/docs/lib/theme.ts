export type Theme = 'dark' | 'light';

export const themeStorageKey = 'iv-docs-theme';

export function readTheme(): Theme {
	if (typeof document === 'undefined') return 'dark';
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem(themeStorageKey, theme);
	} catch {
		// Storage can be blocked; the theme still applies for this page.
	}
}

export function toggleTheme(): Theme {
	const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
	applyTheme(next);
	return next;
}
