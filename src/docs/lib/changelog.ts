/**
 * Reads the repository's `CHANGELOG.md` and splits it into releases.
 *
 * The file stays the single source of truth: the changelog page renders these
 * sections with micromark, and `/changelog.md` serves the same text verbatim.
 * Vite's `?raw` import means editing `CHANGELOG.md` hot-reloads the page.
 */
import { micromark } from 'micromark';
import source from '../../../CHANGELOG.md?raw';
import { slugify } from '../registry';

export type Release = {
	id: string;
	/** Version without brackets, or `Unreleased`. */
	version: string;
	/** Release date from the heading, when the release has one. */
	date: string | null;
	unreleased: boolean;
	/** Rendered body: the `###` groups and their lists. */
	html: string;
};

type Section = { heading: string; lines: string[] };

/** The changelog exactly as committed, for the `/changelog.md` mirror. */
export const changelogMarkdown: string = source;

const RELEASE_HEADING = /^##\s+(.+)$/;
const RELEASE_TITLE = /^\[([^\]]+)\](?:\s*[-–—]\s*(.+))?$/;
const FENCE = /^\s*(```|~~~)/;
const DOC_TITLE = /^#\s+/;

/** CommonMark to HTML; micromark escapes raw HTML unless told otherwise. */
function render(markdown: string): string {
	return micromark(markdown, { allowDangerousHtml: false });
}

function splitSections(markdown: string): { intro: string; sections: Section[] } {
	const intro: string[] = [];
	const sections: Section[] = [];
	let current: Section | null = null;
	let inFence = false;

	for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
		if (FENCE.test(line)) inFence = !inFence;

		const heading = inFence ? null : line.match(RELEASE_HEADING);
		if (heading) {
			current = { heading: heading[1].trim(), lines: [] };
			sections.push(current);
			continue;
		}

		if (current) current.lines.push(line);
		else intro.push(line);
	}

	return { intro: intro.join('\n'), sections };
}

function toRelease(section: Section): Release {
	const title = section.heading.match(RELEASE_TITLE);
	const version = (title?.[1] ?? section.heading).trim();

	return {
		id: `release-${slugify(version)}`,
		version,
		date: title?.[2]?.trim() ?? null,
		unreleased: version.toLowerCase() === 'unreleased',
		html: render(section.lines.join('\n'))
	};
}

const { intro, sections } = splitSections(source);

/** Rendered text above the first release; the `# Changelog` title is dropped. */
export const changelogIntro = render(
	intro
		.split('\n')
		.filter((line) => !DOC_TITLE.test(line))
		.join('\n')
);

/** Releases in document order — newest first, as written. */
export const releases: Release[] = sections.map(toRelease);
