<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		IconSearch,
		IconMail,
		IconLock,
		IconUser,
		IconCalendar,
		IconPhone
	} from '@tabler/icons-svelte';
	import Input from './input.svelte';

	const { Story } = defineMeta({
		title: 'Common/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'password', 'email', 'number', 'search', 'url', 'tel']
			},
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' },
			readonly: { control: 'boolean' },
			required: { control: 'boolean' },
			clearable: { control: 'boolean' }
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Type something…' }}>Default</Story>

<Story name="WithValue" args={{ value: 'Hello world' }} />

<Story name="WithLabel" args={{ label: 'Full name', placeholder: 'John Doe' }} />

<Story
	name="Required"
	args={{ label: 'Email address', required: true, placeholder: 'you@example.com', type: 'email' }}
/>

<Story
	name="WithHelper"
	args={{
		label: 'Username',
		helper: 'Lowercase letters, numbers, and hyphens only.',
		placeholder: 'my-user-123'
	}}
/>

<Story
	name="WithError"
	args={{
		label: 'Password',
		error: 'Must be at least 8 characters.',
		value: '123',
		type: 'password'
	}}
/>

<Story name="Disabled" args={{ placeholder: 'Cannot edit this', disabled: true }} />

<Story name="DisabledWithValue" args={{ value: 'Read only value', disabled: true }} />

<Story name="Readonly" args={{ value: 'Pre-filled content', readonly: true }} />

<Story name="Clearable" args={{ placeholder: 'Search…', clearable: true, type: 'search' }} />

<Story name="ClearableWithValue" args={{ value: 'Something to clear', clearable: true }} />

{#snippet leadingSearchTemplate(_)}
	<Input placeholder="Search knowledge base…" clearable>
		{#snippet leadingIcon()}
			<IconSearch size={16} />
		{/snippet}
	</Input>
{/snippet}

<Story name="LeadingIcon" template={leadingSearchTemplate} />

{#snippet leadingIconWithLabelTemplate(_)}
	<Input label="Your email" placeholder="you@example.com" type="email">
		{#snippet leadingIcon()}
			<IconMail size={16} />
		{/snippet}
	</Input>
{/snippet}

<Story name="LeadingIconWithLabel" template={leadingIconWithLabelTemplate} />

{#snippet trailingIconTemplate(_)}
	<Input label="Password" placeholder="Enter your password" type="password" value="secret">
		{#snippet trailingIcon()}
			<IconLock size={16} />
		{/snippet}
	</Input>
{/snippet}

<Story name="TrailingIcon" template={trailingIconTemplate} />

{#snippet bothIconsTemplate(_)}
	<Input label="Search users" placeholder="Type a name…" clearable>
		{#snippet leadingIcon()}
			<IconUser size={16} />
		{/snippet}
		{#snippet trailingIcon()}
			<IconSearch size={16} />
		{/snippet}
	</Input>
{/snippet}

<Story name="BothIcons" template={bothIconsTemplate} />

{#snippet sizesTemplate(_)}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Input placeholder="Small input" size="sm" />
		<Input placeholder="Medium input (default)" size="md" />
		<Input placeholder="Large input" size="lg" />
	</div>
{/snippet}

<Story name="AllSizes" template={sizesTemplate} />

{#snippet typesTemplate(_)}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Input label="Text" placeholder="Plain text" type="text" />
		<Input label="Email" placeholder="you@example.com" type="email" />
		<Input label="Password" placeholder="Your password" type="password" />
		<Input label="Number" placeholder="42" type="number" />
		<Input label="Search" placeholder="Search…" type="search" clearable />
		<Input label="URL" placeholder="https://example.com" type="url" />
		<Input label="Tel" placeholder="+1 555-0100" type="tel" />
	</div>
{/snippet}

<Story name="AllTypes" template={typesTemplate} />

{#snippet allStatesTemplate(_)}
	<div style="display:flex;flex-direction:column;gap:1rem">
		<Input label="Default" placeholder="Just a regular input" />
		<Input label="With helper text" helper="A helpful description goes here." placeholder="Type…" />
		<Input label="With error" error="Something went wrong. Please fix it." value="bad value" />
		<Input label="Disabled" placeholder="Cannot interact" disabled />
		<Input label="Read only" value="You can select but not edit" readonly />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />

{#snippet loginFormTemplate(_)}
	<div style="display:flex;flex-direction:column;gap:1rem;max-width:400px">
		<Input label="Email" placeholder="you@example.com" type="email" required>
			{#snippet leadingIcon()}
				<IconMail size={16} />
			{/snippet}
		</Input>
		<Input
			label="Password"
			placeholder="Enter your password"
			type="password"
			required
			value="password123"
		>
			{#snippet leadingIcon()}
				<IconLock size={16} />
			{/snippet}
		</Input>
		<Input label="Phone (optional)" placeholder="+1 555-0100" type="tel">
			{#snippet leadingIcon()}
				<IconPhone size={16} />
			{/snippet}
		</Input>
		<Input label="Joined after" type="text" placeholder="yyyy-mm-dd" helper="Filter by join date.">
			{#snippet leadingIcon()}
				<IconCalendar size={16} />
			{/snippet}
		</Input>
	</div>
{/snippet}

<Story name="FormExample" template={loginFormTemplate} />

{#snippet clearableInteractiveTemplate(_)}
	<Input label="Search" placeholder="Type to see the clear button…" clearable type="search">
		{#snippet leadingIcon()}
			<IconSearch size={16} />
		{/snippet}
	</Input>
{/snippet}

<Story name="ClearableInteractive" template={clearableInteractiveTemplate} />
