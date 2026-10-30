import { componentDocs } from './content/components';
import { foundationDocs } from './content/foundations';
import { guideDocs } from './content/guides';
import { categories, categoryById, site } from './manifest';
import type { Category, CategoryId, ComponentDoc, GuideDoc } from './types';

export const components = componentDocs;
export const guides = guideDocs;
export const foundations = foundationDocs;
export const allGuides: GuideDoc[] = [...guideDocs, ...foundationDocs];

export const componentBySlug = new Map(components.map((doc) => [doc.slug, doc]));
export const guideBySlug = new Map(guides.map((doc) => [doc.slug, doc]));
export const foundationBySlug = new Map(foundations.map((doc) => [doc.slug, doc]));

export function pascalCase(id: string): string {
	return id
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}

export function componentImport(doc: ComponentDoc): string {
	const names = doc.api.map(pascalCase).join(', ');
	return `import { ${names} } from '${site.packageName}';`;
}

export function componentGroups(): { category: Category; docs: ComponentDoc[] }[] {
	return categories.map((category) => ({
		category,
		docs: components.filter((doc) => doc.category === category.id)
	}));
}

export function categoryOf(doc: ComponentDoc): Category {
	return categoryById[doc.category];
}

export function foundationToc(doc: GuideDoc): { id: string; label: string }[] {
	return doc.blocks
		.filter((block): block is { kind: 'h2'; text: string; id?: string } => block.kind === 'h2')
		.map((block) => ({ id: block.id ?? slugify(block.text), label: block.text }));
}

export function guideToc(doc: GuideDoc): { id: string; label: string }[] {
	return doc.blocks
		.filter((block): block is { kind: 'h2'; text: string; id?: string } => block.kind === 'h2')
		.map((block) => ({ id: block.id ?? slugify(block.text), label: block.text }));
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

export function relatedDocs(ids: string[] | undefined) {
	if (!ids) return [];
	const resolve = (id: string) => {
		const component = componentBySlug.get(id);
		if (component) {
			return {
				title: component.name,
				summary: component.summary,
				url: `/components/${component.slug}`,
				kind: 'Component'
			};
		}
		const foundationId = id.startsWith('foundations-') ? id.slice(12) : id;
		const foundation = foundationBySlug.get(foundationId);
		if (foundation) {
			return {
				title: foundation.title,
				summary: foundation.summary,
				url: `/foundations/${foundation.slug}`,
				kind: 'Foundation'
			};
		}
		const guideId = id.startsWith('docs-') ? id.slice(5) : id;
		const guide = guideBySlug.get(guideId);
		if (guide) {
			return {
				title: guide.title,
				summary: guide.summary,
				url: `/docs/${guide.slug}`,
				kind: 'Guide'
			};
		}
		return null;
	};

	return ids
		.map(resolve)
		.filter((entry): entry is NonNullable<ReturnType<typeof resolve>> => entry !== null);
}

export type PagerEntry = { title: string; url: string };

function pagerFor<T extends { title?: string; name?: string; slug: string }>(
	items: T[],
	index: number,
	url: (item: T) => string
): { prev: PagerEntry | null; next: PagerEntry | null } {
	const toEntry = (item: T | undefined): PagerEntry | null =>
		item ? { title: item.name ?? item.title ?? item.slug, url: url(item) } : null;
	return {
		prev: toEntry(index > 0 ? items[index - 1] : undefined),
		next: toEntry(index < items.length - 1 ? items[index + 1] : undefined)
	};
}

export function componentPager(slug: string) {
	const index = components.findIndex((doc) => doc.slug === slug);
	return pagerFor(components, index, (doc) => `/components/${doc.slug}`);
}

export function guidePager(slug: string) {
	const index = guides.findIndex((doc) => doc.slug === slug);
	return pagerFor(guides, index, (doc) => `/docs/${doc.slug}`);
}

export function foundationPager(slug: string) {
	const index = foundations.findIndex((doc) => doc.slug === slug);
	return pagerFor(foundations, index, (doc) => `/foundations/${doc.slug}`);
}

export function categoryCounts(): Record<CategoryId, number> {
	return components.reduce(
		(acc, doc) => {
			acc[doc.category] += 1;
			return acc;
		},
		{ form: 0, layout: 0, overlays: 0, feedback: 0, display: 0 }
	);
}
