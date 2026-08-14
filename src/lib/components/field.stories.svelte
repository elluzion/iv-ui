<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Field from './field.svelte';
	import Input from './input.svelte';
	import NativeSelect from './native-select.svelte';

	const { Story } = defineMeta({
		title: 'Form & Input/Field',
		component: Field,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			htmlFor: { control: 'text' },
			helper: { control: 'text' },
			error: { control: 'text' },
			required: { control: 'boolean' }
		}
	});
</script>

<Story name="Default" args={{ label: 'Full name', htmlFor: 'full-name' }}>
	<Input id="full-name" placeholder="John Doe" />
</Story>

<Story name="Required" args={{ label: 'Email', htmlFor: 'email', required: true }}>
	<Input id="email" type="email" placeholder="you@example.com" />
</Story>

<Story
	name="WithHelper"
	args={{
		label: 'Username',
		htmlFor: 'username',
		helper: 'Lowercase letters, numbers, and hyphens only.'
	}}
>
	<Input id="username" placeholder="my-user-123" aria-describedby="username-message" />
</Story>

<Story
	name="WithError"
	args={{
		label: 'Password',
		htmlFor: 'password',
		error: 'Must be at least 8 characters.',
		required: true
	}}
>
	<Input id="password" type="password" value="123" aria-describedby="password-message" />
</Story>

<Story name="WithoutLabel" args={{ htmlFor: 'search', helper: 'Press Enter to search.' }}>
	<Input id="search" placeholder="Search…" aria-describedby="search-message" />
</Story>

{#snippet formExampleTemplate()}
	<div style="display:flex;flex-direction:column;gap:1.25rem;max-width:420px">
		<Field label="Project name" htmlFor="proj" helper="Shown in the header and URL.">
			<Input id="proj" placeholder="atlas" aria-describedby="proj-message" />
		</Field>
		<Field label="Language" htmlFor="lang" helper="Used for syntax highlighting.">
			<NativeSelect
				id="lang"
				options={['TypeScript', 'Svelte', 'Python']}
				value="Svelte"
				aria-describedby="lang-message"
			/>
		</Field>
		<Field
			label="Description"
			htmlFor="desc"
			error="Required — add one line about the project."
			required
		>
			<Input id="desc" placeholder="A short description" aria-describedby="desc-message" />
		</Field>
	</div>
{/snippet}

<Story name="FormExample" template={formExampleTemplate} />
