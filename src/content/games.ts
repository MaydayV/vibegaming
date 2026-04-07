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
    },
    {
        slug: "happy-parking",
        title: "Happy Parking",
        tagline: {
            en: "A multiplayer social parking game inspired by classic QQ Parking Wars — park at friends' streets, earn coins, and slap tickets!",
            zh: "欢乐车位 — 多人联机停车社交游戏，去好友街道停车赚钱、贴罚单抢金币！"
        },
        url: "http://parking.weixin-vip.cn",
        author: "abczsl520",
        tags: ["Social", "Multiplayer", "Casual", "Web"],
        createdAt: "2026-02-21",
        cover: "/covers/happy-parking.jpg"
    },
    {
        slug: "sea-shelter",
        title: "Sea Shelter",
        tagline: {
            en: "Post-apocalyptic survival on a raft — fish, scavenge, and build your ocean sanctuary!",
            zh: "末世洪水吞没大陆，你只有一块木筏！钓鱼求生、打捞漂流物、建造避难所，在无尽汪洋中活下去！"
        },
        url: "https://game.weixin-vip.cn/sea/",
        author: "abczsl520",
        tags: ["Survival", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/sea-shelter.svg"
    },
    {
        slug: "lobster-life",
        title: "Lobster Life Simulator",
        tagline: {
            en: "Start as a tiny lobster — molt, forage, fight for territory, and write your own lobster legend!",
            zh: "从一只小龙虾开始，经历蜕壳成长、觅食冒险、领地争夺，书写属于你的龙虾传奇！"
        },
        url: "https://game.weixin-vip.cn/lobster/",
        author: "abczsl520",
        tags: ["Simulation", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/lobster-life.svg"
    },
    {
        slug: "pixel-cats",
        title: "Pixel Cat Nursery",
        tagline: {
            en: "20 real breeds, 150+ pixel cats with unique personalities. Feed, play, earn, and build your cat paradise!",
            zh: "20种真实品种，150+只性格各异的像素猫咪。喂养、互动、打工赚钱，打造你的猫咪天堂！"
        },
        url: "https://game.weixin-vip.cn/cats/",
        author: "abczsl520",
        tags: ["Nurture", "Pixel", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pixel-cats.svg"
    },
    {
        slug: "magic-portal",
        title: "Magic Portal",
        tagline: {
            en: "Cast spells by drawing circles — AI rates your magical accuracy. Score top 95% to become a legendary mage!",
            zh: "施展魔法，召唤传送门！围绕魔法核心画一个圆，AI评定你的法力等级！超过95%就是传说级法师！"
        },
        url: "https://game.weixin-vip.cn/circle/",
        author: "abczsl520",
        tags: ["Casual", "AI", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/magic-portal.svg"
    },
    {
        slug: "lobster-deploy",
        title: "Lobster Deploy Simulator",
        tagline: {
            en: "Deploy your AI lobster from scratch — pick hardware, install env, configure models, connect channels!",
            zh: "从零开始部署你的AI龙虾！选硬件、装环境、配模型、接渠道，体验完整的OpenClaw部署流程！"
        },
        url: "https://game.weixin-vip.cn/lobster-deploy/",
        author: "abczsl520",
        tags: ["Simulation", "Tech", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/lobster-deploy.svg"
    },
    {
        slug: "lobster-personality",
        title: "Lobster Personality Test",
        tagline: {
            en: "A personality test built for OpenClaw lobsters — 6 dimensions, 30 questions. Discover your lobster's true self!",
            zh: "专为 OpenClaw 龙虾打造的性格测试！6大维度30道题，发现你的龙虾真实性格~"
        },
        url: "https://game.weixin-vip.cn/lobster-test/",
        author: "abczsl520",
        tags: ["Quiz", "AI", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/lobster-personality.svg"
    },
    {
        slug: "spending-sim",
        title: "Spending Simulator",
        tagline: {
            en: "10 billion yuan to spend — from pancakes to private jets. Can you blow it all? Race to the top of the leaderboard!",
            zh: "给你100亿人民币，从煎饼果子到私人飞机，你能花光吗？挑战花钱速度，登上排行榜！"
        },
        url: "https://game.weixin-vip.cn/spend/",
        author: "abczsl520",
        tags: ["Casual", "Idle", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/spending-sim.svg"
    },
    {
        slug: "lobster-quiz-battle",
        title: "Lobster Quiz Battle",
        tagline: {
            en: "Real-time quiz showdown — answer or be eliminated! Create a match, share the link, and be the last lobster standing!",
            zh: "多只龙虾同时在线答题对战！答错即淘汰，最后站着的龙虾获胜。创建比赛，分享链接，一决高下！"
        },
        url: "https://game.weixin-vip.cn/quiz/",
        author: "abczsl520",
        tags: ["Multiplayer", "Quiz", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/lobster-quiz-battle.svg"
    },
    {
        slug: "gamedev-sim",
        title: "Game Dev Simulator",
        tagline: {
            en: "From garage indie dev to gaming tycoon — pick genres, hire teams, research tech, and craft the GOTY!",
            zh: "从车库独立开发者到游戏大亨！选题材、招团队、研发科技，打造年度神作~"
        },
        url: "https://game.weixin-vip.cn/gamedev/",
        author: "abczsl520",
        tags: ["Simulation", "Management", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/gamedev-sim.svg"
    },
    {
        slug: "pixel-mahjong",
        title: "Pixel Mahjong",
        tagline: {
            en: "Classic Chinese mahjong reborn in pixel art — 3 AI opponents, full scoring rules. One more round?",
            zh: "经典国粹像素重生！3个AI对手，碰杠胡一应俱全，多种番型计算。来一局？"
        },
        url: "https://game.weixin-vip.cn/mahjong/",
        author: "abczsl520",
        tags: ["Board", "Pixel", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pixel-mahjong.svg"
    },
    {
        slug: "pixel-goose",
        title: "Pixel Goose Match",
        tagline: {
            en: "Pixel-style tile-matching with stacked layers — 12 cute critters, 20 levels + daily challenge!",
            zh: "像素风层叠消除！多层堆叠12种萌物图案，点击放入槽位，3个相同消除。20关+每日挑战！"
        },
        url: "https://game.weixin-vip.cn/goose/",
        author: "abczsl520",
        tags: ["Puzzle", "Match", "Pixel", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pixel-goose.svg"
    },
    {
        slug: "crazy-fishing",
        title: "Crazy Fishing",
        tagline: {
            en: "Three fishing styles — coarse, lure, and deep-sea. 108 species to catch, from ponds to the abyss!",
            zh: "台钓路亚海钓三大玩法，108种鱼等你挑战！从黑坑到深海，钓到传说级大鱼！"
        },
        url: "https://game.weixin-vip.cn/fishing/",
        author: "abczsl520",
        tags: ["Fishing", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/crazy-fishing.svg"
    },
    {
        slug: "supermodel-sprint",
        title: "Supermodel Sprint",
        tagline: {
            en: "3D catwalk runner — pick the right gates to glam up, dodge obstacles, and chase diamonds down the runway!",
            zh: "3D超模T台跑酷！选对门变美收集钻石，躲避障碍，档位加速越跑越快，每局随机任务挑战！"
        },
        url: "https://game.weixin-vip.cn/tripo/",
        author: "abczsl520",
        tags: ["Runner", "3D", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/supermodel-sprint.svg"
    },
    {
        slug: "shanhai-rpg",
        title: "Shanhai Legends",
        tagline: {
            en: "Pixel open-world RPG — capture ancient beasts from the Classic of Mountains and Seas with elemental turn-based combat!",
            zh: "像素风开放世界RPG！在山海经的奇幻大陆捕捉上古神兽，五行相克回合对战，探索青丘之野！"
        },
        url: "https://game.weixin-vip.cn/shanhai/",
        author: "abczsl520",
        tags: ["RPG", "Pixel", "Turn-based", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/shanhai-rpg.svg"
    },
    {
        slug: "card-crafter",
        title: "Card Crafter",
        tagline: {
            en: "Collect 72 cards and forge legendary ones in the alchemy furnace — 6 themes, 24 recipes. Complete the codex!",
            zh: "收集72张精美卡片，在炼卡炉中合成传说级神卡！6大主题，24种配方，集齐图鉴成为终极炼卡师！"
        },
        url: "https://game.weixin-vip.cn/card/",
        author: "abczsl520",
        tags: ["Card", "Collection", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/card-crafter.png"
    },
    {
        slug: "pet-brawl",
        title: "Pet Brawl",
        tagline: {
            en: "Collect adorable pets with elemental affinities — PvE campaign + PvP arena. Who's the strongest trainer?",
            zh: "收集超萌宠物，五行属性克制，PvE闯关 + PvP竞技，谁才是最强训练师？"
        },
        url: "https://game.weixin-vip.cn/pet/",
        author: "abczsl520",
        tags: ["Turn-based", "Collection", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pet-brawl.svg"
    },
    {
        slug: "divine-gacha",
        title: "Divine Gacha",
        tagline: {
            en: "45% SSR rate? Single-pull miracles! Guaranteed SR on 10-pull — collect them all and be the luckiest player!",
            zh: "SSR概率45%？单抽出奇迹！十连保底SR！集齐图鉴，做最欧的玩家！"
        },
        url: "https://game.weixin-vip.cn/gacha/",
        author: "abczsl520",
        tags: ["Gacha", "Collection", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/divine-gacha.svg"
    },
    {
        slug: "merge-watermelon",
        title: "Merge Watermelon",
        tagline: {
            en: "Drop and merge fruits — from grape to watermelon! Simple, addictive, impossible to put down.",
            zh: "水果掉落合成，从葡萄一路合成大西瓜！简单上瘾停不下来~"
        },
        url: "https://game.weixin-vip.cn/merge/",
        author: "abczsl520",
        tags: ["Casual", "Puzzle", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/merge-watermelon.svg"
    },
    {
        slug: "snake-io",
        title: "Snake IO Battle",
        tagline: {
            en: "Real-time multiplayer IO — eat particles to grow, boost to encircle rivals. Be the longest snake!",
            zh: "实时多人IO对战！吃光粒子变最长，加速冲刺包围对手！"
        },
        url: "https://game.weixin-vip.cn/snake/",
        author: "abczsl520",
        tags: ["IO", "Multiplayer", "Arcade", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/snake-io.svg"
    },
    {
        slug: "screw-puzzle",
        title: "Screw Puzzle",
        tagline: {
            en: "Unscrew the right colored screws — test your observation and strategy across 20 challenging levels!",
            zh: "拧出正确颜色的螺丝，考验你的观察力和策略！20关等你挑战~"
        },
        url: "https://game.weixin-vip.cn/screw/",
        author: "abczsl520",
        tags: ["Puzzle", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/screw-puzzle.svg"
    },
    {
        slug: "kun-evolution",
        title: "Kun Evolution",
        tagline: {
            en: "Start as a tiny fry — devour, evolve, and ascend into the legendary Kunpeng! Who can reach the final form?",
            zh: "从小鱼苗开始，吞噬进化，最终化身鲲鹏！谁能进化到最终形态？"
        },
        url: "https://game.weixin-vip.cn/kun/",
        author: "abczsl520",
        tags: ["Idle", "Evolution", "Casual", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/kun-evolution.svg"
    },
    {
        slug: "pixel-delta",
        title: "Pixel Delta Force",
        tagline: {
            en: "Tactical extraction shooter — raid the warzone, loot supplies, take down enemies, and extract alive!",
            zh: "战术撤离射击！进入战区搜刮物资，击杀敌人，活着撤离带走战利品！"
        },
        url: "https://game.weixin-vip.cn/delta/",
        author: "abczsl520",
        tags: ["Shooter", "Pixel", "Action", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pixel-delta.svg"
    },
    {
        slug: "pixel-bounce",
        title: "Pixel Bounce King",
        tagline: {
            en: "Classic brick-breaker reborn in pixel style — power-ups, multi-ball, shields, and endless levels!",
            zh: "经典打砖块重生！像素风格+道具系统，多球连击护盾减速，闯过无尽关卡成为弹球之王！"
        },
        url: "https://game.weixin-vip.cn/bounce/",
        author: "abczsl520",
        tags: ["Arcade", "Pixel", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/pixel-bounce.svg"
    },
    {
        slug: "campus-crush",
        title: "Campus Crush",
        tagline: {
            en: "A campus romance visual novel — 7 days, 5 unique heroines. Choose your path and unlock exclusive endings!",
            zh: "校园恋爱视觉小说！7天时间，5位性格迥异的女生，选择你的心动对象，解锁专属结局！"
        },
        url: "https://game.weixin-vip.cn/love/",
        author: "abczsl520",
        tags: ["Visual Novel", "Simulation", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/campus-crush.svg"
    },
    {
        slug: "ice-fire-era",
        title: "Ice & Fire Era",
        tagline: {
            en: "Ice age apocalypse — guard the furnace, build a city, manage survivors, and research tech to survive the blizzard!",
            zh: "冰川末日降临！守护大火炉，建造城市，管理幸存者，研究科技，在暴风雪中求生！你能撑过几天？"
        },
        url: "https://game.weixin-vip.cn/winter/",
        author: "abczsl520",
        tags: ["Strategy", "Survival", "Management", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/ice-fire-era.svg"
    },
    {
        slug: "crazy-farm",
        title: "Crazy Farm",
        tagline: {
            en: "Plant, harvest, and raid friends' farms — 15 crops, retro pixel vibes. Pure farming joy!",
            zh: "种菜偷菜，快乐农场生活！15种作物，好友互动，像素复古风~"
        },
        url: "https://game.weixin-vip.cn/farm/",
        author: "abczsl520",
        tags: ["Simulation", "Casual", "Pixel", "Web"],
        createdAt: "2026-04-07",
        cover: "/covers/crazy-farm.svg"
    }
];
