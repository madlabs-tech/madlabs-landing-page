<!-- Port of the design system's Toast. Kept over the package's, whose icons load from a CDN and whose dismiss label is fixed English. -->
<script lang="ts">
	import { CircleCheck, Sparkles, X } from '@lucide/svelte';

	type Props = { tone?: 'info' | 'success'; title: string; description?: string; dismissLabel: string; onclose: () => void };

	let { tone = 'info', title, description, dismissLabel, onclose }: Props = $props();

	const Icon = $derived(tone === 'success' ? CircleCheck : Sparkles);
</script>

<div role="status" class={['ml-toast', `ml-toast--${tone}`]}>
	<span class="ml-toast__icon"><Icon size={16} aria-hidden="true" /></span>
	<div class="ml-toast__content">
		<div class="ml-toast__title">{title}</div>
		{#if description}<div class="ml-toast__desc">{description}</div>{/if}
	</div>
	<button type="button" class="ml-toast__close" aria-label={dismissLabel} onclick={onclose}>
		<X size={14} aria-hidden="true" />
	</button>
</div>
