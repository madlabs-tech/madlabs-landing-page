<!-- Lab: blocks stream in and their events are decoded; filter by type, pause and resume. -->
<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Tag } from '@hryer/madlabs-design-system/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { INDEXER_DEMO as D } from '#lib/constants/lab.ts';
	import { ms } from '#lib/hooks/motion.ts';
	import { useTicker } from '#lib/hooks/ticker.svelte.ts';
	import DemoHeader from './DemoHeader.svelte';

	type Kind = 'transfer' | 'swap' | 'mint';

	// Continuous motion: start paused for people who asked for less of it.
	let paused = $state(prefersReducedMotion.current);
	let filter = $state<'all' | Kind>('all');

	const tick = useTicker(1300, () => !paused);
	const head = $derived(D.startBlock + tick.count);
	const blocks = $derived(Array.from({ length: 4 }, (_, i) => makeBlock(head - i)));
	const visible = $derived(
		blocks.map((b) => ({ ...b, events: b.events.filter((e) => filter === 'all' || e.kind === filter) }))
	);
	const stats = $derived([
		{ label: D.stats.blocks, value: (12_480 + tick.count).toLocaleString('en-US') },
		{ label: D.stats.events, value: (48_210 + tick.count * 3 + blocks[0].events.length).toLocaleString('en-US') },
		{ label: D.stats.lag, value: `${(0.3 + rand(head)() * 0.3).toFixed(1)}s` }
	]);

	// Deterministic fake chain data: the same block number always decodes to the same events.
	function rand(seed: number) {
		let s = seed >>> 0;
		return () => {
			s = (s + 0x6d2b79f5) >>> 0;
			let t = Math.imul(s ^ (s >>> 15), 1 | s);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}
	function makeBlock(n: number) {
		const r = rand(n);
		const hex = () => Math.floor(r() * 0xffff).toString(16).padStart(4, '0');
		const kinds: Kind[] = ['transfer', 'transfer', 'swap', 'mint'];
		const events = Array.from({ length: 2 + Math.floor(r() * 3) }, (_, i) => {
			const kind = kinds[Math.floor(r() * kinds.length)];
			const eth = 0.2 + r() * 5;
			const text =
				kind === 'transfer'
					? D.event.transfer(Math.round(50 + r() * 4950).toLocaleString('en-US'), `0x${hex()}…${hex()}`)
					: kind === 'swap'
						? D.event.swap(eth.toFixed(2), Math.round(eth * 3300).toLocaleString('en-US'))
						: D.event.mint(Math.floor(r() * 900) + 100);
			return { id: `${n}-${i}`, kind, text };
		});
		return { n, events };
	}
</script>

<DemoHeader title={D.title}>
	<Button size="sm" variant="secondary" iconLeft={paused ? Play : Pause} onclick={() => (paused = !paused)}>
		{paused ? D.resume : D.pause}
	</Button>
</DemoHeader>

<div class="body">
	<dl class="stats">
		{#each stats as stat (stat.label)}
			<div>
				<dt>{stat.label}</dt>
				<dd class="ml-mono">{stat.value}</dd>
			</div>
		{/each}
	</dl>

	<div class="filters" role="group" aria-label={D.filterLabel}>
		{#each D.filters as f (f.id)}
			<Tag size="sm" selected={filter === f.id} onclick={() => (filter = f.id as typeof filter)}>{f.label}</Tag>
		{/each}
	</div>

	<ol class="blocks">
		{#each visible as block (block.n)}
			<li class="block" animate:flip={{ duration: ms(400) }} in:fly={{ y: -16, duration: ms(400) }}>
				<span class="ml-mono number">{D.block(block.n)}</span>
				<ul class="events">
					{#each block.events as event (event.id)}
						<li class="ml-mono event event--{event.kind}">{event.text}</li>
					{:else}
						<li class="ml-mono event empty">{D.empty}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ol>
</div>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		min-height: 380px;
		padding: 18px 20px 20px;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-2);
		margin: 0;
	}
	.stats div {
		padding: 10px 12px;
		border-radius: var(--radius-md);
		background: var(--slate-800);
	}
	dt {
		font-size: var(--size-micro);
		color: var(--slate-400);
	}
	dd {
		margin: 2px 0 0;
		font-size: var(--size-body);
		font-weight: var(--weight-bold);
		color: #fff;
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.blocks {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
		/* Fixed window: older blocks slide out of view at the bottom. */
		height: 236px;
		overflow: hidden;
		mask-image: linear-gradient(to bottom, #000 75%, transparent);
	}
	.block {
		display: grid;
		grid-template-columns: 96px 1fr;
		gap: var(--space-3);
		padding: 10px 12px;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--glass-border-dark);
	}
	.number {
		font-size: 12px;
		color: var(--frost-300);
	}
	.events {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin: 0;
		padding: 0;
		list-style: none;
		min-width: 0;
	}
	.event {
		font-size: 12px;
		color: var(--slate-200);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.event--swap {
		color: var(--ice-300);
	}
	.event--mint {
		color: var(--mint-300);
	}
	.empty {
		color: var(--slate-400);
	}
	@media (max-width: 640px) {
		.block {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
