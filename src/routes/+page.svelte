<script lang="ts">
	import { IconArrowRight, IconBrandGithub, IconTerminal2 } from '@tabler/icons-svelte';
	import { Badge, Button, Progress, Separator } from '$lib';
	import { api } from '../docs/lib/data';
	import { installCommand, site } from '../docs/manifest';
	import { componentGroups, components, foundations, guides } from '../docs/registry';
	import CopyButton from '../docs/ui/CopyButton.svelte';

	const groups = componentGroups();
	const totalProps = Object.values(api).reduce((sum, entry) => sum + entry.props.length, 0);
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<main id="content" class="iv-docs-landing">
	<div class="iv-docs-statusline">
		<span class="iv-docs-dot" aria-hidden="true"></span>
		<span>console online</span>
		<span aria-hidden="true">·</span>
		<span>v{site.version}</span>
		<span aria-hidden="true">·</span>
		<span>{components.length} components</span>
		<span aria-hidden="true">·</span>
		<span>Svelte 5 · {site.license}</span>
	</div>

	<section class="iv-docs-hero">
		<div>
			<h1>
				Every interface<br />is an <em>instrument.</em><span
					class="iv-docs-cursor"
					aria-hidden="true"
				></span>
			</h1>
			<p>
				iv-ui is a Svelte 5 component library built on a monochrome, console-grade design system.
			</p>
			<div class="iv-docs-install">
				<code>{installCommand}</code>
				<CopyButton value={installCommand} />
			</div>
			<div class="iv-docs-hero-actions">
				<a class="iv-docs-cta" href="/components">
					Browse components
					<IconArrowRight size={14} aria-hidden="true" />
				</a>
				<a class="iv-docs-cta" data-variant="outline" href="/docs/quickstart">Quickstart</a>
				<a class="iv-docs-ghlink" href={site.github} target="_blank" rel="noreferrer">
					<IconBrandGithub size={15} aria-hidden="true" /> GitHub
				</a>
			</div>
		</div>

		<div class="iv-docs-hero-panel">
			<div class="iv-docs-panel">
				<div class="iv-docs-panel-head">
					<span><IconTerminal2 size={12} aria-hidden="true" /> deploy · atlas-core</span>
					<Badge size="sm" variant="success">live</Badge>
				</div>
				<div class="iv-docs-panel-body">
					<div class="iv-docs-console-row">
						<span class="iv-docs-console-dim">build</span>
						<span class="iv-docs-console-ok">passed</span>
						<span class="iv-docs-console-dim">18.4s</span>
					</div>
					<div class="iv-docs-console-row">
						<span class="iv-docs-console-dim">tests</span>
						<span>47 passed</span>
						<span class="iv-docs-console-dim">axe 0</span>
					</div>
					<div class="iv-docs-console-row">
						<span class="iv-docs-console-dim">commit</span>
						<span>4f2a9c1</span>
						<span class="iv-docs-console-dim">main</span>
					</div>
					<Progress value={82} label="Rolling out" showValue size="sm" />
					<div class="iv-docs-panel-row">
						<Button variant="primary" size="sm">Redeploy</Button>
						<Button variant="outline" size="sm">Logs</Button>
						<Button variant="ghost" size="sm">Rollback</Button>
					</div>
					<Separator />
					<div class="iv-docs-console-row">
						<span class="iv-docs-console-dim">region</span>
						<span>eu-west-1</span>
						<span class="iv-docs-console-dim">3 instances</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="iv-docs-landing-section">
		<div class="iv-docs-section-head">
			<h2>Start</h2>
			<a href="/docs/installation">All guides →</a>
		</div>
		<div class="iv-docs-cards">
			{#each guides as guide (guide.slug)}
				<a class="iv-docs-card" href={`/docs/${guide.slug}`}>
					<div class="iv-docs-card-top">
						<strong>{guide.title}</strong>
						<span>guide</span>
					</div>
					<p>{guide.summary}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="iv-docs-landing-section">
		<div class="iv-docs-section-head">
			<h2>Components</h2>
			<a href="/components">{components.length} total →</a>
		</div>
		<div class="iv-docs-cards iv-docs-category-cards">
			{#each groups as group (group.category.id)}
				<a class="iv-docs-card" href={`/components#${group.category.id}`}>
					<div class="iv-docs-card-top">
						<strong>{group.category.label}</strong>
						<span>{group.docs.length}</span>
					</div>
					<p>{group.category.description}</p>
					<div class="iv-docs-card-names">
						{#each group.docs as doc (doc.slug)}
							<em>{doc.name}</em>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="iv-docs-landing-section">
		<div class="iv-docs-section-head">
			<h2>Foundations</h2>
			<a href="/foundations/tokens">Token reference →</a>
		</div>
		<div class="iv-docs-foundation-row">
			{#each foundations as foundation (foundation.slug)}
				<a class="iv-docs-card" href={`/foundations/${foundation.slug}`}>
					<div class="iv-docs-card-top">
						<strong>{foundation.title}</strong>
					</div>
					<p>{foundation.summary}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="iv-docs-landing-section">
		<div class="iv-docs-section-head">
			<h2>Machine-readable</h2>
			<a href="/llms.txt">llms.txt →</a>
		</div>
		<div class="iv-docs-machine">
			<div class="iv-docs-machine-row">
				<code>/llms.txt</code>
				<span>Index and canonical Markdown links for every page.</span>
				<a href="/llms.txt">open</a>
			</div>
			<div class="iv-docs-machine-row">
				<code>/llms-full.txt</code>
				<span>The full documentation in one file.</span>
				<a href="/llms-full.txt">open</a>
			</div>
			<div class="iv-docs-machine-row">
				<code>/llms-api.txt</code>
				<span>Imports and API tables, no examples.</span>
				<a href="/llms-api.txt">open</a>
			</div>
			<div class="iv-docs-machine-row">
				<code>/api/index.json</code>
				<span>{components.length} components with canonical URLs.</span>
				<a href="/api/index.json">open</a>
			</div>
		</div>
		<p class="iv-docs-p iv-docs-machine-note">
			Every page has a Markdown twin at the same URL with <code class="iv-docs-inline-code"
				>.md</code
			>
			appended. {totalProps}+ props are documented across the library.
		</p>
	</section>
</main>
