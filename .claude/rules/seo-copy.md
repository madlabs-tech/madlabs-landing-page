---
paths:
  - "src/routes/**"
  - "src/app.html"
  - "src/lib/constants/**"
  - "src/lib/components/sections/**"
  - "src/lib/components/seo/**"
---

# SEO and copy

Goal: rank for AI and Web3 product studio searches worldwide, then convert to "Book a call". Site URL: `https://madlabs.tech` (from the website kit; confirm before launch).

## Keywords

- **Positioning:** a product studio. We build our own AI and Web3 products (Sun, Mercury, Earth) and take products for other teams from 0 to 1. Global, rooted in Southeast Asia: copy speaks to teams anywhere; "Southeast Asia" appears only as the home base. `areaServed` is "Worldwide" and no other regions or countries are named.
- **Primary:** AI product studio · Web3 product studio · AI & Web3 product development · 0 to 1 / MVP development.
- **Secondary:** "Southeast Asia" as the home base (meta description, hero body, Where we work); AI and Web3 consulting terms.
- **Services:** product planning, UI/UX research and design, SEO/SEM, AI engineering (agents), blockchain and smart contracts, backend, infra, web and mobile.

The exact strings live in `src/lib/constants/seo.ts`; this list is the strategy behind them.

## Placement

- Each page has its own `<title>` (≤60 chars) and meta description (≤155 chars), both carrying a primary keyword.
- The `<h1>` leads with the positioning (e.g. "AI & Web3 product studio"); the hero body names our products and the 0 to 1 offer. No eyebrow or badge above it.
- Section `<h2>`s use the service terms people search for.
- Write for people first: each keyword appears naturally, at most once per section.

## Technical

- Every route is prerendered (`export const prerender = true` in the root `+layout.ts`); all content is in the HTML, never fetched client-side.
- `Seo.svelte` sets title, description, canonical URL, Open Graph and Twitter card (image in `static/og/`).
- JSON-LD `ProfessionalService` with `areaServed: "Worldwide"`, `knowsAbout` the service topics, and `sameAs` the social profiles.
- `static/sitemap.xml` and `static/robots.txt` are plain files; a new page gets a `<url>` in the sitemap.
- Semantic HTML: `header`/`nav`/`main`/`section`/`footer`, one `<h1>`, headings in order, descriptive link text, `alt` on every meaningful image.
- Speed counts toward ranking: target Lighthouse mobile ≥ 90 for Performance, SEO and Accessibility. Images are AVIF/WebP with `width`/`height`; the 3D flask loads after first paint.

## Voice

Follow CONTENT FUNDAMENTALS in `references/madlabs-design-system/readme.md` (we/you, sentence case, 2–6 word headlines, verb-first buttons, real numbers in mono, one joke per screen). Demos and examples stay region-neutral (English, card payments): no local languages, payment rails or chat apps. Sun's product facts come from that readme and `references/sun-orchestrator-products/`; claims stay within what those sources state. Mercury (AI services marketplace, a secondary market where people buy and sell agents paid per call over x402, rented compute to run their own LLM, and LLM runtimes such as routers that builders serve from their own servers and charge per request) and Earth (AI ZK wallet: self-custody, zero-knowledge privacy) are upcoming, so their copy says no more than that.
