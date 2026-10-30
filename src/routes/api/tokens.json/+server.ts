import { json } from '@sveltejs/kit';
import { tokenGroups, tokens } from '../../../docs/lib/data';

export const prerender = true;

export function GET() {
	return json(
		{ tokens, groups: tokenGroups },
		{ headers: { 'cache-control': 'public, max-age=3600' } }
	);
}
