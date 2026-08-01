<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Slider from './slider.svelte';

	const { Story } = defineMeta({
		title: 'Common/Slider',
		component: Slider,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md'] },
			disabled: { control: 'boolean' },
			tickMarks: { control: 'boolean' },
			showValue: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	let bound = $state(50);
	let rangeBound: [number, number] = $state([25, 75]);
</script>

<Story name="Default" args={{ label: 'Volume' }} />

<Story name="WithValue" args={{ value: 60, label: 'Volume' }} />

<Story name="ShowValue" args={{ label: 'Brightness', showValue: true, value: 75 }} />

<Story name="Disabled" args={{ label: 'Locked', disabled: true, value: 40 }} />

<Story name="Small" args={{ size: 'sm', label: 'Opacity', value: 85 }} />

<Story name="Steps" args={{ label: 'Snap to 10', step: 10, value: 30, tickMarks: true }} />

<Story
	name="FineSteps"
	args={{ label: 'Fine control', step: 0.1, min: 0, max: 10, value: 5.5, showValue: true }}
/>

<Story name="TickMarks" args={{ label: 'Steps', step: 10, tickMarks: true, value: 50 }} />

<Story
	name="Range"
	args={{ label: 'Price range', range: true, value: [20, 80], min: 0, max: 100, showValue: true }}
/>

<Story
	name="RangeWithTicks"
	args={{
		label: 'Budget',
		range: true,
		value: [30, 70],
		min: 0,
		max: 100,
		step: 10,
		tickMarks: true,
		showValue: true
	}}
/>

{#snippet interactiveSingleTemplate()}
	<div style="max-width:320px;display:flex;flex-direction:column;gap:0.5rem">
		<Slider label="Interactive" showValue bind:value={bound} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			value: {bound}
		</p>
	</div>
{/snippet}

<Story name="InteractiveSingle" template={interactiveSingleTemplate} />

{#snippet interactiveRangeTemplate()}
	<div style="max-width:320px;display:flex;flex-direction:column;gap:0.5rem">
		<Slider label="Range" range showValue bind:value={rangeBound} />
		<p
			style="margin:0;font-family:var(--iv_font-mono);font-size:0.8rem;color:var(--iv_foreground-dim)"
		>
			value: [{rangeBound.join(', ')}]
		</p>
	</div>
{/snippet}

<Story name="InteractiveRange" template={interactiveRangeTemplate} />

{#snippet allStatesTemplate()}
	<div style="max-width:320px;display:flex;flex-direction:column;gap:1.25rem">
		<Slider label="Default" />
		<Slider label="With value" value={65} showValue />
		<Slider label="Steps + ticks" step={25} tickMarks value={50} />
		<Slider label="Disabled" value={30} disabled />
		<Slider label="Small" size="sm" value={70} showValue />
		<Slider label="Range" range value={[20, 80]} showValue />
	</div>
{/snippet}

<Story name="AllStates" template={allStatesTemplate} />
