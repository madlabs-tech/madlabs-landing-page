import { SITE } from './site.ts';

export const SEO = {
	title: 'AI & Web3 Product Studio, from 0 to 1 | Madlabs',
	description:
		'AI & Web3 product studio based in Southeast Asia. We build our own products and take yours from 0 to 1: planning, UI/UX, SEO/SEM and the full stack.',
	ogImage: '/og/madlabs.png',
	ogImageAlt: 'Madlabs: AI & Web3 product studio'
};

export const JSON_LD = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	name: SITE.name,
	legalName: SITE.legalName,
	url: SITE.url,
	email: SITE.email,
	description: SEO.description,
	image: SITE.url + SEO.ogImage,
	areaServed: 'Worldwide',
	knowsAbout: [
		'AI product development',
		'Web3 product development',
		'MVP development',
		'Product planning',
		'UI/UX research and design',
		'SEO and SEM',
		'AI agent development',
		'Blockchain development',
		'Smart contract development',
		'Zero-knowledge proofs',
		'Backend and cloud infrastructure',
		'Web and mobile app development',
		'AI consulting',
		'Web3 consulting'
	],
	...(SITE.socials.length && { sameAs: SITE.socials })
};
