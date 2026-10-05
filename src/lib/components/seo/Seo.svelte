<script lang="ts">
	import { SITE } from '#lib/constants/site.ts';

	type Props = {
		title: string;
		description: string;
		path?: string;
		image: string;
		imageAlt: string;
		jsonLd?: Record<string, unknown>;
	};

	let { title, description, path = '/', image, imageAlt, jsonLd }: Props = $props();

	const url = $derived(new URL(path, SITE.url).href);
	const imageUrl = $derived(new URL(image, SITE.url).href);
	// Escape "<" so content can never close the script tag early.
	const ldScript = $derived(
		jsonLd && `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + 'script>'
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if ldScript}{@html ldScript}{/if}
</svelte:head>
