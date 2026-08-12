import { readable } from 'svelte/store';

/**
 * Readable store resolving to `true` when the user prefers reduced motion.
 * Mirrors the Svelte `reducedMotion` helper (not exported in all versions) and
 * flips reactively when the OS preference changes. SSR-safe: defaults to false.
 */
export const reducedMotion = readable(false, (set) => {
	if (typeof window === 'undefined' || !window.matchMedia) return;
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	set(mq.matches);
	const onChange = (e: MediaQueryListEvent) => set(e.matches);
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
});
