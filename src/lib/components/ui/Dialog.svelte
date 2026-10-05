<!--
	Port of the design system's Dialog on the native <dialog> element:
	showModal() gives focus trapping, Esc to close and inert background for free.
	Kept over the package's Svelte Dialog (a plain div: no focus trap, CDN close icon, fixed English label).
-->
<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		open: boolean;
		title: string;
		closeLabel: string;
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
		footer?: Snippet;
	};

	let { open = $bindable(), title, closeLabel, size = 'md', children, footer }: Props = $props();

	let dialog: HTMLDialogElement;
	const uid = $props.id();
	const titleId = `${uid}-title`;

	$effect(() => {
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	class={['ml-dialog', `ml-dialog--${size}`, 'dialog']}
	aria-labelledby={titleId}
	oncancel={() => (open = false)}
	onclose={() => (open = false)}
	onclick={(e) => e.target === dialog && (open = false)}
>
	<button type="button" class="ml-btn ml-btn--ghost ml-btn--sm ml-iconbtn ml-dialog__close" aria-label={closeLabel} onclick={() => (open = false)}>
		<X size={16} aria-hidden="true" />
	</button>
	<h2 id={titleId} class="ml-dialog__title">{title}</h2>
	<div class="ml-dialog__body">{@render children()}</div>
	{#if footer}<div class="ml-dialog__footer">{@render footer()}</div>{/if}
</dialog>

<style>
	.dialog {
		margin: auto;
		padding: var(--space-8);
		width: calc(100% - 2 * var(--space-4));
	}
	.dialog[open] {
		animation: ml-pop-in var(--dur-slow) var(--ease-spring);
	}
	.dialog::backdrop {
		background: var(--scrim);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
	@media (max-width: 640px) {
		.dialog {
			padding: var(--space-6) var(--space-5);
		}
	}
</style>
