// import { env } from '$env/dynamic/public';
import type { Category } from './types';

/** Public origin used for canonical URLs and absolute links in `llms.txt`. */
export const siteUrl = /*(env.PUBLIC_SITE_URL ?? */ 'https://iv-ui.vercel.app'.replace(/\/$/, '');

export const site = {
	name: 'iv-ui',
	title: 'iv-ui — Svelte 5 component library',
	description:
		'A Svelte 5 component library with a monochrome, console-grade design system. Token-pure, accessible, runes-native.',
	version: '0.2.0',
	packageName: '@elluzion/iv-ui',
	github: 'https://github.com/elluzion/iv-ui',
	license: 'MIT'
};

export const categories: Category[] = [
	{
		id: 'form',
		label: 'Form & Input',
		description: 'Controls for collecting, validating, and submitting input.'
	},
	{
		id: 'layout',
		label: 'Layout & Navigation',
		description: 'Surfaces and structures that organize a screen.'
	},
	{
		id: 'overlays',
		label: 'Overlays',
		description: 'Layers above the page: dialogs, menus, popovers, and toasts.'
	},
	{
		id: 'feedback',
		label: 'Feedback & Status',
		description: 'Communicate state, progress, and outcomes.'
	},
	{
		id: 'display',
		label: 'Display & Misc',
		description: 'Small primitives for identity, metadata, and shortcuts.'
	}
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

export const installCommand = 'bun add @elluzion/iv-ui @tabler/icons-svelte';

export const navSections = [
	{ id: 'start', label: 'Getting started' },
	{ id: 'foundations', label: 'Foundations' },
	{ id: 'components', label: 'Components' },
	{ id: 'reference', label: 'Reference' }
] as const;
