<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Article from './article.svelte';

	const { Story } = defineMeta({
		title: 'Common/Article',
		component: Article,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' },
			description: { control: 'text' },
			maxWidth: { control: 'number' }
		}
	});
</script>

<Story
	name="Default"
	args={{
		title: 'Design System',
		description: 'Styling every piece of prose in our visual language'
	}}
>
	<p>Paragraphs set the reading rhythm. The body sits in a centered, capped-width column.</p>

	<h2>Headings and emphasis</h2>
	<p>
		Headings recede from the sheet in hierarchy. <strong>Strong text</strong> carries weight, while
		<em>emphasized text</em>
		leans. Inline <code>code</code> is set in monospace with a hairline border.
	</p>

	<h2>Lists</h2>
	<ul>
		<li>A quiet, monochrome canvas</li>
		<li>Hairline borders instead of shadows</li>
		<li>One accent used sparingly</li>
	</ul>
	<ol>
		<li>Reads naturally left to right</li>
		<li>Numbered items keep their rhythm</li>
	</ol>

	<h2>Blockquote</h2>
	<blockquote>
		<p>Quoted material is inset on a raised surface with a hairline rule on the left.</p>
	</blockquote>
</Story>

{#snippet codeTemplate()}
	<Article
		title="Code blocks"
		description="Preformatted blocks stay monospace with their own surface"
	>
		<p>Fenced code keeps its own panel:</p>
		<pre><code
				>const LEMONS = 40 + 2

for (const item of items)
	process(item)</code
			></pre>
	</Article>
{/snippet}

<Story name="CodeBlock" template={codeTemplate} />

{#snippet linksTemplate()}
	<Article title="Links" description="Links are the one place brass is allowed for prose">
		<p>
			The Article wraps semantic markup and styles it with the design tokens — see
			<a href="https://example.com">the documentation</a>. No values are hardcoded; every color and
			radius comes from <code>tokens.css</code>.
		</p>
	</Article>
{/snippet}

<Story name="Links" template={linksTemplate} />

<Story name="NoHeader">
	<p>
		Without a title or description the header is omitted entirely, so raw prose starts at the top of
		the capped column.
	</p>
</Story>

<Story
	name="CustomWidth"
	args={{ title: 'Narrow column', maxWidth: 600, description: 'Cap the column with maxWidth' }}
>
	<p>Set <code>maxWidth</code> to tighten the reading column below the default 880px.</p>
</Story>
