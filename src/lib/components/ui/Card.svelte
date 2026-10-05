<!-- Port of the design system's Card. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		variant?: 'soft' | 'pop' | 'outline' | 'tint' | 'glass' | 'inverse';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		interactive?: boolean;
		as?: string;
		children: Snippet;
	};

	let {
		variant = 'soft',
		padding = 'md',
		interactive = false,
		as = 'div',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={as}
	class={['ml-card', `ml-card--${variant}`, `ml-card--pad-${padding}`, interactive && 'ml-card--interactive', className]}
	{...rest}
>
	{@render children()}
</svelte:element>
