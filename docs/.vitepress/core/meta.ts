import type { DefaultTheme } from "vitepress";

// @unocss-include

export const meta = {
  name: "bitindex",
  description: "A free media, resource, and tool index",
  hostname: "https://bitindex.pages.dev",
  keywords: ["free media", "resources", "tools", "alternatives"],
  build: {
    api: true,
    nsfw: false,
  },
};

export const excluded = [
  "readme.md",
  "single-page",
  "feedback.md",
  "index.md",
  "sandbox.md",
  "startpage.md",
  "blogs/",
  "discord.md",
];

const safeEnv = (key: string) =>
  typeof process !== "undefined" ? process.env?.[key] : undefined;

if (safeEnv("TWI_BUILD_NSFW") === "false") {
  meta.build.nsfw = false;
}
if (safeEnv("TWI_BUILD_API") === "false") {
  meta.build.api = false;
}

const formatCommitRef = (commitRef: string) =>
  `<a href="https://github.com/Internet-Way/bitinternet/commit/${commitRef}">${commitRef.slice(0, 8)}</a>`;

const cfStart = safeEnv("CF_PAGES_COMMIT_SHA");
const commitStart = safeEnv("COMMIT_REF");

export const commitRef =
  safeEnv("CF_PAGES") && cfStart
    ? formatCommitRef(cfStart)
    : commitStart
      ? formatCommitRef(commitStart)
      : "dev";

export const feedback = "Made with 💔";

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: "discord", link: "/discord" },
  { icon: "github", link: "https://github.com/Internet-Way/bitinternet" },
];

export const nav: DefaultTheme.NavItem[] = [
  { text: "Home", link: "/" },
  // { text: 'Contributors', link: '/contributors' },
  { text: "Feedback", link: "/feedback" },
  {
    text: "Other Indexes",
    items: [
      { text: "FMHY", link: "https://fmhy.net" },
      { text: "r/Piracy", link: "https://reddit.com/r/piracy" },
      { text: "Awesome", link: "https://github.com/sindresorhus/awesome" },
      // { text: 'Feature 4 (SOON!!)', link: '/' },
      // { text: 'Feature 5 (SOON!!)', link: '/' }
    ],
  },
];

export const sidebar: DefaultTheme.Sidebar | DefaultTheme.NavItemWithLink[] = [
  {
    text: "Get Started",
    items: [
      { text: "Get Started", link: "/get-started" },
      { text: "Beginner Guide", link: "/begin" },
      { text: "Blog", link: "/blog" },
    ],
  },
  {
    text: "Special Resources",
    collapsed: false,
    items: [
      { text: "Alternatives", link: "/alternates" },
      { text: "Author's Choice", link: "/choice" },
      // { text: 'Otaku', link: '/specials/otaku' },
      // { text: 'Minecraft', link: '/specials/minecraft' },
    ],
  },
  {
    text: "Media Resources",
    collapsed: false,
    items: [
      { text: "Privacy/Adblocking", link: "/media/privacy" },
      { text: "AI", link: "/media/ai" },
      { text: "Streaming", link: "/media/video" },
      { text: "Listening", link: "/media/audio" },
      { text: "Gaming", link: "/media/gaming" },
      { text: "Reading", link: "/media/reading" },
      { text: "Torrenting", link: "/media/torrenting" },
      { text: "Downloading", link: "/media/downloading" },
    ],
  },
  {
    text: "Tools",
    collapsed: false,
    items: [
      // { text: 'System/File Tools', link: '/tools/systemtools' },
      // { text: 'Internet/Social Media Tools', link: '/tools/internettools' },
      // { text: 'Text/Edu Tools', link: '/tools/texttools' },
      // { text: 'Image/Video/Music Tools', link: '/tools/ivmtools' },
      // { text: 'Gaming Tools', link: '/tools/gamingtools' },
      // { text: 'Dev Tools', link: '/tools/devtools' }
    ],
  },
  {
    text: "Miscellaneous",
    collapsed: true,
    items: [
      { text: "Contributors", link: "/contributors" },
      { text: "Feedback", link: "/feedback" },
      { text: "Storage", link: "/storage" },
      { text: "Notes", link: "/notes" },
    ],
  },
];
