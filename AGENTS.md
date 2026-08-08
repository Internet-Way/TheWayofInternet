# bitindex — Agent Context

## Project
- VitePress site at `docs/` (FMHY wiki dumps used directly as the media pages).
- Package manager: **pnpm** (`pnpm install`; `node_modules/.pnpm` layout; bun is NOT installed). Node is installed (pnpm 11.1.2).
- Scripts (package.json): `pnpm run dev` (port 3000), `pnpm run build`, `pnpm run lint` (tsc --noEmit), `docs:dev`, `docs:build`, `docs:preview`.

## Page frontmatter (REQUIRED on every .md except `index.md`)
- Four page types; the header is rendered from frontmatter (not an H1 in the body — no H1s in bodies).
- **Every page carries `id`** — a **3-digit number** (e.g. `id: 007`, `id: 021`) for stable page identity. IDs are assigned sequentially across the whole site (see list under Misc); assign the next free number to new pages.
- **`id` is independent of the URL.** URLs are driven by file location + `rewrites` (below); renaming/moving a file does not change its `id`.
- **`subtitle`** is the shared "tagline" field: utility pages use `subtitle` directly; index/blog pages may override `description` with `subtitle` (the header renders `subtitle || description`). On blog posts, subtitle/description sits inline as `subtitle • date • editor`.
  - **index** — `title`, `description`, `icon`, `id`, `type: index`. Renders icon + gradient title + subtitle via `PageHeader.vue` → `PageTitle.vue`.
    `icon` is an iconify class (e.g. `i-twemoji-shield`) or a raw emoji mapped by `emojiMap` (`icon-transformer.ts`). New `i-twemoji-*` icons must be added to the safelist in `unocss.config.ts`.
  - **blog** — `title`, `description`, `id`, `type: blog`, `date` (YYYY-MM-DD), `contributors: [ID]` (contributor IDs from `core/contributors.ts`, e.g. `[1320]`). Blog posts must include `<Post />` as the first line of the body — it renders the header (title + subtitle, with `subtitle • date • editor` inline on one line) via `BlogPost.vue`. `PageHeader` skips blog pages.
  - **utility** — `title`, `subtitle`, `id`, `type: utility`. Renders title + subtitle via `PageHeader.vue`.
  - **special** — `title`, `subtitle`, `id`, `type: special`. Renders like utility/index via `PageHeader.vue` (accepted by `PageHeader` show-rule; stats `type` = 'special').
- Current file layout + ids (posts under `blogs/` keep the `/blogs/` URL prefix):
  - root: `get-started.md` (001), `testindex.md` (005)
  - `index/` → `/…`: privacy (006), ai (007), video (008), audio (009), gaming (010), reading (011), torrenting (012), ddl (013), storage (014), noneng (015)
  - `special/` → `/…`: begin (002), choice (003), alternates (004), blog (016)
  - `utilpages/` → `/…`: contributors (018), discord (019), feedback (020), stats (021), notes (017)
  - `blogs/` → `/blogs/…`: notice (022), test (023)
- `docs/index/{privacy,ai,video,audio,gaming,reading,torrenting,ddl}.md` are the 8 media stub pages (sidebar links `/index/*`).

## Content pipeline (media category pages)
- Media category pages live at `docs/index/{privacy,ai,video,audio,gaming,reading,torrenting,ddl,storage,noneng}.md` — currently frontmatter-only stubs (no H1 in body; header comes from frontmatter). When curated from FMHY wiki dumps, apply the rules below:
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
- `icon-transformer.ts` — `unicodeEmojiPlugin` maps raw unicode emojis → twemoji icon spans via `emojiMap` (⭐ → star, 🌟 → glowing-star, etc.). **👑 → 'crown' was added here** (user's preferred approach for the crown; verified `crown` icon exists in `@iconify-json/twemoji`). Also exports `defs` (emoji shortcode keys incl. markers) and `emojiRender` (renderer rule that wraps marker aliases).
- `markers.ts` — **Marker icons** registry + rendering: `MARKER_ALIASES` maps shortcodes (`:windows:`, `:linux:`, `:mac:`, `:android:`, `:ios:`, `:notoss:`, `:usecrack:`, `:webapp:`, `:chromium:`, `:gecko:`, `:nsfw:`, `:userscript:`, plus `star`/`glowing-star`) to `{ icon, label }`. Any line containing a marker is "marked" (e.g. `:notoss:` → closed source). `renderMarkerHtml()` emits `<span class="marker-tip" data-marker data-tip>` wrappers; `collectMarkersInLine()` is the raw-source scanner shared with stats. ⭐/🌟 raw unicode also become markers via `emojiRender`/`unicodeEmojiPlugin`. Marker icon classes are safelisted in `unocss.config.ts`.
- `starredlink.ts` — links whose inline content contains 🌟 get bold+italic, ⭐ gets bold. Runs after inline; checks raw token.content.
- `tooltip.ts` — converts `[Note](/notes#id)` links into Tooltip components.
- `icon-transformer.ts` `iconLinks` — link text matching social names (Discord/GitHub/etc.) renders as simple-icons spans.

## Theme config
- **URL flattening via `rewrites`** (`config.mts`): a `rewrites` function strips the first path segment from every page so ANY folder's pages serve at the site root — `index/ai.md` → `/ai`, `special/begin.md` → `/begin`, `utilpages/stats.md` → `/stats` — **except `blogs/`, which keeps its prefix** (`blogs/notice.md` → `/blogs/notice`). Moving a file between folders therefore never changes its URL (matches the `id`-is-stable rule above). The dev server serves the same rewritten paths; build output (`docs/.vitepress/dist/`) is flattened the same way. Sidebar/nav links in `meta.ts` must use the flattened URLs.
- `docs/.vitepress/core/meta.ts` — `nav`, `sidebar`. Sidebar has a **"Media Resources"** section (enabled) with 8 items:
  Privacy/Adblocking → `/privacy`, AI → `/ai`, Streaming → `/video`, Listening → `/audio`, Gaming → `/gaming`, Reading → `/reading`, Torrenting → `/torrenting`, Downloading → `/ddl` (all flattened; see rewrites above).
- `docs/.vitepress/config.mts` — VitePress config (base '/', cleanUrls, rewrites, local search, UnoCSS, PWA). Markdown plugins registered there.
- `plugins/vite/tooltip-plugin.ts` — the `[Note](/notes#…)` tooltip registry now resolves the notes file from `docs/utilpages/notes.md` (it moved out of the root).

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
- `stats.data.ts` — `createContentLoader('**/*.md', { includeSrc })` → `PageStats` per page: `{ url, title, type, lines, markers, departments[] }`. Parser skips YAML frontmatter, fenced blocks (```/~~~), HTML comments, and `***`/`---` rules; each scope stores its heading + anchor `slug` + direct lines/list items. **Marker tracking**: each list line is also scanned by `collectMarkersInLine()` (from `plugins/markdown/markers.ts`); `markers: Record<shortcode, lines>` lives on both `PageStats` and every `ScopeStats`.
- **Gotcha**: content-loader `*.data.ts` build output exposes ONLY the `data` export — named helpers must live outside the loader. They're in `heading.ts` (`cleanHeading`, `slugify`; `slugify` approximates VitePress's github-slugger; keep `.toLowerCase()`). Do not import named exports from a `.data.ts`.
- `StatsPage.vue` — Statistics page at `/utilpages/stats` (`<StatsPage />`, utility type, sidebar "Miscellaneous → Statistics"). Three blocks, all rendered as the same `.stats-tree` div-grid (`.tree-row` rows + `.tree-head` header row, `.two-col` variant): (1) **At a Glance** — metric/count rows (pages, index pages, blog pages, lines, departments, sections, subsections, marked lines); (2) **Markers** — one row per marker shortcode present (twemoji icon with `.marker-tip` hover tooltip + label + total marked lines, sorted desc); (3) **Pages** — a filter + expand/collapse actions + a tree showing **only index pages**: grid `Name | ⭐ | 🌟 | Lines` (4 columns); star/glowing-star counts per row come from `markers['star']`/`markers['glowing-star']` on the page/scope stats. Each index page is a group row with a caret; expanding it animates in its department → section → subsection rows (`TransitionGroup`). Whole expandable row is clickable (`@click` toggles, caret `.stop`s the event), caret is a rotating chevron SVG, and rows are keyed by page url + numeric index path (`${url}#${di}[.si][.xi]`). Rows outside the "On this page" semantics match the `tree-scope-*` classes. Non-index pages only affect totals. Tree-link hrefs go through `hrefOf` (strips the `index|special|utilpages` folder prefix so they link to the flattened URLs). Filtering expands all matches; clearing collapses.
- `StatsInfo.vue` — mounted in `Layout.vue` `#layout-top`; injects stats chips into the right "On this page" TOC panel (`nav.VPDocAsideOutline`): hovering the `On this page` title → page stats, hovering a TOC link (`a.outline-link`) → that department/section/subsection's stats. Matching is by **index path**, NOT slug text: find the slug in `useData().page.headers` (VPHeader tree, order = parse order) → `number[]` path → `applyPath` maps `[h1i]`→department, `[h1i,h2i]`→section, `[h1i,h2i,h3i]`→subsection. Page lookup `findPage` normalizes through `normPath` (strips a leading `index|special|utilpages` segment + trailing slash) so chips also match when a rewritten route (e.g. `/ai`) or its raw folder route (`/index/ai`) is active in dev/prod. The chip is a bar-chart SVG (`svg.sii-icon`, NOT the old `i` letter) attached to the `a.outline-link` row itself (never `li` — it spans nested children height), host gets `position: relative; padding-right: 26px`, shown via CSS `a.outline-link:hover > .sii-chip`. Hovering the chip opens a **hover tooltip** (teleported to body, positioned left of the chip; chip keeps `.open` class so it stays visible; hides 150ms after the chip is left). Setup retries 10×100ms for hydration. Both components registered in `theme/index.ts`.
- `Layout.vue` (theme/core/) — forces `aside: false` + `outline: false` in frontmatter for pages whose `type` is `blog` or `utility` (watched on route change), so those pages never show the "On this page" content panel (and no stats chips there).
- `MarkerTip.vue` — mounted in `Layout.vue` `#layout-top`; body-teleported hover popup for marker icons (`.marker-tip[data-tip]`). Delegated `pointerover`/`pointerout` on `document`; positions the popup above the icon (flips below when near viewport top), hides on scroll/resize. Skipped on touch devices (`(hover: hover)`).
- **Show Stats Button setting** — `stats/settings.ts` exposes module-level `showStatsButton` ref (persisted in localStorage key `bitindex-stats-button`, default ON) + `setShowStatsButton`. Toggled from `SettingsMenu.vue` ("Show Stats Button" group). `StatsInfo.vue` `setup()` early-returns when off (chips are removed) and watches the ref to re-setup on change; SettingsMenu watches it to stay in sync.
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
