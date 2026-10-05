<script lang="ts">
	import Cta from '#lib/components/sections/Cta.svelte';
	import Engagements from '#lib/components/sections/Engagements.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Markets from '#lib/components/sections/Markets.svelte';
	import Partners from '#lib/components/sections/Partners.svelte';
	import Products from '#lib/components/sections/Products.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import SiteNav from '#lib/components/sections/SiteNav.svelte';
	import Seo from '#lib/components/seo/Seo.svelte';
	import { JSON_LD, SEO } from '#lib/constants/seo.ts';
</script>

<Seo title={SEO.title} description={SEO.description} image={SEO.ogImage} imageAlt={SEO.ogImageAlt} jsonLd={JSON_LD} />

<SiteNav />
<main>
	<Hero />
	<Services />
	<Engagements />
	<Markets />
	<Products />
	<Partners />
	<Cta />
</main>
<Footer />
