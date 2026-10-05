<!-- Eyebrow + display h2 + intro, the heading pattern every section in the website kit uses. -->
<script lang="ts">
	type Props = { id: string; eyebrow: string; title: string; intro?: string };

	let { id, eyebrow, title, intro }: Props = $props();
</script>

<div class="head">
	<p class="ml-eyebrow eyebrow">{eyebrow}</p>
	<h2 {id} class="ml-display-3 title">{title}</h2>
	{#if intro}<p class="ml-body-lg intro">{intro}</p>{/if}
</div>

<style>
	.eyebrow {
		margin: 0;
		color: var(--fg-accent);
	}
	.title {
		margin: var(--space-3) 0 var(--space-4);
		font-size: clamp(34px, 6vw, var(--size-display-3));
	}
	.intro {
		margin: 0;
		max-width: 560px;
		color: var(--fg-2);
	}
</style>
