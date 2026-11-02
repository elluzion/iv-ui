/**
 * Builds the data layer of the docs site from the library sources.
 *
 *   bun scripts/docs-gen.ts          # write src/docs/generated
 *   bun scripts/docs-gen.ts --check  # validate only, exit 1 on problems
 *
 * One source, four outputs: HTML pages read the registry directly; Markdown,
 * JSON, search, and highlighting are generated here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import postcss from 'postcss';
import { createHighlighter, type Highlighter } from 'shiki';
import type * as TS from 'typescript';
import { componentDocs } from '../src/docs/content/components';
import { foundationDocs } from '../src/docs/content/foundations';
import { guideDocs } from '../src/docs/content/guides';
import { categories, categoryById, installCommand, site, siteUrl } from '../src/docs/manifest';
import { describeEvent, describeProp, describeType } from '../src/docs/api-descriptions';
import { componentImport, pascalCase, relatedDocs, slugify } from '../src/docs/registry';
import type {
	Block,
	ComponentApi,
	ComponentDoc,
	GuideDoc,
	PropApi,
	SearchRecord,
	Token,
	TypeApi
} from '../src/docs/types';

const require = createRequire(import.meta.url);
const ts = require('typescript') as typeof TS;
const root = process.cwd();
const outDir = path.join(root, 'src/docs/generated');
const componentsDir = path.join(root, 'src/lib/components');
const examplesDir = path.join(root, 'src/docs/examples');
const checkOnly = process.argv.includes('--check');

/* -------------------------------------------------------------------------- */
/* Sources                                                                    */
/* -------------------------------------------------------------------------- */

const componentFiles = fs
	.readdirSync(componentsDir)
	.filter((file) => file.endsWith('.svelte') && !file.includes('.stories.'))
	.sort();

const fileById = new Map(componentFiles.map((file) => [file.replace(/\.svelte$/, ''), file]));
const problems: string[] = [];

function readScript(file: string): { source: string; script: string; style: string } {
	const source = fs.readFileSync(file, 'utf8');
	const script = [...source.matchAll(/<script[^>]*lang="ts"[^>]*>([\s\S]*?)<\/script>/g)]
		.map((match) => match[1])
		.join('\n');
	const style = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
		.map((match) => match[1])
		.join('\n');
	return { source, script, style };
}

function jsDocOf(node: TS.Node): string {
	const parts: string[] = [];
	for (const tag of ts.getJSDocCommentsAndTags(node)) {
		const comment = (tag as { comment?: unknown }).comment;
		if (typeof comment === 'string') parts.push(comment);
		else if (Array.isArray(comment)) {
			parts.push(comment.map((part) => (part as { text?: string }).text ?? '').join(''));
		}
	}
	return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function unwrapBindable(text: string): { text: string; bindable: boolean } {
	const match = text.match(/^\$bindable\s*(?:<[\s\S]*?>)?\s*\(([\s\S]*)\)$/);
	if (!match) return { text, bindable: false };
	return { text: match[1].trim(), bindable: true };
}

function extractApi(id: string): ComponentApi {
	const file = fileById.get(id);
	if (!file) throw new Error(`No component source for "${id}"`);
	const { source, script, style } = readScript(path.join(componentsDir, file));
	const sourceFile = ts.createSourceFile(
		`${id}.ts`,
		script,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS
	);

	let interfaceName = '';
	let heritage: string[] = [];
	const props: PropApi[] = [];
	const events: PropApi[] = [];
	const snippets: PropApi[] = [];
	const types: TypeApi[] = [];
	const originalNames = new Map<PropApi, string>();
	const defaults = new Map<string, string>();
	const bindable = new Set<string>();

	sourceFile.forEachChild((node) => {
		if (ts.isInterfaceDeclaration(node) && node.name.text === 'Props') {
			interfaceName = 'Props';
			heritage = (node.heritageClauses ?? []).map((clause) => clause.getText(sourceFile));
			for (const member of node.members) {
				if (!ts.isPropertySignature(member)) continue;
				const rawName = member.name.getText(sourceFile).replace(/^['"]|['"]$/g, '');
				if (rawName.startsWith('[')) continue;
				if (rawName.startsWith('on:')) continue;
				const type = member.type?.getText(sourceFile).replace(/\s+/g, ' ') ?? 'unknown';
				const required = !member.questionToken;
				const doc = jsDocOf(member);
				const isEvent = /^on[a-z]/.test(rawName);
				const eventName = rawName.replace(/^on/, '');
				const isSnippet = type.includes('Snippet');
				const description = isEvent
					? doc ||
						describeProp(id, rawName) ||
						describeEvent(eventName) ||
						`Called on \`${eventName}\`.`
					: doc || describeProp(id, rawName);
				const entry: PropApi = {
					name: isEvent ? eventName : rawName,
					type,
					default: null,
					description,
					required,
					bindable: false
				};
				originalNames.set(entry, rawName);
				if (isEvent) events.push(entry);
				else if (isSnippet) snippets.push(entry);
				else props.push(entry);
			}
		}
		if (
			(ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
			node.name.text !== 'Props' &&
			node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
		) {
			const code = node
				.getText(sourceFile)
				.replace(/^export\s+/, '')
				.replace(/\n\t/g, '\n')
				.trim();
			types.push({
				name: node.name.text,
				kind: ts.isInterfaceDeclaration(node) ? 'interface' : 'type',
				code,
				description: describeType(id, node.name.text)
			});
		}
	});

	// Defaults and bindable props come from the $props() destructuring.
	function visit(node: TS.Node) {
		if (
			ts.isVariableDeclaration(node) &&
			node.initializer &&
			ts.isCallExpression(node.initializer) &&
			node.initializer.expression.getText(sourceFile) === '$props' &&
			ts.isObjectBindingPattern(node.name)
		) {
			for (const element of node.name.elements) {
				if (element.dotDotDotToken) continue;
				const name = (
					element.propertyName
						? element.propertyName.getText(sourceFile)
						: element.name.getText(sourceFile)
				).replace(/^['"]|['"]$/g, '');
				let initializer = element.initializer?.getText(sourceFile) ?? '';
				const unwrapped = unwrapBindable(initializer);
				initializer = unwrapped.text;
				if (unwrapped.bindable) bindable.add(name);
				if (initializer) defaults.set(name, initializer.replace(/\s+/g, ' '));
			}
		}
		ts.forEachChild(node, visit);
	}
	visit(sourceFile);

	for (const entry of [...props, ...events, ...snippets]) {
		const original = originalNames.get(entry) ?? entry.name;
		const value = defaults.get(original);
		if (value !== undefined) entry.default = value;
		entry.bindable = bindable.has(original);
	}

	const nativeMatch = heritage.join(' ').match(/HTMLAttributes<\s*HTML(\w+)Element\s*>/);
	let native: string | null = null;
	if (nativeMatch)
		native = nativeMatch[1].toLowerCase() === 'html' ? 'element' : nativeMatch[1].toLowerCase();

	const tokens = [
		...new Set([...style.matchAll(/var\(\s*(--iv_[a-z0-9-]+)/g)].map((match) => match[1]))
	].sort();
	const classes = [
		...new Set([...style.matchAll(/\.(iv-[a-z0-9-]+)/g)].map((match) => match[1]))
	].sort();

	if (!interfaceName && !['alert-dialog', 'toast'].includes(id)) {
		problems.push(`api: ${id} has no \`interface Props\``);
	}
	if (
		!props.length &&
		!events.length &&
		!snippets.length &&
		!['alert-dialog', 'toast'].includes(id)
	) {
		problems.push(`api: ${id} exposes no props`);
	}
	void source;
	return {
		id,
		name: pascalCase(id),
		props,
		events,
		snippets,
		types,
		tokens,
		classes,
		native,
		forwardsRest: /\.\.\.restProps/.test(script)
	};
}

/* -------------------------------------------------------------------------- */
/* Tokens                                                                     */
/* -------------------------------------------------------------------------- */

function tokenGroup(name: string): string {
	if (
		/^--iv_(surface|background|foreground|border|accent|success|error|info|overlay|ring|reverse|cursor|caret|bracket|input|primary|secondary|muted|destructive|popover|card|selection|code)/.test(
			name
		)
	) {
		return 'Color';
	}
	if (/^--iv_(font|text|leading|tracking|weight|typeset)/.test(name)) return 'Typography';
	if (name.startsWith('--iv_spacing')) return 'Space';
	if (/^--iv_(radius|shadow|outline-width|outline-offset)/.test(name)) return 'Shape';
	if (/^--iv_(transition|motion|ease|spin)/.test(name)) return 'Motion';
	if (/^--iv_(z-|blur|scrollbar-size|dialog-gap|popover-margin|tooltip-gap)/.test(name))
		return 'Layers';
	return 'Component';
}

function extractTokens(): Token[] {
	const css = fs.readFileSync(path.join(root, 'src/lib/theme/tokens.css'), 'utf8');
	const ast = postcss.parse(css);
	const dark = new Map<string, string>();
	const light = new Map<string, string>();

	ast.walkRules((rule) => {
		const selector = rule.selector.replace(/\s+/g, ' ');
		const isLight = selector.includes("[data-theme='light']") || selector.includes('.theme-light');
		const isDark = selector.includes("[data-theme='dark']") || selector.includes('.theme-dark');
		const isRoot = selector === ':root';
		rule.walkDecls((decl) => {
			if (!decl.prop.startsWith('--iv_')) return;
			if (isLight) light.set(decl.prop, decl.value);
			else if (isDark) dark.set(decl.prop, decl.value);
			else if (isRoot && !dark.has(decl.prop)) dark.set(decl.prop, decl.value);
		});
	});

	const tokens: Token[] = [];
	for (const [name, darkValue] of dark) {
		const lightValue = light.get(name) ?? darkValue;
		tokens.push({ name, group: tokenGroup(name), dark: darkValue, light: lightValue });
	}
	tokens.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
	return tokens;
}

/* -------------------------------------------------------------------------- */
/* Highlighting                                                               */
/* -------------------------------------------------------------------------- */

function themeFor(tokens: Map<string, string>, type: 'dark' | 'light') {
	const color = (name: string): string => {
		const value = tokens.get(name);
		if (!value) throw new Error(`Missing token ${name} while building the Shiki theme`);
		return value;
	};
	return {
		name: `iv-${type}`,
		type,
		colors: {
			'editor.background': color('--iv_surface-raised'),
			'editor.foreground': color('--iv_foreground')
		},
		tokenColors: [
			{
				scope: ['comment', 'punctuation.definition.comment'],
				settings: { foreground: color('--iv_foreground-dim') }
			},
			{
				scope: ['string', 'string.quoted', 'punctuation.definition.string', 'constant.character'],
				settings: { foreground: color('--iv_success') }
			},
			{
				scope: [
					'keyword',
					'storage',
					'keyword.control',
					'keyword.operator.new',
					'keyword.operator.expression',
					'meta.at-rule'
				],
				settings: { foreground: color('--iv_accent') }
			},
			{
				scope: [
					'constant.numeric',
					'constant.language',
					'support.constant',
					'variable.other.constant'
				],
				settings: { foreground: color('--iv_accent-dim') }
			},
			{
				scope: ['entity.name.tag', 'support.class.component', 'entity.name.namespace'],
				settings: { foreground: color('--iv_foreground') }
			},
			{
				scope: [
					'entity.other.attribute-name',
					'variable.other.property',
					'support.type.property-name'
				],
				settings: { foreground: color('--iv_foreground-hover') }
			},
			{
				scope: ['punctuation', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
				settings: { foreground: color('--iv_foreground-dim') }
			},
			{
				scope: ['invalid', 'invalid.illegal', 'message.error'],
				settings: { foreground: color('--iv_error') }
			}
		]
	};
}

async function buildHighlighter(tokens: Token[]): Promise<Highlighter> {
	const dark = new Map(tokens.map((token) => [token.name, token.dark]));
	const light = new Map(tokens.map((token) => [token.name, token.light]));
	return createHighlighter({
		themes: [themeFor(dark, 'dark'), themeFor(light, 'light')],
		langs: [
			'svelte',
			'ts',
			'typescript',
			'js',
			'javascript',
			'json',
			'css',
			'html',
			'sh',
			'bash',
			'ini'
		]
	});
}

/* -------------------------------------------------------------------------- */
/* Markdown                                                                   */
/* -------------------------------------------------------------------------- */

function mdCell(value: string): string {
	return value.replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
}

function mdTable(head: string[], rows: string[][]): string {
	const line = `| ${head.join(' | ')} |`;
	const divider = `| ${head.map(() => '---').join(' | ')} |`;
	return [line, divider, ...rows.map((row) => `| ${row.map(mdCell).join(' | ')} |`)].join('\n');
}

function propTable(rows: PropApi[]): string {
	return mdTable(
		['Prop', 'Type', 'Default', 'Description'],
		rows.map((row) => [
			`\`${row.name}\`${row.required ? ' **required**' : ''}${row.bindable ? ' **bindable**' : ''}`,
			`\`${row.type}\``,
			row.default === null ? '—' : `\`${row.default}\``,
			row.description || '—'
		])
	);
}

function relatedMarkdown(ids: string[] | undefined): string {
	const related = relatedDocs(ids);
	if (!related.length) return '';
	return ['## Related', '', ...related.map((item) => `- [${item.title}](${item.url}.md)`)].join(
		'\n'
	);
}

function rewriteCode(code: string): string {
	return code
		.replace(/'(\$lib[^']*)'/g, "'@elluzion/iv-ui'")
		.replace(/"(\$lib[^"]*)"/g, '"@elluzion/iv-ui"');
}

function importMarkdown(doc: ComponentDoc): string {
	const imports = doc.api.map(pascalCase).join(', ');
	return [
		'## Import',
		'',
		'```svelte',
		`import { ${imports} } from '${site.packageName}';`,
		'```'
	].join('\n');
}

function apiMarkdown(doc: ComponentDoc, api: ComponentApi[], withImport = true): string {
	const parts: string[] = [];
	const primary = api[0];
	if (!primary) return '';

	if (withImport) parts.push(importMarkdown(doc));

	for (const entry of api) {
		const heading = api.length > 1 ? `### ${entry.name}` : '### Props';
		if (entry.props.length) {
			parts.push(heading, '', propTable(entry.props));
			if (entry.native) {
				const tag = entry.native === 'element' ? 'HTML' : `\`<${entry.native}>\``;
				parts.push('', `All native ${tag} attributes are forwarded.`);
			} else if (entry.forwardsRest) {
				parts.push(
					'',
					'`class`, `id`, `style`, `aria-*`, and `data-*` are forwarded through rest props.'
				);
			}
		}
		if (entry.events.length) {
			parts.push('', `### Events${api.length > 1 ? ` — ${entry.name}` : ''}`, '');
			parts.push(
				mdTable(
					['Event', 'Handler type', 'Description'],
					entry.events.map((row) => [`\`${row.name}\``, `\`${row.type}\``, row.description || '—'])
				)
			);
			parts.push('', 'The legacy `on:name` form is accepted for every event.');
		}
		if (entry.snippets.length) {
			parts.push('', `### Snippets${api.length > 1 ? ` — ${entry.name}` : ''}`, '');
			parts.push(
				mdTable(
					['Snippet', 'Type', 'Description'],
					entry.snippets.map((row) => [
						`\`${row.name}\``,
						`\`${row.type.replace(/<[^>]+>/g, '')}\``,
						row.description || '—'
					])
				)
			);
		}
		if (entry.types.length) {
			parts.push('', `### Types${api.length > 1 ? ` — ${entry.name}` : ''}`, '');
			for (const type of entry.types) {
				parts.push(`#### \`${type.name}\``, '');
				if (type.description) parts.push(type.description, '');
				parts.push('```ts', type.code, '```', '');
			}
		}
		if (entry.tokens.length) {
			parts.push(
				'',
				'### Tokens used',
				'',
				entry.tokens.map((token) => `\`${token}\``).join(' · ')
			);
			parts.push('', 'See the [token reference](/foundations/tokens.md) for values.');
		}
		if (entry.classes.length) {
			parts.push('', '### CSS hooks', '', entry.classes.map((name) => `\`.${name}\``).join(' · '));
		}
	}

	for (const section of doc.manual ?? []) {
		parts.push('', `### ${section.title}`, '');
		if (section.note) parts.push(section.note, '');
		parts.push(
			mdTable(
				['Name', 'Type', 'Description'],
				section.rows.map((row) => [`\`${row.name}\``, `\`${row.type}\``, row.description])
			)
		);
	}

	return parts.join('\n');
}

function accessibilityMarkdown(doc: ComponentDoc): string {
	const info = doc.accessibility;
	if (!info) return '';
	const parts = ['## Accessibility', ''];
	if (info.keyboard?.length) {
		parts.push(
			mdTable(
				['Keys', 'Action'],
				info.keyboard.map(([keys, action]) => [`\`${keys}\``, action])
			)
		);
		parts.push('');
	}
	for (const note of info.notes ?? []) parts.push(`- ${note}`);
	return parts.join('\n');
}

function usageMarkdown(doc: ComponentDoc): string {
	if (!doc.usage?.length) return '';
	return ['## Usage', '', ...doc.usage.map((item) => `- ${item}`)].join('\n');
}

function notesMarkdown(doc: ComponentDoc): string {
	if (!doc.notes?.length) return '';
	return doc.notes.map((note) => `> ${note}`).join('\n\n');
}

function previewMarkdown(doc: ComponentDoc, files: Map<string, string>): string {
	const first = doc.examples[0];
	if (!first) return '';
	const file = examplesDir + '/' + doc.slug + '/' + first.id + '.svelte';
	const code = files.get(file) ?? '';
	const parts = ['## Preview', ''];
	if (first.description) parts.push(first.description, '');
	parts.push('```svelte', rewriteCode(code).trim(), '```');
	return parts.join('\n');
}

function examplesMarkdown(doc: ComponentDoc, files: Map<string, string>): string {
	const rest = doc.examples.slice(1);
	const parts: string[] = [];
	for (const example of rest) {
		const file = examplesDir + '/' + doc.slug + '/' + example.id + '.svelte';
		const code = files.get(file) ?? '';
		const block = [`### ${example.title}`];
		if (example.description) block.push('', example.description);
		block.push('', '```svelte', rewriteCode(code).trim(), '```');
		parts.push(block.join('\n'));
	}
	return parts.length ? `## Examples\n\n${parts.join('\n\n')}` : '';
}

function componentMarkdown(
	doc: ComponentDoc,
	api: ComponentApi[],
	files: Map<string, string>
): string {
	const frontmatter = [
		'---',
		`title: ${JSON.stringify(doc.name)}`,
		`description: ${JSON.stringify(doc.summary)}`,
		`category: ${JSON.stringify(categoryById[doc.category].label)}`,
		`slug: ${doc.slug}`,
		`url: /components/${doc.slug}`,
		'since: ' + JSON.stringify(doc.since ?? '0.1.0'),
		'status: ' + JSON.stringify(doc.status ?? 'stable'),
		'---'
	].join('\n');

	return [
		frontmatter,
		'',
		`# ${doc.name}`,
		'',
		doc.summary,
		importMarkdown(doc),
		previewMarkdown(doc, files),
		usageMarkdown(doc),
		notesMarkdown(doc),
		examplesMarkdown(doc, files),
		apiMarkdown(doc, api, false),
		accessibilityMarkdown(doc),
		relatedMarkdown(doc.related)
	]
		.filter((part) => part !== '')
		.join('\n\n')
		.replace(/\n{3,}/g, '\n\n');
}

function guideMarkdown(doc: GuideDoc, tokens: Token[]): string {
	const parts: string[] = [
		'---',
		`title: ${JSON.stringify(doc.title)}`,
		`description: ${JSON.stringify(doc.summary)}`,
		`section: ${doc.section}`,
		`slug: ${doc.slug}`,
		`url: /${doc.section === 'guides' ? 'docs' : 'foundations'}/${doc.slug}`,
		'---',
		'',
		`# ${doc.title}`,
		'',
		doc.summary,
		''
	];

	for (const block of doc.blocks) {
		switch (block.kind) {
			case 'h2':
				parts.push(`## ${block.text}`, '');
				break;
			case 'p':
				parts.push(block.text, '');
				break;
			case 'list':
				parts.push(...block.items.map((item) => `- ${item}`), '');
				break;
			case 'code':
				if (block.title) parts.push(`**${block.title}**`, '');
				parts.push('```' + (block.lang ?? 'svelte'), block.code, '```', '');
				break;
			case 'callout':
				parts.push(`> **${block.title ?? 'Note'}** — ${block.text}`, '');
				break;
			case 'table':
				parts.push(mdTable(block.head, block.rows), '');
				break;
			case 'checklist':
				parts.push(
					...block.items.map(
						(item) => `- **${item.label}**${item.detail ? ` — ${item.detail}` : ''}`
					),
					''
				);
				break;
			case 'install':
				parts.push('```sh', installCommand, '```', '');
				break;
			case 'theme-editor':
				// The site renders an interactive editor here; the surrounding prose
				// already explains it, so the Markdown twin needs no extra text.
				break;
			case 'tokens':
				parts.push(tokenTables(tokens), '');
				break;
			case 'colors':
				parts.push(colorTable(tokens), '');
				break;
			case 'type-scale':
				parts.push(typeScaleTable(tokens), '');
				break;
			case 'motion':
				parts.push(motionTable(tokens), '');
				break;
			default:
				break;
		}
	}

	const related = relatedMarkdown(doc.related);
	if (related) parts.push(related);
	return parts.join('\n');
}

function tokenTables(tokens: Token[]): string {
	const groups = [...new Set(tokens.map((token) => token.group))];
	return groups
		.map(
			(group) =>
				`## ${group}\n\n` +
				mdTable(
					['Token', 'Dark', 'Light'],
					tokens
						.filter((token) => token.group === group)
						.map((token) => [`\`${token.name}\``, `\`${token.dark}\``, `\`${token.light}\``])
				)
		)
		.join('\n\n');
}

function colorTable(tokens: Token[]): string {
	const colorTokens = tokens.filter(
		(token) =>
			token.group === 'Color' && (/^#|^rgba?\(/.test(token.dark) || /^#|^rgba?\(/.test(token.light))
	);
	return mdTable(
		['Token', 'Dark', 'Light'],
		colorTokens.map((token) => [`\`${token.name}\``, `\`${token.dark}\``, `\`${token.light}\``])
	);
}

function typeScaleTable(tokens: Token[]): string {
	return mdTable(
		['Token', 'Value'],
		tokens
			.filter((token) => /^--iv_(text|leading|tracking|weight|font)/.test(token.name))
			.map((token) => [`\`${token.name}\``, `\`${token.dark}\``])
	);
}

function motionTable(tokens: Token[]): string {
	return mdTable(
		['Token', 'Value'],
		tokens
			.filter((token) => token.group === 'Motion')
			.map((token) => [`\`${token.name}\``, `\`${token.dark}\``])
	);
}

function landingMarkdown(): string {
	const links = categories
		.map(
			(category) =>
				`### ${category.label}\n\n` +
				componentDocs
					.filter((doc) => doc.category === category.id)
					.map((doc) => `- [${doc.name}](/components/${doc.slug}.md): ${doc.summary}`)
					.join('\n')
		)
		.join('\n\n');
	return `---\ntitle: iv-ui\ndescription: ${JSON.stringify(site.description)}\nurl: /\n---\n\n# iv-ui\n\n${site.description}\n\nVersion ${site.version} · ${componentDocs.length} components · Svelte 5 · ${site.license}\n\n## Install\n\n\`\`\`sh\n${installCommand}\n\`\`\`\n\n## Documentation\n\n- [Installation](/docs/installation.md)\n- [Quickstart](/docs/quickstart.md)\n- [Theming](/docs/theming.md)\n- [Accessibility](/docs/accessibility.md)\n- [For agents](/docs/for-agents.md)\n- [Tokens](/foundations/tokens.md)\n\n## Components\n\n${links}\n\n## Machine-readable\n\n- [llms.txt](/llms.txt)\n- [Full documentation](/llms-full.txt)\n- [API corpus](/llms-api.txt)\n- [API index](/api/index.json)\n`;
}

/* -------------------------------------------------------------------------- */
/* Build                                                                      */
/* -------------------------------------------------------------------------- */

async function main() {
	const tokens = extractTokens();
	const files = new Map<string, string>();
	for (const file of walk(examplesDir)) {
		if (file.endsWith('.svelte')) files.set(file, fs.readFileSync(file, 'utf8'));
	}

	const apis = new Map<string, ComponentApi>();
	for (const file of componentFiles) {
		const id = file.replace(/\.svelte$/, '');
		apis.set(id, extractApi(id));
	}

	const highlighter = await buildHighlighter(tokens);
	const highlight = new Map<string, string>();
	async function hl(code: string, lang: string): Promise<string> {
		return highlighter.codeToHtml(code, {
			lang,
			themes: { light: 'iv-light', dark: 'iv-dark' },
			defaultColor: false
		});
	}

	for (const doc of componentDocs) {
		for (const example of doc.examples) {
			const key = path.join(examplesDir, doc.slug, example.id + '.svelte');
			const code = files.get(key);
			if (!code) {
				problems.push(`example: missing ${path.relative(root, key)}`);
				continue;
			}
			highlight.set(
				`example-${doc.slug}-${example.id}`,
				await hl(rewriteCode(code).trim(), 'svelte')
			);
		}
	}

	for (const doc of [...guideDocs, ...foundationDocs]) {
		for (const [index, block] of doc.blocks.entries()) {
			if (block.kind === 'code') {
				highlight.set(
					`guide-${doc.slug}-${index}`,
					await hl(block.code.trim(), block.lang ?? 'svelte')
				);
			}
		}
	}

	/* ---------------------------- validation ---------------------------- */
	const slugs = new Set<string>();
	for (const doc of componentDocs) {
		if (slugs.has(doc.slug)) problems.push(`content: duplicate slug "${doc.slug}"`);
		slugs.add(doc.slug);
		if (!categoryById[doc.category]) problems.push(`content: ${doc.slug} has unknown category`);
		if (!doc.summary) problems.push(`content: ${doc.slug} has no summary`);
		if (doc.summary.length > 160)
			problems.push(`content: ${doc.slug} summary is over 160 characters`);
		if (!doc.examples.length) problems.push(`content: ${doc.slug} has no example`);
		if (doc.examples.length < 2)
			problems.push(`content: ${doc.slug} should have at least 2 examples`);
		if (!doc.api.length) problems.push(`content: ${doc.slug} has no api components`);
		for (const id of doc.api) {
			if (!fileById.has(id))
				problems.push(`content: ${doc.slug} references unknown component "${id}"`);
		}
		for (const id of doc.related ?? []) {
			if (!relatedDocs([id]).length)
				problems.push(`content: ${doc.slug} has unresolved related id "${id}"`);
		}
		const api = doc.api.map((id) => apis.get(id)).filter(Boolean) as ComponentApi[];
		for (const entry of api) {
			for (const prop of [...entry.props, ...entry.events, ...entry.snippets]) {
				if (!prop.description) problems.push(`api: ${entry.id}.${prop.name} has no description`);
			}
			for (const type of entry.types) {
				if (!type.description)
					problems.push(`api: ${entry.id} type ${type.name} has no description`);
			}
		}
		for (const section of doc.manual ?? []) {
			for (const row of section.rows) {
				if (!row.description)
					problems.push(`api: ${doc.slug} manual row ${row.name} has no description`);
			}
		}
	}

	if (problems.length) {
		console.error(`\n${problems.length} problem(s):`);
		for (const problem of problems) console.error(`  • ${problem}`);
		if (checkOnly) process.exit(1);
	} else {
		console.log('docs: no problems');
	}

	/* ------------------------------ outputs ----------------------------- */
	const apiJson: Record<string, ComponentApi> = {};
	for (const [id, api] of apis) apiJson[id] = api;

	const tokenJson = { tokens, groups: [...new Set(tokens.map((token) => token.group))] };

	const pages: Record<string, string> = {};
	pages['/'] = landingMarkdown();
	pages['/components'] =
		`---\ntitle: Components\ndescription: ${JSON.stringify(`All ${componentDocs.length} iv-ui components, grouped by role.`)}\nurl: /components\n---\n\n# Components\n\n${componentDocs.length} components in five groups.\n\n` +
		categories
			.map(
				(category) =>
					`## ${category.label}\n\n` +
					componentDocs
						.filter((doc) => doc.category === category.id)
						.map((doc) => `- [${doc.name}](/components/${doc.slug}.md): ${doc.summary}`)
						.join('\n')
			)
			.join('\n\n');

	for (const doc of componentDocs) {
		const api = doc.api.map((id) => apis.get(id)).filter(Boolean) as ComponentApi[];
		pages[`/components/${doc.slug}`] = componentMarkdown(doc, api, files);
	}
	for (const doc of guideDocs) pages[`/docs/${doc.slug}`] = guideMarkdown(doc, tokens);
	for (const doc of foundationDocs) pages[`/foundations/${doc.slug}`] = guideMarkdown(doc, tokens);

	/* ------------------------------ search ------------------------------ */
	const search: SearchRecord[] = [];
	for (const doc of componentDocs) {
		const api = doc.api.map((id) => apis.get(id)).filter(Boolean) as ComponentApi[];
		const keywords = [
			...api.flatMap((entry) => [
				...entry.props.map((prop) => prop.name),
				...entry.events.map((event) => 'on' + event.name),
				...entry.snippets.map((snippet) => snippet.name),
				...entry.tokens
			]),
			...doc.examples.map((example) => example.title)
		].join(' ');
		search.push({
			id: `component-${doc.slug}`,
			type: 'component',
			title: doc.name,
			summary: doc.summary,
			url: `/components/${doc.slug}`,
			category: categoryById[doc.category].label,
			keywords
		});
		for (const entry of api) {
			for (const prop of entry.props) {
				search.push({
					id: `prop-${doc.slug}-${prop.name}`,
					type: 'prop',
					title: `${doc.name} · ${prop.name}`,
					summary: prop.description,
					url: `/components/${doc.slug}#prop-${prop.name}`,
					category: categoryById[doc.category].label,
					keywords: `${prop.type} ${prop.default ?? ''}`
				});
			}
		}
	}
	for (const doc of [...guideDocs, ...foundationDocs]) {
		search.push({
			id: `guide-${doc.slug}`,
			type: 'guide',
			title: doc.title,
			summary: doc.summary,
			url: `/${doc.section === 'guides' ? 'docs' : 'foundations'}/${doc.slug}`,
			category: doc.section === 'guides' ? 'Guide' : 'Foundation',
			keywords: doc.blocks
				.filter((block): block is Extract<Block, { kind: 'h2' }> => block.kind === 'h2')
				.map((block) => block.text)
				.join(' ')
		});
	}
	for (const token of tokens) {
		search.push({
			id: `token-${slugify(token.name)}`,
			type: 'token',
			title: token.name,
			summary: `${token.group} token — dark ${token.dark}`,
			url: `/foundations/tokens#token-${slugify(token.name)}`,
			category: 'Token',
			keywords: `${token.dark} ${token.light} css variable`
		});
	}

	/* ------------------------------- llms ------------------------------- */
	const componentLinks = categories
		.map(
			(category) =>
				`### ${category.label}\n\n` +
				componentDocs
					.filter((doc) => doc.category === category.id)
					.map((doc) => `- [${doc.name}](${siteUrl}/components/${doc.slug}.md): ${doc.summary}`)
					.join('\n')
		)
		.join('\n\n');
	const guideLinks = [
		...guideDocs.map((doc) => `- [${doc.title}](${siteUrl}/docs/${doc.slug}.md): ${doc.summary}`),
		...foundationDocs.map(
			(doc) => `- [${doc.title}](${siteUrl}/foundations/${doc.slug}.md): ${doc.summary}`
		)
	].join('\n');

	const llms = `# iv-ui

> ${site.description}

Version ${site.version} · ${componentDocs.length} components · Svelte 5 · ${site.license}

iv-ui is a Svelte 5 component library distributed as \`${site.packageName}\` through GitHub Packages. Install \`@tabler/icons-svelte\` as a peer dependency, import \`${site.packageName}/theme.css\` once in the root layout, and mount \`<Toast />\` and \`<AlertDialog />\` once.

## Rules

- Svelte 5 runes only: \`$props()\`, \`$state()\`, \`$derived()\`, \`$effect()\`.
- Import components from \`${site.packageName}\`; import \`${site.packageName}/theme.css\` once.
- Never hardcode hex colors. Override \`--iv_*\` tokens instead.
- Every component accepts \`onclick\` and the legacy \`on:click\` form.
- Icon-only buttons need \`aria-label\`; avatars need \`alt\`.
- Mount \`<Toast />\` and \`<AlertDialog />\` once; use \`showToast()\` and \`showAlertDialog()\`.
- All components forward \`class\`, \`id\`, \`style\`, \`aria-*\`, and \`data-*\` through rest props.
- Pages exist as Markdown at the same URL with \`.md\` appended.

## Documentation

${guideLinks}

## Components

${componentLinks}

## Machine-readable

- [Full documentation](${siteUrl}/llms-full.txt)
- [API corpus, no examples](${siteUrl}/llms-api.txt)
- [API index](${siteUrl}/api/index.json)
- [Search index](${siteUrl}/search.json)
- Per component: \`${siteUrl}/api/<slug>.json\`
`;

	const absolutize = (markdown: string) =>
		markdown.replace(/\]\((\/[^)\s]*)\)/g, (_, path: string) => `](${siteUrl}${path})`);

	const fullParts = [
		landingMarkdown(),
		...componentDocs.map((doc) => pages[`/components/${doc.slug}`]),
		...guideDocs.map((doc) => pages[`/docs/${doc.slug}`]),
		...foundationDocs.map((doc) => pages[`/foundations/${doc.slug}`])
	].map((page) => absolutize(stripFrontmatter(page)));
	const llmsFull = `# iv-ui — full documentation\n\n${fullParts.join('\n\n---\n\n')}\n`;

	const apiParts = componentDocs.map((doc) => {
		const api = doc.api.map((id) => apis.get(id)).filter(Boolean) as ComponentApi[];
		return absolutize(
			`## ${doc.name}\n\n${doc.summary}\n\n${componentImport(doc)}\n\n${apiMarkdown(
				{ ...doc, manual: doc.manual },
				api,
				false
			)}`
		);
	});
	const llmsApi = `# iv-ui — API corpus\n\n> Imports and API tables only. No examples. Full docs: ${siteUrl}/llms-full.txt\n\n${apiParts.join(
		'\n\n---\n\n'
	)}\n`;

	if (!checkOnly) {
		fs.rmSync(outDir, { recursive: true, force: true });
		fs.mkdirSync(outDir, { recursive: true });
		const write = (name: string, content: string) =>
			fs.writeFileSync(path.join(outDir, name), content);
		write('api.json', JSON.stringify(apiJson));
		write('tokens.json', JSON.stringify(tokenJson));
		write('search.json', JSON.stringify(search));
		write('pages.json', JSON.stringify(pages));
		write('highlight.json', JSON.stringify(Object.fromEntries(highlight)));
		write('llms.txt', llms);
		write('llms-full.txt', llmsFull);
		write('llms-api.txt', llmsApi);

		const examplesJson: Record<string, { code: string; html: string }> = {};
		for (const doc of componentDocs) {
			for (const example of doc.examples) {
				const key = path.join(examplesDir, doc.slug, example.id + '.svelte');
				examplesJson[`${doc.slug}/${example.id}`] = {
					code: rewriteCode(files.get(key) ?? '').trim(),
					html: highlight.get(`example-${doc.slug}-${example.id}`) ?? ''
				};
			}
		}
		write('examples.json', JSON.stringify(examplesJson));

		const apiIndex = {
			site: { name: site.name, version: site.version, description: site.description, url: siteUrl },
			components: componentDocs.map((doc) => ({
				slug: doc.slug,
				name: doc.name,
				category: categoryById[doc.category].label,
				summary: doc.summary,
				status: doc.status ?? 'stable',
				since: doc.since ?? '0.1.0',
				api: doc.api,
				url: `/components/${doc.slug}`,
				markdown: `/components/${doc.slug}.md`,
				json: `/api/${doc.slug}.json`
			})),
			guides: guideDocs.map((doc) => ({
				slug: doc.slug,
				title: doc.title,
				summary: doc.summary,
				url: `/docs/${doc.slug}.md`
			})),
			foundations: foundationDocs.map((doc) => ({
				slug: doc.slug,
				title: doc.title,
				summary: doc.summary,
				url: `/foundations/${doc.slug}.md`
			}))
		};
		write('api-index.json', JSON.stringify(apiIndex));

		const apisBySlug: Record<string, unknown> = {};
		for (const doc of componentDocs) {
			const api = doc.api.map((id) => apis.get(id)).filter(Boolean) as ComponentApi[];
			const payload = {
				slug: doc.slug,
				name: doc.name,
				category: categoryById[doc.category].label,
				summary: doc.summary,
				status: doc.status ?? 'stable',
				since: doc.since ?? '0.1.0',
				import: `import { ${doc.api.map(pascalCase).join(', ')} } from '${site.packageName}';`,
				usage: doc.usage ?? [],
				props: api.flatMap((entry) => entry.props),
				events: api.flatMap((entry) => entry.events),
				snippets: api.flatMap((entry) => entry.snippets),
				types: api.flatMap((entry) => entry.types),
				manual: doc.manual ?? [],
				tokens: [...new Set(api.flatMap((entry) => entry.tokens))],
				cssHooks: [...new Set(api.flatMap((entry) => entry.classes))],
				accessibility: doc.accessibility ?? {},
				related: relatedDocs(doc.related),
				examples: doc.examples.map((example) => ({
					id: example.id,
					title: example.title,
					description: example.description ?? '',
					code: rewriteCode(
						files.get(path.join(examplesDir, doc.slug, example.id + '.svelte')) ?? ''
					).trim()
				})),
				markdown: `/components/${doc.slug}.md`,
				page: `/components/${doc.slug}`
			};
			apisBySlug[doc.slug] = payload;
		}
		write('apis.json', JSON.stringify(apisBySlug));
	}

	highlighter.dispose();
	console.log(
		checkOnly
			? 'docs: check passed'
			: `docs: wrote ${componentDocs.length} component pages, ${guideDocs.length} guides, ${foundationDocs.length} foundations, ${tokens.length} tokens`
	);
}

function stripFrontmatter(markdown: string): string {
	return markdown.replace(/^---\n[\s\S]*?\n---\n+/, '');
}

function* walk(dir: string): Generator<string> {
	if (!fs.existsSync(dir)) return;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else yield full;
	}
}

await main();
