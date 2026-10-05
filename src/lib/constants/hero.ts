export const HERO = {
	badge: 'Now building · Sun, our AI orchestrator',
	eyebrow: '// Mad science for AI & Web3',
	// The <h1>. Parts with a tone render in that accent colour.
	title: [
		{ text: 'AI', tone: 'ice' },
		{ text: ' & ' },
		{ text: 'Web3', tone: 'mint' },
		{ text: ' consultants for Southeast Asia' }
	],
	body: 'Madlabs is a consultancy and product studio. We help teams in Indonesia, Singapore and across Southeast Asia ship AI agents and blockchain systems, and we build our own.',
	primaryCta: 'Book a call',
	secondaryCta: { href: '#services', label: 'See what we do' },
	flask: {
		src: '/models/madlabs-flask.glb',
		poster: '/models/madlabs-flask-poster.webp',
		alt: 'The Madlabs flask: a glass lab flask of ice-blue liquid with a chain link, an Ether crystal and a Bitcoin coin bubbling out. Drag to spin it.'
	},
	// Floating "lab specimens". They tick like live systems; see Hero.svelte for the loop.
	specimens: {
		agent: {
			name: 'research-agent',
			tools: ['plan', 'web.search', 'fetch', 'read', 'summarize', 'cite', 'verify', 'draft', 'review'],
			step: (n: number, total: number, tool: string) => `step ${n} / ${total} · ${tool}`,
			done: 'Run finished · verified'
		},
		shielded: {
			label: 'Shielded',
			tag: 'ZK',
			amount: '4.2069 ETH',
			proving: 'Proving…',
			meta: 'proof 0x1b9e…4d7a · 2.4s'
		},
		block: { title: (n: number) => `Block #${n.toLocaleString('en-US')}`, start: 19_284_551, cells: 6 }
	}
};
