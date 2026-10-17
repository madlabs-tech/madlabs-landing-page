<script lang="ts">
	// The design system's styles.css, file by file in its order, minus tokens/fonts.css: that one
	// @imports Google Fonts (a render-blocking third-party hop) and declares Coolvetica we don't
	// use. ../fonts.css self-hosts the same faces. If a package update adds a file to styles.css,
	// add it here.
	import '../fonts.css';
	import '@hryer/madlabs-design-system/tokens/colors.css';
	import '@hryer/madlabs-design-system/tokens/typography.css';
	import '@hryer/madlabs-design-system/tokens/spacing.css';
	import '@hryer/madlabs-design-system/tokens/effects.css';
	import '@hryer/madlabs-design-system/tokens/motion.css';
	import '@hryer/madlabs-design-system/tokens/base.css';
	import '@hryer/madlabs-design-system/components.css';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
