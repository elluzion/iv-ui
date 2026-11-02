import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		// The docs site is fully static: every route is prerendered.
		// No options: on Vercel this switches to zero-config mode and writes the
		// Build Output API to .vercel/output; locally it still writes build/.
		adapter: adapter()
	}
};

export default config;
