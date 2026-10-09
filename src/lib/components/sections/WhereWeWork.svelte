<script lang="ts">
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { WHERE_POINTS, WHERE_SECTION } from '#lib/constants/whereWeWork.ts';
</script>

<section id="where-we-work" class="band ml-bg-dots-dark ml-on-dark" aria-labelledby="where-we-work-title">
	<div class="section container">
		<SectionHeader id="where-we-work-title" {...WHERE_SECTION} />

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
