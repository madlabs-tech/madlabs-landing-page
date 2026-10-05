<script lang="ts">
	import Card from '#lib/components/ui/Card.svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { ENGAGEMENTS, ENGAGEMENTS_SECTION } from '#lib/constants/services.ts';
</script>

<section id="how-we-work" class="band" aria-labelledby="how-we-work-title">
	<div class="section container split">
		<SectionHeader id="how-we-work-title" {...ENGAGEMENTS_SECTION} />
		<ul class="list">
			{#each ENGAGEMENTS as step (step.title)}
				<li>
					<Card variant="soft" padding="md" class="step">
						<span class="tile"><step.icon size={22} aria-hidden="true" /></span>
						<div>
							<h3 class="ml-h4">{step.title}</h3>
							<p>{step.body}</p>
						</div>
					</Card>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.band {
		background: var(--slate-50);
	}
	.split {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		gap: var(--space-12);
	}
	.list {
		display: grid;
		gap: 14px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.list :global(.step) {
		display: flex;
		gap: 18px;
		align-items: center;
	}
	.tile {
		flex: none;
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 16px;
		background: var(--accent-soft);
		color: var(--cobalt-600);
	}
	h3 {
		margin: 0;
	}
	p {
		margin: 2px 0 0;
		color: var(--fg-2);
		font-size: 15px;
	}
</style>
