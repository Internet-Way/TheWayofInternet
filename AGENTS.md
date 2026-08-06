# bitindex — Agent Context

## Project
- VitePress site at `docs/` (FMHY wiki dumps used directly as the media pages).
- Package manager: **pnpm** (`pnpm install`; `node_modules/.pnpm` layout; bun is NOT installed). Node is installed (pnpm 11.1.2).
- Scripts (package.json): `pnpm run dev` (port 3000), `pnpm run build`, `pnpm run lint` (tsc --noEmit), `docs:dev`, `docs:build`, `docs:preview`.

## Page frontmatter (REQUIRED on every .md except `index.md`)
- Three page types; the header is rendered from frontmatter (not an H1 in the body — no H1s in bodies):
  - **index** — `title`, `description`, `icon`, `type: index`. Renders icon + gradient title + subtitle via `PageHeader.vue` → `PageTitle.vue`.
    `icon` is an iconify class (e.g. `i-twemoji-shield`) or a raw emoji mapped by `emojiMap` (`icon-transformer.ts`). New `i-twemoji-*` icons must be added to the safelist in `unocss.config.ts`.
  - **blog** — `title`, `description`, `type: blog`, `date` (YYYY-MM-DD), `contributors: [ID]` (contributor IDs from `core/contributors.ts`, e.g. `[1320]`). Blog posts must include `<Post />` as the first line of the body — it renders the header (title + subtitle, with `subtitle • date • editor` inline on one line) via `BlogPost.vue`. `PageHeader` skips blog pages.
  - **utility** — `title`, `type: utility`. Renders title via `PageHeader.vue`, no subtitle.
- `docs/index/{privacy,ai,video,audio,gaming,reading,torrenting,ddl}.md` are the 8 media stub pages (sidebar links `/index/*`).

## Content pipeline (media category pages)
- Media category pages live at `docs/index/{privacy,ai,video,audio,gaming,reading,torrenting,ddl}.md` — currently frontmatter-only stubs (no H1 in body; header comes from frontmatter). When curated from FMHY wiki dumps, apply the rules below:
- **Heading rule**: H1 written exactly as the user specified:
  - privacy.md → `# Ad Blocking and Privacy`
  - ai.md → `# Artificial Intelligence`
  - video.md → `# Streaming`
  - audio.md → `# Listening`
  - gaming.md → `# Gaming`
  - reading.md → `# Reading`
  - torrenting.md → `# Torrenting`
  - downloading.md → `# Downloading` (user typo "Donwloading" — treat as Downloading)
- **Links must come strictly from the reso files** — no new URLs invented.
- **FMHY ordering matters**: entries at the top of a section are the most trusted/high quality; quality & reliability decrease as you go down. Stars (⭐) follow the same trend. Preserve this ordering when curating.
- **Tier markers** (prepended to the entry name in list items):
  - 👑 Editors' Choice — top picks per "Editor Directives" in the user's criteria (3–5 per page)
  - ⭐ Star — meets "Star Requirement" (7–9 per page)
  - plain — meets "Minimum Requirement" (rest of the 20)
- Entry format: `- 👑 **[Name](url)** - description` / `- ⭐ **[Name](url)** - description` / `- [Name](url) - description`. Name, primary link, and description copied **verbatim** from reso (keep sub-links like [Discord]/[GitHub]).
- Structure per page: H1, then `##` sections mapped from reso's `# ►` sections (keep only sections with picks), `***` separators, keep relevant `**Note**`/`**Warning**` blocks.
- Remove: "◄◄ Back to Wiki Index" boilerplate header and dead ↪️ reddit-wiki cross-refs.

## Markdown plugins (docs/.vitepress/plugins/markdown/)
- `icon-transformer.ts` — `unicodeEmojiPlugin` maps raw unicode emojis → twemoji icon spans via `emojiMap` (⭐ → star, 🌟 → glowing-star, etc.). **👑 → 'crown' was added here** (user's preferred approach for the crown; verified `crown` icon exists in `@iconify-json/twemoji`).
- `starredlink.ts` — links whose inline content contains 🌟 get bold+italic, ⭐ gets bold. Runs after inline; checks raw token.content.
- `tooltip.ts` — converts `[Note](/notes#id)` links into Tooltip components.
- `icon-transformer.ts` `iconLinks` — link text matching social names (Discord/GitHub/etc.) renders as simple-icons spans.

## Theme config
- `docs/.vitepress/core/meta.ts` — `nav`, `sidebar`. Sidebar has a **"Media Resources"** section (enabled) with 8 items:
  Privacy/Adblocking → `/index/privacy`, AI → `/index/ai`, Streaming → `/index/video`, Listening → `/index/audio`, Gaming → `/index/gaming`, Reading → `/index/reading`, Torrenting → `/index/torrenting`, Downloading → `/index/ddl`.
- `docs/.vitepress/config.mts` — VitePress config (base '/', cleanUrls, local search, UnoCSS, PWA). Markdown plugins registered there.

## Verification
- `pnpm run lint` (tsc --noEmit) and `pnpm run build` after changes.
- Smoke test dev server (`pnpm run dev`) — check crown icon renders, sidebar links resolve.

## User criteria per category (tier rubric)
- **Ad Blocking and Privacy**: blocking efficiency, extension integrity, open-source auditing. 👑 = daily-driver quality, non-technical usability; ⭐ = 95%+ block tests, cosmetic filtering, <50MB memory, MV3, zero-log; minimum = filters updated <30 days, no stealth monetization. Exemptions: Pi-hole-type network tools from "simple UI" rule.
- **Artificial Intelligence**: accessibility, open-source transparency, free tier value. 👑 = time-to-value, markdown UI, code-copy, chat history; ⭐ = no sign-up / OAuth only, open weights license allows local use, free tier ≥8k tokens + transparent limits; minimum = real free tier (not 3-day trial), no credit-card dark patterns.
- **Streaming**: source reliability, player optimization, ad-free UI. 👑 = buffer speed, layout, minimal click-through; ⭐ = true 1080p+, multiple subs, ≥3 sources/title, <3s init, no malicious redirects; minimum = library updated within 24h of airing, keyboard shortcuts. Exemptions: legendary archival index sites.
- **Listening**: streaming quality, hi-fi, discovery. 👑 = daily drivers, player design, discovery; ⭐ = ≥192kbps AAC / 320kbps MP3 / FLAC, genuine free perks, lightweight tools; minimum = high-uptime directories. Exemptions: niche genre archives/community radio.
- **Gaming**: trusted archives, emulation, browser games, preservation. 👑 = implicitly trusted, clean installers, curated; ⭐ = complete No-Intro/Redump sets, zero malware history, no throttling; minimum = community trust metrics (hashes, VirusTotal). Exemptions: legacy abandonware.
- **Reading**: immersion, typography, dark mode. 👑 = hours-long pleasant reading; ⭐ = clean ePUB/PDF structure, high-res scans, fast search, reliable trackers w/ API sync; minimum = active library, dead links purged. Exemptions: academic/open-license archives.
- **Torrenting**: decentralization, open-source verification, privacy. 👑 = pure performance, community reputation; ⭐ = 100% open-source clients, no-log VPNs w/ kill switch + P2P allowed, accurate peer health; minimum = modern protocol support (v2, DHT, PEX, magnets), no malicious scripts. Exemptions: legendary private trackers.
- **Downloading**: machine safety, payload execution, integrity, throughput. 👑 = clean UI, paste-and-walk ease, no fake download buttons; ⭐ = sandboxing/scanning pipelines, VirusTotal-clean executables, multithreaded pipelines, 4000+ day Usenet retention; minimum = impeccable reputation, no admin perms. Exemptions: archival freeware sites.

## Misc
- `docs/index.md` hero mentions "Site Under Construction"; features claim multi-source, quality verified, 20-entry cap.
- Media pages are verbatim FMHY dumps; old curation rubric below is retained for reference only.

## Statistics system (docs/.vitepress/theme/stats/)
- Every `.md` file is a page. Headings are tracked for **all** page types: the tree mirrors the right-side TOC/outline exactly (same `buildTree` pop rule: a heading pops its parent while `parent.level >= level`), so top-level headings are **departments**, their children **sections**, grandchildren **subsections** — regardless of absolute level (pages may start at H1, H2, or H3; e.g. `begin.md` has H2-only roots). Levels >3 are ignored. `lines` counts ONLY list-item lines (`- ` / `* ` / `+ ` / numbered) — plain text lines are ignored.
- `stats.data.ts` — `createContentLoader('**/*.md', { includeSrc })` → `PageStats` per page: `{ url, title, type, lines, listItems, departments[] }`. Parser skips YAML frontmatter, fenced blocks (```/~~~), HTML comments, and `***`/`---` rules; each scope stores its heading + anchor `slug` + direct lines/list items.
- **Gotcha**: content-loader `*.data.ts` build output exposes ONLY the `data` export — named helpers must live outside the loader. They're in `heading.ts` (`cleanHeading`, `slugify`; `slugify` approximates VitePress's github-slugger; keep `.toLowerCase()`). Do not import named exports from a `.data.ts`.
- `StatsPage.vue` — Statistics page at `/utilpages/stats` (`<StatsPage />`, utility type, sidebar "Miscellaneous → Statistics"). Renders summary cards, a filter, and an expandable page → department → section → subsection tree.
- `StatsInfo.vue` — mounted in `Layout.vue` `#layout-top`; injects `[i]` buttons into the right "On this page" TOC panel (`nav.VPDocAsideOutline`): hovering the `On this page` title → page stats, hovering a TOC link (`a.outline-link`) → that department/section/subsection's stats. Matching is by **index path**, NOT slug text: find the slug in `useData().page.headers` (VPHeader tree, order = parse order) → `number[]` path → `applyPath` maps `[h1i]`→department, `[h1i,h2i]`→section, `[h1i,h2i,h3i]`→subsection. The button attaches to the `a.outline-link` row itself (never `li` — it spans nested children height), host gets `position: relative; padding-right: 26px`, shown via CSS `a.outline-link:hover > .sii-chip`. Hovering the chip opens a **hover tooltip** (teleported to body, positioned left of the chip; chip keeps `.open` class so it stays visible; hides 150ms after the chip is left). Setup retries 10×100ms for hydration. Both components registered in `theme/index.ts`.
- **Required config** (already set in `config.mts`): `markdown.headers: { level: [1, 2, 3] }` — VitePress 1.6.4 does NOT extract page headers by default, and without it the TOC is empty; `themeConfig.outline: [1, 3]` — must include level 1 so departments (H1) appear as TOC links. Headers land in `env.headers` during `md.render` (NOT `md.headers`).
- Scope counting is per-scope-direct (a department's line count excludes its sections' lines); page totals are whole-file.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
