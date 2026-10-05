<!-- Lab: an AI support agent runs step by step, fails over once, then waits for a human. -->
<script lang="ts">
	import { Check, Play, RotateCcw, X } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { Badge, Tag } from '@hryer/madlabs-design-system/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { AGENT_DEMO as A } from '#lib/constants/lab.ts';
	import { ms } from '#lib/hooks/motion.ts';
	import { useTicker } from '#lib/hooks/ticker.svelte.ts';
	import DemoHeader from './DemoHeader.svelte';

	type Status = keyof typeof A.status;
	let status = $state<Status>('idle');

	const tick = useTicker(850, () => status === 'running');
	const shown = $derived(status === 'idle' ? 0 : Math.min(tick.count, A.events.length));

	$effect(() => {
		if (status === 'running' && tick.count >= A.events.length) status = 'waiting';
	});

	function run() {
		tick.reset();
		status = 'running';
	}

	const tone = $derived(
		({ idle: 'neutral', running: 'info', waiting: 'warning', approved: 'success', rejected: 'danger' } as const)[status]
	);
</script>

<DemoHeader title={A.title} subtitle={A.task}>
	<Badge {tone} dot live={status === 'running'}>{A.status[status]}</Badge>
	<Button
		size="sm"
		variant="ice"
		iconLeft={status === 'idle' ? Play : RotateCcw}
		disabled={status === 'running'}
		onclick={run}
	>
		{status === 'idle' ? A.run : A.runAgain}
	</Button>
</DemoHeader>

<div class="body" aria-live="polite">
	{#if status === 'idle'}
		<p class="muted">{A.idle}</p>
	{/if}

	{#each A.events.slice(0, shown) as event, i (i)}
		{#if event.pack}
			<div class="failover" in:fly={{ y: 10, duration: ms(380) }}>
				<span class="icon icon--ice"><event.icon size={14} aria-hidden="true" /></span>
				<div>
					<div class="text">{event.text}</div>
					<div class="pack">{#each event.pack as item (item)}<Tag size="sm">{item}</Tag>{/each}</div>
				</div>
			</div>
		{:else}
			<div class="event" in:fly={{ y: 10, duration: ms(280) }}>
				<span class="icon"><event.icon size={14} aria-hidden="true" /></span>
				<span class="text">{event.text}</span>
			</div>
		{/if}
	{/each}

	{#if status === 'running'}
		<div class="event muted"><span class="ml-btn__spin spin"></span>{A.working}</div>
	{/if}

	{#if status === 'waiting'}
		<div class="decide" in:fly={{ y: 10, duration: ms(280) }}>
			<Button size="sm" variant="secondary" iconLeft={X} onclick={() => (status = 'rejected')}>{A.reject}</Button>
			<Button size="sm" variant="mint" iconLeft={Check} onclick={() => (status = 'approved')}>{A.approve}</Button>
		</div>
	{:else if status === 'approved' || status === 'rejected'}
		<p class="muted" in:fly={{ y: 10, duration: ms(280) }}>{status === 'approved' ? A.approvedNote : A.rejectedNote}</p>
	{/if}
</div>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		min-height: 380px;
		padding: 18px 20px 24px;
	}
	.muted {
		margin: 0;
		color: var(--slate-300);
		font-size: var(--size-sm);
	}
	.event {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	.icon {
		flex: none;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 9px;
		background: var(--slate-800);
		color: var(--slate-100);
	}
	.icon--ice {
		background: var(--ice-400);
		color: var(--on-ice);
	}
	.text {
		font-size: var(--size-sm);
		line-height: 1.4;
		color: var(--slate-100);
	}
	.failover {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-3);
		border-radius: var(--radius-lg);
		background: color-mix(in srgb, var(--ice-500) 10%, transparent);
		border: var(--border-thin) solid color-mix(in srgb, var(--ice-500) 40%, transparent);
	}
	.failover .text {
		font-weight: var(--weight-semibold);
		color: #fff;
	}
	.pack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: var(--space-2);
	}
	.spin {
		margin: 0 7px;
		color: var(--ice-300);
	}
	.decide {
		display: flex;
		gap: 10px;
		margin-top: var(--space-1);
	}
</style>
