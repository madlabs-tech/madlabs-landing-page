<script lang="ts">
	import { Badge, Card, Tag } from '@hryer/madlabs-design-system/svelte';
	import SectionHeader from '#lib/components/ui/SectionHeader.svelte';
	import { PRODUCTS, PRODUCTS_SECTION } from '#lib/constants/products.ts';
</script>

<section id="products" class="section container" aria-labelledby="products-title">
	<SectionHeader id="products-title" {...PRODUCTS_SECTION} />

	<ul class="grid">
		{#each PRODUCTS as product, i (product.name)}
			<li class="reveal" style:--i={i}>
				<Card as="article" variant="pop" padding="lg" class="product product--{product.accent}">
					<div class="top">
						<span class="tile"><product.icon size={26} aria-hidden="true" /></span>
						<Badge tone="solid" class="status">{product.status}</Badge>
					</div>
					<h3 class="ml-display-5">
						{#if product.href}<a href={product.href}>{product.name}</a>{:else}{product.name}{/if}
					</h3>
					<p class="ml-eyebrow kind">{product.kind}</p>
					<p class="body">{product.body}</p>
					{#if product.tags.length}
						<ul class="tags">
							{#each product.tags as tag (tag)}<li><Tag size="sm">{tag}</Tag></li>{/each}
						</ul>
					{/if}
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
		position: relative;
		min-height: 340px;
		color: var(--slate-900);
	}
	h3 a {
		color: inherit;
		text-decoration: none;
	}
	/* the name's link covers the whole card */
	h3 a::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}
	h3 a:focus-visible {
		outline: none;
	}
	.grid :global(.product:has(a:focus-visible)) {
		outline: 3px solid var(--ink);
		outline-offset: 4px;
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
	@media (max-width: 640px) {
		.grid :global(.product) {
			padding: var(--space-6);
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
