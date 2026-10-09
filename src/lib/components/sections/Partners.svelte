<script lang="ts">
	import { Tag } from '@hryer/madlabs-design-system/svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { PARTNER_GROUPS, PARTNERS, PARTNERS_SECTION } from '#lib/constants/partners.ts';
	import { BOOK_CALL_HREF } from '#lib/constants/site.ts';
	import { ms } from '#lib/hooks/motion.ts';
	import { openContact } from '#lib/hooks/contact.svelte.ts';

	const { filterLabel, own, ownLink, ...header } = PARTNERS_SECTION;

	let group = $state<(typeof PARTNER_GROUPS)[number]['id']>('all');
	let failed = $state<Record<string, boolean>>({});

	const visible = $derived(PARTNERS.filter((p) => group === 'all' || p.group === group));
	const count = (id: string) => PARTNERS.filter((p) => p.group === id).length;
</script>

<section id="partners" class="section container" aria-labelledby="partners-title">
	<div class="head">
		<div>
			<SectionHeader id="partners-title" {...header} />
			<p class="own">{own} <a href={BOOK_CALL_HREF} onclick={openContact}>{ownLink} →</a></p>
		</div>
		<div class="filters" role="group" aria-label={filterLabel}>
			{#each PARTNER_GROUPS as g (g.id)}
				<Tag selected={group === g.id} onclick={() => (group = g.id)}>
					{g.label}
					{#if g.id !== 'all'}<span class="count">{count(g.id)}</span>{/if}
				</Tag>
			{/each}
		</div>
	</div>

	<ul class="grid">
		{#each visible as partner, i (partner.name)}
			<li animate:flip={{ duration: ms(380) }} in:scale={{ start: 0.85, duration: ms(320) }}>
				<a class="partner reveal" style:--i={i % 5} href={partner.domain ? `https://${partner.domain}` : undefined} target="_blank" rel="noopener">
					<span class="logo">
						{#if partner.domain && !failed[partner.name]}
							<!-- ponytail: favicon service as stand-in logos (as in the website kit); swap for official files in static/ when we have them. -->
							<img
								src="https://www.google.com/s2/favicons?domain={partner.domain}&sz=128"
								alt=""
								width="28"
								height="28"
								loading="lazy"
								onerror={() => (failed[partner.name] = true)}
							/>
						{:else}
							<span class="initials" aria-hidden="true">{partner.name.slice(0, 2)}</span>
						{/if}
					</span>
					<span>
						<span class="name">{partner.name}</span>
						<span class="role">{partner.role}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-6);
	}
	.own {
		margin: var(--space-3) 0 0;
		max-width: 560px;
		color: var(--fg-2);
	}
	.own a {
		font-weight: var(--weight-bold);
		white-space: nowrap;
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
	.count {
		opacity: 0.6;
	}
	/* 44px touch targets on touch screens; the design-system tag is 32px. */
	@media (pointer: coarse) {
		.filters :global(.ml-tag) {
			height: var(--control-md);
		}
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
		gap: 14px;
		margin: var(--space-8) 0 0;
		padding: 0;
		list-style: none;
	}
	.partner {
		display: flex;
		align-items: center;
		gap: 14px;
		height: 100%;
		padding: 14px var(--space-4);
		border-radius: var(--radius-lg);
		background: var(--surface-card);
		border: var(--border-thick) solid var(--border-default);
		color: var(--fg-1);
		transition:
			transform var(--dur-base) var(--ease-spring),
			box-shadow var(--dur-base) var(--ease-spring),
			border-color var(--dur-fast);
	}
	.partner:hover,
	.partner:focus-visible {
		transform: translateY(-4px) rotate(-1deg);
		border-color: var(--ink);
		box-shadow: var(--shadow-pop);
		text-decoration: none;
	}
	.logo {
		flex: none;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-md);
		background: #fff;
		border: var(--border-thin) solid var(--border-subtle);
		overflow: hidden;
	}
	img {
		display: block;
		border-radius: var(--radius-xs);
		filter: grayscale(1);
		opacity: 0.8;
		transition:
			filter var(--dur-base),
			opacity var(--dur-base);
	}
	.partner:hover img,
	.partner:focus-visible img {
		filter: none;
		opacity: 1;
	}
	.initials {
		font-family: var(--font-brand);
		font-size: var(--size-body);
		color: var(--ink);
		text-transform: uppercase;
	}
	.name {
		display: block;
		font-weight: var(--weight-bold);
		font-size: var(--size-body);
		letter-spacing: -0.01em;
	}
	.role {
		display: block;
		font-size: 13px;
		font-weight: var(--weight-medium);
		color: var(--fg-3);
	}
</style>
