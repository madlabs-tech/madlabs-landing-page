<!--
	The Madlabs flask, built and animated in three.js by the handoff runtime in src/lib/three/
	(references/obj-animated): bubbles, vapour, orbiting tokens, cursor tilt, idle turntable,
	click the flask to fizz, click a token to spin and pop it.

	The poster <img> is in the prerendered HTML, so it paints immediately and stays for
	crawlers, no-JS and no-WebGL visitors. three.js loads after hydration and replaces it.
-->
<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import type { MadlabsObjectHandle } from '#lib/three/madlabs-scene.js';

	type Props = { poster: string; alt: string; hint: string; fizz: string };

	let { poster, alt, hint, fizz }: Props = $props();

	let stage: HTMLDivElement;
	let handle = $state<MadlabsObjectHandle>();
	let status = $state('');

	onMount(() => {
		const canvas = document.createElement('canvas');
		if (!(canvas.getContext('webgl2') || canvas.getContext('webgl'))) return;

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
				// WebGL context refused: the poster stays.
			}
		});
		return () => {
			cancelled = true;
			handle?.destroy();
		};
	});
</script>

<div class="flask">
	<img class={['poster', handle && 'poster--hidden']} src={poster} {alt} width="1096" height="1120" fetchpriority="high" />
	<div class="stage" bind:this={stage} role="img" aria-label={alt}></div>

	{#if handle}
		<div class="controls">
			<button type="button" class="fizz" onclick={() => handle?.click('flask')}>
				<Sparkles size={14} aria-hidden="true" />{fizz}
			</button>
			<p class="ml-mono status" aria-live="polite">{status}</p>
			<p class="hint">{hint}</p>
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
