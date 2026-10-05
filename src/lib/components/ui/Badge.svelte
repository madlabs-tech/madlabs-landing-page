<!-- Port of the design system's Badge. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLSpanElement> & {
		tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
		dot?: boolean;
		live?: boolean;
		children: Snippet;
	};

	let { tone = 'neutral', dot = false, live = false, class: className = '', children, ...rest }: Props = $props();
</script>

<span class={['ml-badge', `ml-badge--${tone}`, live && 'ml-badge--live', className]} {...rest}>
	{#if dot || live}<span class="ml-badge__dot"></span>{/if}
	{@render children()}
</span>
