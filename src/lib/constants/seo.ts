import { MARKETS } from './markets.ts';
import { SITE } from './site.ts';

export const SEO = {
	title: 'AI & Web3 Consultants in Southeast Asia | Madlabs',
	description:
		'AI and Web3 consultants for Southeast Asia. We build AI agents, smart contracts and ZK privacy for teams in Indonesia, Singapore and beyond.',
	ogImage: '/og/madlabs.png',
	ogImageAlt: 'Madlabs: AI & Web3 consultants for Southeast Asia'
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
	areaServed: [
		{ '@type': 'Place', name: 'Southeast Asia' },
		...MARKETS.map((name) => ({ '@type': 'Country', name }))
	],
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
