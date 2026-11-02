import { siteUrl } from '../../docs/manifest';

export const prerender = true;

export function GET() {
	const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
