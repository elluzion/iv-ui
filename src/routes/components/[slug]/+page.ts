import { error } from '@sveltejs/kit';
import { componentBySlug, components } from '../../../docs/registry';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return components.map((doc) => ({ slug: doc.slug }));
}

export const load: PageLoad = ({ params }) => {
	const doc = componentBySlug.get(params.slug);
	if (!doc) error(404, 'Component not found');
	return { doc };
};
