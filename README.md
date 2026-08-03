# bitindex

**A Curated Digital Index of Awesome Resources, Tools, and Alternatives**

---

## 🚀 Overview
**bitindex** is a high-performance, criteria-ranked digital index and resource vault built with VitePress, Vue 3, UnoCSS, and custom markdown-it plugins. It enables seamless discovery of top-tier web tools, alternatives, and curated collections without clutter or bias.

---

## ✨ Key Features
- **Advanced Markdown & Emoji Transformation**: Automatically converts raw Unicode emojis in markdown text and headings into optimized Iconify/Twemoji components (`<span class="i-twemoji-...">`) with precise regex and token replacement.
- **Enhanced Local Search**: Configured with MiniSearch supporting prefix matching, fuzzy matching, and weighted boost fields for titles, headings, and body text.
- **Lightning-Fast VitePress Architecture**: Static site generation with offline support (PWA) and dynamic dark mode persistence.

---

## 🛠️ Local Development & Deployment Guide

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (or `bun` / `pnpm`)

### Step 1: Clone the Repository & Install Dependencies
```bash
git clone https://github.com/Internet-Way/bitindex.git
cd bitindex
npm install
```

### Step 2: Run the Development Server
Start the local VitePress development server with live preview:
```bash
npm run dev
# or
npm run docs:dev
```
The application will start locally at **`http://localhost:3000`**.

### Step 3: Build for Production
To generate optimized static assets for production deployment:
```bash
npm run build
# or
npm run docs:build
```
Output static files are generated in `docs/.vitepress/dist`.

### Step 4: Preview Production Build Locally
To test the production build locally before pushing to production:
```bash
npm run docs:preview
```

---

## 📂 Project Structure
```text
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress site and markdown config
│   │   ├── core/               # Site metadata, nav, and sidebar definitions
│   │   ├── plugins/            # Markdown-it plugins & transformers (Emoji, etc.)
│   │   └── theme/              # Custom Vue theme components & styling
│   ├── index.md                # Landing page
│   ├── begin.md                # Beginner guide
│   └── ...                     # Markdown content pages
├── unocss.config.ts            # UnoCSS styling & icon safelist configuration
└── package.json                # Project dependencies and build scripts
```

---

## ❓ Frequently Asked Questions

**Q. How are emojis transformed in Markdown?**  
**A:** A custom markdown-it core rule (`unicodeEmojiPlugin`) intercepts raw Unicode emojis across markdown inline tokens and transforms them into styled Iconify/Twemoji icons rendered inline.

**Q. How do I contribute?**  
**A:** Contributions are welcome! Feel free to submit pull requests or open issues on our GitHub repository.

