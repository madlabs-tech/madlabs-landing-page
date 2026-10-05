// TODO(launch): confirm url and email, add social profile URLs (also feed JSON-LD sameAs).
export const SITE = {
	name: 'Madlabs',
	legalName: 'Madlabs Tech',
	url: 'https://madlabs.tech',
	email: 'hello@madlabs.tech',
	socials: [] as string[]
};

export const BOOK_CALL_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent('Book a call with Madlabs')}`;

export const CTA = {
	title: 'Got a weird idea?',
	body: 'Good. Tell us what you’re building. We reply within two working days.',
	button: 'Book a call'
};

export const FOOTER = {
	tagline: 'AI & Web3 consulting · Southeast Asia',
	copyright: `© ${new Date().getFullYear()} ${SITE.legalName}`
};
