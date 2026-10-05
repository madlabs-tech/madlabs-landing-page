import { Languages, MessageCircle, QrCode } from '@lucide/svelte';

export const MARKETS = ['Indonesia', 'Singapore', 'Malaysia', 'Vietnam', 'Thailand', 'Philippines'];

export const MARKETS_SECTION = {
	eyebrow: '// Southeast Asia',
	title: 'Made for Southeast Asia',
	intro: 'AI and blockchain consulting for startups, agencies and enterprises across the region. We design for how Southeast Asia actually pays, chats and ships.'
};

export const MARKET_POINTS = [
	{
		icon: QrCode,
		title: 'Local payment rails',
		body: 'QRIS, Midtrans, Xendit and bank transfer built into AI and Web3 products from day one.'
	},
	{
		icon: MessageCircle,
		title: 'Chat-first products',
		body: 'AI agents that work where your customers already are: WhatsApp and Telegram.'
	},
	{
		icon: Languages,
		title: 'Bahasa Indonesia & English',
		body: 'Workshops, docs and handover in the language your team works in.'
	}
];
