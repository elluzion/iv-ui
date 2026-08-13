<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './textarea.svelte';

	const { Story } = defineMeta({
		title: 'Common/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		argTypes: {
			resizable: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
			disabled: { control: 'boolean' },
			readonly: { control: 'boolean' },
			required: { control: 'boolean' },
			showCount: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	import { expect, userEvent, within } from 'storybook/test';

	let bodyValue = $state('');
</script>

{#snippet interactiveTemplate()}
	<div style="display:flex;flex-direction:column;gap:0.5rem;max-width:320px">
		<Textarea label="Bio" placeholder="Tell us about yourself…" bind:value={bodyValue} rows={3} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:var(--iv_text-sm);color:var(--iv_foreground-dim)"
		>
			value: {bodyValue}
		</p>
	</div>
{/snippet}

<Story
	name="Interactive"
	template={interactiveTemplate}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByLabelText('Bio');
		await userEvent.type(textarea, 'Hello Svelte');
		await expect(textarea).toHaveValue('Hello Svelte');
		await expect(canvas.getByText(/value: Hello Svelte/)).toBeVisible();
	}}
/>

<Story name="Default" args={{ placeholder: 'Type something…' }}>Default</Story>

<Story
	name="WithValue"
	args={{ value: 'Pre-filled text content across multiple lines.', 'aria-label': 'Notes' }}
/>

<Story name="WithLabel" args={{ label: 'Bio', placeholder: 'Tell us about yourself…' }} />

<Story
	name="Required"
	args={{ label: 'Description', required: true, placeholder: 'Describe the item…' }}
/>

<Story
	name="WithHelper"
	args={{
		label: 'Notes',
		helper: 'This will be visible to all team members.',
		placeholder: 'Add your notes here…'
	}}
/>

<Story
	name="WithError"
	args={{
		label: 'Message',
		error: 'Message cannot be empty.',
		value: ''
	}}
/>

<Story
	name="WithCharCount"
	args={{
		label: 'Short bio',
		maxlength: 140,
		showCount: true,
		placeholder: 'Write a short bio…',
		value: 'Software engineer based in Berlin.'
	}}
/>

<Story
	name="CharLimitExceeded"
	args={{
		label: 'Tweet',
		maxlength: 20,
		showCount: true,
		value: 'This text is way too long for the limit'
	}}
/>

<Story name="Disabled" args={{ placeholder: 'Cannot edit this', disabled: true }} />

<Story
	name="Readonly"
	args={{
		value: 'This content is read-only and cannot be modified.',
		readonly: true,
		'aria-label': 'Note'
	}}
/>

<Story name="CustomRows" args={{ placeholder: 'Type something…', rows: 8 }} />

<Story name="NoResize" args={{ placeholder: 'Cannot resize this textarea', resizable: 'none' }} />

{@render allStatesTemplate()}
{#snippet allStatesTemplate()}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Textarea label="Default" placeholder="Just a regular textarea" />
		<Textarea
			label="With helper text"
			helper="A helpful description goes here."
			placeholder="Type…"
		/>
		<Textarea label="With error" error="Something went wrong. Please fix it." value="bad value" />
		<Textarea
			label="With character count"
			maxlength={100}
			showCount
			placeholder="Type…"
			value="Hello"
		/>
		<Textarea label="Disabled" placeholder="Cannot interact" disabled />
		<Textarea label="Read only" value="You can select but not edit" readonly />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />
