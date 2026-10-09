export const HERO = {
	// The <h1>. Parts with a tone render in that accent colour.
	title: [
		{ text: 'AI', tone: 'ice' },
		{ text: ' & ' },
		{ text: 'Web3', tone: 'mint' },
		{ text: ' product studio' }
	],
	body: 'We’re building Sun, Mercury and Earth, our own AI and Web3 products. From our home base in Southeast Asia, we also take products for teams anywhere from 0 to 1: plan, design, build, launch.',
	primaryCta: 'Book a call',
	secondaryCta: { href: '#products', label: 'See our products' },
	flask: {
		poster: '/models/madlabs-flask-poster.webp',
		alt: 'The Madlabs flask: a glass lab flask of bubbling ice-blue liquid, with a chain link, an Ether crystal and a Bitcoin coin orbiting above it.',
		hint: 'Drag to spin · click the flask or a token',
		fizz: 'Fizz it',
		// No-WebGL fallback: same status line as the 3D runtime, hint without the drag.
		fallbackStatus: (n: number) => `3 tokens · ${n} reaction${n === 1 ? '' : 's'}`,
		fallbackHint: 'Click the flask to make it fizz'
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
