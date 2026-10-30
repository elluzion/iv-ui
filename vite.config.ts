/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
	typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
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
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook')
					})
				],
				test: {
					name: 'storybook',
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
			}
		]
	}
});
