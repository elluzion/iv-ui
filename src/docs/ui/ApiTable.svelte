<script lang="ts">
	import type { ComponentApi, ManualApiSection } from '../types';
	import { inline } from '../lib/inline';

	interface Props {
		entries: ComponentApi[];
		manual?: ManualApiSection[];
		filter?: boolean;
	}

	let { entries, manual = [], filter = true }: Props = $props();

	let query = $state('');

	const shown = $derived(
		query.trim()
			? entries.map((entry) => ({
					...entry,
					props: entry.props.filter((prop) =>
						[prop.name, prop.type, prop.default ?? '', prop.description]
							.join(' ')
							.toLowerCase()
							.includes(query.trim().toLowerCase())
					)
				}))
			: entries
	);

	const totalProps = $derived(entries.reduce((sum, entry) => sum + entry.props.length, 0));
</script>

{#if filter && totalProps > 6}
	<div class="iv-docs-api-filter">
		<div class="iv-docs-filter">
			<input
				type="search"
				placeholder="Filter props…"
				bind:value={query}
				aria-label="Filter props by name, type, or description"
			/>
		</div>
	</div>
{/if}

{#each shown as entry (entry.id)}
	<section class="iv-docs-api-block" aria-labelledby={`api-${entry.id}`}>
		<div class="iv-docs-api-head">
			<h3 class="iv-docs-api-title" id={`api-${entry.id}`}>
				{entries.length > 1 ? entry.name : 'Props'}
			</h3>
			<span class="iv-docs-api-count">
				{entry.props.length} props · {entry.events.length} events · {entry.snippets.length} snippets
			</span>
		</div>

		{#if entry.props.length}
			<div class="iv-docs-table-wrap">
				<table class="iv-docs-table">
					<thead>
						<tr>
							<th scope="col">Prop</th>
							<th scope="col">Type</th>
							<th scope="col">Default</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{#each entry.props as prop (prop.name)}
							<tr id={`prop-${entry.id}-${prop.name}`}>
								<td class="iv-docs-prop">
									{prop.name}
									{#if prop.required}<span class="iv-docs-tag" data-kind="required">required</span
										>{/if}
									{#if prop.bindable}<span class="iv-docs-tag" data-kind="bindable">bindable</span
										>{/if}
								</td>
								<td class="iv-docs-type">{prop.type}</td>
								<td class="iv-docs-default">{prop.default ?? '—'}</td>
								<td>{@html inline(prop.description)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			{#if entry.native}
				<p class="iv-docs-note">
					All native
					{entry.native === 'element' ? 'HTMLElement' : `<${entry.native}>`} attributes are forwarded.
				</p>
			{:else if entry.forwardsRest}
				<p class="iv-docs-note">
					<code class="iv-docs-inline-code">class</code>,
					<code class="iv-docs-inline-code">id</code>,
					<code class="iv-docs-inline-code">style</code>,
					<code class="iv-docs-inline-code">aria-*</code>, and
					<code class="iv-docs-inline-code">data-*</code> are forwarded through rest props.
				</p>
			{/if}
		{:else}
			<p class="iv-docs-note">This component has no props.</p>
		{/if}

		{#if entry.events.length}
			<h4 class="iv-docs-h3">Events</h4>
			<div class="iv-docs-table-wrap">
				<table class="iv-docs-table">
					<thead>
						<tr>
							<th scope="col">Event</th>
							<th scope="col">Handler type</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{#each entry.events as event (event.name)}
							<tr>
								<td class="iv-docs-prop">on{event.name}</td>
								<td class="iv-docs-type">{event.type}</td>
								<td>{@html inline(event.description)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="iv-docs-note">
				The legacy <code class="iv-docs-inline-code">on:name</code> form is accepted for every event.
			</p>
		{/if}

		{#if entry.snippets.length}
			<h4 class="iv-docs-h3">Snippets</h4>
			<div class="iv-docs-table-wrap">
				<table class="iv-docs-table">
					<thead>
						<tr>
							<th scope="col">Snippet</th>
							<th scope="col">Type</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{#each entry.snippets as snippet (snippet.name)}
							<tr>
								<td class="iv-docs-prop">{snippet.name}</td>
								<td class="iv-docs-type">{snippet.type}</td>
								<td>{@html inline(snippet.description)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		{#if entry.types.length}
			<h4 class="iv-docs-h3">Types</h4>
			{#each entry.types as type (type.name)}
				<div class="iv-docs-type-block">
					<span class="iv-docs-type-name">{type.name}</span>
					{#if type.description}
						<p class="iv-docs-p">{@html inline(type.description)}</p>
					{/if}
					<pre class="iv-docs-type-code"><code>{type.code}</code></pre>
				</div>
			{/each}
		{/if}
	</section>
{/each}

{#each manual as section (section.title)}
	<section class="iv-docs-api-block" aria-labelledby={`manual-${section.title}`}>
		<div class="iv-docs-api-head">
			<h3 class="iv-docs-api-title" id={`manual-${section.title}`}>{section.title}</h3>
		</div>
		{#if section.note}
			<p class="iv-docs-p">{@html inline(section.note)}</p>
		{/if}
		<div class="iv-docs-table-wrap">
			<table class="iv-docs-table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each section.rows as row (row.name)}
						<tr>
							<td class="iv-docs-prop">{row.name}</td>
							<td class="iv-docs-type">{row.type}</td>
							<td>{@html inline(row.description)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
{/each}

{#if query.trim() && shown.every((entry) => entry.props.length === 0)}
	<p class="iv-docs-empty">No props match “{query}”.</p>
{/if}
