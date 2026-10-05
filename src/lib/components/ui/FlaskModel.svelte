<!--
	The Madlabs 3D flask. The poster <img> is in the prerendered HTML, so it paints
	immediately (and stays for crawlers, no-JS and no-WebGL visitors). model-viewer
	(three.js under the hood, ~290 KB gz) loads after hydration and swaps in the live model.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { src: string; poster: string; alt: string };

	let { src, poster, alt }: Props = $props();
	let viewer: HTMLElement;

	onMount(() => {
		// model-viewer hides the poster even when WebGL is unavailable, so without WebGL keep the poster.
		const canvas = document.createElement('canvas');
		if (!(canvas.getContext('webgl2') || canvas.getContext('webgl'))) return;
		if (!matchMedia('(prefers-reduced-motion: reduce)').matches) viewer.setAttribute('auto-rotate', '');
		import('@google/model-viewer');
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
		rotation-per-second="18deg"
		auto-rotate-delay="0"
		camera-orbit="25deg 75deg auto"
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
	/* Cool glow behind the flask. */
	.flask::before {
		content: '';
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		background: var(--ice-500);
		filter: blur(70px);
		opacity: 0.35;
	}
	model-viewer {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		background: transparent;
		--poster-color: transparent;
		animation: ml-pop-in var(--dur-lazy) var(--ease-spring) both;
	}
	.poster {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
