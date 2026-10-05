import { prefersReducedMotion } from 'svelte/motion';

/**
 * Duration for Svelte transitions/animations: 0 under prefers-reduced-motion.
 * (The design system's global reduced-motion rule only covers CSS animations;
 * Svelte transitions run through the Web Animations API and need this.)
 */
export const ms = (duration: number) => (prefersReducedMotion.current ? 0 : duration);
