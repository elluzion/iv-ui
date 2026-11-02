import { error } from '@sveltejs/kit';
import { pages } from '../../../docs/lib/data';
import { components } from '../../../docs/registry';

export const prerender = true;

export function entries() {
	return components.map((doc) => ({ slug: doc.slug }));
}

export function GET({ params }) {
	const content = pages[`/components/${params.slug}`];
	if (!content) error(404, 'Page not found');
	return new Response(content, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
