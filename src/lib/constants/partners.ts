export const PARTNERS_SECTION = {
	title: 'Plug in, or own it',
	intro: 'Platforms we’ve shipped with, partnered with or integrated, in client work and in our own products.',
	own: 'Rather own it than rent it? We build white-label versions: your own wallet, payments or automation layer.',
	ownLink: 'Book a call',
	filterLabel: 'Filter partners by category'
};

export const PARTNER_GROUPS = [
	{ id: 'all', label: 'All' },
	{ id: 'ai', label: 'AI & automation' },
	{ id: 'infra', label: 'Infra & cloud' },
	{ id: 'custody', label: 'Custody & wallets' },
	{ id: 'defi', label: 'DeFi & data' },
	{ id: 'pay', label: 'Payments & markets' }
] as const;

export type PartnerGroup = Exclude<(typeof PARTNER_GROUPS)[number]['id'], 'all'>;

export const PARTNERS: { name: string; domain: string; role: string; group: PartnerGroup }[] = [
	{ name: 'Alchemy', domain: 'alchemy.com', role: 'Node infra', group: 'infra' },
	{ name: 'Blockdaemon', domain: 'blockdaemon.com', role: 'Nodes & staking', group: 'infra' },
	{ name: 'QuickNode', domain: 'quicknode.com', role: 'RPC & nodes', group: 'infra' },
	{ name: 'Helius', domain: 'helius.dev', role: 'Solana RPC & APIs', group: 'infra' },
	{ name: 'AWS', domain: 'aws.amazon.com', role: 'Cloud', group: 'infra' },
	{ name: 'Google Cloud', domain: 'cloud.google.com', role: 'Cloud', group: 'infra' },
	{ name: 'Fireblocks', domain: 'fireblocks.com', role: 'Custody', group: 'custody' },
	{ name: 'Fordefi', domain: 'fordefi.com', role: 'MPC wallets', group: 'custody' },
	{ name: 'Privy', domain: 'privy.io', role: 'Embedded wallets', group: 'custody' },
	{ name: 'Dynamic', domain: 'dynamic.xyz', role: 'Wallet auth', group: 'custody' },
	{ name: 'LI.FI', domain: 'li.fi', role: 'Bridging & swaps', group: 'defi' },
	{ name: 'Jupiter', domain: 'jup.ag', role: 'Solana swaps', group: 'defi' },
	{ name: 'OpenOcean', domain: 'openocean.finance', role: 'DEX aggregator', group: 'defi' },
	{ name: 'Birdeye', domain: 'birdeye.so', role: 'Market data', group: 'defi' },
	{ name: 'CoinGecko', domain: 'coingecko.com', role: 'Price data', group: 'defi' },
	{ name: 'Rain', domain: 'rain.xyz', role: 'Card issuing', group: 'pay' },
	{ name: 'DCS', domain: '', role: 'Payments', group: 'pay' },
	{ name: 'Alpaca', domain: 'alpaca.markets', role: 'Markets API', group: 'pay' },
	{ name: 'Stripe', domain: 'stripe.com', role: 'Payments', group: 'pay' },
	{ name: 'Midtrans', domain: 'midtrans.com', role: 'Payment gateway (ID)', group: 'pay' },
	{ name: 'Xendit', domain: 'xendit.co', role: 'Payment gateway (SEA)', group: 'pay' },
	{ name: 'Claude', domain: 'claude.ai', role: 'Anthropic models', group: 'ai' },
	{ name: 'GPT', domain: 'openai.com', role: 'OpenAI models', group: 'ai' },
	{ name: 'Higgsfield', domain: 'higgsfield.ai', role: 'AI video · MCP', group: 'ai' },
	{ name: 'Zapier', domain: 'zapier.com', role: 'Automation', group: 'ai' },
	{ name: 'n8n', domain: 'n8n.io', role: 'Workflows', group: 'ai' },
	{ name: 'DeepSeek', domain: 'deepseek.com', role: 'Open models', group: 'ai' },
	{ name: 'GLM', domain: 'z.ai', role: 'Zhipu models', group: 'ai' },
	{ name: 'Kimi', domain: 'kimi.com', role: 'Moonshot models', group: 'ai' },
	{ name: 'Qwen', domain: 'qwen.ai', role: 'Alibaba models', group: 'ai' }
];
