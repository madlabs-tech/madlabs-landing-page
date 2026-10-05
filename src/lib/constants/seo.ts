import { SITE } from './site.ts';

export const SEO = {
	title: 'AI & Web3 Consultants for Teams Worldwide | Madlabs',
	description:
		'AI and Web3 consultants for teams worldwide, based in Southeast Asia. We build AI agents, smart contracts, ZK privacy and blockchain infrastructure.',
	ogImage: '/og/madlabs.png',
	ogImageAlt: 'Madlabs: AI & Web3 consultants for teams worldwide'
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
		'AI consulting',
		'AI agent development',
		'AI automation',
		'Web3 consulting',
		'Blockchain consulting',
		'Smart contract development',
		'Smart contract audit',
		'Zero-knowledge proofs',
		'Blockchain infrastructure'
	],
	...(SITE.socials.length && { sameAs: SITE.socials })
};
