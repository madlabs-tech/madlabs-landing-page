import { BrainCircuit, Wallet, Workflow } from '@lucide/svelte';

export const PRODUCTS_SECTION = {
	title: 'Things we’re cooking',
	intro: 'Our own AI and Web3 products, built by the same team that builds yours.'
};

export const PRODUCTS = [
	{
		icon: BrainCircuit,
		name: 'Ego',
		href: 'https://madlabs.tech/ego',
		kind: 'AI second brain',
		status: 'Out now on macOS',
		accent: 'frost',
		body: 'A Mac app that keeps your notes and runs your coding agents side by side, so Claude and GPT work from the same context.',
		tags: ['Markdown notes', 'Claude Code & Codex', 'Agent failover']
	},
	{
		icon: Workflow,
		name: 'Sun',
		href: 'https://madlabs.tech/sun',
		kind: 'AI orchestrator',
		status: 'Open beta soon',
		accent: 'ice',
		body: 'A task board where every role hands work to AI agents: verified steps, runtime failover and approvals.',
		tags: ['Source-available', 'Self-hosted', 'Agent failover']
	},
	{
		icon: Wallet,
		name: 'Earth',
		href: undefined,
		kind: 'AI ZK wallet',
		status: 'Upcoming',
		accent: 'mint',
		body: 'A self-custody wallet with AI assistance, where zero-knowledge proofs keep balances and transfers private.',
		tags: ['Self-custody', 'Zero-knowledge']
	}
] as const;
