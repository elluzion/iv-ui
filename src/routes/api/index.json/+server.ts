import { json } from '@sveltejs/kit';
import apiIndex from '../../../docs/generated/api-index.json';

export const prerender = true;

export function GET() {
	return json(apiIndex, {
		headers: { 'cache-control': 'public, max-age=3600' }
	});
}
