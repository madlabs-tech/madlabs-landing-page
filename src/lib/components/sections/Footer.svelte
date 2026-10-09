<script lang="ts">
	import { NAV, NAV_LINKS } from '#lib/constants/nav.ts';
	import { FOOTER, SITE } from '#lib/constants/site.ts';
</script>

<footer class="footer">
	<div class="container inner">
		<span class="wordmark">{SITE.name}</span>
		<span>{FOOTER.tagline}</span>
		<span>{FOOTER.copyright}</span>
		<nav class="links" aria-label={NAV.footerLabel}>
			{#each NAV_LINKS as link (link.href)}<a href={link.href}>{link.label}</a>{/each}
		</nav>
	</div>
</footer>

<style>
	.footer {
		border-top: var(--border-thin) solid var(--border-subtle);
		padding-block: var(--space-10);
	}
	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3) var(--space-6);
		font-size: var(--size-sm);
		color: var(--fg-3);
	}
	.wordmark {
		font-family: var(--font-brand);
		font-size: 22px;
		color: var(--ink);
		text-transform: uppercase;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
		margin-left: auto;
	}
	.links a {
		display: inline-block;
		padding-block: var(--space-2);
	}
	@media (max-width: 640px) {
		.links {
			margin-left: 0;
		}
	}
</style>
