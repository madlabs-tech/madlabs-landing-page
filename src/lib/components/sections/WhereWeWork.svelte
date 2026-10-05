<script lang="ts">
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { WHERE_FACTS, WHERE_POINTS, WHERE_SECTION } from '#lib/constants/whereWeWork.ts';
</script>

<section id="where-we-work" class="band ml-bg-dots-dark ml-on-dark" aria-labelledby="where-we-work-title">
	<div class="section container">
		<SectionHeader id="where-we-work-title" {...WHERE_SECTION} />

		<ul class="facts reveal">
			{#each WHERE_FACTS as fact (fact.label)}
				<li><fact.icon size={16} aria-hidden="true" />{fact.label}</li>
			{/each}
		</ul>

		<ul class="points">
			{#each WHERE_POINTS as point, i (point.title)}
				<li class="ml-card ml-card--glass ml-card--pad-lg reveal" style:--i={i}>
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
	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: var(--space-8) 0 0;
		padding: 0;
		list-style: none;
	}
	.facts li {
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
	.facts li :global(svg) {
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
