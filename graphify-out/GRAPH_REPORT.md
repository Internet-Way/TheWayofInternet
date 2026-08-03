# Graph Report - TheWayofInternet  (2026-08-03)

## Corpus Check
- 59 files · ~47,022 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 504 nodes · 675 edges · 69 communities (24 shown, 45 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `76491f6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Get Started Guide
- state.ts
- @iconify-json/carbon
- ThemeHandler (Singleton)
- config.mts
- ColorPicker.vue
- Per-Category Tier Rubric
- AGENTS.md — Agent Context
- index.ts
- devDependencies
- dependencies
- ThemePalette.vue
- scripts
- VPNav.vue
- blog.data.ts
- vue-shim.d.ts
- blog.md — BLOG Index
- iconLinks Social Icons
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
- Notes (testnote)
- Site Logo
- Storage (empty placeholder)
- feedback.md
- @iconify-json/fluent

## God Nodes (most connected - your core abstractions)
1. `ThemeHandler (Singleton)` - 24 edges
2. `Get Started Guide` - 19 edges
3. `ThemeHandler` - 14 edges
4. `Per-Category Tier Rubric` - 14 edges
5. `bitindex` - 13 edges
6. `Media Content Pipeline` - 12 edges
7. `begin.md — Piracy Knowledge Base` - 11 edges
8. `ColorPicker.vue` - 11 edges
9. `DisplayMode` - 9 edges
10. `theme-types.ts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `README.md — Project Overview` --conceptually_related_to--> `ThemeHandler (state.ts)`  [INFERRED]
  README.md → docs/.vitepress/theme/themes/state.ts
- `VitePress Site Config (config.mts)` --conceptually_related_to--> `MiniSearch Enhanced Local Search`  [INFERRED]
  docs/.vitepress/config.mts → README.md
- `AGENTS.md — Agent Context` --references--> `Sidebar Media Resources Section (meta.ts)`  [EXTRACTED]
  AGENTS.md → docs/.vitepress/core/meta.ts
- `AGENTS.md — Agent Context` --references--> `starredlink.ts — Star Link Styling`  [EXTRACTED]
  AGENTS.md → docs/.vitepress/plugins/markdown/starredlink.ts
- `AGENTS.md — Agent Context` --references--> `tooltip.ts — Note Tooltip Component`  [EXTRACTED]
  AGENTS.md → docs/.vitepress/plugins/markdown/tooltip.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage Features** — docs_index_multi_source, docs_index_quality_verified, docs_index_always_updated, docs_index_open_source, docs_index_highly_organized, docs_index_top_tier_only [EXTRACTED 0.75]

## Communities (69 total, 45 thin omitted)

### Community 0 - "Get Started Guide"
Cohesion: 0.11
Nodes (26): FMHY (fmhy.net), Base64 URL Encoding Practice, FitGirl Repacks, Microsoft Activation Scripts (MAS), begin.md — Piracy Knowledge Base, r/Piracy Megathread (rentry.org), How Torrenting Works, uBlock Origin (+18 more)

### Community 1 - "state.ts"
Cohesion: 0.08
Nodes (26): availableThemes, currentDisplayName, { themeName, setTheme, getAvailableThemes, state, mode }, themeRegistry, catppuccinTheme, draculaTheme, rosePineTheme, tokyoNightTheme (+18 more)

### Community 3 - "ThemeHandler (Singleton)"
Cohesion: 0.10
Nodes (40): applyTheme, Brand color interaction, Catppuccin Theme, Dynamic Color Themes (color-swarm), color-* dynamic themes, ColorPicker.vue, CSS Variables Reference, CSS variables mapping (+32 more)

### Community 4 - "config.mts"
Cohesion: 0.08
Nodes (27): config(), __dirname, envFile, feedbackWebhooks, unocssConfigPath, cfStart, commitRef, commitStart (+19 more)

### Community 5 - "ColorPicker.vue"
Cohesion: 0.11
Nodes (22): ColorNames, colorOptions, { frontmatter, page }, generateThemeFromColor(), normalizeColorName(), presetThemeNames, selectedColor, { setTheme, mode, themeName } (+14 more)

### Community 6 - "Per-Category Tier Rubric"
Cohesion: 0.06
Nodes (43): Artificial Intelligence Criteria, Media Content Pipeline, Downloading Criteria, Editors' Choice Tier, 20-Entry Cap Rule, FMHY Ordering Principle, FMHY Wiki Dump Sourcing, Gaming Criteria (+35 more)

### Community 7 - "AGENTS.md — Agent Context"
Cohesion: 0.11
Nodes (26): AGENTS.md — Agent Context, bun Toolchain & Scripts, VitePress config.mts, emojiMap, iconLinks, icon-transformer.ts, Markdown Plugins (markdown/), starredlink.ts (+18 more)

### Community 10 - "index.ts"
Cohesion: 0.13
Nodes (13): Contributor, contributors, { frontmatter }, avatarUrl, props, avatarUrls, filteredContributors, props (+5 more)

### Community 11 - "devDependencies"
Cohesion: 0.18
Nodes (11): @iconify-json/fluent-mdl2, @iconify-json/twemoji, @iconify/utils, @mdit/plugin-abbr, @mdit/plugin-icon, devDependencies, @iconify-json/fluent-mdl2, @iconify-json/twemoji (+3 more)

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

### Community 20 - "vue-shim.d.ts"
Cohesion: 0.40
Nodes (4): vitepress/dist/client/theme-default/components/VPNavBar.vue, vitepress/dist/client/theme-default/components/VPNavScreen.vue, vitepress/dist/client/theme-default/composables/nav, *.vue

### Community 36 - "Feedback.vue"
Cohesion: 0.09
Nodes (26): activeWebhook, buildFields(), colors, configured, contact, editWhat, editWhere, errorMsg (+18 more)

### Community 37 - "HeadingFeedback.vue"
Cohesion: 0.10
Nodes (16): { frontmatter }, clearPencils(), close(), configured, errorMsg, onKeydown(), open, openFor() (+8 more)

## Knowledge Gaps
- **186 isolated node(s):** `__dirname`, `unocssConfigPath`, `envFile`, `feedbackWebhooks`, `excluded` (+181 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `README.md — Project Overview` connect `AGENTS.md — Agent Context` to `ColorPicker.vue`, `Per-Category Tier Rubric`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `ThemeHandler (state.ts)` connect `ColorPicker.vue` to `AGENTS.md — Agent Context`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `index.md — Home Page` connect `Per-Category Tier Rubric` to `Get Started Guide`, `AGENTS.md — Agent Context`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **What connects `__dirname`, `unocssConfigPath`, `envFile` to the rest of the system?**
  _186 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Get Started Guide` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Should `state.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08163265306122448 - nodes in this community are weakly interconnected._
- **Should `ThemeHandler (Singleton)` be split into smaller, more focused modules?**
  _Cohesion score 0.10128205128205128 - nodes in this community are weakly interconnected._