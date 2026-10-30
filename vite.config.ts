/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
	ssr: {
		// The icon package ships `.svelte` files; Node cannot load them during
		// prerendering unless Vite bundles the dependency for SSR.
		noExternal: ['@tabler/icons-svelte']
	},
	optimizeDeps: {
		// `aria-query` is CJS-only, but `@testing-library/dom` imports it as ESM
		// (`import { elementRoles } from 'aria-query'`). Pre-bundle it so the browser
		// test environment resolves the named exports.
		include: ['@testing-library/dom', 'aria-query']
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts'],
		setupFiles: ['./src/lib/test/setup.ts'],
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({}),
			instances: [
				{
					browser: 'chromium'
				}
			]
		}
	}
});
