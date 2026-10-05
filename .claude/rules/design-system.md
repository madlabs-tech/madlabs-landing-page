---
paths:
  - "src/**/*.svelte"
  - "src/**/*.css"
---

# Design system

Source of truth: `references/madlabs-design-system/`. Read its `readme.md` (content fundamentals, visual foundations, iconography) before the first UI change in a session. Its rules on contrast, color, type, corners, shadows and motion apply here unchanged.

## Using it from Svelte

- **Styles come from the package.** Import `@hryer/madlabs-design-system/styles.css` once in `src/routes/+layout.svelte`. Import only the CSS entries: the JS entry is React. Installing needs a GitHub Packages token; the steps are under "Install" in the readme.
- **Tokens everywhere.** Spacing, radii, colors, shadows, easing and durations use the CSS variables (`--space-*`, `--radius-*`, `--cobalt-500`, `--shadow-pop`, `--ease-spring`…) and the `.ml-*` classes. A raw hex, shadow, or easing curve in our code is a missed token.
- **Components are ported to Svelte** in `src/lib/components/ui/`, only when a section needs one. The spec for each port is the React source plus its `.d.ts` and `.prompt.md` in `references/madlabs-design-system/components/<group>/`: same props, same `.ml-*` class output.
- **Layout reference:** `references/madlabs-design-system/ui_kits/website/` is the studio site this page is built from (glass nav, dark hero with floating glass cards, products, partners, services, CTA, footer). `ui_kits/orchestrator-landing/` and `ui_kits/wallet-landing/` are product-page references. Port their patterns and rewrite inline styles as scoped `<style>` blocks using tokens. Our hero adds the 3D flask (see CLAUDE.md).
- **Type:** Matcha World via `--font-brand` for display headlines and the MADLABS wordmark; Sora for body; JetBrains Mono for numbers, hashes, eyebrows. Coolvetica belongs to Sun product screens only.
- **Icons:** Lucide via `@lucide/svelte` (inline SVG, 2px stroke, inherits `currentColor`).

## Responsive

Mobile-first. Breakpoints match the design system: ≤640px phone (`.ml-hide-sm`), ≤1000px tablet (`.ml-hide-md`). Container 1200px max.

- Every section works at 375, 768, 1024 and 1280px with no horizontal scroll.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` as the kit does; display type scales with `clamp()`.
- Touch targets are at least 44px. Nav links stay reachable on phone and tablet.
- Content hidden on small screens is decoration only. The flask, headings and CTAs show at every width.
- Every hover state has a matching `:focus-visible` state.
