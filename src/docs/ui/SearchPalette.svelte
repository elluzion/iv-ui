<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import MiniSearch from 'minisearch';
	import { IconSearch, IconX } from '@tabler/icons-svelte';
	import type { SearchRecord } from '../types';
	import { searchRecords } from '../lib/data';
	import { ui } from '../lib/ui.svelte';

	type Hit = Pick<SearchRecord, 'id' | 'title' | 'summary' | 'url' | 'type' | 'category'>;

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;
	let query = $state('');
	let active = $state(0);
	let index: MiniSearch<SearchRecord> | null = null;

	function ensureIndex(): MiniSearch<SearchRecord> {
		if (!index) {
			index = new MiniSearch<SearchRecord>({
				fields: ['title', 'summary', 'keywords', 'category'],
				storeFields: ['title', 'summary', 'url', 'type', 'category'],
				idField: 'id',
				searchOptions: {
					boost: { title: 3, keywords: 2 },
					fuzzy: 0.2,
					prefix: true,
					combineWith: 'AND'
				}
			});
			index.addAll(searchRecords);
		}
		return index;
	}

	const hits = $derived.by<Hit[]>(() => {
		const value = query.trim();
		if (!value) {
			return searchRecords.filter((record) => record.type === 'component').slice(0, 8);
		}
		return ensureIndex().search(value).slice(0, 12) as unknown as Hit[];
	});

	$effect(() => {
		if (typeof window === 'undefined' || !dialog) return;
		if (ui.search && !dialog.open) {
			dialog.showModal();
			queueMicrotask(() => input?.focus());
		}
		if (!ui.search && dialog.open) dialog.close();
	});

	onMount(() => {
		function onKeydown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				ui.search = !ui.search;
			}
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});

	function go(url: string) {
		ui.search = false;
		goto(url);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			active = Math.min(active + 1, hits.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			active = Math.max(active - 1, 0);
		} else if (event.key === 'Enter') {
			const hit = hits[active];
			if (hit) {
				event.preventDefault();
				go(hit.url);
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			ui.search = false;
		}
	}

	function onBackdrop(event: MouseEvent) {
		if (event.target === dialog) ui.search = false;
	}
</script>

<dialog
	class="iv-docs-dialog"
	bind:this={dialog}
	onclose={() => (ui.search = false)}
	onclick={onBackdrop}
	aria-label="Search documentation"
>
	<div class="iv-docs-search-top">
		<IconSearch size={16} aria-hidden="true" />
		<input
			bind:this={input}
			bind:value={query}
			type="text"
			placeholder="Search components, props, tokens…"
			aria-label="Search"
			autocomplete="off"
			spellcheck="false"
			oninput={() => (active = 0)}
			onkeydown={onKeydown}
		/>
		<button
			type="button"
			class="iv-docs-iconbtn"
			aria-label="Close search"
			onclick={() => (ui.search = false)}
		>
			<IconX size={16} aria-hidden="true" />
		</button>
	</div>

	<div class="iv-docs-search-results">
		<div class="iv-docs-search-hint">{query.trim() ? `${hits.length} results` : 'Components'}</div>
		{#each hits as hit, i (hit.id)}
			<a
				class="iv-docs-search-item"
				href={hit.url}
				data-active={i === active}
				onmouseenter={() => (active = i)}
				onclick={(event) => {
					event.preventDefault();
					go(hit.url);
				}}
			>
				<span class="iv-docs-search-type">{hit.type}</span>
				<span>
					<strong>{hit.title}</strong>
					<small>{hit.summary}</small>
				</span>
				<em>{hit.category}</em>
			</a>
		{:else}
			<p class="iv-docs-empty">No results for “{query}”.</p>
		{/each}
	</div>

	<div class="iv-docs-search-foot">
		<span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
		<span><kbd>↵</kbd> open</span>
		<span><kbd>esc</kbd> close</span>
		<span style="margin-left:auto">minisearch · {searchRecords.length} records</span>
	</div>
</dialog>
