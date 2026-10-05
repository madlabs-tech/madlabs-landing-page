<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import Tabs from '#lib/components/ui/Tabs.svelte';
	import { LAB_SECTION, LAB_TABS, type LabTab } from '#lib/constants/lab.ts';
	import { ms } from '#lib/hooks/motion.ts';
	import AgentDemo from './lab/AgentDemo.svelte';
	import IndexerDemo from './lab/IndexerDemo.svelte';
	import ZkDemo from './lab/ZkDemo.svelte';

	let tab = $state<LabTab>('agent');
	const current = $derived(LAB_TABS.find((t) => t.id === tab)!);
	const DEMOS = { agent: AgentDemo, zk: ZkDemo, indexer: IndexerDemo };
</script>

<section id="lab" class="band" aria-labelledby="lab-title">
	<div class="section container split">
		<div>
			<SectionHeader id="lab-title" {...LAB_SECTION} />
			<div class="tabs">
				<Tabs items={LAB_TABS} bind:value={tab} idPrefix="lab" label={LAB_SECTION.title} />
			</div>
			{#key tab}
				<p class="blurb" in:fade={{ duration: ms(240) }}>{current.blurb}</p>
			{/key}
		</div>

		<div class="panel ml-on-dark reveal">
			{#each LAB_TABS as t (t.id)}
				{@const Demo = DEMOS[t.id]}
				<div role="tabpanel" id="lab-panel-{t.id}" aria-labelledby="lab-tab-{t.id}" hidden={tab !== t.id}>
					{#if tab === t.id}
						<div in:fly={{ y: 14, duration: ms(320) }}><Demo /></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.band {
		background: var(--slate-50);
	}
	.split {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
		gap: var(--space-12);
		align-items: center;
	}
	.tabs {
		margin-top: var(--space-8);
		max-width: 100%;
		overflow-x: auto;
	}
	.blurb {
		margin: var(--space-5) 0 0;
		max-width: 480px;
		color: var(--fg-2);
		font-size: 15px;
	}
	.panel {
		border-radius: var(--radius-xl);
		background: var(--slate-900);
		border: var(--border-thick) solid var(--ink);
		box-shadow: var(--shadow-pop-lg);
		overflow: hidden;
		min-width: 0;
	}
	/* The design system only defines info/success/primary badges on dark; add the two the demos need. */
	.panel :global(.ml-badge--warning) {
		background: color-mix(in srgb, var(--amber-400) 16%, transparent);
		color: var(--amber-400);
	}
	.panel :global(.ml-badge--danger) {
		background: color-mix(in srgb, var(--red-400) 16%, transparent);
		color: var(--red-400);
	}
</style>
