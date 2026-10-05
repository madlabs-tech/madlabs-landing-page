<!-- Title bar shared by the lab demos: name + subtitle on the left, status and actions on the right. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { title: string; subtitle?: string; children?: Snippet };

	let { title, subtitle, children }: Props = $props();
</script>

<div class="head">
	<div class="titles">
		<div class="title">{title}</div>
		{#if subtitle}<div class="ml-mono subtitle">{subtitle}</div>{/if}
	</div>
	{#if children}<div class="actions">{@render children()}</div>{/if}
</div>

<style>
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
		padding: 14px 18px;
		border-bottom: var(--border-thin) solid var(--glass-border-dark);
	}
	.titles {
		flex: 1 1 200px;
		min-width: 0;
	}
	.title {
		font-weight: var(--weight-bold);
		font-size: var(--size-body-lg);
		color: #fff;
	}
	.subtitle {
		font-size: var(--size-micro);
		color: var(--slate-300);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
