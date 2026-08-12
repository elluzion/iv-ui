<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Separator from './separator.svelte';

	const { Story } = defineMeta({
		title: 'Common/Separator',
		component: Separator,
		tags: ['autodocs'],
		argTypes: {
			orientation: { control: 'select', options: ['horizontal', 'vertical'] },
			spacing: { control: 'select', options: ['sm', 'md', 'lg'] },
			label: { control: 'text' }
		}
	});
</script>

<Story name="Default" />

<Story name="WithLabel" args={{ label: 'Overview' }} />

<Story name="LongLabel" args={{ label: 'A longer separator label' }} />

{#snippet spacingTemplate()}
	<div style="display:flex;flex-direction:column;max-width:360px">
		<p style="margin:0;font-size:var(--iv_text-label)">Spacing sm</p>
		<Separator spacing="sm" />
		<p style="margin:0;font-size:var(--iv_text-label)">Spacing md (default)</p>
		<Separator />
		<p style="margin:0;font-size:var(--iv_text-label)">Spacing lg</p>
		<Separator spacing="lg" />
	</div>
{/snippet}

<Story name="Spacing" template={spacingTemplate} />

{#snippet verticalTemplate()}
	<div
		style="display:flex;align-items:center;gap:1rem;height:80px;padding:0 1rem;border:1px solid var(--iv_border);border-radius:var(--iv_radius);background:var(--iv_surface-raised)"
	>
		<span style="font-size:var(--iv_text-body)">Overview</span>
		<Separator orientation="vertical" />
		<span style="font-size:var(--iv_text-body)">Analytics</span>
		<Separator orientation="vertical" />
		<span style="font-size:var(--iv_text-body)">Settings</span>
	</div>
{/snippet}

<Story name="Vertical" template={verticalTemplate} />

{#snippet galleryTemplate()}
	<div style="display:flex;flex-direction:column;gap:1.5rem;max-width:360px">
		<div>
			<Separator label="Plain horizontal" />
		</div>
		<div style="display:flex;flex-direction:column;gap:0.5rem">
			<Separator spacing="sm" />
			<Separator spacing="sm" label="Labeled · sm" />
			<Separator spacing="sm" />
		</div>
	</div>
{/snippet}

<Story name="Gallery" template={galleryTemplate} />
