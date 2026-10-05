<!-- Port of the design system's Switch: a native checkbox with role="switch". -->
<script lang="ts">
	type Props = { label: string; checked?: boolean; tone?: 'accent' | 'mint'; disabled?: boolean };

	let { label, checked = $bindable(false), tone = 'accent', disabled = false }: Props = $props();
</script>

<label class={['ml-switch', tone === 'mint' && 'ml-switch--mint', disabled && 'ml-switch--disabled']}>
	<input type="checkbox" role="switch" bind:checked {disabled} />
	<span class="ml-switch__track"><span class="ml-switch__thumb"></span></span>
	<span>{label}</span>
</label>
