### Here is the plan
- use the resources / links strictly from **/reso** folder
- i will give you the critera to list them in my cite press site 
- you have to be precise and faitful to the users query
- editors choice woulde be crowned , stars will be stared and add minimum would be simply it
-  create the heading **#** written as is and make new docs in /docs folder already exists in vitepress apps
- if you have any additional suggestion for theeming etc and other things ask me questions
- in **/reso** almost matches names with out heading but i will help u a litte
	- [Our name in site] --> [/reso folders resources file mapping]
	- Ad Blocking and Privacy --> privacy.md
	- Artificial Intelligence --> ai.md 
	- Streaming --> video.md
	- Listening --> audio.md
	- Gaming --> gaming.md
	- Reading --> reading.md
	- Torrenting --> torrenting.md
	- Donwloading --> donwloading.md
---
# Ad Blocking and Privacy
Focuses heavily on network-level filtering efficiency, extension integrity, open-source auditing, and maintainer track records.
###   Editors' Choice
- **Editor Directives**: Evaluate based on real-world daily driving, aesthetic seamlessness (does it break site layouts?), and ease of use for a non-technical person.

- **Links & Integrity**: Ensure download links point strictly to official extension stores, official GitHub releases, or signed manifest packages. No third-party mirror blogs.

- **Usability Focus**: The interface must not require constant micro-management or break fundamental web apps (like banking or workspace tools) out of the box.

### ⭐ Star Requirement
- **Blocking Capability**: Must pass at least 95%+ on standard synthetic ad/tracker block tests (e.g., d3ward or AdBlock Tester). Must support cosmetic filtering (collapsing the blank space where ads used to be).

- Reliability & Performance: Memory overhead must remain low (e.g., less than 50MB extension footprint idle). Must handle fast-changing anti-adblock scripts natively without relying on manual user filter updates.

- **Trust Profile**: Manifest V3 compliance check (if applicable to the platform). Must have a strictly documented Zero-Log / No Data Monetization privacy policy. Open-source codebase with a clear commit history is highly preferred.
### Adding entry (Minimum Requirement)
- The project must have actively maintained filter lists (updated within the last 30 days).

- No history of stealth monetization, unannounced ad injections, or shady parent-company acquisitions.

- Exceptions: We will exempt highly-regarded, specialized network tools (like Pi-hole or advanced proxy setups) from the "simple UI" rule if their blocking and privacy metrics are absolute gold standards.
---
# Artificial Intelligence
Focuses on accessibility, open-source transparency, friction-free deployment, and the true value of the free tier.
### 👑  Editors' Choice
- **Editor Directives**: Rate based on "time-to-value." How fast can a user get a high-quality answer? Is the output actually helpful, or heavily diluted by safety guardrails/filler text?

- **Links & Integrity**: Direct access to the front-end chat interface, or direct links to Hugging Face space / official model repositories.

- **Usability Focus**: The UI must support markdown rendering, easy code-copy buttons, and robust chat history organization.
### ⭐ Star Requirement
- **Friction & Access**: Preference for No Sign-Up Required or simple anonymous token systems. If sign-up is required, it must support standard OAuth (Google/GitHub) without forcing phone number verification.

- **Openness Score**: Clear classification of Open Source vs. Open Weight vs. Proprietary API. For open weights, the model license (e.g., Apache 2.0, Llama 3) must allow local commercial or personal hobbyist use.

- **Free Tier Allocation**: Free context window must be clearly stated (minimum 8k tokens for a star rating). Rate limits must be transparent (e.g., "X messages per hour") rather than completely hidden dynamic throttling.
### Adding entry (Minimum Requirement)
- The service must offer a completely free tier that is not just a "3-day trial."

- No aggressive dark patterns forcing credit card entry before trying the model.

- Exceptions: We will make exceptions for premium proprietary platforms if their free tier gives access to absolute state-of-the-art flagship models (even with very tight message limits)
---
# Streaming
Focuses heavily on source reliability, media player optimization, server redundancy, and clean, ad-free UI/UX.
### 👑  Editors' Choice
- **Editor Directives**: Our hand-picked favorites based on buffer speeds, layout beauty (Netflix/Plex style vs. generic index links), and minimal click-through annoyances.

- **Links & Integrity**: Links must point directly to the cleanest domain mirror.

- **Usability Focus**: Must have functional auto-next, auto-skip intro, and global search that actually functions across categories.
### ⭐ Star Requirement
- **Media Quality**: Video stream must offer true, high-bitrate 1080p minimum options without severe macroblocking or compression artifacts. Must include multiple subtitle tracks (SRT/VTT) that align properly with the audio.

- **Server Reliability**: Must provide at least 3 independent server sources/mirrors per title so users have a fallback if a host goes down. Average stream initialization (buffer time) must be under 3 seconds on a standard broadband connection.

- **UI/UX & Trust**: Zero malicious redirects or aggressive pop-under ads that bypass standard ad blockers. No crypto-mining scripts running in the background.
### Adding entry (Minimum Requirement)
- The site must have a library index that is regularly updated with airing shows within 24 hours of release.

- The media player must support standard keyboard shortcuts (spacebar to pause, arrows to seek).

- **Exceptions**: We will make an exception for older, legendary index sites with terrible UIs if they host rare, archival, or deeply niche media (like old retro anime or obscure indie films) that cannot be found anywhere else.

---
# Listening
Covers general music streaming, high-fidelity audio, niche genre trackers, internet radio, podcasts, and local audio management tools.
### 👑  Editors' Choice
- **Editor Directives**: Our personal daily drivers based on the algorithm's recommendation accuracy, the visual design of the player, and how effortless it is to discover new music.

- **Links & Integrity**: Verified links to web players, clean desktop/mobile clients, or official self-hosted server scripts (e.g., Navidrome, Jellyfin configurations).

- **Usability Focus**: The interface must support seamless queue management, playlist creation, and minimal audio stutter during track transitions.

### ⭐ Star Requirement
- **Quality & Bitrate**: Stream audio must offer a consistent, high-quality format (minimum 192kbps AAC / 320kbps MP3 or lossless FLAC where specified) without noticeable compression artifacting.

- **Free Perks**: The free tier must offer genuine value—such as unlimited skipping, background play on mobile web, or high-quality playback without invasive audio ads every two tracks.

- **Tools & Reliability**: Audio downloaders, metadata taggers, or local players must run lightweight on system resources and have a zero-failure rate when parsing metadata or fetching album art.
### Adding entry (Minimum Requirement)
- The service must have a high-uptime directory or source list that doesn't constantly suffer from dead audio streams or broken API links.

- **Exceptions**: We will make structural exceptions for highly specific genre archives (e.g., retro VG music, obscure lo-fi nodes), independent community radio stations, or niche podcast aggregators that might lack modern UIs but offer completely irreplaceable content libraries.
---
# Gaming 
Covers trusted software archives, emulation resources, lightweight browser games, and preservation projects.
- **Editor Directives**: Sites we trust implicitly that offer clean, fast installer packages, simple download configurations, and highly curated collections of games.

- **Links & Integrity**: Absolute strictness here—links must point directly to the vetted, official domains of trusted scene uploaders, repackers, or preservation foundations.

- **Usability Focus**: Downloads must be straightforward, avoiding infinite loop link-shorteners, misleading "Download Here" ad banners, or file locker traps.

### ⭐ Star Requirement
- **Library Depth**: ROM and abandonware sites must host complete or near-complete sets (No-Intro / Redump verified) for targeted platforms. Repack sites must keep up-to-date with the latest stable game patches and DLCs.

- **Reliability & Security**: Zero history of bundling malware, coin-miners, or unwanted bloatware in installers. Direct download mirrors must offer high-speed bandwidth limits, or robust, highly-seeded torrent options.

- **Free Perks**: Free users should not be throttled to dial-up speeds or forced to wait more than 10-15 seconds to generate a download link. Web game platforms must run smoothly without freezing browser hardware acceleration.
### Adding entry (Minimum Requirement)
- All game files must be heavily scrutinized by community trust metrics (MD5/SHA-1 hash verifications for ROMs; clean VirusTotal profiles for executables).

**Exceptions**: We will make exceptions for legacy abandonware archives or deeply historical emulation sites that look like they were built in 1998, provided their files remain 100% authentic, un-tampered, and historically vital.
---
# Reading 
Covers digital book repositories, open-licensed textbooks, manga/comic readers, light novels, and reading track/database systems.
- **Editor Directives**: Rated on pure immersion—how pleasant is it to read on this platform for hours? Excellent dark mode support, clean typography choices, and distraction-free layouts win here.

- **Links & Integrity**: Direct links to clean download directories, online reading portals, or official open-source database mirrors.

- **Usability Focus**: Manga readers must feature intuitive page turning (right-to-left toggle, continuous scroll), and text readers must allow font/size adjustments.
### ⭐ Star Requirement
- **Library & Quality**: E-book files must be cleanly formatted (proper ePUB/PDF structures, functional tables of contents, no broken OCR text scans). Manga/Comics must feature high-resolution, legible image scans that aren't overly compressed or watermarked.

- **Ease of Usage & Navigation**: Fast global searching, granular filtering (by author, genre, year, or scanlation group), and instant file downloads without aggressive capture checks.

- **Reliability & Tracking**: Reading databases (trackers) must have rock-solid API sync capabilities, reliable user data import/export functions (so users don't lose their reading history), and high server stability during peak release windows.
### Adding entry (Minimum Requirement)
- The site must feature an active library where dead links or missing chapters are quickly updated or purged by the staff/community.

- **Exceptions**: We will make exceptions for completely legal, highly academic, open-licensed literature repositories or community-driven archival projects that use clunky or outdated cataloging systems, due to their unmatched cultural and educational value.

---
# torrenting 
Focuses on decentralized network efficiency, open-source tool verification, protocol security, and privacy protection.
- **Editor Directives**: Selected based on pure performance, community reputation, and absolute freedom from corporate overhead or monetized bloat.

- **Links & Integrity**: Links must point directly to the original, authentic domains of clients, top-tier aggregators, or verified entryways for private trackers. No proxy mirrors or spoofed domain clones.

- **Usability Focus**: Software clients must have clean, lightweight layouts without bundled toolbars. Torrent sites must feature responsive category filtering and clear seeder/leecher ratios.
### ⭐ Star Requirement
- **Open-Source Tools**: Torrent clients must be 100% open-source with auditable source code (e.g., hosted on GitHub/GitLab). They must run entirely free of advertisements, telemetry, or stealth background processes.

- **Privacy & VPN Metrics**: Free-tier VPN recommendations must feature a strict No-Logs policy verified by third-party audits, a bulletproof automated Kill Switch, and natively allow P2P/BitTorrent traffic on their free servers without immediate connection throttling.

- **Tracker & Aggregator Health**: Torrent sites and trackers must accurately display real-time peer health data. Public aggregators must utilize robust filtering to strip out compromised, corrupt, or malicious .torrent files and magnet hashes. Private trackers must maintain transparent rules regarding ratio requirements and bonus point systems.
### Adding entry (Minimum Requirement)
- Clients must natively support essential modern protocols (e.g., BitTorrent v2, Protocol Encryption, Magnet links, DHT, PEX, and local peer discovery). Torrent indices must have zero history of serving malicious script injections or browser-hijacking redirects.

- **Exceptions**: We will make exceptions for highly-regarded, private tracker forums or legacy indexing sites that employ extremely strict, convoluted invite systems or old-school layouts, due to their unmatched library retention, high-speed seeding swarms, and perfect file curation.

---
# Downloading
Focuses heavily on local machine security, payload execution safety, file integrity, dynamic links, and throughput maximization.
- **Editor Directives**: Hand-picked based on clean UI design, maximum ease of operation (e.g., paste a link and walk away), and a distinct lack of intrusive ads or fake "Download Now" green buttons.

- **Links & Integrity**: Strict direction to official mirrors, official GitHub repositories, or vetted Usenet provider/indexer landing pages.

- **Usability Focus**: The download pipelines must handle massive multi-gigabyte archives seamlessly, offering simple queue prioritization and intuitive extraction configurations.
### ⭐ Star Requirement
- **Virus Moderation & Sandboxing**: File sources (software/freeware sites) must have a proven, community-backed scanning pipeline or zero-day moderation workflow. Direct executables (.exe, .msi, .dmg) must pass a clean bill across crowd-sourced analysis platforms (like VirusTotal) without active telemetry or bundled adware.

- **Reliability & Throughput**: Debrid services, link-leechers, and direct download managers must utilize maximum multithreaded downloading pipelines to saturate user bandwidth. Download links generated by search sites or indexers must not expire or break mid-session.

- **Usenet Infrastructure**: Usenet providers must offer transparent retention metrics (minimum 4000+ days of binary retention for top-tier status) and rock-solid SSL encryption (256-bit). Indexers must have robust automated spam/fake-file filtering algorithms.
### Adding entry (Minimum Requirement)
- Every site or software tool entry must have an impeccable reputation within the open-source or tech community regarding user machine safety. Tools must run without requiring administrative permissions unless strictly necessary for system-level execution.

- **Exceptions**: We will make exceptions for legacy, archival freeware sites or text-heavy Usenet indexers with archaic Web 1.0 layouts, provided their hosted binaries are completely authentic, un-tampered, and historically rare.
---
