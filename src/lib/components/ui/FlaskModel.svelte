<!--
	The Madlabs 3D flask. The poster <img> is in the prerendered HTML, so it paints
	immediately (and stays for crawlers, no-JS and no-WebGL visitors). model-viewer
	(three.js under the hood, ~290 KB gz) loads after hydration and swaps in the live model.

	Motion: a slow idle drift, a turn as the page scrolls, and a tilt toward the pointer.
	Drag to spin it yourself; on release it carries on from where you left it.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { src: string; poster: string; alt: string };

	let { src, poster, alt }: Props = $props();
	let viewer: HTMLElement & { getCameraOrbit?: () => { theta: number } };

	const ORBIT = { theta: 25, phi: 75 }; // resting camera angle, degrees
	const DRIFT = 10; // idle spin, degrees per second
	const SCROLL_TURN = 120; // degrees turned over one viewport of scrolling
	const POINTER = { theta: 28, phi: 10 }; // max tilt toward the pointer, degrees

	onMount(() => {
		// model-viewer hides the poster even when WebGL is unavailable, so without WebGL keep the poster.
		const canvas = document.createElement('canvas');
		if (!(canvas.getContext('webgl2') || canvas.getContext('webgl'))) return;
		import('@google/model-viewer');
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const finePointer = matchMedia('(pointer: fine)').matches;
		let px = 0;
		let py = 0;
		let offset = 0;
		let dragging = false;
		let visible = true;
		let frame = 0;
		const start = performance.now();

		const target = (now: number) =>
			ORBIT.theta + ((now - start) / 1000) * DRIFT + (scrollY / innerHeight) * SCROLL_TURN + px * POINTER.theta;

		const onPointerMove = (e: PointerEvent) => {
			if (!finePointer) return;
			px = (e.clientX / innerWidth) * 2 - 1;
			py = (e.clientY / innerHeight) * 2 - 1;
		};
		const onDown = () => (dragging = true);
		const onUp = () => {
			if (!dragging) return;
			dragging = false;
			const theta = viewer.getCameraOrbit?.().theta;
			if (theta !== undefined) offset = (theta * 180) / Math.PI - target(performance.now());
		};
		const loop = (now: number) => {
			frame = requestAnimationFrame(loop);
			if (dragging || !visible) return;
			const theta = target(now) + offset;
			const phi = ORBIT.phi + py * POINTER.phi;
			viewer.setAttribute('camera-orbit', `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg auto`);
		};

		const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		io.observe(viewer);
		addEventListener('pointermove', onPointerMove, { passive: true });
		viewer.addEventListener('pointerdown', onDown);
		addEventListener('pointerup', onUp);
		addEventListener('pointercancel', onUp);
		customElements.whenDefined('model-viewer').then(() => (frame = requestAnimationFrame(loop)));

		return () => {
			cancelAnimationFrame(frame);
			io.disconnect();
			removeEventListener('pointermove', onPointerMove);
			viewer.removeEventListener('pointerdown', onDown);
			removeEventListener('pointerup', onUp);
			removeEventListener('pointercancel', onUp);
		};
	});
</script>

<div class="flask">
	<model-viewer
		bind:this={viewer}
		{src}
		{alt}
		camera-controls
		disable-zoom
		disable-pan
		touch-action="pan-y"
		interaction-prompt="none"
		interpolation-decay="120"
		camera-orbit="{ORBIT.theta}deg {ORBIT.phi}deg auto"
		shadow-intensity="0"
		environment-image="neutral"
		exposure="1.1"
	>
		<img slot="poster" class="poster" src={poster} {alt} width="498" height="720" fetchpriority="high" />
		<div slot="progress-bar"></div>
	</model-viewer>
</div>

<style>
	.flask {
		position: relative;
		width: 100%;
		height: 100%;
	}
	/* Cool glow behind the flask; it breathes slowly. */
	.flask::before {
		content: '';
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		background: var(--ice-500);
		filter: blur(70px);
		opacity: 0.35;
		animation: glow 6s var(--ease-in-out) infinite;
	}
	@keyframes glow {
		50% {
			opacity: 0.55;
			scale: 1.08;
		}
	}
	model-viewer {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		background: transparent;
		--poster-color: transparent;
		animation: ml-pop-in var(--dur-lazy) var(--ease-spring) both;
		cursor: grab;
	}
	model-viewer:active {
		cursor: grabbing;
	}
	.poster {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		/* Without WebGL the poster stays: give it the same gentle bob. */
		animation: ml-float 6s var(--ease-in-out) infinite;
	}
</style>
