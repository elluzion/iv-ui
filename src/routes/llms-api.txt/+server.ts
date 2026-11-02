import llmsApi from '../../docs/generated/llms-api.txt?raw';

export const prerender = true;

export function GET() {
	return new Response(llmsApi, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
