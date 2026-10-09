import { BookOpen, Clock, Video } from '@lucide/svelte';

export const WHERE_SECTION = {
	title: 'Worldwide, from Southeast Asia',
	intro: 'We work remotely with startups and enterprises anywhere in the world, from our home base in Southeast Asia.'
};

export const WHERE_POINTS = [
	{
		icon: Video,
		title: 'Remote by default',
		body: 'Workshops, builds and reviews over video calls and shared repos, wherever your team sits.'
	},
	{
		icon: Clock,
		title: 'Async-friendly',
		body: 'Written updates and recorded demos you can catch up on in your own time zone.'
	},
	{
		icon: BookOpen,
		title: 'Handover included',
		body: 'Docs and walkthroughs, so your team owns what we ship.'
	}
];
