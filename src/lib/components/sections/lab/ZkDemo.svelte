<!-- Lab: a transfer that can be shielded with a ZK proof; the explorer shows what the chain sees. -->
<script lang="ts">
	import { EyeOff, Lock, Send, TriangleAlert } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { Badge, Switch } from '@hryer/madlabs-design-system/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { ZK_DEMO as Z } from '#lib/constants/lab.ts';
	import { ms } from '#lib/hooks/motion.ts';
	import { useTicker } from '#lib/hooks/ticker.svelte.ts';
	import DemoHeader from './DemoHeader.svelte';

	let shielded = $state(true);
	let phase = $state<'ready' | 'sending' | 'confirmed'>('ready');

	// Proving takes a few ticks; a public transfer only needs one to broadcast.
	const tick = useTicker(700, () => phase === 'sending');
	const steps = $derived(shielded ? 4 : 1);
	const progress = $derived(phase === 'confirmed' ? 1 : phase === 'sending' ? Math.min(tick.count / steps, 1) : 0);

	$effect(() => {
		if (phase === 'sending' && tick.count >= steps) phase = 'confirmed';
	});

	function send() {
		tick.reset();
		phase = 'sending';
	}

	const rows = $derived([
		{ label: Z.rows.from, value: Z.tx.from, hidden: shielded },
		{ label: Z.rows.to, value: Z.tx.to, hidden: false },
		{ label: Z.rows.amount, value: Z.tx.amount, hidden: shielded }
	]);
</script>

<DemoHeader title={Z.title}>
	<Button size="sm" variant="ice" iconLeft={Send} disabled={phase === 'sending'} onclick={send}>
		{phase === 'confirmed' ? Z.sendAgain : Z.send}
	</Button>
</DemoHeader>

<div class="body">
	<div class="control">
		<Switch
			label={Z.switchLabel}
			tone="mint"
			bind:checked={() => shielded, (v) => ((shielded = v), (phase = 'ready'))}
			disabled={phase === 'sending'}
		/>
		<p class="hint">{Z.switchHint}</p>
	</div>

	<div class="progress" aria-hidden={phase !== 'sending'}>
		<div class="ml-mono progress-label">
			{phase === 'sending' ? (shielded ? Z.proving : Z.broadcasting) : ' '}
		</div>
		<div class="track"><div class={['fill', shielded && 'fill--mint']} style:width="{progress * 100}%"></div></div>
	</div>

	<div class="explorer" aria-live="polite">
		<div class="explorer-head">
			<span class="ml-eyebrow">{Z.explorer}</span>
			{#if phase === 'confirmed'}
				<Badge tone="success" dot>{Z.confirmed(Z.block)}</Badge>
			{:else}
				<Badge dot live={phase === 'sending'}>{Z.pending}</Badge>
			{/if}
		</div>
		<dl>
			{#each rows as row (row.label)}
				<dt>{row.label}</dt>
				<dd class="ml-mono">
					{#key row.hidden}
						<span class={['value', row.hidden && 'value--hidden']} in:fade={{ duration: ms(260) }}>
							{#if row.hidden}<Lock size={13} aria-hidden="true" />{Z.hidden}{:else}{row.value}{/if}
						</span>
					{/key}
				</dd>
			{/each}
			{#if shielded}
				<dt>{Z.rows.proof}</dt>
				<dd class="ml-mono proof" in:fade={{ duration: ms(260) }}>{Z.proof}</dd>
			{/if}
		</dl>
		<p class={['note', !shielded && 'note--warn']}>
			{#if shielded}<EyeOff size={14} aria-hidden="true" />{Z.privateNote}{:else}<TriangleAlert size={14} aria-hidden="true" />{Z.publicWarning}{/if}
		</p>
	</div>
</div>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		min-height: 380px;
		padding: 20px;
	}
	.control :global(.ml-switch) {
		color: #fff;
		font-weight: var(--weight-semibold);
	}
	.hint {
		margin: 6px 0 0 56px;
		font-size: 13px;
		color: var(--slate-300);
	}
	.progress-label {
		font-size: var(--size-micro);
		color: var(--slate-300);
		margin-bottom: 6px;
	}
	.track {
		height: 6px;
		border-radius: 6px;
		background: rgba(202, 214, 230, 0.12);
		overflow: hidden;
	}
	.fill {
		height: 100%;
		border-radius: 6px;
		background: var(--ice-400);
		transition: width 0.6s var(--ease-out);
	}
	.fill--mint {
		background: var(--mint-400);
	}
	.explorer {
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		background: var(--slate-800);
		border: var(--border-thin) solid var(--glass-border-dark);
	}
	.explorer-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		flex-wrap: wrap;
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px var(--space-4);
		margin: var(--space-4) 0;
	}
	dt {
		font-size: 13px;
		color: var(--slate-400);
	}
	dd {
		margin: 0;
		font-size: 13px;
		color: var(--slate-100);
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.value {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.value--hidden,
	.proof {
		color: var(--mint-300);
	}
	.note {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		font-size: 13px;
		color: var(--slate-300);
	}
	.note--warn {
		color: var(--amber-400);
	}
</style>
