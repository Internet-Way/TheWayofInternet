# Graph Report - TheWayofInternet  (2026-08-06)

## Corpus Check
- 67 files · ~52,787 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 625 nodes · 840 edges · 101 communities (40 shown, 61 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.71)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `274cf139`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Get Started Guide
- StatsPage.vue
- Department 1
- ThemeHandler (Singleton)
- config.mts
- Theme System — Developer Guide
- Per-Category Tier Rubric
- AGENTS.md — Agent Context
- index.ts
- devDependencies
- dependencies
- SettingsMenu.vue
- scripts
- VPNav.vue
- state.ts
- vue-shim.d.ts
- blog.md — BLOG Index
- Media Content Pipeline
- bitindex
- The Top-Tier Only
- Safety First Rules
- test.md
- iconLinks Social Icons
- floating-vue
- @iconify-json/material-symbols
- Feedback.vue
- HeadingFeedback.vue
- theme-types.ts
- @iconify-json/heroicons-solid
- @iconify-json/logos
- @iconify-json/lucide
- compilerOptions
- @iconify-json/mdi
- @iconify-json/ph
- @iconify-json/qlementine-icons
- @iconify-json/simple-icons
- ThemeHandler
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
- vitepress
- @iconify-json/fluent
- @iconify-json/carbon
- mark.js
- StatsInfo.vue
- nprogress
- pathe
- reka-ui
- @resvg/resvg-js
- tinycolor2
- @types/nprogress
- unocss
- @unocss/preset-icons
- vuetify
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
- @vueuse/core
- vue
- @vue/compiler-sfc
- @vueuse/integrations
- x-satori
- zod
- minisearch
- @headlessui/vue
- @iconify-json/fluent-mdl2
- alternates.md — Alternatives Page
- Notes (testnote)
- Site Logo
- Storage (empty placeholder)

## God Nodes (most connected - your core abstractions)
1. `ThemeHandler (Singleton)` - 24 edges
2. `ThemeHandler` - 19 edges
3. `Get Started Guide` - 19 edges
4. `Per-Category Tier Rubric` - 14 edges
5. `compilerOptions` - 13 edges
6. `Media Content Pipeline` - 12 edges
7. `bitindex` - 12 edges
8. `useTheme()` - 11 edges
9. `begin.md — Piracy Knowledge Base` - 11 edges
10. `ColorPicker.vue` - 11 edges

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

## Communities (101 total, 61 thin omitted)

### Community 0 - "Get Started Guide"
Cohesion: 0.14
Nodes (20): FMHY (fmhy.net), Base64 URL Encoding Practice, FitGirl Repacks, Microsoft Activation Scripts (MAS), begin.md — Piracy Knowledge Base, r/Piracy Megathread (rentry.org), How Torrenting Works, uBlock Origin (+12 more)

### Community 1 - "StatsPage.vue"
Cohesion: 0.10
Nodes (20): cleanHeading(), slugify(), buildPageStats(), MutableScope, PageStats, Parsed, parsePage(), ScopeStats (+12 more)

### Community 2 - "Department 1"
Cohesion: 0.12
Nodes (16): Department 1, Department 2, Section 1, Section 2, Section 3, Section 4, Section 5, Section 6 (+8 more)

### Community 3 - "ThemeHandler (Singleton)"
Cohesion: 0.10
Nodes (40): applyTheme, Brand color interaction, Catppuccin Theme, Dynamic Color Themes (color-swarm), color-* dynamic themes, ColorPicker.vue, CSS Variables Reference, CSS variables mapping (+32 more)

### Community 4 - "config.mts"
Cohesion: 0.07
Nodes (30): config(), __dirname, envFile, feedbackWebhooks, unocssConfigPath, cfStart, commitRef, commitStart (+22 more)

### Community 5 - "Theme System — Developer Guide"
Cohesion: 0.23
Nodes (12): AMOLED Pure-Black Toggle, Modes-Themes Orthogonality Principle, Theme System — Developer Guide, writeCSS CSS Variable Mapping, Catppuccin Theme, DisplayMode (light/dark), Dracula Theme, Rosé Pine Theme (+4 more)

### Community 6 - "Per-Category Tier Rubric"
Cohesion: 0.17
Nodes (13): Artificial Intelligence Criteria, Downloading Criteria, Gaming Criteria, Listening Criteria, Minimum Tier, Ad Blocking & Privacy Criteria, Reading Criteria, Star Tier (+5 more)

### Community 7 - "AGENTS.md — Agent Context"
Cohesion: 0.11
Nodes (26): AGENTS.md — Agent Context, bun Toolchain & Scripts, VitePress config.mts, emojiMap, iconLinks, icon-transformer.ts, Markdown Plugins (markdown/), starredlink.ts (+18 more)

### Community 10 - "index.ts"
Cohesion: 0.08
Nodes (20): Contributor, contributors, BlogData, BlogEntry, categorize(), processBlogPosts(), contributors, dateLabel (+12 more)

### Community 11 - "devDependencies"
Cohesion: 0.18
Nodes (11): @iconify-json/gravity-ui, @iconify-json/twemoji, @iconify/utils, @mdit/plugin-abbr, @mdit/plugin-icon, devDependencies, @iconify-json/gravity-ui, @iconify-json/twemoji (+3 more)

### Community 12 - "dependencies"
Cohesion: 0.22
Nodes (9): consola, feed, @mdi/font, dependencies, consola, feed, @mdi/font, @unocss/preset-uno (+1 more)

### Community 13 - "SettingsMenu.vue"
Cohesion: 0.10
Nodes (18): accentOpen, currentAccent, currentFont, currentPreset, fontOpen, locked, {
  mode,
  accent,
  preset,
  font,
  accentBg,
  accentBgIntensity,
  isPresetActive,
  setAccent,
  setPreset,
  setFont,
  setAccentBg,
  setAccentBgIntensity,
  toggleMode,
  accentOptions,
  presetOptions,
  fontOptions,
}, onIntensityInput() (+10 more)

### Community 14 - "scripts"
Cohesion: 0.22
Nodes (8): scripts, build, dev, docs:build, docs:dev, docs:preview, lint, type

### Community 15 - "VPNav.vue"
Cohesion: 0.25
Nodes (6): { frontmatter }, hasNavbar, isHidden, { isScreenOpen, closeScreen, toggleScreen }, { width }, { y }

### Community 17 - "state.ts"
Cohesion: 0.11
Nodes (20): ACCENT_TINT_TOKENS, AccentOption, accentOptions, DERIVE_STEPS, FontOption, fontOptionNames, fontOptions, generateAccentTheme() (+12 more)

### Community 20 - "vue-shim.d.ts"
Cohesion: 0.40
Nodes (4): vitepress/dist/client/theme-default/components/VPNavBar.vue, vitepress/dist/client/theme-default/components/VPNavScreen.vue, vitepress/dist/client/theme-default/composables/nav, *.vue

### Community 22 - "Media Content Pipeline"
Cohesion: 0.20
Nodes (12): Media Content Pipeline, 20-Entry Cap Rule, FMHY Wiki Dump Sourcing, H1 Heading Rules, Curated Media Pages (docs/media), Media Resources Sidebar Section, core/meta.ts (nav & sidebar), Lint/Build Verification Workflow (+4 more)

### Community 23 - "bitindex"
Cohesion: 0.25
Nodes (9): Call for Contributors, Site Under Construction Notice, Always Updated, Site Under Construction, bitindex, Community Driven Feature Removal, Highly Organized, Multi-Source (+1 more)

### Community 24 - "The Top-Tier Only"
Cohesion: 0.33
Nodes (6): Editors' Choice Tier, FMHY Ordering Principle, Quality Over Quantity, Quality Verified, The Top-Tier Only, 20-Entry Cap Rationale

### Community 25 - "Safety First Rules"
Cohesion: 0.40
Nodes (6): FMHY (Free Media Heck Yeah), r/Piracy Megathread, Safety First Rules, uBlock Origin, Unsafe Site Lists, Big Wiki Noise Problem

### Community 26 - "test.md"
Cohesion: 0.50
Nodes (3): Testing Auto Bold, Testing Icon-Transformer, Testing Tooltip

### Community 36 - "Feedback.vue"
Cohesion: 0.09
Nodes (26): activeWebhook, buildFields(), colors, configured, contact, editWhat, editWhere, errorMsg (+18 more)

### Community 37 - "HeadingFeedback.vue"
Cohesion: 0.11
Nodes (17): { frontmatter }, clearPencils(), close(), configured, errorMsg, onKeydown(), open, openFor() (+9 more)

### Community 38 - "theme-types.ts"
Cohesion: 0.17
Nodes (13): themeRegistry, catppuccinTheme, draculaTheme, rosePineTheme, tokyoNightTheme, AltButtonColors, BlockColorScheme, BrandButtonColors (+5 more)

### Community 42 - "compilerOptions"
Cohesion: 0.09
Nodes (22): docs/.vitepress/core/vue-shim.d.ts, docs/.vitepress/**/*.mts, docs/.vitepress/**/*.ts, DOM, DOM.Iterable, ES2022, node, unocss.config.ts (+14 more)

### Community 47 - "ThemeHandler"
Cohesion: 0.30
Nodes (4): hasDocument(), isBrowser(), readStorage(), ThemeHandler

### Community 65 - "StatsInfo.vue"
Cohesion: 0.12
Nodes (28): applyPath(), attachTo(), cancelHide(), cleanup(), detach(), findPage(), findPath(), hideTip() (+20 more)

## Knowledge Gaps
- **254 isolated node(s):** `__dirname`, `unocssConfigPath`, `envFile`, `feedbackWebhooks`, `excluded` (+249 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@iconify-json/material-symbols`, `@iconify-json/heroicons-solid`, `@iconify-json/logos`, `@iconify-json/lucide`, `@iconify-json/mdi`, `@iconify-json/ph`, `@iconify-json/qlementine-icons`, `@iconify-json/simple-icons`, `markdown-it`, `@mdit/plugin-align`, `@mdit/plugin-attrs`, `@mdit/plugin-demo`, `@mdit/plugin-footnote`, `@mdit/plugin-img-size`, `@mdit/plugin-ins`, `@mdit/plugin-mark`, `@mdit/plugin-spoiler`, `@mdit/plugin-sub`, `@mdit/plugin-sup`, `@mdit/plugin-tab`, `@mdit/plugin-tasklist`, `vitepress`, `@iconify-json/fluent`, `@iconify-json/carbon`, `sass`, `sass-embedded`, `@types/markdown-it`, `@types/node`, `@types/tinycolor2`, `typescript`, `unplugin-auto-import`, `vite-plugin-optimize-exclude`, `vite-plugin-pwa`, `vite-plugin-terminal`, `vite-plugin-vuetify`, `vue`, `@vue/compiler-sfc`, `@iconify-json/fluent-mdl2`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `README.md — Project Overview` connect `AGENTS.md — Agent Context` to `Theme System — Developer Guide`, `Media Content Pipeline`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `mark.js`, `nprogress`, `pathe`, `reka-ui`, `@resvg/resvg-js`, `tinycolor2`, `@types/nprogress`, `unocss`, `@unocss/preset-icons`, `vuetify`, `scripts`, `@vueuse/core`, `@vueuse/integrations`, `x-satori`, `zod`, `minisearch`, `@headlessui/vue`, `floating-vue`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `__dirname`, `unocssConfigPath`, `envFile` to the rest of the system?**
  _254 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Get Started Guide` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Should `StatsPage.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.10153846153846154 - nodes in this community are weakly interconnected._
- **Should `Department 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._