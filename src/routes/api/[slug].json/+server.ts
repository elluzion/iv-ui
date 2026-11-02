import { error, json } from '@sveltejs/kit';
import { apiPayloads } from '../../../docs/lib/data';
import { components } from '../../../docs/registry';

export const prerender = true;

export function entries() {
	return components.map((doc) => ({ slug: doc.slug }));
}

export function GET({ params }) {
	const payload = apiPayloads[params.slug];
	if (!payload) error(404, 'Component not found');
	return json(payload, {
		headers: { 'cache-control': 'public, max-age=3600' }
	});
}
