<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Skeleton from './skeleton.svelte';

	const { Story } = defineMeta({
		title: 'Feedback & Status/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
		argTypes: {
			shape: { control: 'select', options: ['rect', 'line', 'circle'] }
		}
	});
</script>

{#snippet textLinesTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.5rem;max-width:420px">
		<Skeleton shape="line" width="40%" />
		<Skeleton shape="line" width="100%" />
		<Skeleton shape="line" width="90%" />
		<Skeleton shape="line" width="70%" />
	</div>
{/snippet}

<Story name="TextLines" template={textLinesTemplate} />

{#snippet articleSkeletonTemplate()}
	<div
		style="max-width:520px;padding:1rem;border:1px solid var(--iv_border);border-radius:var(--iv_radius);background:var(--iv_surface-raised)"
	>
		<Skeleton shape="rect" height="0.875rem" width="30%" />
		<div style="display:flex;gap:0.75rem;margin-top:1rem">
			<Skeleton shape="circle" />
			<div style="flex:1;display:flex;flex-direction:column;gap:0.5rem">
				<Skeleton shape="line" />
				<Skeleton shape="line" width="70%" />
			</div>
		</div>
	</div>
{/snippet}

<Story name="ArticleSkeleton" template={articleSkeletonTemplate} />

{#snippet cardSkeletonTemplate()}
	<div
		style="display:flex;flex-direction:column;gap:0.75rem;max-width:360px;padding:1rem;border:1px solid var(--iv_border);border-radius:var(--iv_radius);background:var(--iv_surface-raised)"
	>
		<Skeleton shape="rect" height="120px" />
		<Skeleton shape="line" />
		<Skeleton shape="line" width="70%" />
	</div>
{/snippet}

<Story name="CardSkeleton" template={cardSkeletonTemplate} />

{#snippet circleTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Skeleton shape="circle" />
		<Skeleton shape="circle" width="56px" height="56px" />
	</div>
{/snippet}

<Story name="Circle" template={circleTemplate} />
