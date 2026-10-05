<script lang="ts">
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { NAV, NAV_LINKS } from '#lib/constants/nav.ts';
	import { BOOK_CALL_HREF, SITE } from '#lib/constants/site.ts';

	// Phone/tablet menu uses the native popover API: light dismiss and Esc for free.
	let menu: HTMLElement;
</script>

<header class="site-header">
	<nav class="ml-glass-dark bar" aria-label={NAV.mainLabel}>
		<a href="/" class="wordmark" aria-label={NAV.homeLabel}>{SITE.name}</a>
		<ul class="links">
			{#each NAV_LINKS as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
		<div class="spacer"></div>
		<Button href={BOOK_CALL_HREF} size="sm" variant="ice" iconRight={ArrowUpRight} class="cta">{NAV.cta}</Button>
		<button class="ml-btn ml-btn--ghost ml-btn--md ml-iconbtn menu-btn" popovertarget="site-menu" aria-label={NAV.openMenu}>
			<Menu size={22} aria-hidden="true" />
		</button>
	</nav>

	<div id="site-menu" popover class="ml-glass-dark menu" bind:this={menu}>
		<button class="ml-btn ml-btn--ghost ml-btn--md ml-iconbtn close" popovertarget="site-menu" popovertargetaction="hide" aria-label={NAV.closeMenu}>
			<X size={22} aria-hidden="true" />
		</button>
		<ul>
			{#each NAV_LINKS as link (link.href)}
				<li><a href={link.href} onclick={() => menu.hidePopover()}>{link.label}</a></li>
			{/each}
		</ul>
		<Button href={BOOK_CALL_HREF} size="lg" variant="ice" block iconRight={ArrowUpRight}>{NAV.cta}</Button>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		padding: 14px var(--gutter);
	}
	.bar {
		max-width: var(--container-lg);
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: var(--space-6);
		height: 60px;
		padding: 0 var(--space-2) 0 22px;
		border-radius: var(--radius-lg);
	}
	.wordmark {
		font-family: var(--font-brand);
		font-weight: 400;
		font-size: 26px;
		line-height: 1;
		color: #fff;
		text-transform: uppercase;
	}
	.wordmark:hover {
		color: #fff;
		text-decoration: none;
	}
	.links,
	.menu ul {
		display: flex;
		gap: var(--space-1);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.links a,
	.menu a {
		display: block;
		padding: var(--space-2) 14px;
		border-radius: var(--radius-md);
		font-size: var(--size-sm);
		font-weight: var(--weight-semibold);
		color: var(--slate-300);
		white-space: nowrap;
	}
	.links a:hover,
	.menu a:hover {
		color: #fff;
		background: rgba(202, 214, 230, 0.12);
		text-decoration: none;
	}
	.spacer {
		flex: 1;
	}
	.menu-btn {
		display: none;
	}

	/* Popover menu: a glass sheet under the nav bar. */
	.menu {
		inset: 86px var(--gutter) auto;
		width: auto;
		margin: 0;
		padding: var(--space-4);
		border-radius: var(--radius-xl);
		color: #fff;
		box-shadow: var(--shadow-xl);
	}
	.menu:popover-open {
		animation: ml-pop-in var(--dur-base) var(--ease-spring);
	}
	.menu ul {
		flex-direction: column;
		margin: var(--space-2) 0 var(--space-4);
	}
	.menu a {
		padding: var(--space-3) var(--space-4);
		font-size: var(--size-body-lg);
	}
	.close {
		float: right;
	}

	@media (max-width: 1000px) {
		.links {
			display: none;
		}
		.menu-btn {
			display: inline-flex;
		}
		.bar {
			gap: var(--space-2);
		}
	}
	@media (max-width: 640px) {
		.site-header {
			padding-inline: var(--space-3);
		}
		.bar :global(.cta) {
			display: none;
		}
	}
	@media (min-width: 1001px) {
		.menu {
			display: none;
		}
	}
</style>
