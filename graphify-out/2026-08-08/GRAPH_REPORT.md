# Graph Report - TheWayofInternet  (2026-08-08)

## Corpus Check
- 71 files · ~54,568 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 673 nodes · 897 edges · 97 communities (39 shown, 58 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.71)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `44eeb5c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Get Started Guide
- StatsPage.vue
- Department 1
- ThemeHandler (Singleton)
- config.mts
- Theme System — Developer Guide
- SettingsMenu.vue
- AGENTS.md — Agent Context
- index.ts
- devDependencies
- dependencies
- begin.md
- scripts
- VPNav.vue
- state.ts
- vue-shim.d.ts
- feed
- @iconify-json/fluent
- test.md
- iconLinks Social Icons
- @iconify-json/material-symbols
- Feedback.vue
- HeadingFeedback.vue
- @mdit/plugin-spoiler
- @iconify-json/heroicons-solid
- @iconify-json/logos
- @iconify-json/lucide
- compilerOptions
- @iconify-json/mdi
- @iconify-json/ph
- @iconify-json/qlementine-icons
- @iconify-json/simple-icons
- notes.md
- markdown-it
- @mdit/plugin-align
- @mdit/plugin-demo
- @mdit/plugin-footnote
- @mdit/plugin-img-size
- @mdit/plugin-ins
- @mdit/plugin-mark
- @iconify-json/gravity-ui
- @mdit/plugin-sub
- @mdit/plugin-sup
- @mdit/plugin-tab
- @mdit/plugin-tasklist
- vitepress
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
- Site Logo

## God Nodes (most connected - your core abstractions)
1. `ThemeHandler (Singleton)` - 24 edges
2. `ThemeHandler` - 19 edges
3. `Get Started Guide` - 14 edges
4. `compilerOptions` - 13 edges
5. `Media Content Pipeline` - 12 edges
6. `Per-Category Tier Rubric` - 12 edges
7. `bitindex` - 12 edges
8. `useTheme()` - 11 edges
9. `ColorPicker.vue` - 11 edges
10. `DisplayMode` - 9 edges

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

## Communities (97 total, 58 thin omitted)

### Community 0 - "Get Started Guide"
Cohesion: 0.05
Nodes (53): Artificial Intelligence Criteria, Media Content Pipeline, Downloading Criteria, Editors' Choice Tier, 20-Entry Cap Rule, FMHY Ordering Principle, FMHY Wiki Dump Sourcing, Gaming Criteria (+45 more)

### Community 1 - "StatsPage.vue"
Cohesion: 0.10
Nodes (21): collectMarkersInLine(), cleanHeading(), slugify(), buildPageStats(), MutableScope, PageStats, Parsed, parsePage() (+13 more)

### Community 2 - "Department 1"
Cohesion: 0.12
Nodes (16): Department 1, Department 2, Section 1, Section 2, Section 3, Section 4, Section 5, Section 6 (+8 more)

### Community 3 - "ThemeHandler (Singleton)"
Cohesion: 0.10
Nodes (40): applyTheme, Brand color interaction, Catppuccin Theme, Dynamic Color Themes (color-swarm), color-* dynamic themes, ColorPicker.vue, CSS Variables Reference, CSS variables mapping (+32 more)

### Community 4 - "config.mts"
Cohesion: 0.06
Nodes (35): config(), __dirname, envFile, feedbackWebhooks, unocssConfigPath, cfStart, commitRef, commitStart (+27 more)

### Community 5 - "Theme System — Developer Guide"
Cohesion: 0.23
Nodes (12): AMOLED Pure-Black Toggle, Modes-Themes Orthogonality Principle, Theme System — Developer Guide, writeCSS CSS Variable Mapping, Catppuccin Theme, DisplayMode (light/dark), Dracula Theme, Rosé Pine Theme (+4 more)

### Community 6 - "SettingsMenu.vue"
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

### Community 7 - "AGENTS.md — Agent Context"
Cohesion: 0.10
Nodes (27): AGENTS.md — Agent Context, bun Toolchain & Scripts, VitePress config.mts, emojiMap, FMHY (fmhy.net), iconLinks, icon-transformer.ts, Markdown Plugins (markdown/) (+19 more)

### Community 10 - "index.ts"
Cohesion: 0.08
Nodes (20): Contributor, contributors, BlogData, BlogEntry, categorize(), processBlogPosts(), contributors, dateLabel (+12 more)

### Community 11 - "devDependencies"
Cohesion: 0.18
Nodes (11): @iconify-json/twemoji, @iconify/utils, @mdit/plugin-abbr, @mdit/plugin-attrs, @mdit/plugin-icon, devDependencies, @iconify-json/twemoji, @iconify/utils (+3 more)

### Community 12 - "dependencies"
Cohesion: 0.22
Nodes (9): consola, floating-vue, @mdi/font, dependencies, consola, floating-vue, @mdi/font, @unocss/preset-uno (+1 more)

### Community 13 - "begin.md"
Cohesion: 0.06
Nodes (31): Android, 📚 Base64: The Pirate's Secret Code, Common Red Flags & Unsafe Networks, 📖 Core Terminology, Finding Software Safely, General Terms, 🧭 Going Further, How to decode it (+23 more)

### Community 14 - "scripts"
Cohesion: 0.22
Nodes (8): scripts, build, dev, docs:build, docs:dev, docs:preview, lint, type

### Community 15 - "VPNav.vue"
Cohesion: 0.25
Nodes (6): { frontmatter }, hasNavbar, isHidden, { isScreenOpen, closeScreen, toggleScreen }, { width }, { y }

### Community 17 - "state.ts"
Cohesion: 0.06
Nodes (40): themeRegistry, catppuccinTheme, draculaTheme, rosePineTheme, tokyoNightTheme, ACCENT_TINT_TOKENS, AccentOption, accentOptions (+32 more)

### Community 20 - "vue-shim.d.ts"
Cohesion: 0.40
Nodes (4): vitepress/dist/client/theme-default/components/VPNavBar.vue, vitepress/dist/client/theme-default/components/VPNavScreen.vue, vitepress/dist/client/theme-default/composables/nav, *.vue

### Community 26 - "test.md"
Cohesion: 0.40
Nodes (4): Testing Auto Bold, Testing Icon-Transformer, Testing Markers, Testing Tooltip

### Community 36 - "Feedback.vue"
Cohesion: 0.09
Nodes (26): activeWebhook, buildFields(), colors, configured, contact, editWhat, editWhere, errorMsg (+18 more)

### Community 37 - "HeadingFeedback.vue"
Cohesion: 0.08
Nodes (24): { frontmatter }, clearPencils(), close(), configured, errorMsg, onKeydown(), open, openFor() (+16 more)

### Community 42 - "compilerOptions"
Cohesion: 0.09
Nodes (22): docs/.vitepress/core/vue-shim.d.ts, docs/.vitepress/**/*.mts, docs/.vitepress/**/*.ts, DOM, DOM.Iterable, ES2022, node, unocss.config.ts (+14 more)

### Community 65 - "StatsInfo.vue"
Cohesion: 0.11
Nodes (30): applyPath(), attachTo(), cancelHide(), cleanup(), detach(), findPage(), findPath(), FLAT_FOLDERS (+22 more)

## Knowledge Gaps
- **275 isolated node(s):** `__dirname`, `unocssConfigPath`, `envFile`, `feedbackWebhooks`, `excluded` (+270 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@iconify-json/fluent`, `@iconify-json/material-symbols`, `@mdit/plugin-spoiler`, `@iconify-json/heroicons-solid`, `@iconify-json/logos`, `@iconify-json/lucide`, `@iconify-json/mdi`, `@iconify-json/ph`, `@iconify-json/qlementine-icons`, `@iconify-json/simple-icons`, `markdown-it`, `@mdit/plugin-align`, `@mdit/plugin-demo`, `@mdit/plugin-footnote`, `@mdit/plugin-img-size`, `@mdit/plugin-ins`, `@mdit/plugin-mark`, `@iconify-json/gravity-ui`, `@mdit/plugin-sub`, `@mdit/plugin-sup`, `@mdit/plugin-tab`, `@mdit/plugin-tasklist`, `vitepress`, `@iconify-json/carbon`, `sass`, `sass-embedded`, `@types/markdown-it`, `@types/node`, `@types/tinycolor2`, `typescript`, `unplugin-auto-import`, `vite-plugin-optimize-exclude`, `vite-plugin-pwa`, `vite-plugin-terminal`, `vite-plugin-vuetify`, `vue`, `@vue/compiler-sfc`, `@iconify-json/fluent-mdl2`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `mark.js`, `nprogress`, `pathe`, `reka-ui`, `@resvg/resvg-js`, `tinycolor2`, `@types/nprogress`, `unocss`, `@unocss/preset-icons`, `vuetify`, `scripts`, `feed`, `@vueuse/core`, `@vueuse/integrations`, `x-satori`, `zod`, `minisearch`, `@headlessui/vue`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `README.md — Project Overview` connect `AGENTS.md — Agent Context` to `Get Started Guide`, `Theme System — Developer Guide`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `__dirname`, `unocssConfigPath`, `envFile` to the rest of the system?**
  _275 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Get Started Guide` be split into smaller, more focused modules?**
  _Cohesion score 0.050072568940493466 - nodes in this community are weakly interconnected._
- **Should `StatsPage.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.10052910052910052 - nodes in this community are weakly interconnected._
- **Should `Department 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._