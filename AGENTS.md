# bitindex — Agent Context

## Project
- VitePress site at `docs/`, source resources at `reso/` (FMHY wiki dumps).
- Package manager: **bun** (pnpm-lock.yaml removed; use `bun install`). Node is NOT installed on this machine.
- Scripts (package.json): `bun run dev` (port 3000), `bun run build`, `bun run lint` (tsc --noEmit), `docs:dev`, `docs:build`, `docs:preview`.

## Content pipeline (media category pages)
- Source files: `reso/{privacy,ai,video,audio,gaming,reading,torrenting,downloading}.md` — FMHY wiki copies.
- Output: `docs/media/{privacy,ai,video,audio,gaming,reading,torrenting,downloading}.md` — curated pages, **max 20 entries each** (site-wide rule: "strictly capped at 20 entries").
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
  Privacy/Adblocking → `/media/privacy`, AI → `/media/ai`, Streaming → `/media/video`, Listening → `/media/audio`, Gaming → `/media/gaming`, Reading → `/media/reading`, Torrenting → `/media/torrenting`, Downloading → `/media/downloading`.
- `docs/.vitepress/config.mts` — VitePress config (base '/', cleanUrls, local search, UnoCSS, PWA). Markdown plugins registered there.

## Verification
- `bun run lint` (tsc --noEmit) and `bun run build` after changes.
- Smoke test dev server (`bun run dev`) — check crown icon renders, sidebar links resolve.

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
- Ignore reso files not in the mapping (developer-tools.md, misc.md, mobile.md, etc.) unless explicitly asked.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
