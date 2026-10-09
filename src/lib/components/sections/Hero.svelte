<script lang="ts">
	import { ArrowRight, Blocks, Bot, CircleCheck } from '@lucide/svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Badge } from '@hryer/madlabs-design-system/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import FlaskModel from '#lib/components/ui/FlaskModel.svelte';
	import { HERO } from '#lib/constants/hero.ts';
	import { BOOK_CALL_HREF } from '#lib/constants/site.ts';
	import { openContact } from '#lib/hooks/contact.svelte.ts';
	import { parallax } from '#lib/hooks/parallax.ts';
	import { useTicker } from '#lib/hooks/ticker.svelte.ts';

	const { agent, shielded, block } = HERO.specimens;

	// Headline words pop in one after another; spaces stay real text so the <h1> reads normally.
	const words = HERO.title.flatMap((part) =>
		part.text
			.split(/(\s+)/)
			.filter(Boolean)
			.map((text) => ({ text, tone: part.tone }))
	);

	// One clock drives all three specimens. Frozen (on a good-looking frame) under reduced motion.
	const tick = useTicker(1100, () => !prefersReducedMotion.current);
	const t = $derived(tick.count + 5);

	const agentPhase = $derived(t % (agent.tools.length + 2)); // 9 steps, then 2 ticks "finished"
	const agentDone = $derived(agentPhase >= agent.tools.length);
	const agentStep = $derived(Math.min(agentPhase, agent.tools.length - 1));

	const proving = $derived(t % 6 < 2);

	const cellsOn = $derived(t % (block.cells + 1));
	const blockNumber = $derived(block.start + Math.floor(t / (block.cells + 1)));
</script>

<section class="hero ml-bg-dots-dark ml-on-dark" {@attach parallax}>
	<div class="blob blob--ice"></div>
	<div class="blob blob--mint"></div>

	<div class="inner">
		<div class="copy">
			<h1 class="ml-display-1 title">
				{#each words as word, i (i)}
					{#if word.text.trim()}<span class={['word', word.tone]} style:--i={i}>{word.text}</span>{:else}{' '}{/if}
				{/each}
			</h1>
			<p class="ml-body-lg body">{HERO.body}</p>
			<div class="actions">
				<Button href={BOOK_CALL_HREF} onclick={openContact} size="lg" variant="ice" iconRight={ArrowRight}>{HERO.primaryCta}</Button>
				<Button href={HERO.secondaryCta.href} size="lg" variant="secondary">{HERO.secondaryCta.label}</Button>
			</div>
		</div>

		<div class="stage">
			<div class="flask-layer"><FlaskModel {...HERO.flask} /></div>

			<!-- Floating "lab specimens": live decoration, hidden from assistive tech and on phones. -->
			<div class="specimen ml-glass-dark specimen--agent" aria-hidden="true">
				<div class="row">
					<span class={['chip', agentDone && 'chip--done']}>
						{#if agentDone}<CircleCheck size={18} />{:else}<Bot size={18} />{/if}
					</span>
					<div>
						<div class="name">{agent.name}</div>
						<div class="ml-mono meta">
							{agentDone ? agent.done : agent.step(agentStep + 1, agent.tools.length, agent.tools[agentStep])}
						</div>
					</div>
				</div>
				<div class="track">
					<div class={['fill', agentDone && 'fill--done']} style:width="{agentDone ? 100 : ((agentStep + 1) / agent.tools.length) * 100}%"></div>
				</div>
			</div>

			<div class="specimen ml-glass-dark specimen--shielded" aria-hidden="true">
				<div class="row between">
					<span class="ml-eyebrow">{shielded.label}</span>
					<Badge tone="success" dot live={proving}>{shielded.tag}</Badge>
				</div>
				<div class={['ml-mono amount', proving && 'amount--proving']}>{shielded.amount}</div>
				<div class="ml-mono meta">{proving ? shielded.proving : shielded.meta}</div>
			</div>

			<div class="specimen ml-glass-dark specimen--block" aria-hidden="true">
				<div class="row">
					<Blocks size={18} color="var(--frost-300)" />
					{#key blockNumber}<span class="name block-title">{block.title(blockNumber)}</span>{/key}
				</div>
				<div class={['cells', cellsOn === block.cells && 'cells--sealed']}>
					{#each { length: block.cells }, i (i)}
						<span class={['cell', i < cellsOn && 'cell--on']}></span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		/* Slide under the sticky nav so the glass bar floats over the dark band. */
		margin-top: -88px;
		padding: 150px var(--gutter) var(--space-24);
		background-color: var(--slate-900);
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(140px);
		pointer-events: none;
		transition: translate 1.4s var(--ease-out);
	}
	.blob--ice {
		width: 520px;
		height: 520px;
		right: -80px;
		top: -60px;
		background: var(--ice-500);
		opacity: 0.35;
		translate: calc(var(--px, 0) * -40px) calc(var(--py, 0) * -30px);
	}
	.blob--mint {
		width: 420px;
		height: 420px;
		right: 280px;
		bottom: -200px;
		background: var(--mint-500);
		opacity: 0.22;
		translate: calc(var(--px, 0) * 30px) calc(var(--py, 0) * 24px);
	}
	.inner {
		position: relative;
		max-width: var(--container-lg);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--space-10);
		align-items: center;
	}
	.copy {
		animation: ml-fade-up 0.7s var(--ease-out) both;
	}
	.title {
		margin: 0 0 var(--space-6);
		font-size: clamp(40px, 6.2vw, 80px);
		color: #fff;
		text-wrap: balance;
	}
	/* Headline words pop in one by one. */
	.word {
		display: inline-block;
		animation: word-in 0.75s var(--ease-spring) both;
		animation-delay: calc(150ms + var(--i) * 45ms);
	}
	@keyframes word-in {
		from {
			opacity: 0;
			translate: 0 0.45em;
			rotate: -4deg;
			scale: 0.9;
		}
	}
	.ice {
		color: var(--ice-300);
	}
	.mint {
		color: var(--mint-300);
	}
	.body {
		max-width: 540px;
		margin: 0;
		color: var(--slate-300);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: var(--space-8);
	}

	.stage {
		position: relative;
		height: 560px;
		width: 100%;
		max-width: 560px;
		justify-self: center;
	}
	/* Parallax: the flask drifts against the pointer, the cards with it, at different depths. */
	.flask-layer {
		position: absolute;
		inset: 0;
		translate: calc(var(--px, 0) * -12px) calc(var(--py, 0) * -10px);
		transition: translate 0.9s var(--ease-out);
	}
	.specimen {
		position: absolute;
		padding: var(--space-4);
		border-radius: 22px;
		color: #fff;
		box-shadow: var(--shadow-xl);
		animation: ml-float 5s var(--ease-in-out) infinite;
		pointer-events: none;
		translate: calc(var(--px, 0) * var(--depth)) calc(var(--py, 0) * var(--depth) * 0.75);
		transition: translate 0.6s var(--ease-out);
	}
	/*
	 * Cards hug the stage edges so the 3D flask (centre) and its tokens (top-centre) stay clear.
	 * They ignore the pointer, so clicks and drags reach the canvas even where they overlap.
	 */
	.specimen--agent {
		left: -28px;
		top: 30%;
		width: 210px;
		--depth: 22px;
	}
	.specimen--shielded {
		right: -28px;
		top: 50%;
		width: 190px;
		animation-delay: 1.2s;
		--depth: 32px;
	}
	.specimen--block {
		left: -28px;
		bottom: 6%;
		width: 200px;
		animation-delay: 2.4s;
		--depth: 16px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.between {
		justify-content: space-between;
	}
	.chip {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 11px;
		background: var(--ice-400);
		color: var(--on-ice);
		transition: background var(--dur-base) var(--ease-out);
	}
	.chip--done {
		background: var(--mint-400);
		color: var(--on-mint);
		animation: ml-pop-in var(--dur-slow) var(--ease-spring);
	}
	.name {
		font-weight: var(--weight-semibold);
		font-size: var(--size-sm);
	}
	.meta {
		font-size: var(--size-micro);
		color: var(--slate-400);
	}
	.amount {
		margin-top: var(--space-2);
		font-size: 22px;
		font-weight: var(--weight-bold);
		transition: filter var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out);
	}
	.amount--proving {
		filter: blur(7px);
		opacity: 0.6;
	}
	.track {
		height: 6px;
		margin-top: 14px;
		border-radius: 6px;
		background: rgba(202, 214, 230, 0.12);
		overflow: hidden;
	}
	.fill {
		height: 100%;
		border-radius: 6px;
		background: var(--ice-400);
		transition: width 0.9s var(--ease-spring), background var(--dur-base);
	}
	.fill--done {
		background: var(--mint-400);
	}
	.block-title {
		animation: ml-fade-up var(--dur-slow) var(--ease-out);
	}
	.cells {
		display: flex;
		gap: 6px;
		margin-top: var(--space-3);
	}
	.cell {
		flex: 1;
		height: 22px;
		border-radius: 7px;
		background: rgba(202, 214, 230, 0.14);
	}
	.cell--on {
		background: var(--frost-400);
		animation: ml-pop-in var(--dur-slow) var(--ease-spring);
	}
	.cells--sealed .cell {
		box-shadow: 0 0 14px color-mix(in srgb, var(--frost-400) 60%, transparent);
	}

	@media (max-width: 1000px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.stage {
			height: 500px;
		}
	}
	@media (max-width: 640px) {
		.hero {
			padding: 120px var(--space-4) var(--space-16);
		}
		.stage {
			height: 340px;
			margin-bottom: 64px;
		}
		/* "PRODUCT" and "STUDIO" can't wrap; keep them inside a 320px screen. */
		.title {
			font-size: clamp(32px, 10vw, 48px);
		}
		.specimen {
			display: none;
		}
	}
</style>
