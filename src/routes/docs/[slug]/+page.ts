import { error } from '@sveltejs/kit';
import { guideBySlug, guides } from '../../../docs/registry';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return guides.map((doc) => ({ slug: doc.slug }));
}

export const load: PageLoad = ({ params }) => {
	const doc = guideBySlug.get(params.slug);
	if (!doc) error(404, 'Guide not found');
	return { doc };
};
