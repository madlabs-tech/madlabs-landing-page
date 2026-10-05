<!--
	Port of the design system's Tabs, with the WAI-ARIA tabs pattern:
	roving tabindex, arrow keys / Home / End move between tabs.
	Pair each tab with a role="tabpanel" whose id is `${idPrefix}-panel-${tab.id}`.
	Kept over the package's Svelte Tabs, which has no keyboard navigation or tab/panel linking.
-->
<script lang="ts" generics="T extends string">
	import type { LucideIcon } from '@lucide/svelte';

	type Props = {
		items: readonly { id: T; label: string; icon?: LucideIcon }[];
		value: T;
		idPrefix: string;
		label: string;
		variant?: 'pill' | 'underline';
		block?: boolean;
	};

	let { items, value = $bindable(), idPrefix, label, variant = 'pill', block = false }: Props = $props();

	let list: HTMLElement;
	let indicator = $state({ x: 0, w: 0 });

	// Slide the indicator under the selected tab (and keep it there on resize).
	$effect(() => {
		value;
		const place = () => {
			const el = list.querySelector<HTMLElement>('[aria-selected="true"]');
			if (el) indicator = { x: el.offsetLeft, w: el.offsetWidth };
		};
		place();
		const ro = new ResizeObserver(place);
		ro.observe(list);
		return () => ro.disconnect();
	});

	function onkeydown(e: KeyboardEvent) {
		const i = items.findIndex((t) => t.id === value);
		const next =
			e.key === 'ArrowRight' ? (i + 1) % items.length
			: e.key === 'ArrowLeft' ? (i - 1 + items.length) % items.length
			: e.key === 'Home' ? 0
			: e.key === 'End' ? items.length - 1
			: -1;
		if (next < 0) return;
		e.preventDefault();
		value = items[next].id;
		list.querySelector<HTMLElement>(`#${idPrefix}-tab-${value}`)?.focus();
	}
</script>

<div
	bind:this={list}
	role="tablist"
	aria-label={label}
	tabindex="-1"
	class={['ml-tabs', `ml-tabs--${variant}`, block && 'ml-tabs--block']}
	{onkeydown}
>
	<span class="ml-tabs__indicator" style:width="{indicator.w}px" style:transform="translateX({indicator.x}px)"></span>
	{#each items as tab (tab.id)}
		<button
			type="button"
			role="tab"
			id="{idPrefix}-tab-{tab.id}"
			aria-selected={tab.id === value}
			aria-controls="{idPrefix}-panel-{tab.id}"
			tabindex={tab.id === value ? 0 : -1}
			class="ml-tab"
			onclick={() => (value = tab.id)}
		>
			{#if tab.icon}<tab.icon size={16} aria-hidden="true" />{/if}
			{tab.label}
		</button>
	{/each}
</div>

<style>
	/* 44px touch targets on touch screens; the design-system pill tab is 34px. */
	@media (pointer: coarse) {
		.ml-tabs--pill .ml-tab {
			height: 40px;
		}
	}
</style>
