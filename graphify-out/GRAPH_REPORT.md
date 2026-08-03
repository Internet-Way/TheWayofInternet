# Graph Report - TheWayofInternet  (2026-08-03)

## Corpus Check
- 62 files · ~88,292 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 527 nodes · 704 edges · 83 communities (25 shown, 58 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c783112c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Get Started Guide
- state.ts
- Torrenting (curated media page)
- ThemeHandler (Singleton)
- config.mts
- ColorPicker.vue
- bitindex
- AGENTS.md — Agent Context
- qBittorrent
- 1337x
- Contributors.vue
- devDependencies
- dependencies
- ThemePalette.vue
- scripts
- VPNav.vue
- Simkl
- blog.data.ts
- @iconify-json/fluent-mdl2
- Radarr
- vue-shim.d.ts
- blog.md — BLOG Index
- ExT (Indexer)
- Streaming (curated media page)
- animepahe
- Cineby
- Letterboxd
- Miruro
- Streamed
- iconLinks Social Icons
- m0nkrus
- Feedback.vue
- HeadingFeedback.vue
- @iconify-json/gravity-ui
- @iconify-json/heroicons-solid
- @iconify-json/logos
- @iconify-json/lucide
- @iconify-json/material-symbols
- @iconify-json/mdi
- @iconify-json/ph
- @iconify-json/qlementine-icons
- @iconify-json/simple-icons
- Per-Category Tier Rubric
- markdown-it
- @mdit/plugin-align
- @mdit/plugin-attrs
- @mdit/plugin-demo
- @mdit/plugin-footnote
- @mdit/plugin-img-size
- @mdit/plugin-ins
- @mdit/plugin-mark
- @mdit/plugin-spoiler
- @mdit/plugin-sub
- @mdit/plugin-sup
- @mdit/plugin-tab
- @mdit/plugin-tasklist
- sass
- sass-embedded
- @types/markdown-it
- @types/node
- @types/tinycolor2
- typescript
- unplugin-auto-import
- vite-plugin-optimize-exclude
- vite-plugin-pwa
- vite-plugin-terminal
- vite-plugin-vuetify
- vitepress
- vue
- @vue/compiler-sfc
- alternates.md — Alternatives Page
- rTorrent
- Pahe
- Notes (testnote)
- Site Logo
- Storage (empty placeholder)
- Media Content Pipeline
- The Top-Tier Only
- Safety First Rules
- feedback.md
- @iconify-json/fluent

## God Nodes (most connected - your core abstractions)
1. `ThemeHandler (Singleton)` - 24 edges
2. `Get Started Guide` - 21 edges
3. `Media Content Pipeline` - 18 edges
4. `ThemeHandler` - 14 edges
5. `Per-Category Tier Rubric` - 14 edges
6. `bitindex` - 13 edges
7. `begin.md — Piracy Knowledge Base` - 11 edges
8. `ColorPicker.vue` - 11 edges
9. `DisplayMode` - 9 edges
10. `theme-types.ts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `README.md — Project Overview` --conceptually_related_to--> `ThemeHandler (state.ts)`  [INFERRED]
  README.md → docs/.vitepress/theme/themes/state.ts
- `Per-Category Tier Rubric` --semantically_similar_to--> `Site Quality Control Criteria`  [INFERRED] [semantically similar]
  AGENTS.md → docs/begin.md
- `VitePress Site Config (config.mts)` --conceptually_related_to--> `MiniSearch Enhanced Local Search`  [INFERRED]
  docs/.vitepress/config.mts → README.md
- `AGENTS.md — Agent Context` --references--> `Sidebar Media Resources Section (meta.ts)`  [EXTRACTED]
  AGENTS.md → docs/.vitepress/core/meta.ts
- `AGENTS.md — Agent Context` --references--> `starredlink.ts — Star Link Styling`  [EXTRACTED]
  AGENTS.md → docs/.vitepress/plugins/markdown/starredlink.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage Features** — docs_index_multi_source, docs_index_quality_verified, docs_index_always_updated, docs_index_open_source, docs_index_highly_organized, docs_index_top_tier_only [EXTRACTED 0.75]

## Communities (83 total, 58 thin omitted)

### Community 0 - "Get Started Guide"
Cohesion: 0.14
Nodes (20): FMHY (fmhy.net), Base64 URL Encoding Practice, Microsoft Activation Scripts (MAS), begin.md — Piracy Knowledge Base, r/Piracy Megathread (rentry.org), How Torrenting Works, uBlock Origin, Unsafe Sites & Red Flags Knowledge (+12 more)

### Community 1 - "state.ts"
Cohesion: 0.07
Nodes (31): availableThemes, currentDisplayName, { themeName, setTheme, getAvailableThemes, state, mode }, content, iconClass, props, themeConfig, themeRegistry (+23 more)

### Community 3 - "ThemeHandler (Singleton)"
Cohesion: 0.10
Nodes (40): applyTheme, Brand color interaction, Catppuccin Theme, Dynamic Color Themes (color-swarm), color-* dynamic themes, ColorPicker.vue, CSS Variables Reference, CSS variables mapping (+32 more)

### Community 4 - "config.mts"
Cohesion: 0.08
Nodes (27): config(), __dirname, envFile, feedbackWebhooks, unocssConfigPath, cfStart, commitRef, commitStart (+19 more)

### Community 5 - "ColorPicker.vue"
Cohesion: 0.11
Nodes (22): ColorNames, colorOptions, { frontmatter, page }, generateThemeFromColor(), normalizeColorName(), presetThemeNames, selectedColor, { setTheme, mode, themeName } (+14 more)

### Community 6 - "bitindex"
Cohesion: 0.19
Nodes (14): Call for Contributors, blogs/notice.md — Site Notice, Site Under Construction Notice, ContributorList Component, Contributors Page, discord.md — Discord, Always Updated, Site Under Construction (+6 more)

### Community 7 - "AGENTS.md — Agent Context"
Cohesion: 0.11
Nodes (25): AGENTS.md — Agent Context, bun Toolchain & Scripts, VitePress config.mts, emojiMap, iconLinks, icon-transformer.ts, Markdown Plugins (markdown/), starredlink.ts (+17 more)

### Community 8 - "qBittorrent"
Cohesion: 0.50
Nodes (4): Deluge, qBittorrent, Transmission, Stremio

### Community 10 - "Contributors.vue"
Cohesion: 0.20
Nodes (8): Contributor, contributors, { frontmatter }, avatarUrl, props, avatarUrls, filteredContributors, props

### Community 11 - "devDependencies"
Cohesion: 0.18
Nodes (11): @iconify-json/carbon, @iconify-json/twemoji, @iconify/utils, @mdit/plugin-abbr, @mdit/plugin-icon, devDependencies, @iconify-json/carbon, @iconify-json/twemoji (+3 more)

### Community 12 - "dependencies"
Cohesion: 0.05
Nodes (43): consola, feed, floating-vue, @headlessui/vue, mark.js, @mdi/font, minisearch, nprogress (+35 more)

### Community 13 - "ThemePalette.vue"
Cohesion: 0.25
Nodes (6): applyTheme(), currentThemeName, dropdownRef, isOpen, selectTheme(), standardThemes

### Community 14 - "scripts"
Cohesion: 0.22
Nodes (8): scripts, build, dev, docs:build, docs:dev, docs:preview, lint, type

### Community 15 - "VPNav.vue"
Cohesion: 0.25
Nodes (6): { frontmatter }, hasNavbar, isHidden, { isScreenOpen, closeScreen, toggleScreen }, { width }, { y }

### Community 17 - "blog.data.ts"
Cohesion: 0.33
Nodes (4): BlogData, BlogEntry, categorize(), processBlogPosts()

### Community 19 - "Radarr"
Cohesion: 0.40
Nodes (5): cross-seed, Jackett, Prowlarr, Radarr, Sonarr

### Community 20 - "vue-shim.d.ts"
Cohesion: 0.40
Nodes (4): vitepress/dist/client/theme-default/components/VPNavBar.vue, vitepress/dist/client/theme-default/components/VPNavScreen.vue, vitepress/dist/client/theme-default/composables/nav, *.vue

### Community 36 - "Feedback.vue"
Cohesion: 0.09
Nodes (26): activeWebhook, buildFields(), colors, configured, contact, editWhat, editWhere, errorMsg (+18 more)

### Community 37 - "HeadingFeedback.vue"
Cohesion: 0.11
Nodes (14): { frontmatter }, clearPencils(), close(), configured, errorMsg, onKeydown(), open, openFor() (+6 more)

### Community 47 - "Per-Category Tier Rubric"
Cohesion: 0.15
Nodes (17): Artificial Intelligence Criteria, Downloading Criteria, Gaming Criteria, Listening Criteria, Ad Blocking & Privacy Criteria, Reading Criteria, Streaming Criteria, Per-Category Tier Rubric (+9 more)

### Community 241 - "Media Content Pipeline"
Cohesion: 0.24
Nodes (10): Media Content Pipeline, 20-Entry Cap Rule, FMHY Wiki Dump Sourcing, H1 Heading Rules, Curated Media Pages (docs/media), Media Resources Sidebar Section, core/meta.ts (nav & sidebar), Lint/Build Verification Workflow (+2 more)

### Community 242 - "The Top-Tier Only"
Cohesion: 0.22
Nodes (9): Editors' Choice Tier, FMHY Ordering Principle, Minimum Tier, Star Tier, Tier Markers (crown/star/plain), Quality Over Quantity, Quality Verified, The Top-Tier Only (+1 more)

### Community 243 - "Safety First Rules"
Cohesion: 0.40
Nodes (6): FMHY (Free Media Heck Yeah), r/Piracy Megathread, Safety First Rules, uBlock Origin, Unsafe Site Lists, Big Wiki Noise Problem

## Knowledge Gaps
- **205 isolated node(s):** `__dirname`, `unocssConfigPath`, `envFile`, `feedbackWebhooks`, `excluded` (+200 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `README.md — Project Overview` connect `AGENTS.md — Agent Context` to `ColorPicker.vue`, `bitindex`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `ThemeHandler (state.ts)` connect `ColorPicker.vue` to `AGENTS.md — Agent Context`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `index.md — Home Page` connect `bitindex` to `Get Started Guide`, `Media Content Pipeline`, `AGENTS.md — Agent Context`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Get Started Guide` (e.g. with `downloading.md — Downloading` and `privacy.md — Ad Blocking and Privacy`) actually correct?**
  _`Get Started Guide` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Media Content Pipeline` (e.g. with `Lint/Build Verification Workflow` and `Quality-Over-Quantity Curation Goal`) actually correct?**
  _`Media Content Pipeline` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `__dirname`, `unocssConfigPath`, `envFile` to the rest of the system?**
  _205 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Get Started Guide` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._