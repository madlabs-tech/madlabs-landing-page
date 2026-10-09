# Madlabs landing page

Marketing site for **Madlabs Tech**, an AI and Web3 product studio with its home base in Southeast Asia. It builds its own products (Sun, an AI orchestrator; Mercury, an AI marketplace; Earth, an AI ZK wallet) and takes products for teams worldwide from 0 to 1. The page has two jobs: rank for AI and Web3 product studio searches, then turn visitors into "Book a call".

Stack: SvelteKit (Svelte 5 runes, TypeScript), `adapter-static`, every route prerendered. Plain scoped CSS on the Madlabs design-system tokens.

## How to work

- **Coding task** (write, fix, refactor, add a dependency): invoke the `ponytail:ponytail` skill before writing code.
- **New feature** (new section, page, interaction, or dependency): invoke the `mattpocock-skills:grilling` skill first and settle the plan with the user. Build only after that.
- **UI work**: follow `.claude/rules/design-system.md`.
- **Copy, pages, metadata**: follow `.claude/rules/seo-copy.md`.
- **Done** means `npm run check` and `npm run build` pass and the change has been viewed at 375, 768, 1024 and 1280px widths.
- **Deploy** is automatic: a push to `main` builds the image (`Dockerfile`, Caddy serving `build/`) and publishes it to GHCR; the VPS polls for it and deploys with a health gate and rollback (`hryer/vps-infra`, project `madlabs-landing`). CI never touches the box.

## Folder structure

```
src/
  app.html                 lang="en", favicon, preconnects
  app.css                  page-level layout helpers (.container, .section)
  routes/                  pages only: +page.svelte, +layout.svelte, +layout.ts (prerender)
  lib/
    components/
      ui/                  our ui components (FlaskModel, SectionHeader) and the design-system primitives
                           the package's Svelte entry can't serve yet (Button, Dialog, Input, Select, Tabs, Toast)
      sections/            one file per page section (SiteNav, Hero, Services, Lab, …, ContactDialog);
                           a section's private parts go in a subfolder (sections/lab/)
      seo/                 Seo.svelte: <svelte:head> meta, Open Graph, JSON-LD
    hooks/                 reusable reactive logic: `*.svelte.ts` rune modules and Svelte attachments
                           (ticker, parallax, contact dialog state, reduced-motion durations)
    constants/             all copy and fixed data, one file per section plus site.ts and seo.ts
    three/                 3D runtime for the flask (vendored handoff, see below)
    types/                 shared TS types, once two or more files use them
static/
  sitemap.xml, robots.txt  add a <url> to sitemap.xml with every new page
  models/                  madlabs-flask-poster.webp (no-WebGL / pre-JS fallback)
  og/                      Open Graph images (1200×630)
objects/                   3D source files (reference only; the site builds the flask in code)
references/                design system and product docs, read-only
```

- Dependencies flow one way: `routes → sections → ui`. Pages compose sections; sections compose ui components; ui components take everything through props.
- Every string a visitor reads lives in `constants/`. Sections import it; ui components receive it as props.
- `src/lib/hooks/` holds our reusable logic (e.g. `inView.svelte.ts`). SvelteKit's `src/hooks.server.ts` / `src/hooks.client.ts` are request hooks, a separate concept; keep the two apart.
- Import through `#lib/...` with the file extension (`#lib/constants/site.ts`, `#lib/components/ui/Button.svelte`): SvelteKit 3 resolves `#lib` via package.json `imports`, which never guesses extensions. PascalCase for `.svelte` files, camelCase for `.ts`, kebab-case for routes and static assets.
- A folder is created together with its first file.
- `references/` is source material to read and port from. App code never imports from it.

## The 3D flask

The Madlabs flask is the brand object and appears in the hero at every breakpoint, phone included. It is built and animated in code, not loaded from a file: GLB/OBJ hold static geometry only and cannot react to clicks or the cursor.

- `src/lib/three/` is the designer's runtime from `references/obj-animated/` (`madlabs-objects.js`, `madlabs-scene.js`), vendored under the same names so a new handoff drops in. It is `@ts-nocheck`, with types in `madlabs-scene.d.ts`. Our only change is the `motion` option (reduced motion = a still scene that animates briefly after a click or drag); keep it when re-syncing. `three` is pinned to the handoff's version (0.184.0, as in its `demo.html`) so rendering matches the reference; bump both together. `kind: 'sun'` (the Sun orchestrator object) is there too, unused for now.
- `src/lib/components/ui/FlaskModel.svelte` mounts it after hydration (three.js is ~154 KB gz, lazy). Interactions: drag to orbit, cursor tilt, idle turntable, click the flask to fizz, click a token to spin it, plus a "Fizz it" button and a live status line for keyboard and screen-reader users.
- The poster `<img>` (`static/models/madlabs-flask-poster.webp`) is in the prerendered HTML for crawlers and slow phones; the canvas replaces it once mounted. Without WebGL (old devices, or Chrome with graphics acceleration off, which no longer falls back to software WebGL) the poster is the interactive fallback: pointer tilt, rising bubbles, click or "Fizz it" to squish and burst, same status line. The poster and `static/og/madlabs.png` are renders of the flask: re-render them when the model changes, from the scene itself or a 2D canvas, since headless screenshots hang on pages with a WebGL loop.
- Verify the live scene in a browser with WebGL. The automated Chrome here has WebGL off; headless Brave with `--use-angle=swiftshader --enable-unsafe-swiftshader`, driven over the DevTools protocol, renders it.
