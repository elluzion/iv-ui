import llms from '../../docs/generated/llms.txt?raw';

export const prerender = true;

export function GET() {
	return new Response(llms, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
