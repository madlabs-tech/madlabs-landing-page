<script lang="ts">
	import { MapPin } from '@lucide/svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { MARKET_POINTS, MARKETS, MARKETS_SECTION } from '#lib/constants/markets.ts';
</script>

<section id="southeast-asia" class="band ml-bg-dots-dark ml-on-dark" aria-labelledby="southeast-asia-title">
	<div class="section container">
		<SectionHeader id="southeast-asia-title" {...MARKETS_SECTION} />

		<ul class="markets">
			{#each MARKETS as market (market)}
				<li><MapPin size={16} aria-hidden="true" />{market}</li>
			{/each}
		</ul>

		<ul class="points">
			{#each MARKET_POINTS as point (point.title)}
				<li class="ml-card ml-card--glass ml-card--pad-lg">
					<span class="tile"><point.icon size={22} aria-hidden="true" /></span>
					<h3 class="ml-h4">{point.title}</h3>
					<p>{point.body}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.band {
		background-color: var(--slate-900);
	}
	.markets {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: var(--space-8) 0 0;
		padding: 0;
		list-style: none;
	}
	.markets li {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 36px;
		padding: 0 14px;
		border-radius: var(--radius-pill);
		border: var(--border-thin) solid var(--glass-border-dark);
		background: rgba(202, 214, 230, 0.08);
		font-size: var(--size-sm);
		font-weight: var(--weight-semibold);
		color: var(--slate-100);
	}
	.markets li :global(svg) {
		color: var(--mint-300);
	}
	.points {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: var(--space-6);
		margin: var(--space-10) 0 0;
		padding: 0;
		list-style: none;
	}
	.tile {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 16px;
		background: var(--mint-400);
		color: var(--on-mint);
	}
	h3 {
		margin: var(--space-5) 0 var(--space-2);
	}
	p {
		margin: 0;
		color: var(--fg-2);
		font-size: 15px;
	}
</style>
