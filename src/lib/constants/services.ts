import { Blocks, Bot, ClipboardList, Compass, Hammer, Layers, Palette, PenTool, Rocket, TrendingUp } from '@lucide/svelte';

export const SERVICES_SECTION = {
	title: 'AI & Web3 product development',
	intro: 'Bring us an idea. We take it from 0 to 1 with the same team that builds our own products.'
};

// accent picks the icon tile colour: ice for AI, mint for Web3, frost for product and app work.
export const SERVICES = [
	{
		icon: ClipboardList,
		accent: 'frost',
		title: 'Product planning',
		body: 'Pin down who it’s for, what the first version must do and what can wait.'
	},
	{
		icon: Palette,
		accent: 'frost',
		title: 'UI/UX research & design',
		body: 'User interviews, flows and interfaces, tested with real people before they’re built.'
	},
	{
		icon: TrendingUp,
		accent: 'frost',
		title: 'SEO/SEM & growth',
		body: 'Search, ads and analytics set up from launch day, so people find what you shipped.'
	},
	{
		icon: Bot,
		accent: 'ice',
		title: 'AI engineering',
		body: 'Agents and AI features that call your tools, follow your rules and show every step they take.'
	},
	{
		icon: Blocks,
		accent: 'mint',
		title: 'Blockchain & smart contracts',
		body: 'Contracts on EVM chains and Solana, zero-knowledge privacy and node infrastructure, tested before mainnet.'
	},
	{
		icon: Layers,
		accent: 'frost',
		title: 'Backend, infra, web & mobile',
		body: 'APIs, cloud infrastructure and the web and mobile apps on top, built for your team to own.'
	}
] as const;

export const ENGAGEMENTS_SECTION = {
	title: 'From idea to launch',
	intro: 'One small senior team, from the first sketch to a live MVP and the growth after it.'
};

export const ENGAGEMENTS = [
	{ icon: Compass, title: 'Plan', body: 'Agree on the problem, the users and the smallest version worth shipping.' },
	{ icon: PenTool, title: 'Design', body: 'Research and a clickable prototype you can put in front of users.' },
	{ icon: Hammer, title: 'Build', body: 'Production code across AI, chain, backend and apps, shipped in small releases.' },
	{ icon: Rocket, title: 'Launch & grow', body: 'Go live, measure, improve, and hand over docs so your team owns it.' }
];
