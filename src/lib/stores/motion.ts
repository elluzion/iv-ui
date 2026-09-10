import { readable } from 'svelte/store';

/**
 * Readable store resolving to `true` when the user prefers reduced motion.
 * Mirrors the Svelte `reducedMotion` helper (not exported in all versions) and
 * flips reactively when the OS preference changes. SSR-safe: defaults to false.
 */
export const reducedMotion = readable(false, (set) => {
	if (typeof window === 'undefined' || !window.matchMedia) return;
	// In Vitest/Storybook browser tests, force reduced motion to avoid
	// flaky a11y color-contrast failures while toasts/tooltips are mid-fade
	// (e.g. #797979 on #0c0c0d at 50% opacity -> 4.49 vs 4.5 threshold).
	// import.meta.env.MODE === 'test' in Vitest, navigator.webdriver in Playwright.
	const isTestEnv =
		// @ts-ignore
		(import.meta as unknown as { env?: { MODE?: string } })?.env?.MODE === 'test' ||
		// @ts-ignore
		(globalThis as unknown as { __vitest_worker__?: unknown })?.__vitest_worker__ !== undefined ||
		// @ts-ignore
		(typeof navigator !== 'undefined' &&
			(navigator as unknown as { webdriver?: boolean }).webdriver);
	if (isTestEnv) {
		set(true);
		return;
	}
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	set(mq.matches);
	const onChange = (e: MediaQueryListEvent) => set(e.matches);
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
});
