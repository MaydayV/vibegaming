export type Game = {
    slug: string;                 // unique, url-safe
    title: string;
    tagline: { en: string; zh: string };
    url: string;                  // external game link
    author: string;               // display name
    source?: string;              // optional: github repo / twitter / website
    tags: string[];               // e.g. ["Puzzle", "Roguelike", "Web"]
    createdAt: string;            // ISO date: "2026-01-27"
    cover?: string;               // Path: /covers/slug.jpg (16:9, <100kb). See CONTRIBUTING.md
    featured?: boolean;           // optional
};

export const games: Game[] = [
    {
        slug: "neon-drift",
        title: "Neon Drift",
        tagline: { en: "A 60-second cyber racer made with AI.", zh: "AI 制作的 60 秒赛博竞速。" },
        url: "https://freegames.org/neon-drift/",
        author: "MaydayV",
        source: "https://github.com/maydayv/neon-drift",
        tags: ["Racing", "Arcade", "Web"],
        createdAt: "2026-01-27",
        cover: "/covers/neon-drift.jpg",
        featured: true
    },
    {
        slug: "vxlverse",
        title: "VXLverse",
        tagline: { en: "Browser-based 3D game editor with AI-powered NPCs, no coding required.", zh: "浏览器 3D 游戏编辑器，AI 驱动 NPC，无需编程。" },
        url: "https://www.vxlverse.com/",
        author: "mpoapostolis",
        source: "https://github.com/mpoapostolis/vxlverse",
        tags: ["Editor", "3D", "RPG", "Web"],
        createdAt: "2026-02-02",
        cover: "/covers/vxlverse.jpg",
        featured: true
    },
    {
        slug: "rogue-ai",
        title: "Rogue AI",
        tagline: { en: "LLM, Stable Diffusion and ElevenLabs-powered roguelike made in 48 hours.", zh: "48 小时内用 LLM + SD + ElevenLabs 制作的 Roguelike。" },
        url: "https://github.com/Hafaux/rogue-ai",
        author: "Hafaux",
        source: "https://github.com/Hafaux/rogue-ai",
        tags: ["Roguelike", "LLM", "Web"],
        createdAt: "2026-02-02",
        cover: "/covers/rogue-ai.jpg"
    },
    {
        slug: "gravity-snake",
        title: "Gravity Snake",
        tagline: { en: "Classic snake with gravity twist, made entirely by prompting Claude Sonnet 3.7.", zh: "经典贪吃蛇加重力玩法，完全由 Claude Sonnet 3.7 提示词生成。" },
        url: "https://github.com/Farsinuce/gravity-snake",
        author: "Farsinuce",
        source: "https://github.com/Farsinuce/gravity-snake",
        tags: ["Arcade", "Claude", "Web"],
        createdAt: "2026-02-02",
        cover: "/covers/gravity-snake.jpg"
    },
    {
        slug: "neon-runner",
        title: "Neon Runner",
        tagline: { en: "A vibe-coded endless runner with neon aesthetics.", zh: "Vibe coding 制作的霓虹风格跑酷游戏。" },
        url: "https://neon-runner-black.vercel.app",
        author: "cqminh",
        source: "https://github.com/cqminh/neon_runner",
        tags: ["Runner", "Arcade", "Web"],
        createdAt: "2026-02-02",
        cover: "/covers/neon-runner.jpg"
    },
    {
        slug: "potential-energy",
        title: "Potential Energy",
        tagline: { en: "A physics-based puzzle game made with Claude AI.", zh: "用 Claude AI 制作的物理益智游戏。" },
        url: "https://potential-energy-game.vercel.app",
        author: "Matpeer",
        source: "https://github.com/Matpeer/Potential-energy-game-",
        tags: ["Puzzle", "Physics", "Claude", "Web"],
        createdAt: "2026-02-02",
        cover: "/covers/potential-energy.jpg"
    }
];
