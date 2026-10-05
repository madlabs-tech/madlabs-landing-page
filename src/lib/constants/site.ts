// TODO(launch): confirm the site url and add social profile URLs (also feed JSON-LD sameAs).
export const SITE = {
	name: 'Madlabs',
	legalName: 'Madlabs Tech',
	url: 'https://madlabs.tech',
	email: 'harry@madlabs.tech',
	socials: [] as string[]
};

/** No-JS fallback for every "Book a call" link; with JS they open the contact dialog. */
export const BOOK_CALL_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent('Book a call with Madlabs')}`;

export const CTA = {
	title: 'Got a weird idea?',
	body: 'Good. Tell us what you’re building. We reply within two working days.',
	button: 'Book a call'
};

export const CONTACT_FORM = {
	title: 'Book a call',
	intro: 'Thirty minutes with someone who builds this stuff. No slides.',
	close: 'Close',
	name: { label: 'Your name', placeholder: 'Ada Lovelace', error: 'Tell us your name so we know who’s writing.' },
	company: { label: 'Company', placeholder: 'Optional' },
	topic: { label: 'What are you building?', options: ['AI agents', 'AI automation', 'Smart contracts', 'ZK / privacy', 'Infra', 'Not sure yet'] },
	budget: { label: 'Budget', options: ['< $25k', '$25k – $100k', '$100k+', 'Not sure yet'] },
	message: { label: 'Tell us a bit more', placeholder: 'What you’re building, where you’re stuck, and when you’d like to start.' },
	cancel: 'Cancel',
	submit: 'Write the email',
	note: 'This opens your email app with everything filled in. Nothing is sent until you press send.',
	subject: (topic: string, name: string) => `Book a call: ${topic} (${name})`,
	body: (f: { name: string; company: string; topic: string; budget: string; message: string }) =>
		[
			`Hi Madlabs,`,
			``,
			f.message || `I’d like to book a call.`,
			``,
			`Name: ${f.name}`,
			f.company ? `Company: ${f.company}` : null,
			`Topic: ${f.topic}`,
			`Budget: ${f.budget}`
		]
			.filter((line) => line !== null)
			.join('\n'),
	toast: {
		title: 'Opening your email app',
		description: `Didn’t open? Email us at ${SITE.email}.`,
		dismiss: 'Dismiss'
	}
};

export const FOOTER = {
	tagline: 'AI & Web3 consulting · worldwide, from Southeast Asia',
	copyright: `© ${new Date().getFullYear()} ${SITE.legalName}`
};
