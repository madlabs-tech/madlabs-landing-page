<!--
	The Madlabs flask, built and animated in three.js by the handoff runtime in src/lib/three/
	(references/obj-animated): bubbles, vapour, orbiting tokens, cursor tilt, idle turntable,
	click the flask to fizz, click a token to spin and pop it.

	The poster <img> is in the prerendered HTML, so it paints immediately and stays for
	crawlers and no-JS visitors. three.js loads after hydration and replaces it.
	Without WebGL (old devices, graphics acceleration off) the poster becomes the interactive
	fallback: it tilts with the pointer, bubbles keep rising, and a click makes it fizz.
-->
<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import { onMount, tick } from 'svelte';
	import type { MadlabsObjectHandle } from '#lib/three/madlabs-scene.js';

	type Props = {
		poster: string;
		alt: string;
		hint: string;
		fizz: string;
		fallbackStatus: (reactions: number) => string;
		fallbackHint: string;
	};

	let { poster, alt, hint, fizz, fallbackStatus, fallbackHint }: Props = $props();

	let root: HTMLDivElement;
	let stage: HTMLDivElement;
	let handle = $state<MadlabsObjectHandle>();
	let status = $state('');

	// No-WebGL fallback state.
	let fallback = $state(false);
	let reactions = $state(0);
	let fizzing = $state(false);
	let fizzTimer: ReturnType<typeof setTimeout>;

	async function fizzIt() {
		if (handle) return handle.click('flask');
		reactions++;
		// Restart the CSS burst even if the previous one is still running: drop the class, reflow, re-add.
		fizzing = false;
		await tick();
		void root.offsetWidth;
		fizzing = true;
		clearTimeout(fizzTimer);
		fizzTimer = setTimeout(() => (fizzing = false), 1200);
	}

	onMount(() => {
		const canvas = document.createElement('canvas');
		if (!(canvas.getContext('webgl2') || canvas.getContext('webgl'))) {
			fallback = true;
			return;
		}

		let cancelled = false;
		import('#lib/three/madlabs-scene.js').then(({ mountMadlabsObject }) => {
			if (cancelled) return;
			try {
				handle = mountMadlabsObject(stage, {
					kind: 'flask',
					theme: 'dark',
					frame: 0.92, // bigger than the handoff default (1.12) while keeping the orbiting tokens in frame
					motion: !matchMedia('(prefers-reduced-motion: reduce)').matches,
					onStatus: (text) => (status = text)
				});
			} catch {
				fallback = true; // WebGL context refused at runtime
			}
		});
		return () => {
			cancelled = true;
			clearTimeout(fizzTimer);
			handle?.destroy();
		};
	});
</script>

<div bind:this={root} class={['flask', fallback && 'flask--fallback', fizzing && 'flask--fizz']}>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (the "Fizz it" button is the keyboard path) -->
	<img
		class={['poster', handle && 'poster--hidden']}
		src={poster}
		{alt}
		aria-hidden={handle ? 'true' : undefined}
		width="1096"
		height="1120"
		fetchpriority="high"
		onclick={fallback ? fizzIt : undefined}
	/>
	<div class="stage" bind:this={stage} role={handle ? 'img' : undefined} aria-label={handle ? alt : undefined}></div>

	{#if fallback}
		<div class="bubbles" aria-hidden="true">
			{#each { length: 10 }, i (i)}<span style:--i={i} style:--drift={((i * 7) % 9) - 4} style:--size="{6 + ((i * 3) % 7)}px"></span>{/each}
		</div>
	{/if}

	{#if handle || fallback}
		<div class="controls">
			<button type="button" class="fizz" onclick={fizzIt}>
				<Sparkles size={14} aria-hidden="true" />{fizz}
			</button>
			<p class="ml-mono status" aria-live="polite">{handle ? status : fallbackStatus(reactions)}</p>
			<p class="hint">{handle ? hint : fallbackHint}</p>
		</div>
	{/if}
</div>

<style>
	.flask {
		position: relative;
		width: 100%;
		height: 100%;
	}
	/* Cool glow behind the flask (the handoff keeps the glow in CSS); it breathes slowly. */
	.flask::before {
		content: '';
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		background: var(--ice-400);
		filter: blur(90px);
		opacity: 0.32;
		animation: glow 6s var(--ease-in-out) infinite;
		pointer-events: none;
	}
	@keyframes glow {
		50% {
			opacity: 0.5;
			scale: 1.08;
		}
	}
	.stage {
		position: absolute;
		inset: 0;
		animation: ml-pop-in var(--dur-lazy) var(--ease-spring) both;
	}
	.poster {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		animation: ml-float 6s var(--ease-in-out) infinite;
		transition: opacity var(--dur-slow) var(--ease-out);
	}
	.poster--hidden {
		opacity: 0;
		pointer-events: none;
	}

	/*
	 * No-WebGL fallback. Tilt follows the hero's pointer variables (--px/--py from the parallax
	 * attachment); bubbles rise from the flask mouth (~50% x, 34% y of the poster); a click squishes
	 * the flask and fires a faster, wider burst.
	 */
	.flask--fallback .poster {
		cursor: pointer;
		rotate: calc(var(--px, 0) * 6deg);
		transition: rotate 0.6s var(--ease-out);
	}
	.flask--fizz .poster {
		animation: squish 0.7s var(--ease-spring);
	}
	@keyframes squish {
		30% {
			scale: 1.08 0.9;
		}
		60% {
			scale: 0.96 1.05;
		}
	}
	.bubbles {
		position: absolute;
		left: 50%;
		top: 34%;
		pointer-events: none;
	}
	.bubbles span {
		position: absolute;
		width: var(--size);
		aspect-ratio: 1;
		border-radius: 50%;
		background: color-mix(in srgb, var(--ice-200) 70%, transparent);
		box-shadow: 0 0 8px var(--ice-300);
		opacity: 0;
		animation: rise 3.2s var(--ease-out) infinite;
		animation-delay: calc(var(--i) * 0.32s);
	}
	.flask--fizz .bubbles span {
		animation: burst 1s var(--ease-out);
		animation-delay: calc(var(--i) * 0.035s);
	}
	@keyframes rise {
		15% {
			opacity: 0.9;
		}
		to {
			opacity: 0;
			translate: calc(var(--drift) * 4px) -120px;
		}
	}
	@keyframes burst {
		10% {
			opacity: 1;
		}
		to {
			opacity: 0;
			translate: calc(var(--drift) * 14px) -190px;
			scale: 1.4;
		}
	}

	/* Bottom-right corner of the stage is clear of the flask and the floating cards. */
	.controls {
		position: absolute;
		right: 0;
		bottom: -6px;
		display: grid;
		justify-items: end;
		gap: 6px;
		text-align: right;
		animation: ml-fade-up var(--dur-slow) var(--ease-out) both;
	}
	.fizz {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: var(--control-sm);
		padding: 0 12px;
		border-radius: var(--radius-pill);
		border: var(--border-thin) solid var(--glass-border-dark);
		background: var(--glass-dark);
		backdrop-filter: blur(var(--blur-sm));
		color: var(--ice-200);
		font: inherit;
		font-size: 13px;
		font-weight: var(--weight-semibold);
		cursor: pointer;
		transition:
			transform var(--dur-fast) var(--ease-spring),
			border-color var(--dur-fast);
	}
	.fizz:hover {
		border-color: var(--ice-400);
		transform: translateY(-1px);
	}
	.fizz:active {
		transform: scale(0.95);
	}
	.status,
	.hint {
		margin: 0;
		font-size: var(--size-micro);
		color: var(--slate-400);
	}
	.status {
		color: var(--ice-300);
	}
	@media (pointer: coarse) {
		.fizz {
			min-height: var(--control-md);
		}
	}
	/* Phone: the stage is narrow, so the controls sit centred under the flask. */
	@media (max-width: 640px) {
		.controls {
			left: 0;
			bottom: -64px;
			justify-items: center;
			text-align: center;
		}
	}
</style>
