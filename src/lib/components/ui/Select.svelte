<!-- Port of the design system's Select (native <select>, styled control). -->
<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';

	type Props = { label: string; options: readonly string[]; value?: string; id?: string };

	let { label, options, value = $bindable(options[0]), id }: Props = $props();

	const uid = $props.id();
	const fid = $derived(id ?? uid);
</script>

<div class="ml-field">
	<label class="ml-field__label" for={fid}>{label}</label>
	<div class="ml-control">
		<select id={fid} class="ml-control__input ml-select" bind:value>
			{#each options as option (option)}<option value={option}>{option}</option>{/each}
		</select>
		<ChevronDown size={18} class="ml-control__icon" aria-hidden="true" style="pointer-events:none" />
	</div>
</div>
