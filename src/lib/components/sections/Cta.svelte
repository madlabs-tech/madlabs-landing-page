<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { BOOK_CALL_HREF, CTA } from '#lib/constants/site.ts';
</script>

<section id="contact" class="section container" aria-labelledby="contact-title">
	<div class="ml-card ml-card--pop card">
		<div class="copy">
			<h2 id="contact-title" class="ml-display-3 title">{CTA.title}</h2>
			<p class="ml-body-lg">{CTA.body}</p>
		</div>
		<Button href={BOOK_CALL_HREF} size="lg" variant="secondary" iconRight={ArrowRight}>{CTA.button}</Button>
	</div>
</section>

<style>
	.card {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-8);
		padding: clamp(32px, 5vw, 64px) clamp(24px, 5vw, 56px);
		background: var(--cobalt-500);
		color: var(--on-cobalt);
	}
	.copy {
		flex: 1 1 320px;
	}
	.title {
		font-size: clamp(34px, 6vw, var(--size-display-3));
	}
	p {
		margin: 14px 0 0;
	}
</style>
