import { error } from '@sveltejs/kit';
import { pages } from '../../docs/lib/data';

export const prerender = true;

export function GET() {
	const content = pages['/components'];
	if (!content) error(404, 'Page not found');
	return new Response(content, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
