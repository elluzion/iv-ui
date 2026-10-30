<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Badge, Button, Input, Progress, Switch } from '$lib';

	let accent = $state('#c7a24a');
	let surface = $state('#000000');
	let radius = $state(8);
	let spacing = $state(16);
	let enabled = $state(true);

	onMount(() => {
		const style = getComputedStyle(document.documentElement);
		accent = toHex(style.getPropertyValue('--iv_accent').trim(), '#c7a24a');
		surface = toHex(style.getPropertyValue('--iv_surface').trim(), '#000000');
		const baseRadius = Number.parseInt(style.getPropertyValue('--iv_radius'), 10) || 4;
		radius = baseRadius + 4;
		spacing = Number.parseInt(style.getPropertyValue('--iv_spacing-lg'), 10) || 16;
	});

	$effect(() => {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		root.style.setProperty('--iv_accent', accent);
		root.style.setProperty('--iv_accent-dim', accent);
		root.style.setProperty('--iv_cursor', accent);
		root.style.setProperty('--iv_caret', accent);
		root.style.setProperty('--iv_surface', surface);
		root.style.setProperty('--iv_radius-lg', `${radius}px`);
		root.style.setProperty('--iv_spacing-lg', `${spacing}px`);
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		for (const name of [
			'--iv_accent',
			'--iv_accent-dim',
			'--iv_cursor',
			'--iv_caret',
			'--iv_surface',
			'--iv_radius-lg',
			'--iv_spacing-lg'
		]) {
			root.style.removeProperty(name);
		}
	});

	function reset() {
		accent = '#c7a24a';
		surface = '#000000';
		radius = 8;
		spacing = 16;
	}

	function toHex(value: string, fallback: string): string {
		return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
	}
</script>

<div class="iv-docs-theme-editor">
	<div class="iv-docs-rail-label">Live token editor</div>
	<div class="iv-docs-theme-controls">
		<label class="iv-docs-field">
			<span>--iv_accent</span>
			<input type="color" bind:value={accent} />
		</label>
		<label class="iv-docs-field">
			<span>--iv_surface</span>
			<input type="color" bind:value={surface} />
		</label>
		<label class="iv-docs-field">
			<span>--iv_radius-lg</span>
			<input type="range" min="0" max="16" bind:value={radius} />
			<output>{radius}px</output>
		</label>
		<label class="iv-docs-field">
			<span>--iv_spacing-lg</span>
			<input type="range" min="6" max="28" bind:value={spacing} />
			<output>{spacing}px</output>
		</label>
	</div>

	<div class="iv-docs-theme-preview">
		<div class="iv-docs-panel">
			<div class="iv-docs-panel-head">
				<span>Preview</span>
				<Badge size="sm" variant="accent">Brass</Badge>
			</div>
			<div class="iv-docs-panel-body">
				<Input label="Project name" placeholder="atlas-core" />
				<Progress value={68} label="Deploying" showValue />
				<div class="iv-docs-panel-row">
					<Button variant="primary">Deploy</Button>
					<Button variant="outline">Preview</Button>
					<Switch bind:checked={enabled} label="Live updates" />
				</div>
			</div>
		</div>
		<Button variant="ghost" size="sm" onclick={reset}>Reset tokens</Button>
	</div>
</div>
