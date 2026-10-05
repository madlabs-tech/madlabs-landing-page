<script lang="ts">
	import Badge from '#lib/components/ui/Badge.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import Tag from '#lib/components/ui/Tag.svelte';
	import { PRODUCTS, PRODUCTS_SECTION } from '#lib/constants/products.ts';
</script>

<section id="products" class="section container" aria-labelledby="products-title">
	<SectionHeader id="products-title" {...PRODUCTS_SECTION} />

	<ul class="grid">
		{#each PRODUCTS as product (product.name)}
			<li>
				<Card as="article" variant="pop" padding="lg" class="product product--{product.accent}">
					<div class="top">
						<span class="tile"><product.icon size={26} aria-hidden="true" /></span>
						<Badge tone="solid" class="status">{product.status}</Badge>
					</div>
					<h3 class="ml-display-5">{product.name}</h3>
					<p class="ml-eyebrow kind">{product.kind}</p>
					<p class="body">{product.body}</p>
					<ul class="tags">
						{#each product.tags as tag (tag)}<li><Tag size="sm">{tag}</Tag></li>{/each}
					</ul>
				</Card>
			</li>
		{/each}
	</ul>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: var(--space-6);
		margin: var(--space-12) 0 0;
		padding: 0;
		list-style: none;
	}
	.grid > li,
	.grid :global(.product) {
		height: 100%;
	}
	.grid :global(.product) {
		display: flex;
		flex-direction: column;
		min-height: 340px;
		color: var(--slate-900);
	}
	.grid :global(.product--ice) {
		background: var(--ice-300);
	}
	.grid :global(.product--mint) {
		background: var(--mint-300);
	}
	.grid :global(.product--frost) {
		background: var(--frost-300);
	}
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tile {
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 18px;
		background: #fff;
		border: var(--border-thick) solid var(--ink);
	}
	.top :global(.status) {
		background: var(--ink);
		color: #fff;
	}
	h3 {
		margin: var(--space-6) 0 var(--space-1);
	}
	.kind {
		margin: 0 0 var(--space-3);
		color: var(--slate-800);
	}
	.body {
		margin: 0 0 var(--space-6);
		font-size: var(--size-body);
		color: var(--slate-800);
	}
	/* "INFRASTRUCTURE" is one long word; shrink it and the card padding on small phones. */
	@media (max-width: 640px) {
		.grid :global(.product) {
			padding: var(--space-6);
		}
		h3 {
			font-size: clamp(22px, 7vw, var(--size-display-5));
			overflow-wrap: anywhere;
		}
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: auto 0 0;
		padding: 0;
		list-style: none;
	}
</style>
