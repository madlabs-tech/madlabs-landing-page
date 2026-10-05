---
paths:
  - "src/**/*.svelte"
  - "src/**/*.css"
---

# Design system

Source of truth: `references/madlabs-design-system/`. Read its `readme.md` (content fundamentals, visual foundations, iconography) before the first UI change in a session. Its rules on contrast, color, type, corners, shadows and motion apply here unchanged.

## Using it from Svelte

- **Styles come from the package.** Import `@hryer/madlabs-design-system/styles.css` once in `src/routes/+layout.svelte`. The root JS entry is React; Svelte components come from `@hryer/madlabs-design-system/svelte`. Installing needs a GitHub Packages token; the steps are under "Install" in the readme.
- **Tokens everywhere.** Spacing, radii, colors, shadows, easing and durations use the CSS variables (`--space-*`, `--radius-*`, `--cobalt-500`, `--shadow-pop`, `--ease-spring`…) and the `.ml-*` classes. A raw hex, shadow, or easing curve in our code is a missed token.
- **Components come from the package first:** `import { Badge, Card } from '@hryer/madlabs-design-system/svelte'` (0.2.0+, Svelte 5 runes, same `.ml-*` markup as React; props in its `svelte/index.d.ts` and `svelte/README.md`).
- **Local ports** live in `src/lib/components/ui/` only where the package falls short, and each says why in its header: its `Icon` loads Lucide SVGs from unpkg at runtime (we want inline `@lucide/svelte`, in the prerendered HTML), and its Dialog, Tabs and Input miss accessibility our ports have (native `<dialog>` focus trap, arrow-key tabs, textarea, `aria-describedby`, localized labels). So Button, Dialog, Input, Select, Tabs and Toast stay local. Never pass a string `icon`/`iconLeft`/`iconRight` to a package component. When the package catches up, delete the port and switch the import. A new local port follows the React source plus its `.d.ts` and `.prompt.md` in `references/madlabs-design-system/components/<group>/`: same props, same `.ml-*` class output.
- **Layout reference:** `references/madlabs-design-system/ui_kits/website/` is the studio site this page is built from (glass nav, dark hero with floating glass cards, products, partners, services, CTA, footer). `ui_kits/orchestrator-landing/` and `ui_kits/wallet-landing/` are product-page references. Port their patterns and rewrite inline styles as scoped `<style>` blocks using tokens. Our hero adds the 3D flask (see CLAUDE.md).
- **Type:** Matcha World via `--font-brand` for display headlines and the MADLABS wordmark; Sora for body; JetBrains Mono for numbers, hashes, eyebrows. Coolvetica belongs to Sun product screens only.
- **Icons:** Lucide via `@lucide/svelte` (inline SVG, 2px stroke, inherits `currentColor`).

## Motion and interaction

Native first: CSS keyframes from the design system, Svelte transitions, small hooks in `src/lib/hooks/`. GSAP is approved for choreography native can't do well (pinned scroll scenes, SplitText); none needs it today.

- **Scroll reveal:** add `class="reveal"` (stagger siblings with `style:--i={i}`). It is a CSS scroll-driven animation in `src/app.css`: content stays visible without support, without JS and under reduced motion, so crawlers always see it.
- **Svelte transitions/animations** take `duration: ms(n)` from `hooks/motion.ts`, which returns 0 under `prefers-reduced-motion`. The design system's global reduced-motion rule only reaches CSS animations.
- **Timed demos** use `useTicker` (`hooks/ticker.svelte.ts`). Decorative loops stop under reduced motion; anything the visitor started runs regardless.
- **Parallax** (`{@attach parallax}`) moves decorative layers only, through the `--px`/`--py` CSS variables and the individual `translate` property. Text and controls stay put.
- **Book a call** links keep their `mailto:` href (the no-JS path) and add `onclick={openContact}` to open the dialog.

## Responsive

Mobile-first. Breakpoints match the design system: ≤640px phone (`.ml-hide-sm`), ≤1000px tablet (`.ml-hide-md`). Container 1200px max.

- Every section works at 375, 768, 1024 and 1280px with no horizontal scroll.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` as the kit does; display type scales with `clamp()`.
- Touch targets are at least 44px. Nav links stay reachable on phone and tablet.
- Content hidden on small screens is decoration only. The flask, headings and CTAs show at every width.
- Every hover state has a matching `:focus-visible` state.
