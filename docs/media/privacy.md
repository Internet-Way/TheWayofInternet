# Ad Blocking and Privacy

Focuses heavily on network-level filtering efficiency, extension integrity, open-source auditing, and maintainer track records.

***

## Adblocking

* **Note** - Many sites contain ads, popups or redirects, so we [highly recommend](https://fmhy.net/beginners-guide#adblocking) using an adblocker. Don't run multiple general adblockers (e.g., uBlock Origin and AdGuard) simultaneously to [avoid breakage](https://x.com/gorhill/status/1033706103782170625). Combining general adblockers with tools like SponsorBlock is fine. Also note full version of uBO works significantly better than the lite version.

- 👑 **[uBlock Origin](https://github.com/gorhill/uBlock)**, [AdGuard](https://github.com/AdguardTeam/AdguardBrowserExtension) or [uBO Lite](https://github.com/uBlockOrigin/uBOL-home) (MV3) - Adblockers / [Redundant Extensions](https://github.com/arkenfox/user.js/wiki/4.1-Extensions/#-dont-bother)
- ⭐ **[SponsorBlock](https://sponsor.ajay.app/)** - Skip Sponsored YouTube Ads / [X](https://x.com/SponsorBlock) / [Subreddit](https://www.reddit.com/r/SponsorBlock/) / [Discord](https://discord.gg/SponsorBlock) / [GitHub](https://github.com/ajayyy/SponsorBlock)
- [Popup Blocker (strict)](https://github.com/schomery/popup-blocker), [Popupblocker All](https://addons.mozilla.org/firefox/addon/popupblockerall/) or [PopUpOFF](https://popupoff.org/) - Popup Blockers / [Userscript](https://github.com/AdguardTeam/PopupBlocker)

***

## DNS Adblocking

* **Note** - If your goal is to block browser ads, it's best to just stick with uBlock Origin, as additional filters can cause conflicts or anti-adblock.

- 👑 **[Pi-Hole](https://pi-hole.net/)** - Self-Hosted DNS Adblocking / [X](https://x.com/The_Pi_Hole) / [Subreddit](https://reddit.com/r/pihole/) / [GitHub](https://github.com/pi-hole)
- ⭐ **[AdGuard Home](https://adguard.com/en/adguard-home/overview.html)** - Self-Hosted DNS Adblocking / [X](https://x.com/adguard) / [Subreddit](https://reddit.com/r/Adguard) / [Telegram](https://t.me/adguarden) / [GitHub](https://github.com/AdguardTeam/AdGuardHome)
- ⭐ **[Mullvad DNS](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/)** - DNS Adblocking / Filtering / [Extension](https://mullvad.net/en/download/browser/extension) / [GitHub](https://github.com/mullvad)
- [NextDNS](https://nextdns.io) - Customizable DNS Adblocking Service / [Guide](https://github.com/yokoffing/NextDNS-Config) / [GitHub](https://github.com/nextdns/nextdns)
- [AdGuard DNS](https://adguard-dns.io/) - Customizable DNS Adblocking Service / [X](https://x.com/adguard) / [Subreddit](https://reddit.com/r/Adguard) / [Telegram](https://t.me/adguarden)

***

## Antivirus / Anti-Malware

* **Note** - It's best to keep Windows Defender's real-time protection on. You can select 'Allow on device' for pirated software detections like patches, or exclude by 'File' in 'Exclusions' for false positives when needed + [More Info](https://wispydocs.pages.dev/windows/#antivirus).

- ⭐ **[Malwarebytes](https://www.malwarebytes.com/)** / [X](https://x.com/malwarebytes) or [ESET](https://rentry.co/FMHYB64#eset) - Antivirus
- ⭐ **[AdwCleaner](https://www.malwarebytes.com/adwcleaner/)** - Anti-Adware / [X](https://x.com/malwarebytes)
- ⭐ **[Triage](https://tria.ge/)**, [ANY.RUN](https://any.run/) / [Discord](https://discord.gg/anyrun) or [Cuckoo](https://cuckoo.cert.ee/) - Online Sandboxes
- [Sandboxie Plus](https://sandboxie-plus.com/) - Sandbox Environment / [Guide](https://clarasguide.valeena.workers.dev/Guides/sandboxie-guide/) / [GitHub](https://github.com/sandboxie-plus/Sandboxie)

***

## Privacy / Security

- ⭐ **[Whonix](https://www.whonix.org/)** / [Subreddit](https://www.reddit.com/r/Whonix) / [X](https://twitter.com/Whonix) / [Telegram](https://t.me/s/Whonix) / [GitHub](https://github.com/Whonix), **[Qubes](https://www.qubes-os.org/)** / [Subreddit](https://www.reddit.com/r/Qubes) / [X](https://twitter.com/QubesOS) / [GitHub](https://github.com/QubesOS) or **[Tails](https://tails.net/)** / [X](https://twitter.com/Tails_live) / [Telegram](https://t.me/torproject) / [GitHub](https://github.com/torproject) - Privacy-Focused Operating Systems
- [W10Privacy](https://www.w10privacy.de/english-home/) - Privacy and Data Protection Tools

***

## Web Privacy

- 👑 **[Tor Browser](https://www.torproject.org/)**, [2](https://tor.eff.org/) - Onion-Routed Browser / [TG Downloads / Bridges](https://t.me/torproject) / [GitLab](https://gitlab.torproject.org/tpo/applications/tor-browser)
- ⭐ **[Mullvad Browser](https://mullvad.net/en/browser)** - Tor Browser Fork (without Tor network) / [GitHub](https://github.com/mullvad)
- [arkenfox](https://github.com/arkenfox/user.js) - Firefox Privacy Tweak / [Video](https://youtu.be/F7-bW2y6lcI) / [GUI](https://arkenfox.github.io/gui/)
- [Brave Browser](https://brave.com/) - Privacy Chromium Browser / [Debloat / Hardening](https://github.com/ChaoticSi1ence/SlimBrave-Neo) / [Subreddit](https://www.reddit.com/r/brave_browser/) / [GitHub](https://github.com/brave/brave-browser)

***

## VPN

* **Note** - It's generally best to use a paid VPN, especially if you have privacy or speed in mind. Free VPNs are mostly useful for things like unblocking websites. Remember to [bind](https://wispydocs.pages.dev/torrenting/) your VPN to your client to avoid ISP letters.

- 👑 **[Proton VPN](https://protonvpn.com)** - Free & Paid / Unlimited / No Torrenting w/ Free Plan / [Wireguard](https://protonvpn.com/support/wireguard-configurations) / [Subreddit](https://www.reddit.com/r/ProtonVPN/) / [Telegram](https://t.me/proton_privacy) / [Discord](https://discord.com/invite/proton) / [GitHub](https://github.com/ProtonVPN/)
- ⭐ **[WireGuard](https://www.wireguard.com/)** - VPN Tunnel / [Guide](https://www.wireguard.com/quickstart/) / [Web UI](https://github.com/wg-easy/wg-easy) / [Source Code](https://www.wireguard.com/repositories/)
