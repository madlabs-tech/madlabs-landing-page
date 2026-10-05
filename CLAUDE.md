# Madlabs landing page

Marketing site for **Madlabs Tech**, an AI and Web3 / blockchain consultancy and product studio serving Southeast Asia (SEA). The page has two jobs: rank for searches like "AI consultant Southeast Asia" and "Web3 consultant Singapore", then turn visitors into "Book a call".

Stack: SvelteKit (Svelte 5 runes, TypeScript), `adapter-static`, every route prerendered. Plain scoped CSS on the Madlabs design-system tokens.

## How to work

- **Coding task** (write, fix, refactor, add a dependency): invoke the `ponytail:ponytail` skill before writing code.
- **New feature** (new section, page, interaction, or dependency): invoke the `mattpocock-skills:grilling` skill first and settle the plan with the user. Build only after that.
- **UI work**: follow `.claude/rules/design-system.md`.
- **Copy, pages, metadata**: follow `.claude/rules/seo-copy.md`.
- **Done** means `npm run check` and `npm run build` pass and the change has been viewed at 375, 768, 1024 and 1280px widths.

## Folder structure

```
src/
  app.html                 lang="en", favicon, preconnects
  app.css                  page-level layout helpers (.container, .section)
  routes/                  pages only: +page.svelte, +layout.svelte, +layout.ts (prerender)
  lib/
    components/
      ui/                  design-system primitives ported to Svelte (Button, Card, Badge, Tag, Icon…)
      sections/            one file per page section (SiteNav, Hero, Services, Products, Partners, Cta, Footer)
      seo/                 Seo.svelte: <svelte:head> meta, Open Graph, JSON-LD
    hooks/                 reusable reactive logic: `*.svelte.ts` rune modules and Svelte actions
    constants/             all copy and fixed data, one file per section plus site.ts and seo.ts
    types/                 shared TS types, once two or more files use them
static/
  sitemap.xml, robots.txt  add a <url> to sitemap.xml with every new page
  models/madlabs-flask.glb
  og/                      Open Graph images (1200×630)
objects/                   3D source files
references/                design system and product docs, read-only
```

- Dependencies flow one way: `routes → sections → ui`. Pages compose sections; sections compose ui components; ui components take everything through props.
- Every string a visitor reads lives in `constants/`. Sections import it; ui components receive it as props.
- `src/lib/hooks/` holds our reusable logic (e.g. `inView.svelte.ts`). SvelteKit's `src/hooks.server.ts` / `src/hooks.client.ts` are request hooks, a separate concept; keep the two apart.
- Import through `#lib/...` with the file extension (`#lib/constants/site.ts`, `#lib/components/ui/Button.svelte`): SvelteKit 3 resolves `#lib` via package.json `imports`, which never guesses extensions. PascalCase for `.svelte` files, camelCase for `.ts`, kebab-case for routes and static assets.
- A folder is created together with its first file.
- `references/` is source material to read and port from. App code never imports from it.

## The 3D flask

`objects/madlabs-flask.glb` (~520 KB) is the brand object and appears in the hero at every breakpoint, phone included. Copy the `.glb` to `static/models/`; `madlabs-flask.obj` (5 MB) stays a source file.

- `src/lib/components/ui/FlaskModel.svelte` renders it with `<model-viewer>`, imported after hydration, `auto-rotate` off under `prefers-reduced-motion`. The poster `<img>` sits in the prerendered HTML, so crawlers, slow phones and no-WebGL browsers see it. model-viewer hides its poster even when WebGL fails, so the script loads only when a WebGL context exists.
- `static/models/madlabs-flask-poster.webp` and `static/og/madlabs.png` are renders of the `.glb`. Re-render both when the model changes; they come from model-viewer's `toBlob()` / a 2D canvas, since headless screenshots hang on WebGL pages.
- Threlte (three.js for Svelte) replaces it only when a feature needs scene control model-viewer lacks (custom lighting, scroll-driven animation). That switch is a grilling decision.
