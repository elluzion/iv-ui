<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './avatar.svelte';

	const { Story } = defineMeta({
		title: 'Common/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] }
		}
	});
</script>

{#snippet imageTemplate()}
	<Avatar src="https://i.pravatar.cc/96?img=5" alt="Ada Lovelace" fallback="AL" />
{/snippet}

<Story name="Image" template={imageTemplate} />

{#snippet initialsTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Avatar alt="Fynn Keller" fallback="FK" />
		<Avatar alt="Ada Lovelace" fallback="AL" />
		<Avatar alt="Grace Hopper" fallback="GH" />
	</div>
{/snippet}

<Story name="Initials" template={initialsTemplate} />

{#snippet sizesTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Avatar alt="Small" fallback="XS" size="xs" />
		<Avatar alt="Small" fallback="SM" size="sm" />
		<Avatar alt="Medium" fallback="MD" size="md" />
		<Avatar alt="Large" fallback="LG" size="lg" />
	</div>
{/snippet}

<Story name="Sizes" template={sizesTemplate} />

{#snippet imageErrorTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Avatar src="https://example.com/missing.png" alt="Ada Lovelace" fallback="AL" />
		<Avatar src="https://example.com/missing.png" alt="Grace Hopper" fallback="GH" />
	</div>
{/snippet}

<Story name="ImageError" template={imageErrorTemplate} />

{#snippet withStatusTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Avatar alt="Fynn Keller" fallback="FK" status="success" />
		<Avatar src="https://i.pravatar.cc/96?img=3" alt="Ada Lovelace" fallback="AL" status="accent" />
		<Avatar alt="Grace Hopper" fallback="GH" status="error" />
		<Avatar alt="Katherine Johnson" fallback="KJ" status="info" />
		<Avatar alt="Alan Turing" fallback="AT" status="neutral" />
	</div>
{/snippet}

<Story name="StatusDot" template={withStatusTemplate} />

{#snippet withOverlayTemplate()}
	<div style="display:flex;align-items:center;gap:1rem">
		<Avatar alt="Fynn Keller" fallback="FK">
			<span
				style="width:8px;height:8px;border-radius:50%;background:var(--iv_success);border:1.5px solid var(--iv_surface);display:inline-block"
			></span>
		</Avatar>
		<Avatar src="https://i.pravatar.cc/96?img=3" alt="Ada Lovelace" fallback="AL">
			<span
				style="width:10px;height:10px;border-radius:50%;background:var(--iv_accent);border:1.5px solid var(--iv_surface);display:inline-block"
			></span>
		</Avatar>
	</div>
{/snippet}

<Story name="CustomOverlay" template={withOverlayTemplate} />
