<script lang="ts">
	import { ArrowRight, Blocks, Bot } from '@lucide/svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import FlaskModel from '#lib/components/ui/FlaskModel.svelte';
	import { HERO } from '#lib/constants/hero.ts';
	import { BOOK_CALL_HREF } from '#lib/constants/site.ts';

	const { agent, shielded, block } = HERO.specimens;
</script>

<section class="hero ml-bg-dots-dark ml-on-dark">
	<div class="blob blob--ice"></div>
	<div class="blob blob--mint"></div>

	<div class="inner">
		<div class="copy">
			<Badge tone="info" live>{HERO.badge}</Badge>
			<p class="ml-eyebrow eyebrow">{HERO.eyebrow}</p>
			<h1 class="ml-display-1 title">
				{#each HERO.title as part, i (i)}
					{#if part.tone}<span class={part.tone}>{part.text}</span>{:else}{part.text}{/if}
				{/each}
			</h1>
			<p class="ml-body-lg body">{HERO.body}</p>
			<div class="actions">
				<Button href={BOOK_CALL_HREF} size="lg" variant="ice" iconRight={ArrowRight}>{HERO.primaryCta}</Button>
				<Button href={HERO.secondaryCta.href} size="lg" variant="secondary">{HERO.secondaryCta.label}</Button>
			</div>
		</div>

		<div class="stage">
			<FlaskModel {...HERO.flask} />

			<!-- Floating "lab specimens": decoration, hidden from assistive tech and on phones. -->
			<div class="specimen ml-glass-dark specimen--agent" aria-hidden="true">
				<div class="row">
					<span class="chip"><Bot size={18} /></span>
					<div>
						<div class="name">{agent.name}</div>
						<div class="ml-mono meta">{agent.meta}</div>
					</div>
				</div>
				<div class="track"><div class="fill" style:width="{agent.progress}%"></div></div>
			</div>

			<div class="specimen ml-glass-dark specimen--shielded" aria-hidden="true">
				<div class="row between">
					<span class="ml-eyebrow">{shielded.label}</span>
					<Badge tone="success" dot>{shielded.tag}</Badge>
				</div>
				<div class="ml-mono amount">{shielded.amount}</div>
				<div class="ml-mono meta">{shielded.meta}</div>
			</div>

			<div class="specimen ml-glass-dark specimen--block" aria-hidden="true">
				<div class="row"><Blocks size={18} color="var(--frost-300)" /><span class="name">{block.title}</span></div>
				<div class="cells">
					{#each { length: block.total }, i (i)}
						<span class={['cell', i < block.filled && 'cell--on']}></span>
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
	}
	.blob--ice {
		width: 520px;
		height: 520px;
		right: -80px;
		top: -60px;
		background: var(--ice-500);
		opacity: 0.35;
	}
	.blob--mint {
		width: 420px;
		height: 420px;
		right: 280px;
		bottom: -200px;
		background: var(--mint-500);
		opacity: 0.22;
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
	.eyebrow {
		margin: var(--space-6) 0 0;
		color: var(--ice-300);
	}
	.title {
		margin: var(--space-4) 0 var(--space-6);
		font-size: clamp(40px, 6.2vw, 80px);
		color: #fff;
		text-wrap: balance;
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
		height: 480px;
		width: 100%;
		max-width: 560px;
		justify-self: center;
	}
	.specimen {
		position: absolute;
		padding: var(--space-4);
		border-radius: 22px;
		color: #fff;
		box-shadow: var(--shadow-xl);
		animation: ml-float 5s var(--ease-in-out) infinite;
		pointer-events: none;
	}
	/* Placed in the empty space around the flask: its chain and coins sit top-centre, its base bottom-centre. */
	.specimen--agent {
		left: 0;
		top: 34%;
		width: 240px;
	}
	.specimen--shielded {
		right: 0;
		bottom: 22%;
		width: 220px;
		animation-delay: 1.2s;
	}
	.specimen--block {
		left: 0;
		bottom: 2%;
		width: 200px;
		animation-delay: 2.4s;
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
		font-size: 26px;
		font-weight: var(--weight-bold);
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
	}

	@media (max-width: 1000px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.stage {
			height: 420px;
		}
	}
	@media (max-width: 640px) {
		.hero {
			padding: 120px var(--space-4) var(--space-16);
		}
		.stage {
			height: 320px;
		}
		/* "CONSULTANTS" can't wrap; keep it inside a 320px screen. */
		.title {
			font-size: clamp(32px, 10vw, 48px);
		}
		.specimen {
			display: none;
		}
	}
</style>
