# ECHO Platform Website

Official MVP website for the ECHO Platform ecosystem.

ECHO Platform is the public home for:

- ECHO Platform as the operating platform.
- Ashfall as the first official ECHO survival experience.
- ECHO Launcher as the player gateway.
- PackOS as the validation and package layer.
- ECHO Modules as the building blocks.
- Docs as the developer and player gateway.
- Native Platform work as the future runtime-independent direction.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX-ready docs architecture
- Static JSON registries
- Framer Motion reveal component
- Lucide icons
- Static sitemap and robots metadata
- Pagefind docs-only search

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The production build is a static export. `next build` writes `out/`, then Pagefind indexes exported docs pages into `out/pagefind`.

The download page fetches public release data from `https://api.github.com/repos/knoxhack/ECHO/releases` during the static build. Set `GITHUB_TOKEN` before building if you want authenticated GitHub API limits:

```bash
$env:GITHUB_TOKEN="github_pat_or_token"
npm run build
```

Run linting:

```bash
npm run lint
```

## Content Registries

The site is static-first. Edit these files to update the public content:

- `data/modules.json`
- `data/roadmap.json`
- `data/downloads.json` for download card copy and fallback CTAs
- `data/media.json`
- `data/status.json`
- `data/socials.json`

GitHub release titles, notes, assets, checksums, and file sizes are pulled at build time for `/download`. Rebuild the site to refresh release data.

News/devlog articles live under `news/` as MDX. The `/news` system also generates release posts from the same GitHub release data.

Global launch metadata lives in `lib/site.ts`. It sets `https://echoplatform.dev` as the canonical domain and centralizes the official Discord, YouTube, GitHub, release, support, docs, and download links. The dedicated social preview image is exported from `public/images/echo-social-card.png`.

## Pages

- `/`
- `/platform`
- `/ashfall`
- `/launcher`
- `/download`
- `/modules`
- `/developers`
- `/docs`
- `/roadmap`
- `/community`
- `/media`
- `/news`

## Docs

MDX docs live under `docs/` and are exposed through `/docs` plus nested docs routes.

## Next Phase

Recommended next work:

- Publish dedicated launcher installer assets so `/download` can expose direct Windows and Linux download buttons.
- Add route-level Open Graph descriptions/images for high-value pages such as Ashfall, Launcher, Docs, and News.
