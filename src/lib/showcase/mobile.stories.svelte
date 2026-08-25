<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		IconBell,
		IconBuilding,
		IconBolt,
		IconCheck,
		IconChevronRight,
		IconCircleCheck,
		IconClock,
		IconDots,
		IconEye,
		IconHome,
		IconInfoCircle,
		IconLayoutGrid,
		IconList,
		IconMap,
		IconMapPin,
		IconMenu2,
		IconPlus,
		IconRoute,
		IconSearch,
		IconSettings,
		IconTool,
		IconUsers
	} from '@tabler/icons-svelte';
	import type { MenuEntry } from '../components/menu.svelte';

	const jobMenu: MenuEntry[] = [
		{ type: 'header', id: 'job-head', label: 'Job · JR-2041' },
		{ type: 'item', id: 'detail', item: { label: 'View detail', icon: IconEye } },
		{ type: 'item', id: 'map', item: { label: 'Directions', icon: IconRoute, shortcut: 'G' } },
		{ type: 'separator', id: 'job-sep-1' },
		{ type: 'item', id: 'close', item: { label: 'Close job', icon: IconCheck, dim: true } }
	];

	const settingsEntries: MenuEntry[] = [
		{ type: 'item', id: 'prefs', item: { label: 'Preferences' } },
		{ type: 'item', id: 'crew', item: { label: 'Crew & roster', icon: IconUsers } },
		{ type: 'item', id: 'support', item: { label: 'Support & status' } },
		{ type: 'separator', id: 'settings-sep-1' },
		{ type: 'item', id: 'signout', item: { label: 'Sign out', dim: true } }
	];

	const { Story } = defineMeta({
		title: 'Showcase/Mobile Field Ops',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import Accordion from '../components/accordion.svelte';
	import AccordionItem from '../components/accordion-item.svelte';
	import Alert from '../components/alert.svelte';
	import AlertDialog from '../components/alert-dialog.svelte';
	import Avatar from '../components/avatar.svelte';
	import Badge from '../components/badge.svelte';
	import Button from '../components/button.svelte';
	import ButtonGroup from '../components/button-group.svelte';
	import Card from '../components/card.svelte';
	import Checkbox from '../components/checkbox.svelte';
	import Collapsible from '../components/collapsible.svelte';
	import ContextMenu from '../components/context-menu.svelte';
	import Dialog from '../components/dialog.svelte';
	import EmptyState from '../components/empty-state.svelte';
	import Field from '../components/field.svelte';
	import Input from '../components/input.svelte';
	import Menu from '../components/menu.svelte';
	import NativeSelect from '../components/native-select.svelte';
	import Popover from '../components/popover.svelte';
	import Progress from '../components/progress.svelte';
	import RadioGroup from '../components/radio-group.svelte';
	import Select from '../components/select.svelte';
	import Separator from '../components/separator.svelte';
	import Sheet from '../components/sheet.svelte';
	import Skeleton from '../components/skeleton.svelte';
	import Slider from '../components/slider.svelte';
	import Switch from '../components/switch.svelte';
	import Textarea from '../components/textarea.svelte';
	import Toast from '../components/toast.svelte';
	import Toggle from '../components/toggle.svelte';
	import ToggleGroup from '../components/toggle-group.svelte';
	import { showToast } from '../stores/toast.js';

	let filter = $state('open');
	let sort = $state('urgency');
	let viewMode = $state('list');
	let query = $state('');
	let sheetOpen = $state(false);
	let notifySheetOpen = $state(false);
	let addJobOpen = $state(false);
	let priority = $state('high');
	let shiftAuto = $state(false);
	let audiblePush = $state(true);
	let forecastOnly = $state(false);
	let rangeKm = $state(8);
	let jobsLoading = $state(false);
	let acceptedCount = $state(78);
	let ontimeCount = $state(92);
	let plainToggle = $state(true);
	let appAnchor = $state<HTMLButtonElement>();
	let menuAnchor = $state<HTMLButtonElement>();
</script>

{#snippet navBtn(label: string, icon: typeof IconHome, active: boolean)}
	{@const I = icon}
	<button
		class="mm-nav-btn"
		type="button"
		aria-label={label}
		aria-current={active ? 'page' : undefined}
	>
		<I size={18} aria-hidden="true" />
		<span class="mm-nav-label">{label}</span>
	</button>
{/snippet}

{#snippet collapsibleCard(args: { loading?: boolean })}
	<Card title="Open jobs" description="Tap a job to open its detail" padding="none">
		{#snippet action()}
			<ButtonGroup
				label="View as"
				size="sm"
				mode="single"
				value={viewMode}
				onchange={(e) => (viewMode = e.detail.value as string)}
				items={[
					{ value: 'list', label: 'List', icon: IconList },
					{ value: 'grid', label: 'Grid', icon: IconLayoutGrid }
				]}
			/>
		{/snippet}
		{#if args.loading}
			<div class="mm-jobs">
				{#each [1, 2, 3] as i (i)}
					<div class="mm-skel-card">
						<Skeleton shape="line" />
						<Skeleton shape="line" width="45%" />
						<Skeleton shape="line" width="60%" />
					</div>
				{/each}
			</div>
		{:else}
			<div class="mm-jobs">
				<Card padding="md">
					<div class="mm-job-head">
						<span class="mm-job-title">Fault in chiller BLR-004</span>
						<ContextMenu entries={jobMenu} label="Job actions">
							<Button variant="icon" size="sm" aria-label="Job actions"
								><IconDots size={18} /></Button
							>
						</ContextMenu>
					</div>
					<div class="mm-job-meta">
						<span class="mm-mono">BLR-004</span>
						<span class="mm-mute"><IconMapPin size={12} /> Sector 3 · L2</span>
					</div>
					<div class="mm-job-foot">
						<Badge size="sm" variant="error">Open</Badge>
						<Badge size="sm" variant="error">high</Badge>
						<span class="mm-eta mm-mono"><IconClock size={12} /> ETA 12m</span>
					</div>
				</Card>
				<Card padding="md">
					<div class="mm-job-head">
						<span class="mm-job-title">Rotation — pump 7</span>
						<ContextMenu entries={jobMenu} label="Job actions">
							<Button variant="icon" size="sm" aria-label="Job actions"
								><IconDots size={18} /></Button
							>
						</ContextMenu>
					</div>
					<div class="mm-job-meta">
						<span class="mm-mono">PMP-007</span>
						<span class="mm-mute"><IconMapPin size={12} /> Sector 1 · G</span>
					</div>
					<div class="mm-job-foot">
						<Badge size="sm" variant="info">Scheduled</Badge>
						<Badge size="sm" variant="accent">medium</Badge>
						<span class="mm-eta mm-mono"><IconClock size={12} /> ETA 2h</span>
					</div>
				</Card>
				<Card padding="md">
					<div class="mm-job-head">
						<span class="mm-job-title">Inspect panel C-12</span>
						<ContextMenu entries={jobMenu} label="Job actions">
							<Button variant="icon" size="sm" aria-label="Job actions"
								><IconDots size={18} /></Button
							>
						</ContextMenu>
					</div>
					<div class="mm-job-meta">
						<span class="mm-mono">PNL-C12</span>
						<span class="mm-mute"><IconMapPin size={12} /> Sector 5 · Mezz</span>
					</div>
					<div class="mm-job-foot">
						<Badge size="sm" variant="neutral">Queued</Badge>
						<Badge size="sm">low</Badge>
						<span class="mm-eta mm-mono"><IconClock size={12} /> ETA 6h</span>
					</div>
				</Card>
				<EmptyState title="Nothing selected" description="Open the filters to find more work.">
					{#snippet icon()}
						<IconCheck size={20} />
					{/snippet}
				</EmptyState>
			</div>
		{/if}
	</Card>
{/snippet}

{#snippet phone(args: { screen: 'home' | 'jobs' | 'alerts' | 'profile' | 'map' })}
	<div class="mm-app">
		<header class="mm-topbar">
			<div class="mm-topbar-left">
				<button class="mm-icon-btn" type="button" aria-label="Open menu" bind:this={menuAnchor}>
					<IconMenu2 size={20} aria-hidden="true" />
				</button>
				<div class="mm-title">
					<span class="mm-app-title">field/ops</span>
					<span class="mm-app-sub">dispatch console</span>
				</div>
			</div>
			<div class="mm-topbar-right">
				<button
					class="mm-icon-btn"
					type="button"
					aria-label="Notifications"
					onclick={() => (notifySheetOpen = true)}
				>
					<IconBell size={20} aria-hidden="true" />
					<span class="mm-bell-dot"><Badge size="sm" variant="accent">3</Badge></span>
				</button>
				<button class="mm-icon-btn" type="button" aria-label="Account" bind:this={appAnchor}>
					<Avatar alt="Dana Reyes" fallback="DR" size="sm" />
				</button>
			</div>
		</header>

		{#if args.screen === 'home' || args.screen === 'map'}
			<main class="mm-scroll">
				<div class="mm-hello">
					<div class="mm-hello-text">
						<h1 class="mm-h1">Good morning, Dana</h1>
						<p class="mm-note">7 of 9 jobs accepted · all sectors nominal</p>
					</div>
					<Button
						variant="primary"
						size="sm"
						aria-label="Start a new job"
						onclick={() => (addJobOpen = true)}
					>
						<IconPlus size={16} /> Que
					</Button>
				</div>

				<section class="mm-kpis" aria-label="Shift overview">
					<Card padding="md">
						<div class="mm-kpi">
							<span class="mm-kpi-label">Accepted</span>
							<span class="mm-kpi-value">{acceptedCount}%</span>
							<Progress value={acceptedCount} size="sm" aria-label="Accepted" />
						</div>
					</Card>
					<Card padding="md">
						<div class="mm-kpi">
							<span class="mm-kpi-label">On time</span>
							<span class="mm-kpi-value">{ontimeCount}%</span>
							<Progress value={ontimeCount} size="sm" aria-label="On time" />
						</div>
					</Card>
				</section>

				{#if args.screen === 'home'}
					<Alert type="warning" title="Dense fog in sector 5" dismissible>
						Adjust routing before dispatching.
					</Alert>
					{@render collapsibleCard({ loading: jobsLoading })}
					<Card title="Shift checklist" padding="none">
						<div class="mm-checklist">
							<Checkbox label="Site check-in" checked disabled name="chk-1" />
							<Checkbox label="Isolate supply" checked disabled name="chk-2" />
							<Checkbox label="Replace sensor" name="chk-3" />
							<Switch label="Shift auto-report" bind:checked={shiftAuto} />
						</div>
					</Card>
					<Collapsible title="Team availability" defaultOpen>
						<div class="mm-team">
							<div class="mm-row">
								<Avatar alt="R. Okada" fallback="RO" size="sm" status="success" />
								<div class="mm-row-main">
									<div class="mm-row-title">R. Okada</div>
									<div class="mm-row-meta"><span class="mm-mono">IMT-01 · chilled water</span></div>
								</div>
								<Badge size="sm" variant="success">Field</Badge>
							</div>
							<div class="mm-row">
								<Avatar alt="L. Montez" fallback="LM" size="sm" status="success" />
								<div class="mm-row-main">
									<div class="mm-row-title">L. Montez</div>
									<div class="mm-row-meta"><span class="mm-mono">ELEC-04 · panels</span></div>
								</div>
								<Badge size="sm" variant="success">Field</Badge>
							</div>
							<div class="mm-row">
								<Avatar alt="S. Whitfield" fallback="SW" size="sm" status="neutral" />
								<div class="mm-row-main">
									<div class="mm-row-title">S. Whitfield</div>
									<div class="mm-row-meta"><span class="mm-mono">PMP-07 · rotation</span></div>
								</div>
								<Badge size="sm">Standby</Badge>
							</div>
						</div>
					</Collapsible>
				{:else}
					<Card title="Sector map" description="Live crew positions">
						<div
							class="mm-map"
							role="img"
							aria-label="Map placeholder showing sector grid with crew markers"
						>
							<div class="mm-map-grid" aria-hidden="true"></div>
							<span class="mm-pin mm-a"
								><Avatar alt="Crew A" fallback="A" size="xs" status="success" /></span
							>
							<span class="mm-pin mm-b"
								><Avatar alt="Crew B" fallback="B" size="xs" status="success" /></span
							>
							<span class="mm-pin mm-c"
								><Avatar alt="Crew C" fallback="C" size="xs" status="neutral" /></span
							>
						</div>
					</Card>
					<Card title="Routing" padding="none">
						<div class="mm-route-row">
							<IconRoute size={16} />
							<div class="mm-row-main">
								<div class="mm-row-title">Fault in chiller BLR-004</div>
								<div class="mm-row-meta"><span class="mm-mono">12 min to site</span></div>
							</div>
							<span class="mm-caret"><IconChevronRight size={16} /></span>
						</div>
						<div class="mm-route-row">
							<IconRoute size={16} />
							<div class="mm-row-main">
								<div class="mm-row-title">Rotation — pump 7</div>
								<div class="mm-row-meta"><span class="mm-mono">2 hr to site</span></div>
							</div>
							<span class="mm-caret"><IconChevronRight size={16} /></span>
						</div>
					</Card>
				{/if}
			</main>
		{:else if args.screen === 'jobs'}
			<main class="mm-scroll">
				<div class="mm-filters" role="search">
					<Input
						placeholder="Search jobs, assets, addresses…"
						value={query}
						clearable
						oninput={(e) => (query = (e.currentTarget as HTMLInputElement).value)}
					>
						{#snippet leadingIcon()}
							<IconSearch size={16} />
						{/snippet}
					</Input>
					<div class="mm-chip-row">
						<ToggleGroup
							label="Filter"
							size="sm"
							mode="single"
							value={filter}
							onchange={(e) => (filter = e.detail.value as string)}
							items={['open', 'assigned', 'done']}
						/>
						<ToggleGroup
							label="Sort"
							size="sm"
							mode="single"
							value={sort}
							onchange={(e) => (sort = e.detail.value as string)}
							items={[
								{ value: 'urgency', label: 'Urgency', icon: IconBolt },
								{ value: 'distance', label: 'Distance', icon: IconMapPin }
							]}
						/>
					</div>
				</div>

				<div class="mm-jobs">
					<Card padding="md">
						<div class="mm-job-head">
							<span class="mm-job-title">Fault in chiller BLR-004</span>
							<Button variant="icon" size="sm" aria-label="Job actions"
								><IconDots size={18} /></Button
							>
						</div>
						<div class="mm-job-foot">
							<Badge size="sm" variant="error">Open</Badge>
							<span class="mm-eta mm-mono"><IconClock size={12} /> ETA 12m</span>
						</div>
					</Card>
					<Card padding="md">
						<div class="mm-job-head">
							<span class="mm-job-title">Rotation — pump 7</span>
							<Button variant="icon" size="sm" aria-label="Job actions"
								><IconDots size={18} /></Button
							>
						</div>
						<div class="mm-job-foot">
							<Badge size="sm" variant="info">Scheduled</Badge>
							<span class="mm-eta mm-mono"><IconClock size={12} /> ETA 2h</span>
						</div>
					</Card>
				</div>

				<Button
					variant="outline"
					onclick={() => showToast('No more jobs — all caught up.', 'success')}
				>
					<IconBolt size={16} /> Load more
				</Button>
			</main>
		{:else if args.screen === 'alerts'}
			<main class="mm-scroll">
				<div class="mm-alert-list">
					<Alert type="error" title="Sensor BLR-004 offline" dismissible>
						No signal for 18 minutes.
					</Alert>
					<Alert type="warning" title="Schedule shift for sector 4" dismissible>
						Fog moving in after 16:00.
					</Alert>
					<Alert type="success" title="All assets verified" dismissible>
						Nightly sweep complete.
					</Alert>
				</div>

				<Card title="Notification controls">
					<div class="mm-form">
						<Switch label="Push alerts" checked />
						<Switch label="SMS for critical" checked />
						<Switch label="Email digest" />
						<Separator spacing="sm" />
						<Slider
							label="Alert radius"
							min={1}
							max={20}
							value={rangeKm}
							onchange={(e) => (rangeKm = e.detail.value as number)}
							showValue
						/>
						<Alert type="info" title="Radius">
							Alerts within {rangeKm} km.
						</Alert>
					</div>
				</Card>
			</main>
		{:else}
			<main class="mm-scroll">
				<Card title="Profile" description="Field technician · Crew lead">
					{#snippet action()}
						<Avatar alt="Dana Reyes" fallback="DR" size="md" status="success" />
					{/snippet}
					<div class="mm-profile">
						<div class="mm-prow">
							<span class="mm-mute">Role</span>
							<span class="mm-mono">Technician III</span>
						</div>
						<div class="mm-prow">
							<span class="mm-mute">Badge</span>
							<span class="mm-mono">CAMP-0142</span>
						</div>
						<div class="mm-prow">
							<span class="mm-mute">Auto-report</span>
							<Switch label="On" bind:checked={shiftAuto} />
						</div>
						<div class="mm-prow">
							<span class="mm-mute">Audible push</span>
							<Switch label="Sound" bind:checked={audiblePush} />
						</div>
					</div>
				</Card>

				<Card title="Crew preferences">
					<RadioGroup
						label="Alert style"
						orientation="vertical"
						items={[
							{ value: 'audible', label: 'Audible + vibration' },
							{ value: 'silent', label: 'Silent (forecast only)' },
							{ value: 'off', label: 'Off until shift start' }
						]}
						value={forecastOnly ? 'silent' : 'audible'}
					/>
					<Separator spacing="sm" />
					<Toggle label="Forecast-only mode" bind:checked={forecastOnly} />
					<Toggle label="Plain toggle demo" bind:checked={plainToggle} />
				</Card>

				<Accordion defaultValue="support">
					<AccordionItem value="support" title="Support & status">
						<p class="mm-prose">All nominal. Contact dispatch on channel 4.</p>
					</AccordionItem>
					<AccordionItem value="about" title="About this build">
						<p class="mm-prose">
							A mobile-first story exercising the iv-ui catalog at phone width: bottom nav, sheets,
							chips, toggles, progress, and toasts.
						</p>
					</AccordionItem>
				</Accordion>

				<Card title="Local storage">
					<div class="mm-form">
						<NativeSelect
							label="Data sync interval (s)"
							helper="How often the app polls the server."
							value="15"
							options={[
								{ value: '15', label: 'Every 15 s' },
								{ value: '30', label: 'Every 30 s' },
								{ value: '60', label: 'Every minute' }
							]}
						/>
						<Select
							label="Timezone"
							value="local"
							options={[
								{ value: 'local', label: 'Device local' },
								{ value: 'utc', label: 'UTC' }
							]}
							placeholder="Choose…"
						/>
						<Field label="Notes" htmlFor="mm-notes">
							<Textarea id="mm-notes" rows={3} placeholder="Notes…" />
						</Field>
					</div>
				</Card>
			</main>
		{/if}

		{#if args.screen !== 'profile'}
			<button
				class="mm-fab"
				type="button"
				aria-label="Start a new job"
				onclick={() => (addJobOpen = true)}
			>
				<IconPlus size={22} aria-hidden="true" />
			</button>
		{/if}

		<nav class="mm-bottomnav" aria-label="Primary">
			{@render navBtn('Home', IconHome, args.screen === 'home')}
			{@render navBtn('Jobs', IconTool, args.screen === 'jobs')}
			{@render navBtn('Map', IconMap, args.screen === 'map')}
			{@render navBtn('Alerts', IconBell, args.screen === 'alerts')}
			{@render navBtn('Profile', IconUsers, args.screen === 'profile')}
		</nav>
	</div>

	{@render overlays()}
{/snippet}

{#snippet overlays()}
	<Toast />
	<AlertDialog />

	<Sheet
		bind:open={sheetOpen}
		side="bottom"
		size="md"
		title="Job filters"
		onclose={() => (sheetOpen = false)}
	>
		{#snippet icon()}
			<IconSettings size={20} />
		{/snippet}
		<div class="mm-form">
			<ToggleGroup
				label="Status"
				mode="single"
				value={filter}
				onchange={(e) => (filter = e.detail.value as string)}
				items={['open', 'assigned', 'done']}
			/>
			<ToggleGroup
				label="Zone"
				mode="multiple"
				value={['north', 'central']}
				items={['north', 'central', 'south']}
			/>
			<Separator spacing="sm" />
			<Slider
				label="Max distance"
				min={1}
				max={40}
				value={rangeKm}
				onchange={(e) => (rangeKm = e.detail.value as number)}
				showValue
			/>
			<p class="mm-hint">Filters apply instantly.</p>
		</div>
		{#snippet footer()}
			<Button variant="outline" onclick={() => (sheetOpen = false)}>Reset</Button>
			<Button variant="primary" onclick={() => (sheetOpen = false)}>Apply filters</Button>
		{/snippet}
	</Sheet>

	<Dialog open={addJobOpen} title="Log a new job" size="sm" onclose={() => (addJobOpen = false)}>
		{#snippet icon()}
			<IconTool size={20} />
		{/snippet}
		<div class="mm-form">
			<Field label="Asset tag" htmlFor="add-asset" required>
				<Input id="add-asset" placeholder="e.g. BLR-009" />
			</Field>
			<RadioGroup
				label="Priority"
				orientation="horizontal"
				items={[
					{ value: 'high', label: 'High' },
					{ value: 'medium', label: 'Med' },
					{ value: 'low', label: 'Low' }
				]}
				value={priority}
			/>
			<Field label="Notes" htmlFor="add-notes">
				<Textarea id="add-notes" rows={3} placeholder="Describe the fault…" />
			</Field>
		</div>
		{#snippet footer()}
			<Button variant="outline" onclick={() => (addJobOpen = false)}>Cancel</Button>
			<Button
				variant="primary"
				onclick={() => {
					addJobOpen = false;
					showToast('Job JR-2042 queued for dispatch.', 'success');
				}}
			>
				<IconPlus size={14} /> Create job
			</Button>
		{/snippet}
	</Dialog>

	<Sheet
		bind:open={notifySheetOpen}
		side="right"
		size="sm"
		title="Notifications"
		onclose={() => (notifySheetOpen = false)}
	>
		{#snippet icon()}
			<IconBell size={20} />
		{/snippet}
		<div class="mm-notify">
			<div class="mm-nrow">
				<IconCircleCheck size={18} />
				<div class="mm-row-main">
					<div class="mm-row-title">Boiler B back online</div>
					<div class="mm-row-meta"><span class="mm-mono">2 min ago</span></div>
				</div>
			</div>
			<div class="mm-nrow">
				<IconInfoCircle size={18} />
				<div class="mm-row-main">
					<div class="mm-row-title">New job assigned</div>
					<div class="mm-row-meta"><span class="mm-mono">18 min ago</span></div>
				</div>
			</div>
			<div class="mm-nrow">
				<IconBuilding size={18} />
				<div class="mm-row-main">
					<div class="mm-row-title">Sector sweep complete</div>
					<div class="mm-row-meta"><span class="mm-mono">1 hr ago</span></div>
				</div>
			</div>
		</div>
		{#snippet footer()}
			<Button variant="ghost" onclick={() => (notifySheetOpen = false)}>Mark all read</Button>
		{/snippet}
	</Sheet>

	<Popover anchor={appAnchor} placement="bottom" align="end">
		<div class="mm-pop">
			<Menu entries={settingsEntries} label="Account menu" />
		</div>
	</Popover>
{/snippet}

<Story name="Home" template={phone} args={{ screen: 'home' }} />
<Story name="Jobs" template={phone} args={{ screen: 'jobs' }} />
<Story
	name="Map"
	template={phone}
	args={{ screen: 'map' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Start a new job' }));
		const dialog = await canvas.findByRole('dialog');
		await expect(within(dialog).getByRole('heading', { name: 'Log a new job' })).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
	}}
/>
<Story
	name="Profile"
	template={phone}
	args={{ screen: 'profile' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Account' }));
		await expect(canvas.getByText('Technician III')).toBeVisible();
	}}
/>

<style>
	.mm-app {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 400px;
		height: 640px;
		margin: 0 auto;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius-lg);
		background: var(--iv_surface);
		color: var(--iv_foreground);
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-body);
		overflow: hidden;
	}

	.mm-app,
	.mm-app * {
		box-sizing: border-box;
	}

	.mm-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-sm);
		flex-shrink: 0;
		padding: var(--iv_spacing-md);
		border-bottom: 1px solid var(--iv_border);
	}

	.mm-topbar-left,
	.mm-topbar-right {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.mm-icon-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border: 1px solid transparent;
		border-radius: var(--iv_radius-sm);
		background: transparent;
		color: var(--iv_foreground-dim);
		cursor: pointer;

		&:hover {
			background: var(--iv_surface-raised);
			border-color: var(--iv_border);
			color: var(--iv_foreground);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}

	.mm-bell-dot {
		position: absolute;
		top: -7px;
		right: -8px;
		height: 18px;
		min-width: 18px;
		display: flex;
		align-items: center;

		:global(.iv-badge) {
			height: 16px;
			min-width: 16px;
			padding: 0 4px;
			font-size: var(--iv_text-xs);
		}
	}

	.mm-title {
		display: flex;
		flex-direction: column;
		line-height: var(--iv_leading-tight);
	}

	.mm-app-title {
		font-weight: var(--iv_weight-semibold);
		letter-spacing: var(--iv_tracking-wider);
	}

	.mm-app-sub {
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
	}

	.mm-scroll {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		padding: var(--iv_spacing-lg);
	}

	.mm-hello {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--iv_spacing-md);
	}

	.mm-hello-text {
		min-width: 0;
	}

	.mm-h1 {
		margin: 0;
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-h2);
		font-weight: var(--iv_weight-bold);
		letter-spacing: var(--iv_tracking-tight);
		line-height: var(--iv_leading-heading);
	}

	.mm-note,
	.mm-hint {
		margin: var(--iv_spacing-2xs) 0 0;
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		line-height: var(--iv_leading-base);
	}

	.mm-kpis {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--iv_spacing-sm);
	}

	.mm-kpi {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.mm-kpi-label {
		font-size: var(--iv_text-xs);
		letter-spacing: var(--iv_tracking-wide);
		text-transform: uppercase;
		color: var(--iv_foreground-dim);
	}

	.mm-kpi-value {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-h3);
		font-weight: var(--iv_weight-semibold);
		color: var(--iv_accent);
		font-variant-numeric: tabular-nums;
	}

	.mm-jobs {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_spacing-sm);

		:global(.iv-empty) {
			border-radius: var(--iv_radius);
		}
	}

	.mm-skel-card {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-md);
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		width: 100%;
	}

	.mm-job-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--iv_spacing-sm);
	}

	.mm-job-title {
		font-weight: var(--iv_weight-semibold);
		line-height: var(--iv_leading-tight);
	}

	.mm-job-meta {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		margin-top: var(--iv_spacing-sm);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.mm-job-foot {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		margin-top: var(--iv_spacing-md);
	}

	.mm-mute {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-xs);
	}

	.mm-eta {
		display: inline-flex;
		align-items: center;
		gap: var(--iv_spacing-xs);
	}

	.mm-checklist {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-md) var(--iv_card-pad-x);
	}

	.mm-team {
		display: flex;
		flex-direction: column;
	}

	.mm-row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_spacing-sm) 0;

		& + .mm-row {
			border-top: 1px solid var(--iv_border);
		}
	}

	.mm-row-main {
		flex: 1;
		min-width: 0;
	}

	.mm-row-title {
		font-weight: var(--iv_weight-medium);
		line-height: var(--iv_leading-tight);
	}

	.mm-row-meta {
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.mm-mono {
		font-family: var(--iv_font-mono);
	}

	.mm-map {
		position: relative;
		height: 200px;
		border: 1px solid var(--iv_border);
		border-radius: var(--iv_radius);
		overflow: hidden;
		background: var(--iv_surface-raised);
	}

	.mm-map-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--iv_border) 1px, transparent 1px),
			linear-gradient(90deg, var(--iv_border) 1px, transparent 1px);
		background-size: 40px 40px;
		opacity: 0.4;
	}

	.mm-pin {
		position: absolute;
	}

	.mm-a {
		top: 24%;
		left: 22%;
	}

	.mm-b {
		top: 60%;
		left: 64%;
	}

	.mm-c {
		top: 40%;
		left: 44%;
	}

	.mm-route-row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_spacing-md) var(--iv_card-pad-x);

		& + .mm-route-row {
			border-top: 1px solid var(--iv_border);
		}
	}

	.mm-filters {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.mm-chip-row {
		display: flex;
		gap: var(--iv_spacing-sm);
		flex-wrap: wrap;
	}

	.mm-scroll > :global(.iv-btn) {
		width: 100%;
	}

	.mm-alert-list {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.mm-form {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
	}

	.mm-profile {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.mm-prow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-sm);
	}

	.mm-prose {
		margin: 0;
		line-height: var(--iv_leading-prose);
		color: var(--iv_foreground-dim);
	}

	.mm-fab {
		position: absolute;
		right: var(--iv_spacing-lg);
		bottom: calc(var(--iv_spacing-xl) + var(--iv_spacing-lg));
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 1px solid var(--iv_foreground);
		border-radius: var(--iv_radius);
		background: var(--iv_foreground);
		color: var(--iv_surface);
		cursor: pointer;
		transition: background var(--iv_transition-base);

		&:hover {
			background: var(--iv_foreground-hover);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}

	.mm-bottomnav {
		display: flex;
		align-items: stretch;
		flex-shrink: 0;
		border-top: 1px solid var(--iv_border);
		background: var(--iv_surface-raised);
	}

	.mm-nav-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--iv_spacing-2xs);
		flex: 1;
		padding: var(--iv_spacing-sm) 0;
		border: none;
		background: transparent;
		color: var(--iv_foreground-dim);
		font-family: var(--iv_font-ui);
		font-size: var(--iv_text-xs);
		cursor: pointer;
		position: relative;

		&:hover {
			color: var(--iv_foreground);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: -1px;
		}

		&[aria-current='page'] {
			color: var(--iv_foreground);
		}

		&[aria-current='page']::before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 24px;
			height: 3px;
			border-radius: var(--iv_radius-sm);
			background: var(--iv_cursor);
		}
	}

	.mm-nav-label {
		letter-spacing: var(--iv_tracking-wide);
		text-transform: uppercase;
	}

	.mm-pop {
		min-width: 13rem;
		padding: var(--iv_spacing-xs);
	}

	.mm-notify {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
	}

	.mm-nrow {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	@media (prefers-reduced-motion: reduce) {
		.mm-app {
			transition: none;
		}
	}
</style>
