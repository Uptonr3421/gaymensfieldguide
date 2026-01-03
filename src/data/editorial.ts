export interface Article {
  id: string;
  title: string;
  subtitle: string;
  authorId: 'architect' | 'scout' | 'mirror';
  tag: string;
  readTime: string;
  variant: 'holo' | 'voltage' | 'obsidian';
  featured?: boolean;
  gridArea?: 'large' | 'tall' | 'wide' | 'standard'; 
  slug: string;
  date: string;
  image: string;
}

export type BlogPost = Article;

export const EDITORIAL_FEED: Article[] = [
  {
    "id": "GEN-201",
    "title": "The Subscription Apocalypse: You Will Own Nothing and Hate It",
    "subtitle": "Adobe wants your rent. Windows wants your data. It's time to reject the SaaS drip-feed.",
    "authorId": "scout",
    "tag": "DYSTOPIA",
    "readTime": "6 MIN",
    "variant": "obsidian",
    "slug": "subscription-apocalypse",
    "date": "2026-01-04",
    "image": "/images/blog/subscription_apocalypse_hero.png"
  },
  {
    "id": "GEN-200",
    "title": "Why I Finally Stopped Fighting My IDE (And How You Can Too)",
    "subtitle": "Coding used to be 10% building and 90% configuring. Google's Antigravity changed the math.",
    "authorId": "architect",
    "tag": "TECH",
    "readTime": "5 MIN",
    "variant": "voltage",
    "slug": "antigravity-quickstat",
    "date": "2026-01-03",
    "image": "/images/blog/antigravity_agent_comparison.png"
  },
  {
    "id": "000-GARLIC",
    "title": "OpenAI Announced GPT-5.2 (Garlic)",
    "subtitle": "Internal codename \"Garlic\". It remembers more, works smarter, and uses a whole team of experts.",
    "authorId": "architect",
    "tag": "COVER_STORY",
    "readTime": "15 MIN",
    "variant": "voltage",
    "slug": "openai-gpt-5-2-garlic",
    "date": "2025-10-15",
    "image": "/images/blog/openai-gpt-garlic-hero.png",
    "featured": true,
    "gridArea": "large"
  },
  {
    "id": "GEN-100",
    "title": "Ai Is Augmenting Memory",
    "subtitle": "Deep dive into Ai Is Augmenting Memory. Optimized for the Nano Banana aesthetics.",
    "authorId": "architect",
    "tag": "VIBE",
    "readTime": "6 MIN",
    "variant": "voltage",
    "slug": "ai-is-augmenting-memory",
    "date": "2025-08-15",
    "image": "/images/blog/smiling-waveform.png"
  },
  {
    "id": "GEN-101",
    "title": "Ambient Computing Interaction Without Screens",
    "subtitle": "An deep dive into Ambient Computing Interaction Without Screens. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "DYSTOPIA",
    "readTime": "5 MIN",
    "variant": "holo",
    "slug": "ambient-computing-interaction-without-screens",
    "date": "2025-08-15",
    "image": "/images/blog/moe-dragon-rpg.png"
  },
  {
    "id": "GEN-103",
    "title": "Blockchain Gaming A Ponzi Scheme",
    "subtitle": "An deep dive into Blockchain Gaming A Ponzi Scheme. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "HARDWARE",
    "readTime": "9 MIN",
    "variant": "holo",
    "slug": "blockchain-gaming-a-ponzi-scheme",
    "date": "2025-08-15",
    "image": "/images/blog/samurai-editor-war.png"
  },
  {
    "id": "GEN-106",
    "title": "Cursor Vs Windsurf The Ai Editor Wars",
    "subtitle": "A deep dive into Cursor Vs Windsurf The AI Editor Wars. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "VIBE",
    "readTime": "7 MIN",
    "variant": "obsidian",
    "slug": "cursor-vs-windsurf-the-ai-editor-wars",
    "date": "2025-08-15",
    "image": "/images/blog/cursor-vs-windsurf-thumb.png"
  },
  {
    "id": "GEN-110",
    "title": "Depin Distributed Physical Infrastructure",
    "subtitle": "A deep dive into Depin Distributed Physical Infrastructure. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "SOFTWARE",
    "readTime": "8 MIN",
    "variant": "holo",
    "slug": "depin-distributed-physical-infrastructure",
    "date": "2025-08-15",
    "image": "/images/blog/fiber-optic-garlic.png"
  },
  {
    "id": "GEN-112",
    "title": "Docker It Works On My Machine",
    "subtitle": "A deep dive into Docker It Works On My Machine. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "HARDWARE",
    "readTime": "6 MIN",
    "variant": "holo",
    "slug": "docker-it-works-on-my-machine",
    "date": "2025-08-15",
    "image": "/images/blog/smiling-waveform.png"
  },
  {
    "id": "GEN-115",
    "title": "Helium Mobile Free 5G",
    "subtitle": "A deep dive into Helium Mobile Free 5G. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "HARDWARE",
    "readTime": "9 MIN",
    "variant": "holo",
    "slug": "helium-mobile-free-5g",
    "date": "2025-08-15",
    "image": "/images/blog/starlink-sky-hero.png""
  },
  {
    "id": "GEN-117",
    "title": "Home Assistant The Rabbit Hole",
    "subtitle": "A deep dive into Home Assistant The Rabbit Hole. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "TECH",
    "readTime": "7 MIN",
    "variant": "voltage",
    "slug": "home-assistant-the-rabbit-hole",
    "date": "2025-08-15",
    "image": "/images/blog/local-jarvis-desk.png""
  },
  {
    "id": "GEN-118",
    "title": "Kubernetes Overkill For Your Blog",
    "subtitle": "A deep dive into Kubernetes Overkill For Your Blog. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "HARDWARE",
    "readTime": "9 MIN",
    "variant": "holo",
    "slug": "kubernetes-overkill-for-your-blog",
    "date": "2025-08-15",
    "image": "/images/blog/cloud-collapse-render.png""
  },
  {
    "id": "GEN-119",
    "title": "Linux Desktop 2026 Finally",
    "subtitle": "A deep dive into Linux Desktop 2026 Finally. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "SOFTWARE",
    "readTime": "6 MIN",
    "variant": "voltage",
    "slug": "linux-desktop-2026-finally",
    "date": "2025-08-15",
    "image": "/images/blog/opensource-future-hero.png""
  },
  {
    "id": "GEN-120",
    "title": "Local Llms The Ultimate Privacy Shield",
    "subtitle": "A deep dive into Local Llms The Ultimate Privacy Shield. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "DYSTOPIA",
    "readTime": "5 MIN",
    "variant": "obsidian",
    "slug": "local-llms-the-ultimate-privacy-shield",
    "date": "2025-08-15",
    "image": "/images/blog/local-jarvis-desk.png"
  },
  {
    "id": "GEN-122",
    "title": "Macos The Walled Garden Is Comfy",
    "subtitle": "A deep dive into Macos The Walled Garden Is Comfy. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "AI",
    "readTime": "7 MIN",
    "variant": "obsidian",
    "slug": "macos-the-walled-garden-is-comfy",
    "date": "2025-08-15",
    "image": "/images/blog/glitched-art-dog-cat.png""
  },
  {
    "id": "GEN-123",
    "title": "Mechanical Keyboards A Loud Addiction",
    "subtitle": "A deep dive into Mechanical Keyboards A Loud Addiction. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "FUTURE",
    "readTime": "5 MIN",
    "variant": "obsidian",
    "slug": "mechanical-keyboards-a-loud-addiction",
    "date": "2025-08-15",
    "image": "/images/blog/toaster-blueprint.png""
  },
  {
    "id": "GEN-126",
    "title": "Plex Vs Jellyfin",
    "subtitle": "A deep dive into Plex Vs Jellyfin. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "SOFTWARE",
    "readTime": "9 MIN",
    "variant": "voltage",
    "slug": "plex-vs-jellyfin",
    "date": "2025-08-15",
    "image": "/images/blog/plex-jellyfin-hero.png"
  },
  {
    "id": "GEN-131",
    "title": "Right To Repair The War On Glue",
    "subtitle": "An deep dive into Right To Repair The War On Glue. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "HARDWARE",
    "readTime": "6 MIN",
    "variant": "obsidian",
    "slug": "right-to-repair-the-war-on-glue",
    "date": "2025-08-15",
    "image": "/images/blog/right-to-repair-hero.png"
  },
  {
    "id": "GEN-135",
    "title": "Standing Desks Are They A Scam",
    "subtitle": "A deep dive into Standing Desks Are They A Scam. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "AI",
    "readTime": "7 MIN",
    "variant": "holo",
    "slug": "standing-desks-are-they-a-scam",
    "date": "2025-08-15",
    "image": "/images/blog/standing-desk-hero.png"
  },
  {
    "id": "GEN-136",
    "title": "Starlink The Sky Is Full Of Satellites",
    "subtitle": "A deep dive into Starlink The Sky Is Full Of Satellites. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "SOFTWARE",
    "readTime": "7 MIN",
    "variant": "obsidian",
    "slug": "starlink-the-sky-is-full-of-satellites",
    "date": "2025-08-15",
    "image": "/images/blog/starlink-sky-hero.png"
  },
  {
    "id": "GEN-137",
    "title": "The Dead Internet Theory Are We Alone",
    "subtitle": "A deep dive into The Dead Internet Theory Are We Alone. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "AI",
    "readTime": "5 MIN",
    "variant": "obsidian",
    "slug": "the-dead-internet-theory-are-we-alone",
    "date": "2025-08-15",
    "image": "/images/blog/dead-internet-server-farm.png"
  },
  {
    "id": "GEN-138",
    "title": "The Future Of Open Source",
    "subtitle": "An deep dive into The Future Of Open Source. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "HARDWARE",
    "readTime": "7 MIN",
    "variant": "obsidian",
    "slug": "the-future-of-open-source",
    "date": "2025-08-15",
    "image": "/images/blog/opensource-future-hero.png"
  },
  {
    "id": "GEN-140",
    "title": "The Rise Of The Vibe Coder",
    "subtitle": "An deep dive into The Rise Of The Vibe Coder. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "HARDWARE",
    "readTime": "8 MIN",
    "variant": "holo",
    "slug": "the-rise-of-the-vibe-coder",
    "date": "2025-08-15",
    "image": "/images/blog/vibe-coder-rise-hero.png"
  },
  {
    "id": "GEN-141",
    "title": "Trackballs The Ergonomic Endgame",
    "subtitle": "A deep dive into Trackballs The Ergonomic Endgame. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "TECH",
    "readTime": "6 MIN",
    "variant": "holo",
    "slug": "trackballs-the-ergonomic-endgame",
    "date": "2025-08-15",
    "image": "/images/blog/trackball-ergonomic-hero.png"
  },
  {
    "id": "GEN-143",
    "title": "Vertical Monitors Why You Need One",
    "subtitle": "An deep dive into Vertical Monitors Why You Need One. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "SOFTWARE",
    "readTime": "9 MIN",
    "variant": "holo",
    "slug": "vertical-monitors-why-you-need-one",
    "date": "2025-08-15",
    "image": "/images/blog/vertical-monitor-hero.png"
  },
  {
    "id": "GEN-144",
    "title": "Voice Interfaces Why They Suck",
    "subtitle": "A deep dive into Voice Interfaces Why They Suck. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "SOFTWARE",
    "readTime": "9 MIN",
    "variant": "holo",
    "slug": "voice-interfaces-why-they-suck",
    "date": "2025-08-15",
    "image": "/images/blog/voice-interfaces-hero.png"
  },
  {
    "id": "GEN-145",
    "title": "Why I Deleted My Cloud Backups",
    "subtitle": "A deep dive into Why I Deleted My Cloud Backups. Vibe coded for your pleasure.",
    "authorId": "scout",
    "tag": "HARDWARE",
    "readTime": "9 MIN",
    "variant": "obsidian",
    "slug": "why-i-deleted-my-cloud-backups",
    "date": "2025-08-15",
    "image": "/images/blog/cloud-backups-deleted-hero.png"
  },
  {
    "id": "GEN-146",
    "title": "Why Your Smart Fridge Wants To Kill You",
    "subtitle": "An deep dive into Why Your Smart Fridge Wants To Kill You. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "VIBE",
    "readTime": "6 MIN",
    "variant": "voltage",
    "slug": "why-your-smart-fridge-wants-to-kill-you",
    "date": "2025-08-15",
    "image": "/images/blog/smart-fridge-evil-hero.png"
  },
  {
    "id": "GEN-147",
    "title": "Windows 12 Spyware Edition",
    "subtitle": "An deep dive into Windows 12 Spyware Edition. Vibe coded for your pleasure.",
    "authorId": "architect",
    "tag": "FUTURE",
    "readTime": "8 MIN",
    "variant": "holo",
    "slug": "windows-12-spyware-edition",
    "date": "2025-08-15",
    "image": "/images/blog/windows12-spyware-hero.png"
  },
  {
    "id": "GEN-148",
    "title": "Zigbee Vs Z Wave Vs Matter",
    "subtitle": "An deep dive into Zigbee Vs Z Wave Vs Matter. Vibe coded for your pleasure.",
    "authorId": "mirror",
    "tag": "SOFTWARE",
    "readTime": "6 MIN",
    "variant": "holo",
    "slug": "zigbee-vs-z-wave-vs-matter",
    "date": "2025-08-15",
    "image": "/images/blog/zigbee-matter-hero.png"
  }
];
