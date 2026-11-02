import { describe, expect, it } from 'vitest';
import { changelogIntro, changelogMarkdown, releases } from '../../docs/lib/changelog';

describe('changelog', () => {
	it('serves the committed CHANGELOG.md verbatim', () => {
		expect(changelogMarkdown.startsWith('# Changelog')).toBe(true);
	});

	it('splits CHANGELOG.md into release sections, newest first', () => {
		expect(releases.length).toBeGreaterThan(0);

		const [latest] = releases;
		expect(latest.version).toMatch(/^(Unreleased|\d+\.\d+\.\d+)$/i);
		expect(latest.date ?? '').toMatch(/^\d{4}-\d{2}-\d{2}$/);

		const release = releases.find((entry) => entry.version === '0.2.0');
		expect(release?.date).toBe('2026-09-10');
		expect(release?.id).toBe('release-0-2-0');
	});

	it('renders each release body as HTML', () => {
		const release = releases.find((entry) => entry.version === '0.2.0');
		expect(release?.html).toContain('<h3>Added</h3>');
		expect(release?.html).toContain('<strong>Components (15 new):</strong>');
		expect(release?.html).toContain('<code>Avatar</code>');
	});

	it('keeps the introduction and drops the document title', () => {
		expect(changelogIntro).toContain('All notable changes');
		expect(changelogIntro).not.toContain('<h1');
	});
});
