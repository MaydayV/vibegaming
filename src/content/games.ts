export type Game = {
    slug: string;                 // unique, url-safe
    title: string;
    tagline: { en: string; zh: string };
    url: string;                  // external game link
    author: string;               // display name
    source?: string;              // optional: github repo / twitter / website
    tags: string[];               // e.g. ["Puzzle", "Roguelike", "Web"]
    createdAt: string;            // ISO date: "2026-01-27"
    cover?: string;               // optional: /covers/xxx.png
    featured?: boolean;           // optional
};

export const games: Game[] = [
    {
        slug: "neon-drift",
        title: "Neon Drift",
        tagline: { en: "A 60-second cyber racer made with AI.", zh: "AI 制作的 60 秒赛博竞速。" },
        url: "https://example.com/neon-drift",
        author: "YourName",
        source: "https://github.com/your/repo",
        tags: ["Racing", "Arcade", "Web"],
        createdAt: "2026-01-27",
        cover: "/covers/neon-drift.png",
        featured: true
    }
];
