import type { Attachment } from 'svelte/attachments';

/**
 * Phones and tablets: a touch-first screen up to the design system's tablet breakpoint (1000px).
 * Tablets count as mobile on purpose: same touch input, phone-class CPUs and thermal limits.
 * Runtime savings are gated on this one check so laptops and desktops keep exactly today's
 * behaviour. CSS equivalent: `@media (pointer: coarse) and (max-width: 1000px)`.
 */
export const isMobile = () => matchMedia('(pointer: coarse) and (max-width: 1000px)').matches;

/**
 * On mobile, `visible` follows whether the attached element is on screen, so a decorative loop
 * can hold while it's scrolled away and carry on from the same state when it's back.
 * Elsewhere it stays true.
 */
export function useOnScreen() {
	let visible = $state(true);
	const attach: Attachment<HTMLElement> = (node) => {
		if (!isMobile()) return;
		const io = new IntersectionObserver((entries) => (visible = entries[entries.length - 1].isIntersecting));
		io.observe(node);
		return () => io.disconnect();
	};
	return {
		get visible() {
			return visible;
		},
		attach
	};
}
