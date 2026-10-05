import { ArrowLeftRight, Blocks, Bot, FileCheck, Inbox, MessageSquare, Search, ShieldCheck } from '@lucide/svelte';

export const LAB_SECTION = {
	eyebrow: '// Try the lab',
	title: 'Poke the experiments',
	intro: 'Three small simulations of what we build for clients. Click around: nothing here touches a real model or chain.'
};

export const LAB_TABS = [
	{
		id: 'agent',
		label: 'AI agent',
		icon: Bot,
		blurb: 'A support agent that reads a ticket, checks the order and the policy, survives a rate limit, and waits for a human before it replies.'
	},
	{
		id: 'zk',
		label: 'ZK transfer',
		icon: ShieldCheck,
		blurb: 'Flip the switch and watch what the chain can see. A zero-knowledge proof shows the transfer is valid without showing who or how much.'
	},
	{
		id: 'indexer',
		label: 'Indexer',
		icon: Blocks,
		blurb: 'Blocks stream in, events get decoded and filed so your app can query them in milliseconds instead of crawling the chain.'
	}
] as const;

export type LabTab = (typeof LAB_TABS)[number]['id'];

export const AGENT_DEMO = {
	title: 'Support agent · refund ticket',
	task: 'LAB-21 · Refund request, written in Bahasa Indonesia',
	run: 'Run',
	runAgain: 'Run again',
	idle: 'Press Run to start the agent.',
	working: 'working…',
	events: [
		{ icon: Inbox, text: 'Ticket read · language: Bahasa Indonesia' },
		{ icon: Search, text: 'Order #ID-48213 found · paid with QRIS, 3 days ago' },
		{ icon: FileCheck, text: 'Refund policy checked · within 7 days ✓' },
		{
			icon: ArrowLeftRight,
			text: 'Primary model hit its rate limit. The backup model picks up with the full context.',
			pack: ['Ticket', 'Order', 'Policy', 'Plan']
		},
		{ icon: MessageSquare, text: 'Reply drafted in Bahasa Indonesia' },
		{ icon: ShieldCheck, text: 'Checks · tone ✓ · policy ✓ · no personal data in the reply ✓' }
	],
	approve: 'Approve',
	reject: 'Reject',
	status: {
		idle: 'Idle',
		running: 'Running',
		waiting: 'Needs you',
		approved: 'Sent · refund queued',
		rejected: 'Back to the agent'
	},
	approvedNote: 'Reply sent and the refund queued in the payment gateway.',
	rejectedNote: 'Sent back with your note. The agent drafts again; nothing reached the customer.'
};

export const ZK_DEMO = {
	title: 'Private transfer',
	switchLabel: 'Shield this transfer',
	switchHint: 'Amount and sender hidden with a zero-knowledge proof.',
	send: 'Send 1,250 USDC',
	proving: 'Proving…',
	broadcasting: 'Broadcasting…',
	sendAgain: 'Send another',
	explorer: 'What the chain sees',
	pending: 'Pending',
	confirmed: (block: string) => `Confirmed in ${block}`,
	block: 'block #19,284,552',
	rows: { from: 'From', to: 'To', amount: 'Amount', proof: 'Proof' },
	tx: { from: '0x7a3F…c91E', to: '0x19b0…88aD', amount: '1,250 USDC' },
	hidden: 'Hidden',
	proof: 'zk-SNARK 0x1b9e…4d7a · valid',
	publicWarning: 'Anyone can see who paid whom, and how much.',
	privateNote: 'Validators check the proof, not your balance.'
};

export const INDEXER_DEMO = {
	title: 'Indexer · live',
	pause: 'Pause',
	resume: 'Resume',
	filterLabel: 'Filter events by type',
	filters: [
		{ id: 'all', label: 'All' },
		{ id: 'transfer', label: 'Transfers' },
		{ id: 'swap', label: 'Swaps' },
		{ id: 'mint', label: 'Mints' }
	],
	stats: { blocks: 'Blocks indexed', events: 'Events', lag: 'Head lag' },
	startBlock: 19_284_551,
	empty: 'no matching events',
	block: (n: number) => `#${n.toLocaleString('en-US')}`,
	event: {
		transfer: (amount: string, to: string) => `Transfer · ${amount} USDC → ${to}`,
		swap: (eth: string, usdc: string) => `Swap · ${eth} ETH → ${usdc} USDC`,
		mint: (id: number) => `Mint · lab pass #${id}`
	}
};
