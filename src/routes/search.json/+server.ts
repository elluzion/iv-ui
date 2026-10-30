import { json } from '@sveltejs/kit';
import { searchRecords } from '../../docs/lib/data';

export const prerender = true;

export function GET() {
	return json(searchRecords, {
		headers: { 'cache-control': 'public, max-age=3600' }
	});
}
