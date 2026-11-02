const escapeHtml = (value: string): string =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Renders the small Markdown subset used in the content registry:
 * inline code, bold, and links. Everything else is escaped.
 */
export function inline(text: string): string {
	const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
	let output = '';
	let last = 0;

	for (const match of text.matchAll(pattern)) {
		output += escapeHtml(text.slice(last, match.index));
		const token = match[0];

		if (token.startsWith('`')) {
			output += `<code class="iv-docs-inline-code">${escapeHtml(token.slice(1, -1))}</code>`;
		} else if (token.startsWith('**')) {
			output += `<strong>${inline(token.slice(2, -2))}</strong>`;
		} else {
			const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
			if (link) {
				output += `<a href="${escapeHtml(link[2])}">${inline(link[1])}</a>`;
			} else {
				output += escapeHtml(token);
			}
		}

		last = match.index + token.length;
	}

	return output + escapeHtml(text.slice(last));
}

/** Strips inline Markdown for plain-text contexts such as meta tags. */
export function plain(text: string): string {
	return text
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
