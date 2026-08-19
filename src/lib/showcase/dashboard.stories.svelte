<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		IconActivity,
		IconAlertTriangle,
		IconArrowRight,
		IconBell,
		IconBolt,
		IconChevronDown,
		IconCopy,
		IconDots,
		IconEye,
		IconFileText,
		IconLayoutDashboard,
		IconLogout,
		IconPlus,
		IconRefresh,
		IconRocket,
		IconRotate,
		IconSearch,
		IconSettings,
		IconShieldCheck,
		IconStar,
		IconTrash,
		IconUsers,
		IconWorld
	} from '@tabler/icons-svelte';
	import type { MenuEntry } from '../components/menu.svelte';
	import Accordion from '../components/accordion.svelte';
	import AccordionItem from '../components/accordion-item.svelte';
	import Alert from '../components/alert.svelte';
	import AlertDialog from '../components/alert-dialog.svelte';
	import Avatar from '../components/avatar.svelte';
	import Badge from '../components/badge.svelte';
	import Breadcrumb from '../components/breadcrumb.svelte';
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
	import InputGroup from '../components/input-group.svelte';
	import Menu from '../components/menu.svelte';
	import NativeSelect from '../components/native-select.svelte';
	import Popover from '../components/popover.svelte';
	import Progress from '../components/progress.svelte';
	import RadioGroup from '../components/radio-group.svelte';
	import Select from '../components/select.svelte';
	import Separator from '../components/separator.svelte';
	import Sheet from '../components/sheet.svelte';
	import Shortcut from '../components/shortcut.svelte';
	import Skeleton from '../components/skeleton.svelte';
	import Slider from '../components/slider.svelte';
	import Switch from '../components/switch.svelte';
	import Tab from '../components/tab.svelte';
	import TabList from '../components/tab-list.svelte';
	import TabPanel from '../components/tab-panel.svelte';
	import Tabs from '../components/tabs.svelte';
	import Textarea from '../components/textarea.svelte';
	import Toast from '../components/toast.svelte';
	import Toggle from '../components/toggle.svelte';
	import ToggleGroup from '../components/toggle-group.svelte';
	import Tooltip from '../components/tooltip.svelte';

	const accountEntries: MenuEntry[] = [
		{ type: 'header', id: 'account-head', label: 'Signed in as ada@atlas.dev' },
		{ type: 'item', id: 'profile', item: { label: 'Profile', shortcut: '⇧⌘P' } },
		{ type: 'item', id: 'billing', item: { label: 'Billing & usage', shortcut: '⌘B' } },
		{ type: 'item', id: 'preferences', item: { label: 'Preferences', shortcut: '⌘,' } },
		{ type: 'separator', id: 'account-sep-1' },
		{ type: 'item', id: 'docs', item: { label: 'Documentation', icon: IconFileText } },
		{ type: 'item', id: 'status', item: { label: 'System status' } },
		{ type: 'separator', id: 'account-sep-2' },
		{ type: 'item', id: 'signout', item: { label: 'Sign out', icon: IconLogout, dim: true } }
	];

	const deployMenu: MenuEntry[] = [
		{ type: 'item', id: 'view', item: { label: 'View details', icon: IconEye } },
		{ type: 'item', id: 'redeploy', item: { label: 'Redeploy', icon: IconRefresh, shortcut: 'R' } },
		{ type: 'item', id: 'rollback', item: { label: 'Rollback', icon: IconRotate } },
		{ type: 'separator', id: 'deploy-sep-1' },
		{ type: 'item', id: 'logs', item: { label: 'View logs', icon: IconFileText } },
		{ type: 'item', id: 'sha', item: { label: 'Copy SHA', shortcut: '⌘⇧C' } },
		{ type: 'separator', id: 'deploy-sep-2' },
		{ type: 'item', id: 'delete', item: { label: 'Delete deployment', icon: IconTrash, dim: true } }
	];

	const deploys: {
		name: string;
		branch: string;
		sha: string;
		status: string;
		variant: 'success' | 'error' | 'info' | 'neutral';
		time: string;
	}[] = [
		{
			name: 'web-canary',
			branch: 'main',
			sha: 'a3f9c2d',
			status: 'Live',
			variant: 'success',
			time: '2 min ago'
		},
		{
			name: 'api-gateway',
			branch: 'release/2.14',
			sha: '7b1e44a',
			status: 'Failed',
			variant: 'error',
			time: '1 hr ago'
		},
		{
			name: 'worker-jobs',
			branch: 'feat/queue',
			sha: 'c9d12fe',
			status: 'Queued',
			variant: 'info',
			time: '3 hr ago'
		},
		{
			name: 'docs-site',
			branch: 'main',
			sha: '4de09bb',
			status: 'Preview',
			variant: 'neutral',
			time: 'yesterday'
		}
	];

	const ownerOptions = [
		{ value: 'ada', label: 'Ada Lovelace' },
		{ value: 'grace', label: 'Grace Hopper' },
		{ value: 'alan', label: 'Alan Turing' },
		{ value: 'katherine', label: 'Katherine Johnson' }
	];

	const regionOptions = [
		{ value: 'us-east', label: 'US East (Virginia)' },
		{ value: 'eu-west', label: 'EU West (Ireland)' },
		{ value: 'ap-south', label: 'AP South (Singapore)' }
	];

	const { Story } = defineMeta({
		title: 'Showcase/App Dashboard',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import { showAlertDialog } from '../stores/alert-dialog.js';
	import { showToast } from '../stores/toast.js';

	let deployOpen = $state(false);
	let sheetOpen = $state(false);
	let tab = $state('overview');
	let search = $state('');
	let period = $state('30d');
	let env = $state('production');
	let filter = $state('all');
	let projectName = $state('Atlas Core');
	let slug = $state('atlas-core');
	let repo = $state('github');
	let deployKey = $state('ssh-ed25519 AAAA…');
	let owner = $state('ada');
	let region = $state('us-east');
	let envMode = $state('stable');
	let description = $state('');
	let canary = $state(10);
	let autoDeploy = $state(true);
	let requireApproval = $state(false);
	let notifyEmail = $state(true);
	let notifySms = $state(false);
	let maintenance = $state(false);
	let previewEnv = $state(true);
	let deployOnMerge = $state(true);
	let notifyFailure = $state(true);
	let deployBranch = $state('main');
	let commit = $state('merge pull request #2841');
	let rollback = $state(true);
	let notify = $state(false);

	let accountAnchor = $state<HTMLButtonElement>();
	let topbarAnchor = $state<HTMLButtonElement>();
</script>

{#snippet accountMenu()}
	<div class="sh-pop-menu">
		<Menu entries={accountEntries} label="Account menu" />
	</div>
{/snippet}

{#snippet navItem(label: string, icon: typeof IconLayoutDashboard, active: boolean)}
	<div class="sh-nav-item" class:sh-active={active}>
		<Button variant={active ? 'secondary' : 'ghost'} size="sm">
			{@const Icon = icon}
			<Icon size={16} aria-hidden="true" />
			<span class="sh-nav-label">{label}</span>
			{#if label === 'Deployments'}
				<span class="sh-nav-badge"><Badge size="sm">12</Badge></span>
			{/if}
		</Button>
	</div>
{/snippet}

{#snippet deployRow(
	title: string,
	status: string,
	variant: 'success' | 'error' | 'info' | 'neutral',
	sha: string,
	meta: string
)}
	<div class="sh-row">
		<div class="sh-row-avatars" aria-hidden="true">
			<Avatar alt="" fallback="AL" size="xs" />
			<Avatar alt="" fallback="GH" size="xs" />
			<Avatar alt="" fallback="AT" size="xs" />
		</div>
		<div class="sh-row-main">
			<div class="sh-row-title">
				<span>{title}</span>
				<Badge size="sm" {variant}>{status}</Badge>
			</div>
			<div class="sh-row-meta">
				<span class="sh-mono">{sha}</span>
				<span aria-hidden="true">·</span>
				<span>{meta}</span>
			</div>
		</div>
		<div class="sh-row-end">
			<ContextMenu entries={deployMenu} label="Deployment actions">
				<Button variant="icon" size="sm" aria-label="Deployment actions">
					<IconDots size={16} aria-hidden="true" />
				</Button>
			</ContextMenu>
		</div>
	</div>
{/snippet}

{#snippet activityRow(name: string, initials: string, text: string, time: string)}
	<div class="sh-row">
		<Avatar alt={name} fallback={initials} size="sm" />
		<div class="sh-row-main">
			<div class="sh-row-title">
				<span class="sh-act-name">{name}</span>
				<span class="sh-act-text">{text}</span>
			</div>
			<div class="sh-row-meta">
				<span class="sh-mono">{time}</span>
			</div>
		</div>
	</div>
{/snippet}

{#snippet dashboard(args: { loading?: boolean })}
	<div class="sh-root">
		<aside class="sh-sidebar">
			<div class="sh-brand">
				<span class="sh-brand-mark" aria-hidden="true"></span>
				<span class="sh-brand-name">atlas</span>
				<span class="sh-brand-badge"><Badge size="sm" variant="accent">prod</Badge></span>
			</div>

			<nav class="sh-nav" aria-label="Workspace">
				{@render navItem('Overview', IconLayoutDashboard, true)}
				{@render navItem('Deployments', IconRocket, false)}
				{@render navItem('Activity', IconActivity, false)}
				{@render navItem('Members', IconUsers, false)}
				{@render navItem('Settings', IconSettings, false)}
			</nav>

			<div class="sh-sidebar-spacer"></div>

			{#if args.loading}
				<Card padding="sm">
					<div class="sh-usage-loading">
						<Skeleton shape="line" width="55%" />
						<Skeleton shape="line" width="90%" />
						<Skeleton shape="line" width="70%" />
					</div>
				</Card>
				<div class="sh-account-loading">
					<Skeleton shape="circle" />
					<Skeleton shape="line" width="70%" />
				</div>
			{:else}
				<Card padding="sm">
					<div class="sh-usage">
						<Progress value={41} label="Builds used" showValue size="sm" />
						<p class="sh-usage-hint">412 / 1,000 this cycle · resets in 12 days</p>
					</div>
				</Card>

				<button
					class="sh-account"
					type="button"
					bind:this={accountAnchor}
					aria-label="Open account menu"
				>
					<Avatar alt="Ada Lovelace" fallback="AL" size="sm" status="success" />
					<span class="sh-account-text">
						<span class="sh-account-name">Ada Lovelace</span>
						<span class="sh-account-role">Owner · atlas.dev</span>
					</span>
					<span class="sh-account-caret"><IconChevronDown size={14} aria-hidden="true" /></span>
				</button>
				<Popover anchor={accountAnchor} placement="top" align="start">
					{@render accountMenu()}
				</Popover>
			{/if}
		</aside>

		<div class="sh-main">
			<header class="sh-topbar">
				<Breadcrumb items={[{ label: 'Atlas' }, { label: 'Projects' }, { label: 'Atlas Core' }]} />
				<div class="sh-topbar-actions">
					<div class="sh-search">
						<Input
							placeholder="Search…"
							size="sm"
							value={search}
							oninput={(e) => (search = (e.currentTarget as HTMLInputElement).value)}
						>
							{#snippet leadingIcon()}
								<IconSearch size={14} aria-hidden="true" />
							{/snippet}
						</Input>
					</div>
					<NativeSelect
						size="sm"
						placeholder="Time range"
						value={period}
						options={[
							{ value: '7d', label: 'Last 7 days' },
							{ value: '30d', label: 'Last 30 days' },
							{ value: '90d', label: 'Last 90 days' }
						]}
					/>
					<Tooltip label="Quick settings">
						<Button variant="icon" aria-label="Quick settings" onclick={() => (sheetOpen = true)}>
							<IconSettings size={18} aria-hidden="true" />
						</Button>
					</Tooltip>
					<Tooltip label="Notifications">
						<span class="sh-bell-wrap">
							<Button variant="icon" aria-label="Notifications">
								<IconBell size={18} aria-hidden="true" />
							</Button>
							<span class="sh-bell-dot"><Badge size="sm" variant="accent">3</Badge></span>
						</span>
					</Tooltip>
					<button
						class="sh-avatar-btn"
						type="button"
						bind:this={topbarAnchor}
						aria-label="Open account menu"
					>
						<Avatar alt="Ada Lovelace" fallback="AL" size="sm" status="success" />
					</button>
					<Popover anchor={topbarAnchor} placement="bottom" align="end">
						{@render accountMenu()}
					</Popover>
				</div>
			</header>

			<main class="sh-content">
				<div class="sh-page-head">
					<div class="sh-page-head-text">
						<div class="sh-page-head-title-row">
							<h2 class="sh-page-title">Atlas Core</h2>
							<Badge variant="success">Production</Badge>
						</div>
						<p class="sh-page-desc">
							Continuous delivery dashboard for the Atlas platform monorepo.
						</p>
					</div>
					<div class="sh-page-head-actions">
						<Tooltip label="Star this project">
							<Button variant="icon" aria-label="Star this project">
								<IconStar size={18} aria-hidden="true" />
							</Button>
						</Tooltip>
						<Button variant="outline" size="sm">
							<IconUsers size={14} aria-hidden="true" />
							Share
						</Button>
						<Button variant="primary" size="sm" onclick={() => (deployOpen = true)}>
							<IconRocket size={14} aria-hidden="true" />
							Deploy
						</Button>
					</div>
				</div>

				<section class="sh-stats" aria-label="Key metrics">
					{#if args.loading}
						{#each [1, 2, 3, 4] as i (i)}
							<Card padding="md">
								<div class="sh-stat">
									<Skeleton shape="line" width="45%" />
									<Skeleton shape="line" width="80%" height={30} />
								</div>
							</Card>
						{/each}
					{:else}
						<Card padding="md">
							<div class="sh-stat">
								<div class="sh-stat-head">
									<span class="sh-stat-icon"><IconRocket size={16} aria-hidden="true" /></span>
									<span class="sh-stat-label">Deployments</span>
								</div>
								<div class="sh-stat-value">128</div>
								<div class="sh-stat-meta">
									<Badge variant="success" size="sm">+12 this month</Badge>
									<span class="sh-stat-sub">vs 116</span>
								</div>
							</div>
						</Card>
						<Card padding="md">
							<div class="sh-stat">
								<div class="sh-stat-head">
									<span class="sh-stat-icon"><IconActivity size={16} aria-hidden="true" /></span>
									<span class="sh-stat-label">Uptime</span>
								</div>
								<div class="sh-stat-value">99.98%</div>
								<div class="sh-stat-meta">
									<Badge variant="success" size="sm">Last 30 days</Badge>
								</div>
							</div>
						</Card>
						<Card padding="md">
							<div class="sh-stat">
								<div class="sh-stat-head">
									<span class="sh-stat-icon"><IconBolt size={16} aria-hidden="true" /></span>
									<span class="sh-stat-label">Avg. response</span>
								</div>
								<div class="sh-stat-value">42 ms</div>
								<div class="sh-stat-meta">
									<Badge variant="info" size="sm">−8 ms</Badge>
									<span class="sh-stat-sub">p95</span>
								</div>
							</div>
						</Card>
						<Card padding="md">
							<div class="sh-stat">
								<div class="sh-stat-head">
									<span class="sh-stat-icon"
										><IconAlertTriangle size={16} aria-hidden="true" /></span
									>
									<span class="sh-stat-label">Open incidents</span>
								</div>
								<div class="sh-stat-value">3</div>
								<div class="sh-stat-meta">
									<Badge variant="error" size="sm">+1 since yesterday</Badge>
								</div>
							</div>
						</Card>
					{/if}
				</section>

				<Tabs value={tab} onchange={(e) => (tab = e.detail.value)} bordered>
					<TabList>
						<Tab value="overview">Overview</Tab>
						<Tab value="deployments">Deployments</Tab>
						<Tab value="activity">Activity</Tab>
						<Tab value="settings">Settings</Tab>
					</TabList>

					<TabPanel value="overview">
						<div class="sh-cols">
							<div class="sh-col-main">
								{#if args.loading}
									<Card title="Latest deployments" description="Loading workspace state…">
										{#each [1, 2, 3] as i (i)}
											<div class="sh-skel-row">
												<Skeleton shape="circle" />
												<div class="sh-skel-lines">
													<Skeleton shape="line" width="60%" />
													<Skeleton shape="line" width="35%" />
												</div>
											</div>
										{/each}
									</Card>
									<Card title="Release controls">
										<div class="sh-skel-lines">
											<Skeleton shape="line" />
											<Skeleton shape="line" />
											<Skeleton shape="line" />
										</div>
									</Card>
								{:else}
									<Card
										title="Latest deployments"
										description="Most recent releases across environments"
										padding="none"
									>
										{#snippet action()}
											<Button variant="ghost" size="sm">View all</Button>
										{/snippet}
										<div class="sh-list">
											{@render deployRow(
												'web-canary',
												'Live',
												'success',
												'a3f9c2d',
												'2 min ago · 3 reviewers'
											)}
											{@render deployRow(
												'api-gateway',
												'Failed',
												'error',
												'7b1e44a',
												'1 hr ago · auto-rollback'
											)}
											{@render deployRow(
												'worker-jobs',
												'Queued',
												'info',
												'c9d12fe',
												'3 hr ago · waiting on approvals'
											)}
										</div>
										{#snippet footer()}
											<div class="sh-card-foot">
												<span class="sh-mono">128 deployments total</span>
												<Button variant="ghost" size="sm">
													<IconArrowRight size={14} aria-hidden="true" />
													Open pipeline
												</Button>
											</div>
										{/snippet}
									</Card>

									<Card
										title="Release controls"
										description="Rollout strategy for the production environment"
									>
										<div class="sh-controls">
											<Switch label="Auto-deploy on merge" bind:checked={autoDeploy} />
											<Switch
												label="Require approval before rollout"
												bind:checked={requireApproval}
											/>
											<Slider
												label="Canary rollout"
												min={0}
												max={100}
												value={canary}
												onchange={(e) => (canary = e.detail.value as number)}
												showValue
											/>
											<div class="sh-controls-foot">
												<span class="sh-controls-hint">
													Applies to the next deploy. Canary serves a subset of traffic before a
													full rollout.
												</span>
											</div>
										</div>
									</Card>

									<Accordion defaultValue="notes">
										<AccordionItem value="notes" title="Deployment notes (3)">
											<p class="sh-prose">
												Deploy #128 ships the redesigned event pipeline with batching enabled by
												default. Watch queue depth for the first hour.
											</p>
										</AccordionItem>
										<AccordionItem value="changelog" title="Changelog">
											<p class="sh-prose">
												v2.14.0 adds retry backoff for webhooks, faster cold starts on the workers,
												and a new audit log export.
											</p>
										</AccordionItem>
										<AccordionItem value="rollback" title="Rollback procedure">
											<p class="sh-prose">
												Open the deployment menu and choose Rollback, or run
												<code class="sh-code">atlas rollback --to=&lt;sha&gt;</code>. Rollbacks are
												always green builds.
											</p>
										</AccordionItem>
									</Accordion>

									<Collapsible title="Environment variables" defaultOpen>
										<pre class="sh-code"><code
												>ATLAS_ENV=production
NODE_ENV=production
LOG_LEVEL=info
FEATURE_QUEUE_BATCHING=true</code
											></pre>
									</Collapsible>
								{/if}
							</div>

							<div class="sh-col-side">
								{#if args.loading}
									<Card title="System health">
										<div class="sh-skel-lines">
											<Skeleton shape="line" />
											<Skeleton shape="line" />
											<Skeleton shape="line" />
										</div>
									</Card>
								{:else}
									<Card title="System health" description="Rolling 24h window">
										<div class="sh-health">
											<Progress value={86} label="API latency" showValue />
											<Progress value={2} label="Error rate" showValue />
											<Progress value={34} label="Queue depth" showValue />
											<Separator spacing="sm" />
											<Toggle label="Maintenance mode" bind:checked={maintenance} />
										</div>
									</Card>

									<Alert type="success" title="Deploy #128 is live">
										web-canary rolled out to 100% of production traffic.
									</Alert>
									<Alert type="info" title="Scheduled maintenance">
										Sunday 02:00–03:00 UTC. Expect brief build queue downtime.
									</Alert>
									<Alert type="warning" title="Uncommitted changes">
										3 files changed on main have not been deployed yet.
									</Alert>

									<Card padding="none">
										<EmptyState
											title="No open incidents"
											description="All systems nominal. Notifications land here when something needs attention."
										>
											{#snippet icon()}
												<IconShieldCheck size={20} aria-hidden="true" />
											{/snippet}
										</EmptyState>
									</Card>
								{/if}
							</div>
						</div>
					</TabPanel>

					<TabPanel value="deployments">
						<Card
							title="Deployments"
							description="Search, filter, and manage every release"
							padding="none"
						>
							{#snippet action()}
								<Button variant="primary" size="sm" onclick={() => (deployOpen = true)}>
									<IconPlus size={14} aria-hidden="true" />
									New
								</Button>
							{/snippet}
							<div class="sh-deploy-filters">
								<ButtonGroup
									label="Environment"
									mode="single"
									items={['production', 'staging', 'preview']}
									value={env}
									onchange={(e) => (env = e.detail.value as string)}
								/>
								<ToggleGroup
									label="Status"
									mode="single"
									items={['all', 'active', 'failed']}
									value={filter}
									onchange={(e) => (filter = e.detail.value as string)}
								/>
								<div class="sh-filter-input">
									<Input placeholder="Filter deployments…" size="sm" clearable>
										{#snippet leadingIcon()}
											<IconSearch size={14} aria-hidden="true" />
										{/snippet}
									</Input>
								</div>
							</div>
							<div class="sh-list">
								{#each deploys as d (d.sha)}
									<div class="sh-row sh-deploy-row">
										<Checkbox aria-label={`Select ${d.name}`} />
										<div class="sh-row-main">
											<div class="sh-row-title"><span>{d.name}</span></div>
											<div class="sh-row-meta">
												<span class="sh-mono">{d.branch}</span>
											</div>
										</div>
										<span class="sh-mono sh-sha">{d.sha}</span>
										<Badge size="sm" variant={d.variant}>{d.status}</Badge>
										<span class="sh-mono sh-time">{d.time}</span>
										<ContextMenu entries={deployMenu} label="Deployment actions">
											<Button variant="icon" size="sm" aria-label="Deployment actions">
												<IconDots size={16} aria-hidden="true" />
											</Button>
										</ContextMenu>
									</div>
								{/each}
							</div>
						</Card>
					</TabPanel>

					<TabPanel value="activity">
						<Card
							title="Recent activity"
							description="Latest workspace events from all team members"
							padding="none"
						>
							{#snippet action()}
								<Button variant="ghost" size="sm">
									<IconActivity size={14} aria-hidden="true" />
									Export
								</Button>
							{/snippet}
							<div class="sh-list">
								{@render activityRow(
									'Ada Lovelace',
									'AL',
									'deployed web-canary to production',
									'14:32'
								)}
								{@render activityRow('Grace Hopper', 'GH', 'approved rollout #128', '14:02')}
								{@render activityRow('Alan Turing', 'AT', 'created branch feat/queue', '11:47')}
								{@render activityRow(
									'Katherine Johnson',
									'KJ',
									'invited Linus Torvalds to Atlas Core',
									'09:15'
								)}
							</div>
							{#snippet footer()}
								<div class="sh-card-foot">
									<span class="sh-controls-hint">
										<Shortcut keys={['⌘', 'K']} label="Search shortcut" />
										opens global search · press
										<Shortcut keys={['G', 'D']} label="Go to deployments" />
										to jump to deployments.
									</span>
								</div>
							{/snippet}
						</Card>
					</TabPanel>

					<TabPanel value="settings">
						<Card title="Project settings" description="General configuration for Atlas Core">
							<div class="sh-form">
								<Field label="Project name" htmlFor="proj-name">
									<Input id="proj-name" bind:value={projectName} />
								</Field>

								<Field label="Slug" htmlFor="proj-slug" helper="Used in URLs and API paths.">
									<InputGroup>
										{#snippet prefix()}
											<span class="sh-addon">atlas.app/</span>
										{/snippet}
										<Input id="proj-slug" bind:value={slug} />
										{#snippet suffix()}
											<IconCopy size={14} aria-hidden="true" />
										{/snippet}
									</InputGroup>
								</Field>

								<div class="sh-form-cols">
									<Field label="Repository" htmlFor="proj-repo">
										<NativeSelect
											id="proj-repo"
											value={repo}
											options={[
												{ value: 'github', label: 'GitHub' },
												{ value: 'gitlab', label: 'GitLab' },
												{ value: 'bitbucket', label: 'Bitbucket' }
											]}
										/>
									</Field>
									<Field
										label="Deploy key"
										htmlFor="proj-key"
										helper="SSH key used for git access."
									>
										<Input id="proj-key" value={deployKey} readonly />
									</Field>
								</div>

								<Select
									label="Default owner"
									options={ownerOptions}
									value={owner}
									searchable
									placeholder="Select an owner…"
								/>

								<RadioGroup
									label="Production environment"
									orientation="horizontal"
									items={[
										{ value: 'stable', label: 'Stable' },
										{ value: 'canary', label: 'Canary' }
									]}
									value={envMode}
								/>

								<Field label="Description" htmlFor="proj-desc">
									<Textarea
										id="proj-desc"
										rows={3}
										showCount
										maxlength={240}
										bind:value={description}
										placeholder="Short description of the project…"
									/>
								</Field>

								<Separator spacing="sm" />

								<div class="sh-form-grid">
									<Checkbox label="Enable preview environments" bind:checked={previewEnv} />
									<Checkbox label="Deploy on merge" bind:checked={deployOnMerge} />
									<Checkbox label="Notify on failure" bind:checked={notifyFailure} />
									<Switch label="Email notifications" bind:checked={notifyEmail} />
									<Switch label="SMS for critical incidents" bind:checked={notifySms} />
									<Toggle label="Maintenance mode" bind:checked={maintenance} />
								</div>

								<Slider
									label="Canary rollout"
									min={0}
									max={100}
									value={canary}
									onchange={(e) => (canary = e.detail.value as number)}
									showValue
								/>

								<Select
									label="Build region"
									options={regionOptions}
									value={region}
									searchable
									placeholder="Choose a region…"
								/>

								<div class="sh-form-foot">
									<Button variant="ghost">Reset</Button>
									<Button
										variant="primary"
										onclick={() => showToast('Project settings saved.', 'success')}
									>
										Save changes
									</Button>
								</div>
							</div>
						</Card>

						<Card title="Danger zone" description="Destructive actions can't be undone.">
							<Alert type="error" title="Delete this project">
								Permanently removes Atlas Core, all deployments, and activity history.
							</Alert>
							<Button
								variant="danger"
								onclick={() =>
									showAlertDialog({
										title: 'Delete project?',
										message:
											'This permanently deletes Atlas Core and all of its deployment history. This action cannot be undone.',
										actions: [
											{ label: 'Cancel', variant: 'secondary' },
											{
												label: 'Delete project',
												variant: 'danger',
												onClick: () => showToast('Project deleted.', 'error')
											}
										]
									})}
							>
								<IconTrash size={14} aria-hidden="true" />
								Delete project
							</Button>
						</Card>
					</TabPanel>
				</Tabs>

				<footer class="sh-footer">
					<Separator />
					<div class="sh-footer-inner">
						<span class="sh-mono">atlas · v2.14.0</span>
						<span class="sh-footer-meta">
							<Shortcut keys={['⌘', 'K']} label="Global search" />
							search
							<span aria-hidden="true">·</span>
							<Shortcut keys={['G', 'D']} label="Go to deployments" />
							deploy
						</span>
						<Badge variant="accent" size="sm">
							<IconWorld size={10} aria-hidden="true" />
							All systems go
						</Badge>
					</div>
				</footer>
			</main>
		</div>
	</div>

	<Toast />

	<AlertDialog />

	<Dialog open={deployOpen} title="New deployment" size="md" onclose={() => (deployOpen = false)}>
		{#snippet icon()}
			<IconRocket size={20} aria-hidden="true" />
		{/snippet}
		<div class="sh-form">
			<Field label="Branch" htmlFor="deploy-branch">
				<NativeSelect
					id="deploy-branch"
					value={deployBranch}
					options={['main', 'develop', 'release/2.14']}
				/>
			</Field>
			<Field label="Commit message" htmlFor="deploy-commit">
				<Input id="deploy-commit" bind:value={commit} />
			</Field>
			<Checkbox label="Enable auto-rollback on failure" bind:checked={rollback} />
			<Switch label="Notify team when the deploy finishes" bind:checked={notify} />
		</div>
		{#snippet footer()}
			<Button variant="outline" onclick={() => (deployOpen = false)}>Cancel</Button>
			<Button
				variant="primary"
				onclick={() => {
					deployOpen = false;
					showToast('Deployment #129 queued.', 'success');
				}}
			>
				<IconRocket size={14} aria-hidden="true" />
				Deploy
			</Button>
		{/snippet}
	</Dialog>

	<Sheet
		bind:open={sheetOpen}
		side="right"
		size="sm"
		title="Quick settings"
		onclose={() => (sheetOpen = false)}
	>
		{#snippet icon()}
			<IconSettings size={20} aria-hidden="true" />
		{/snippet}
		<div class="sh-form">
			<Switch label="Maintenance mode" bind:checked={maintenance} />
			<Switch label="Pause automatic deploys" bind:checked={autoDeploy} />
			<Slider
				label="Canary rollout"
				min={0}
				max={100}
				value={canary}
				onchange={(e) => (canary = e.detail.value as number)}
				showValue
			/>
			<ButtonGroup
				label="Environment"
				mode="single"
				items={['production', 'staging', 'preview']}
				value={env}
				onchange={(e) => (env = e.detail.value as string)}
			/>
			<p class="sh-controls-hint">Changes are applied immediately and synced across the team.</p>
		</div>
		{#snippet footer()}
			<div class="sh-done">
				<Button variant="primary" onclick={() => (sheetOpen = false)}>Done</Button>
			</div>
		{/snippet}
	</Sheet>
{/snippet}

{#snippet loadingPage()}
	<div class="sh-root">
		<aside class="sh-sidebar">
			<div class="sh-brand">
				<span class="sh-brand-mark" aria-hidden="true"></span>
				<span class="sh-brand-name">atlas</span>
			</div>
			<nav class="sh-nav" aria-label="Workspace">
				{#each [1, 2, 3, 4] as i (i)}
					<div class="sh-nav-skeleton"><Skeleton shape="line" width="80%" /></div>
				{/each}
			</nav>
			<div class="sh-sidebar-spacer"></div>
			<div class="sh-account-loading">
				<Skeleton shape="circle" />
				<Skeleton shape="line" width="70%" />
			</div>
		</aside>
		<div class="sh-main">
			<header class="sh-topbar">
				<Skeleton shape="line" width="220px" />
				<div class="sh-topbar-actions">
					<Skeleton shape="rect" width="200px" height="34px" />
					<Skeleton shape="rect" width="120px" height="34px" />
					<Skeleton shape="circle" />
					<Skeleton shape="circle" />
				</div>
			</header>
			<main class="sh-content">
				<div class="sh-page-head">
					<div class="sh-skel-lines" style="width: 60%">
						<Skeleton shape="line" width="70%" height={24} />
						<Skeleton shape="line" width="45%" />
					</div>
				</div>
				<section class="sh-stats" aria-label="Loading metrics">
					{#each [1, 2, 3, 4] as i (i)}
						<Card padding="md">
							<div class="sh-stat">
								<Skeleton shape="line" width="45%" />
								<Skeleton shape="line" width="80%" height={30} />
							</div>
						</Card>
					{/each}
				</section>
				<Card>
					{#each [1, 2, 3] as i (i)}
						<div class="sh-skel-row">
							<Skeleton shape="circle" />
							<div class="sh-skel-lines">
								<Skeleton shape="line" width="60%" />
								<Skeleton shape="line" width="35%" />
							</div>
						</div>
					{/each}
				</Card>
			</main>
		</div>
	</div>
{/snippet}

<Story
	name="Dashboard"
	template={dashboard}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Deploy' }));
		const dialog = await canvas.findByRole('dialog');
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(within(dialog).getByRole('heading', { name: 'New deployment' })).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
	}}
/>

<Story name="Loading" template={loadingPage} />

<style>
	.sh-root {
		display: flex;
		min-height: 100vh;
		background: var(--iv_surface);
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		font-size: var(--iv_text-body);
		line-height: var(--iv_leading-base);
	}

	.sh-root,
	.sh-root * {
		box-sizing: border-box;
	}

	.sh-sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		width: 232px;
		flex-shrink: 0;
		position: sticky;
		top: 0;
		height: 100vh;
		padding: var(--iv_spacing-lg) var(--iv_spacing-sm);
		border-right: 1px solid var(--iv_border);
	}

	.sh-brand {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_spacing-xs) var(--iv_spacing-md) var(--iv_spacing-sm);
	}

	.sh-brand-mark {
		width: 10px;
		height: 10px;
		border-radius: var(--iv_radius-sm);
		background: var(--iv_accent);
	}

	.sh-brand-name {
		font-size: var(--iv_text-base);
		font-weight: var(--iv_weight-bold);
		letter-spacing: var(--iv_tracking-wider);
	}

	.sh-nav {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-2xs);
	}

	.sh-nav-item {
		width: 100%;

		:global(.iv-btn) {
			width: 100%;
			justify-content: flex-start;
			gap: var(--iv_spacing-sm);
		}
	}

	.sh-nav-item.sh-active {
		position: relative;
	}

	.sh-nav-item.sh-active::before {
		content: '';
		position: absolute;
		left: calc(-1 * var(--iv_spacing-sm));
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 16px;
		border-radius: var(--iv_radius-pill);
		background: var(--iv_accent);
	}

	.sh-nav-badge {
		margin-left: auto;
	}

	.sh-pop-menu {
		min-width: 15rem;
		padding: var(--iv_spacing-xs);
	}

	.sh-sidebar-spacer {
		flex: 1;
	}

	.sh-usage {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
	}

	.sh-usage-hint {
		margin: 0;
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.sh-usage-loading {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-md);
	}

	.sh-account,
	.sh-avatar-btn {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		width: 100%;
		padding: var(--iv_spacing-sm);
		border: 1px solid transparent;
		border-radius: var(--iv_radius);
		background: transparent;
		color: var(--iv_foreground);
		font-family: var(--iv_font-sans);
		cursor: pointer;
		transition:
			background-color var(--iv_transition-base),
			border-color var(--iv_transition-base);

		&:hover {
			background: var(--iv_surface-raised);
			border-color: var(--iv_border);
		}

		&:focus-visible {
			outline: var(--iv_outline-width) solid var(--iv_foreground);
			outline-offset: var(--iv_outline-offset);
		}
	}

	.sh-avatar-btn {
		width: auto;
		padding: var(--iv_spacing-2xs);
		border-radius: var(--iv_radius-pill);
	}

	.sh-account-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 1;
		min-width: 0;
	}

	.sh-account-name {
		font-size: var(--iv_text-body-sm);
		font-weight: var(--iv_weight-semibold);
	}

	.sh-account-role {
		font-size: var(--iv_text-xs);
		color: var(--iv_foreground-dim);
	}

	.sh-account-caret {
		color: var(--iv_foreground-dim);
	}

	.sh-account-loading {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		padding: var(--iv_spacing-sm);
	}

	.sh-nav-skeleton {
		padding: var(--iv_spacing-sm) var(--iv_spacing-md);
	}

	.sh-main {
		flex: 1;
		min-width: 0;
	}

	.sh-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-lg);
		flex-wrap: wrap;
		padding: var(--iv_spacing-md) var(--iv_spacing-xl);
		border-bottom: 1px solid var(--iv_border);
	}

	.sh-topbar-actions {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		flex-wrap: wrap;
	}

	.sh-search {
		width: 220px;
	}

	.sh-filter-input {
		width: 240px;
	}

	.sh-bell-wrap {
		position: relative;
		display: inline-flex;
	}

	.sh-bell-dot {
		position: absolute;
		top: -4px;
		right: -6px;
	}

	.sh-bell-dot :global(.iv-badge) {
		height: 16px;
		min-width: 16px;
		padding: 0 4px;
		font-size: var(--iv_text-xs);
	}

	.sh-done {
		width: 100%;

		:global(.iv-btn) {
			width: 100%;
		}
	}

	.sh-content {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-2xl);
		max-width: 1120px;
		margin: 0 auto;
		padding: var(--iv_spacing-xl);
	}

	.sh-page-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--iv_spacing-lg);
		flex-wrap: wrap;
	}

	.sh-page-head-title-row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		flex-wrap: wrap;
	}

	.sh-page-title {
		margin: 0;
		font-size: var(--iv_text-h2);
		font-weight: var(--iv_weight-bold);
		letter-spacing: var(--iv_tracking-tight);
		line-height: var(--iv_leading-heading);
	}

	.sh-page-desc {
		margin: var(--iv_spacing-xs) 0 0;
		color: var(--iv_foreground-dim);
	}

	.sh-page-head-actions {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.sh-stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--iv_spacing-md);
	}

	.sh-stat {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
		min-height: 88px;
	}

	.sh-stat-head {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.sh-stat-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: var(--iv_radius-sm);
		background: var(--iv_surface-elevated);
		color: var(--iv_foreground-dim);
	}

	.sh-stat-label {
		font-size: var(--iv_text-body-sm);
		color: var(--iv_foreground-dim);
	}

	.sh-stat-value {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-h2);
		font-weight: var(--iv_weight-semibold);
		line-height: var(--iv_leading-tight);
	}

	.sh-stat-meta {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
	}

	.sh-stat-sub {
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.sh-cols {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: var(--iv_spacing-lg);
		align-items: start;
	}

	.sh-col-main,
	.sh-col-side {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
		min-width: 0;
	}

	.sh-list {
		display: flex;
		flex-direction: column;
	}

	.sh-row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-md) var(--iv_card-pad-x);
		min-width: 0;

		& + .sh-row {
			border-top: 1px solid var(--iv_border);
		}
	}

	.sh-row-avatars {
		display: flex;
		align-items: center;
	}

	.sh-row-avatars :global(.iv-avatar) {
		margin-left: calc(-1 * var(--iv_spacing-sm));
	}

	.sh-row-avatars :global(.iv-avatar:first-child) {
		margin-left: 0;
	}

	.sh-row-main {
		flex: 1;
		min-width: 0;
	}

	.sh-row-title {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		flex-wrap: wrap;
		font-weight: var(--iv_weight-medium);
	}

	.sh-row-meta {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-xs);
		margin-top: var(--iv_spacing-2xs);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.sh-row-end {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-sm);
		flex-shrink: 0;
	}

	.sh-mono {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
	}

	.sh-card-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-sm) var(--iv_card-pad-x) 0;
	}

	.sh-controls {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
	}

	.sh-controls-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-sm);
	}

	.sh-controls-hint {
		margin: 0;
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		line-height: var(--iv_leading-base);
	}

	.sh-health {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
	}

	.sh-prose {
		margin: 0;
		line-height: var(--iv_leading-prose);
	}

	.sh-code {
		margin: 0;
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
		white-space: pre-wrap;
		word-break: break-word;
	}

	.sh-skel-row {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
		padding: var(--iv_spacing-md) var(--iv_card-pad-x);

		& + .sh-skel-row {
			border-top: 1px solid var(--iv_border);
		}
	}

	.sh-skel-lines {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-sm);
		width: 100%;
	}

	.sh-deploy-filters {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-md);
		flex-wrap: wrap;
		padding: var(--iv_card-pad-y) var(--iv_card-pad-x);
		border-bottom: 1px solid var(--iv_border);
	}

	.sh-deploy-row {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto auto auto auto;
		gap: var(--iv_spacing-md);
	}

	.sh-sha {
		color: var(--iv_foreground-dim);
	}

	.sh-time {
		color: var(--iv_foreground-dim);
		white-space: nowrap;
	}

	.sh-act-name {
		font-weight: var(--iv_weight-semibold);
	}

	.sh-act-text {
		color: var(--iv_foreground-dim);
	}

	.sh-form {
		display: flex;
		flex-direction: column;
		gap: var(--iv_spacing-lg);
	}

	.sh-form-cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--iv_spacing-lg);
	}

	.sh-form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--iv_spacing-md) var(--iv_spacing-lg);
		align-items: start;
	}

	.sh-form-foot {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--iv_spacing-sm);
		padding-top: var(--iv_spacing-md);
		border-top: 1px solid var(--iv_border);
	}

	.sh-addon {
		font-family: var(--iv_font-mono);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	.sh-footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--iv_spacing-md);
		flex-wrap: wrap;
		padding-bottom: var(--iv_spacing-xl);
	}

	.sh-footer-meta {
		display: flex;
		align-items: center;
		gap: var(--iv_spacing-xs);
		font-size: var(--iv_text-sm);
		color: var(--iv_foreground-dim);
	}

	@media (max-width: 980px) {
		.sh-stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.sh-cols {
			grid-template-columns: 1fr;
		}

		.sh-sidebar {
			width: 64px;
			padding-inline: var(--iv_spacing-xs);
		}

		.sh-brand {
			padding-inline: var(--iv_spacing-sm);
		}

		.sh-brand-name,
		.sh-brand-badge,
		.sh-nav-label,
		.sh-nav-badge,
		.sh-account-text,
		.sh-account-caret,
		.sh-usage {
			display: none;
		}

		.sh-nav-item :global(.iv-btn) {
			justify-content: center;
		}

		.sh-nav-item.sh-active::before {
			left: -8px;
		}

		.sh-account {
			justify-content: center;
		}
	}

	@media (max-width: 720px) {
		.sh-form-cols,
		.sh-form-grid {
			grid-template-columns: 1fr;
		}

		.sh-deploy-row {
			grid-template-columns: auto minmax(0, 1fr) auto auto;
		}

		.sh-deploy-row .sh-sha,
		.sh-deploy-row .sh-time {
			display: none;
		}
	}
</style>
