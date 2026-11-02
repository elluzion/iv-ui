import { error } from '@sveltejs/kit';
import { foundationBySlug, foundations } from '../../../docs/registry';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return foundations.map((doc) => ({ slug: doc.slug }));
}

export const load: PageLoad = ({ params }) => {
	const doc = foundationBySlug.get(params.slug);
	if (!doc) error(404, 'Foundation not found');
	return { doc };
};
