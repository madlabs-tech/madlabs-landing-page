import type { Attachment } from 'svelte/attachments';

/**
 * Writes the pointer position over the element as CSS variables --px / --py (-1…1, 0 at centre).
 * CSS decides what moves and how far; use it on decorative layers only, never on text.
 * Only on fine pointers and without prefers-reduced-motion.
 */
export const parallax: Attachment<HTMLElement> = (node) => {
	if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

	let frame = 0;
	const move = (e: PointerEvent) => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const r = node.getBoundingClientRect();
			node.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
			node.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
		});
	};
	const leave = () => {
		node.style.setProperty('--px', '0');
		node.style.setProperty('--py', '0');
	};

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return () => {
		cancelAnimationFrame(frame);
		node.removeEventListener('pointermove', move);
		node.removeEventListener('pointerleave', leave);
	};
};
