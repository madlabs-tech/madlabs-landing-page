import { Bot, Compass, FileCode, Hammer, Network, ScanSearch, ShieldCheck, Workflow } from '@lucide/svelte';

export const SERVICES_SECTION = {
	eyebrow: '// What we do',
	title: 'AI and Web3 consulting',
	intro: 'Senior engineers who build this stuff every day. Bring us a problem; we scope it, ship it and hand it over.'
};

export const SERVICES = [
	{
		icon: Bot,
		field: 'AI',
		title: 'AI agent development',
		body: 'Agents that call your tools, follow your rules and show every step they take.'
	},
	{
		icon: Workflow,
		field: 'AI',
		title: 'AI automation consulting',
		body: 'Find the workflows where AI pays for itself, then wire models in with approvals and fallbacks.'
	},
	{
		icon: FileCode,
		field: 'Web3',
		title: 'Smart contract development',
		body: 'Contracts for tokens, payments and DeFi on EVM chains and Solana, tested before mainnet.'
	},
	{
		icon: ShieldCheck,
		field: 'Web3',
		title: 'Zero-knowledge privacy',
		body: 'Hide amounts and senders with zero-knowledge proofs, while anyone can still verify the transfer.'
	},
	{
		icon: Network,
		field: 'Web3',
		title: 'Blockchain infrastructure',
		body: 'RPC, indexing and prover nodes for teams that need chains to just work.'
	},
	{
		icon: ScanSearch,
		field: 'AI + Web3',
		title: 'Smart contract & AI audits',
		body: 'Reviews of agent pipelines, smart contracts and ZK circuits, with fixes you can merge.'
	}
] as const;

export const ENGAGEMENTS_SECTION = {
	eyebrow: '// How we work',
	title: 'Borrow the lab',
	intro: 'The same people building our products, working on yours.'
};

export const ENGAGEMENTS = [
	{ icon: Compass, title: 'Strategy', body: 'Figure out where AI or a chain actually helps, before anyone writes code.' },
	{ icon: Hammer, title: 'Build', body: 'Small senior squads that design, ship and hand over production systems.' },
	{ icon: ScanSearch, title: 'Audit', body: 'Reviews of agent pipelines, smart contracts and ZK circuits.' }
];
