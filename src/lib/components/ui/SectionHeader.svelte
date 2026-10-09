<!-- Display h2 + intro, the heading pattern every section uses. -->
<script lang="ts">
	type Props = { id: string; title: string; intro?: string };

	let { id, title, intro }: Props = $props();
</script>

<div class="head reveal">
	<h2 {id} class="ml-display-3 title">{title}</h2>
	{#if intro}<p class="ml-body-lg intro">{intro}</p>{/if}
</div>

<style>
	.title {
		margin: 0 0 var(--space-4);
		font-size: clamp(34px, 6vw, var(--size-display-3));
	}
	.intro {
		margin: 0;
		max-width: 560px;
		color: var(--fg-2);
	}
</style>
