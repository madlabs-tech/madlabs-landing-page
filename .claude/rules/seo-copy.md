---
paths:
  - "src/routes/**"
  - "src/app.html"
  - "src/lib/constants/**"
  - "src/lib/components/sections/**"
  - "src/lib/components/seo/**"
---

# SEO and copy

Goal: rank for AI and Web3 consulting searches worldwide, then convert to "Book a call". Site URL: `https://madlabs.tech` (from the website kit; confirm before launch).

## Keywords

- **Positioning:** global, rooted in Southeast Asia. Copy speaks to teams anywhere; "Southeast Asia" appears only as the home base. `areaServed` is "Worldwide" and no other regions or countries are named.
- **Primary:** AI consultant · Web3 consultant · AI & Web3 consultancy · blockchain consulting.
- **Secondary:** "Southeast Asia" as the home base (meta description, hero body, Where we work); the most winnable searches for a new site.
- **Services:** AI agent development, AI automation consulting, smart contract development and audit, zero-knowledge (ZK) privacy, blockchain infrastructure (RPC, indexing).

The exact strings live in `src/lib/constants/seo.ts`; this list is the strategy behind them.

## Placement

- Each page has its own `<title>` (≤60 chars) and meta description (≤155 chars), both carrying a primary keyword.
- The `<h1>` says what we do and for whom (e.g. "AI & Web3 consultants for teams worldwide"). The playful brand line ("Mad science for AI & Web3") can sit beside it as display text, or one line can do both.
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

Follow CONTENT FUNDAMENTALS in `references/madlabs-design-system/readme.md` (we/you, sentence case, 2–6 word headlines, verb-first buttons, real numbers in mono, one joke per screen). Demos and examples stay region-neutral (English, card payments): no local languages, payment rails or chat apps. Product facts (Sun orchestrator, ZK Wallet, infrastructure) come from that readme and `references/sun-orchestrator-products/`; claims stay within what those sources state.
