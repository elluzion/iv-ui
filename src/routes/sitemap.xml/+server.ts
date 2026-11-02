import { siteUrl } from '../../docs/manifest';
import { components, foundations, guides } from '../../docs/registry';

export const prerender = true;

export function GET() {
	const paths = [
		'/',
		'/components',
		...guides.map((doc) => `/docs/${doc.slug}`),
		...foundations.map((doc) => `/foundations/${doc.slug}`),
		...components.map((doc) => `/components/${doc.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `	<url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
}
