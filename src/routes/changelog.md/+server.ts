import { changelogMarkdown } from '../../docs/lib/changelog';

export const prerender = true;

export function GET() {
	return new Response(changelogMarkdown, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
