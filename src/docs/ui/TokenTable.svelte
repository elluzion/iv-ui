<script lang="ts">
	import { tokenSlug, tokens } from '../lib/data';

	let query = $state('');

	const filtered = $derived(
		query.trim()
			? tokens.filter((token) =>
					[token.name, token.group, token.dark, token.light]
						.join(' ')
						.toLowerCase()
						.includes(query.trim().toLowerCase())
				)
			: tokens
	);

	const groups = $derived([...new Set(filtered.map((token) => token.group))]);

	const isColor = (value: string) => /^#|^rgba?\(|^hsl/.test(value);
</script>

<div class="iv-docs-token-browser">
	<div class="iv-docs-token-toolbar">
		<input
			type="search"
			bind:value={query}
			placeholder="Filter tokens…"
			aria-label="Filter tokens by name, group, or value"
		/>
		<span>{filtered.length} / {tokens.length}</span>
	</div>

	{#each groups as group (group)}
		<section class="iv-docs-token-group" aria-label={`${group} tokens`}>
			<h3>{group}</h3>
			<div class="iv-docs-table-wrap">
				<table class="iv-docs-token-table">
					<thead>
						<tr>
							<th scope="col"><span class="iv-sr-only">Swatch</span></th>
							<th scope="col">Token</th>
							<th scope="col">Dark</th>
							<th scope="col">Light</th>
						</tr>
					</thead>
					<tbody>
						{#each filtered.filter((token) => token.group === group) as token (token.name)}
							<tr id={`token-${tokenSlug(token.name)}`}>
								<td class="iv-docs-token-sample">
									{#if isColor(token.dark)}
										<i style:background={token.dark} aria-hidden="true"></i>
									{/if}
								</td>
								<td class="iv-docs-token-name">{token.name}</td>
								<td class="iv-docs-token-value">
									{#if isColor(token.light)}
										<i
											class="iv-docs-token-inline"
											style:background={token.light}
											aria-hidden="true"
										></i>
									{/if}
									{token.dark}
								</td>
								<td class="iv-docs-token-value">
									{#if isColor(token.light)}
										<i
											class="iv-docs-token-inline"
											style:background={token.light}
											aria-hidden="true"
										></i>
									{/if}
									{token.light}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{:else}
		<p class="iv-docs-empty">No tokens match “{query}”.</p>
	{/each}
</div>
