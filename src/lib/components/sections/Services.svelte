<script lang="ts">
	import { Card } from '@hryer/madlabs-design-system/svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { SERVICES, SERVICES_SECTION } from '#lib/constants/services.ts';
</script>

<section id="services" class="section container" aria-labelledby="services-title">
	<SectionHeader id="services-title" {...SERVICES_SECTION} />

	<ul class="grid">
		{#each SERVICES as service, i (service.title)}
			<li class="reveal" style:--i={i % 3}>
				<Card variant="soft" padding="lg" class="service">
					<span class="tile tile--{service.accent}"><service.icon size={24} aria-hidden="true" /></span>
					<h3 class="ml-h4">{service.title}</h3>
					<p>{service.body}</p>
				</Card>
			</li>
		{/each}
	</ul>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: var(--space-6);
		margin: var(--space-12) 0 0;
		padding: 0;
		list-style: none;
	}
	li,
	.grid :global(.service) {
		height: 100%;
	}
	.tile {
		display: grid;
		margin-bottom: var(--space-5);
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 17px;
		border: var(--border-thick) solid var(--ink);
		box-shadow: var(--shadow-pop-sm);
		color: var(--ink);
	}
	.tile--ice {
		background: var(--ice-300);
	}
	.tile--mint {
		background: var(--mint-300);
	}
	.tile--frost {
		background: var(--frost-300);
	}
	h3 {
		margin: 0 0 var(--space-2);
	}
	p {
		margin: 0;
		color: var(--fg-2);
		font-size: 15px;
	}
</style>
