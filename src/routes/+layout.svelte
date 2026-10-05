<script lang="ts">
	import '@hryer/madlabs-design-system/styles.css';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
