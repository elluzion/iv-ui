import type { ComponentApi, SearchRecord, Token } from '../types';
import apiJson from '../generated/api.json';
import apisJson from '../generated/apis.json';
import examplesJson from '../generated/examples.json';
import highlightJson from '../generated/highlight.json';
import pagesJson from '../generated/pages.json';
import searchJson from '../generated/search.json';
import tokensJson from '../generated/tokens.json';

/** API extracted from every component source, keyed by component id. */
export const api = apiJson as unknown as Record<string, ComponentApi>;

/** Full per-page API payloads served at `/api/<slug>.json`. */
export const apiPayloads = apisJson as Record<string, unknown>;

/** Example source and pre-highlighted HTML, keyed by `<slug>/<example>`. */
export const examples = examplesJson as Record<string, { code: string; html: string }>;

/** Pre-highlighted blocks, keyed by `example-<slug>-<id>` or `guide-<slug>-<index>`. */
export const highlight = highlightJson as Record<string, string>;

/** Markdown twins of every page, keyed by URL path. */
export const pages = pagesJson as Record<string, string>;

export const searchRecords = searchJson as SearchRecord[];

const tokenData = tokensJson as unknown as { tokens: Token[]; groups: string[] };

export const tokens: Token[] = tokenData.tokens;
export const tokenGroups: string[] = tokenData.groups;

export const tokenByName = new Map(tokens.map((token) => [token.name, token]));

export function tokenSlug(name: string): string {
	return name.replace(/^--/, '').replace(/[^a-z0-9]+/gi, '-');
}
