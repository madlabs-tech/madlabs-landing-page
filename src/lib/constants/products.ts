import { Store, Wallet, Workflow } from '@lucide/svelte';

export const PRODUCTS_SECTION = {
	title: 'Things we’re cooking',
	intro: 'Our own AI and Web3 products, built by the same team that builds yours.'
};

export const PRODUCTS = [
	{
		icon: Workflow,
		name: 'Sun',
		kind: 'AI orchestrator',
		status: 'Open beta soon',
		accent: 'ice',
		body: 'A task board where every role hands work to AI agents: verified steps, runtime failover and approvals.',
		tags: ['Source-available', 'Self-hosted', 'Agent failover']
	},
	{
		icon: Store,
		name: 'Mercury',
		kind: 'AI services marketplace',
		status: 'Upcoming',
		accent: 'frost',
		body: 'A marketplace to buy and sell AI services: agents paid per call, compute to run your own LLM, and LLM runtimes their builders serve.',
		tags: ['x402 pay-per-call', 'Agents & LLM runtime', 'Compute rental']
	},
	{
		icon: Wallet,
		name: 'Earth',
		kind: 'AI ZK wallet',
		status: 'Upcoming',
		accent: 'mint',
		body: 'A self-custody wallet with AI assistance, where zero-knowledge proofs keep balances and transfers private.',
		tags: ['Self-custody', 'Zero-knowledge']
	}
] as const;
