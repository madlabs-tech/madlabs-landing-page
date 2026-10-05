<!-- Port of the design system's Button: renders <a> when given href, else <button>. -->
<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAnchorAttributes, 'type'> &
		Pick<HTMLButtonAttributes, 'type' | 'form' | 'disabled'> & {
		variant?: 'primary' | 'secondary' | 'ghost' | 'ice' | 'mint' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		block?: boolean;
		iconLeft?: LucideIcon;
		iconRight?: LucideIcon;
		children: Snippet;
	};

	let {
		variant = 'primary',
		size = 'md',
		block = false,
		iconLeft: IconLeft,
		iconRight: IconRight,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const iconSize = $derived(size === 'sm' ? 16 : size === 'lg' ? 20 : 18);
</script>

<svelte:element
	this={rest.href ? 'a' : 'button'}
	class={['ml-btn', `ml-btn--${variant}`, `ml-btn--${size}`, block && 'ml-btn--block', className]}
	{...rest}
>
	{#if IconLeft}<IconLeft size={iconSize} aria-hidden="true" />{/if}
	{@render children()}
	{#if IconRight}<IconRight size={iconSize} aria-hidden="true" />{/if}
</svelte:element>
