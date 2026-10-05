<!-- Port of the design system's Tag. Clickable tags render a real <button> with aria-pressed. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		size?: 'sm' | 'md';
		selected?: boolean;
		onclick?: () => void;
		children: Snippet;
	};

	let { size = 'md', selected = false, onclick, children }: Props = $props();
</script>

{#if onclick}
	<button
		type="button"
		class={['ml-tag', 'ml-tag--clickable', size === 'sm' && 'ml-tag--sm', selected && 'ml-tag--selected']}
		aria-pressed={selected}
		{onclick}
	>
		{@render children()}
	</button>
{:else}
	<span class={['ml-tag', size === 'sm' && 'ml-tag--sm']}>{@render children()}</span>
{/if}
