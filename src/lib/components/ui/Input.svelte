<!--
	Port of the design system's Input. `multiline` renders a <textarea> in the same control styling.
	Kept over the package's Svelte Input, which has no textarea and no aria-describedby on the hint.
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'value'> & {
		label: string;
		value?: string;
		hint?: string;
		error?: string;
		multiline?: boolean;
	};

	let { label, value = $bindable(''), hint, error, multiline = false, id, ...rest }: Props = $props();

	const uid = $props.id();
	const fid = $derived(id ?? uid);
	const hintId = $derived(`${fid}-hint`);
</script>

<div class="ml-field">
	<label class="ml-field__label" for={fid}>{label}</label>
	<div class={['ml-control', error && 'ml-control--error', multiline && 'multiline']}>
		{#if multiline}
			<textarea
				id={fid}
				class="ml-control__input"
				rows="4"
				bind:value
				placeholder={rest.placeholder}
				aria-invalid={!!error || undefined}
				aria-describedby={error || hint ? hintId : undefined}
			></textarea>
		{:else}
			<input
				id={fid}
				class="ml-control__input"
				bind:value
				aria-invalid={!!error || undefined}
				aria-describedby={error || hint ? hintId : undefined}
				{...rest}
			/>
		{/if}
	</div>
	{#if error || hint}
		<div id={hintId} class={['ml-field__hint', error && 'ml-field__hint--error']}>{error || hint}</div>
	{/if}
</div>

<style>
	.multiline {
		height: auto;
		padding-block: var(--space-3);
	}
	textarea {
		resize: vertical;
		line-height: var(--lh-body);
	}
</style>
