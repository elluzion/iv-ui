export type CategoryId = 'form' | 'layout' | 'overlays' | 'feedback' | 'display';

export type Category = {
	id: CategoryId;
	label: string;
	description: string;
};

export type DocStatus = 'stable' | 'beta' | 'deprecated';

export type ExampleDef = {
	/** File name inside `src/docs/examples/<slug>/`. */
	id: string;
	title: string;
	/** One sentence, rendered under the example title. */
	description?: string;
};

export type AccessibilityInfo = {
	keyboard?: [keys: string, action: string][];
	notes?: string[];
};

export type ManualApiRow = {
	name: string;
	type: string;
	description: string;
};

export type ManualApiSection = {
	title: string;
	note?: string;
	rows: ManualApiRow[];
};

export type ComponentDoc = {
	slug: string;
	name: string;
	category: CategoryId;
	summary: string;
	status?: DocStatus;
	since?: string;
	/** Component ids whose APIs are shown on this page (first one is primary). */
	api: string[];
	usage?: string[];
	examples: ExampleDef[];
	accessibility?: AccessibilityInfo;
	related?: string[];
	manual?: ManualApiSection[];
	notes?: string[];
};

export type Block =
	| { kind: 'h2'; text: string; id?: string }
	| { kind: 'p'; text: string }
	| { kind: 'list'; items: string[] }
	| { kind: 'code'; code: string; lang?: string; title?: string }
	| { kind: 'callout'; tone?: 'note' | 'warn'; title?: string; text: string }
	| { kind: 'table'; head: string[]; rows: string[][] }
	| { kind: 'checklist'; items: { label: string; detail?: string }[] }
	| { kind: 'install' }
	| { kind: 'theme-editor' }
	| { kind: 'tokens' }
	| { kind: 'colors' }
	| { kind: 'type-scale' }
	| { kind: 'motion' }
	| { kind: 'states' };

export type GuideDoc = {
	slug: string;
	title: string;
	summary: string;
	/** Group in the sidebar: `guides` or `foundations`. */
	section: 'guides' | 'foundations';
	blocks: Block[];
	related?: string[];
};

export type PropApi = {
	name: string;
	type: string;
	default: string | null;
	description: string;
	required: boolean;
	bindable: boolean;
};

export type TypeApi = {
	name: string;
	kind: 'type' | 'interface';
	code: string;
	description?: string;
};

export type ComponentApi = {
	id: string;
	name: string;
	props: PropApi[];
	events: PropApi[];
	snippets: PropApi[];
	types: TypeApi[];
	tokens: string[];
	classes: string[];
	/** Native element whose attributes are forwarded, when declared. */
	native: string | null;
	forwardsRest: boolean;
};

export type Token = {
	name: string;
	group: string;
	dark: string;
	light: string;
};

export type SearchRecord = {
	id: string;
	type: 'component' | 'guide' | 'prop' | 'token';
	title: string;
	summary: string;
	url: string;
	category: string;
	keywords: string;
};

export type HighlightMap = Record<string, string>;
