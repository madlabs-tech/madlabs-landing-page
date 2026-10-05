import { Network, ShieldCheck, Workflow } from '@lucide/svelte';

export const PRODUCTS_SECTION = {
	eyebrow: '// Products',
	title: 'Things we’re cooking',
	intro: 'Our own products, built on the same stack we bring to client work.'
};

export const PRODUCTS = [
	{
		icon: Workflow,
		name: 'Sun',
		kind: 'AI orchestrator',
		status: 'In development',
		accent: 'ice',
		body: 'A task board where every role hands work to AI agents: verified steps, runtime failover and approvals.',
		tags: ['Source-available', 'Self-hosted', 'Agent failover']
	},
	{
		icon: ShieldCheck,
		name: 'ZK Wallet',
		kind: 'Web3 wallet',
		status: 'Upcoming',
		accent: 'mint',
		body: 'A self-custody wallet where balances and transfers stay private by default.',
		tags: ['Zero-knowledge', 'Self-custody', 'Multi-chain']
	},
	{
		icon: Network,
		name: 'Infrastructure',
		kind: 'Blockchain infra',
		status: 'Upcoming',
		accent: 'frost',
		body: 'Managed RPC, indexing and prover nodes for teams building on-chain.',
		tags: ['RPC', 'Indexer', 'Provers']
	}
] as const;
