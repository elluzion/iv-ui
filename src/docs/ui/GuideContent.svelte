<script lang="ts">
	import type { Block } from '../types';
	import { highlight } from '../lib/data';
	import { inline } from '../lib/inline';
	import { installCommand } from '../manifest';
	import { slugify } from '../registry';
	import CodeBlock from './CodeBlock.svelte';
	import ColorGrid from './ColorGrid.svelte';
	import CopyButton from './CopyButton.svelte';
	import MotionTable from './MotionTable.svelte';
	import ThemeEditor from './ThemeEditor.svelte';
	import TokenTable from './TokenTable.svelte';
	import TypeScale from './TypeScale.svelte';

	interface Props {
		slug: string;
		blocks: Block[];
	}

	let { slug, blocks }: Props = $props();
</script>

{#each blocks as block, index (index)}
	{#if block.kind === 'h2'}
		<h2 class="iv-docs-h2" id={block.id ?? slugify(block.text)}>{block.text}</h2>
	{:else if block.kind === 'p'}
		<p class="iv-docs-p">{@html inline(block.text)}</p>
	{:else if block.kind === 'list'}
		<ul class="iv-docs-list">
			{#each block.items as item, i (i)}
				<li>{@html inline(item)}</li>
			{/each}
		</ul>
	{:else if block.kind === 'code'}
		<CodeBlock
			code={block.code}
			html={highlight[`guide-${slug}-${index}`] ?? ''}
			title={block.title}
			lang={block.lang ?? 'svelte'}
			open
		/>
	{:else if block.kind === 'callout'}
		<div class="iv-docs-callout" data-tone={block.tone ?? 'note'}>
			<span class="iv-docs-callout-title"
				>{block.title ?? (block.tone === 'warn' ? 'Warning' : 'Note')}</span
			>
			{@html inline(block.text)}
		</div>
	{:else if block.kind === 'table'}
		<div class="iv-docs-table-wrap">
			<table class="iv-docs-table">
				<thead>
					<tr>
						{#each block.head as heading (heading)}
							<th scope="col">{heading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each block.rows as row, i (i)}
						<tr>
							{#each row as cell, j (j)}
								<td>{@html inline(cell)}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else if block.kind === 'checklist'}
		<ul class="iv-docs-checklist">
			{#each block.items as item (item.label)}
				<li>
					<span class="iv-docs-check" aria-hidden="true">▸</span>
					<span>
						<strong>{item.label}</strong>
						{#if item.detail}<span class="iv-docs-check-detail">
								— {@html inline(item.detail)}</span
							>{/if}
					</span>
				</li>
			{/each}
		</ul>
	{:else if block.kind === 'install'}
		<div class="iv-docs-install">
			<code>{installCommand}</code>
			<CopyButton value={installCommand} />
		</div>
	{:else if block.kind === 'theme-editor'}
		<ThemeEditor />
	{:else if block.kind === 'tokens'}
		<TokenTable />
	{:else if block.kind === 'colors'}
		<ColorGrid />
	{:else if block.kind === 'type-scale'}
		<TypeScale />
	{:else if block.kind === 'motion'}
		<MotionTable />
	{:else if block.kind === 'states'}
		<div class="iv-docs-states-grid"></div>
	{/if}
{/each}
