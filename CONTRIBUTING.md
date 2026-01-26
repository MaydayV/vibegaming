# Contributing a game

## 1) Add your entry

Edit: `src/content/games.ts`

**Required fields:**
- `slug` (unique, url-safe)
- `title`
- `tagline` (en, zh)
- `url` (external game link)
- `author`
- `tags`
- `createdAt`

**Optional:**
- `cover` (path to image in `public/covers/`)
- `source` (repo link)
- `featured` (boolean)

## 2) Rules

- Your game must be playable from the provided link.
- No malware, phishing, or deceptive redirects.
- Keep tags relevant and readable (3–6 recommended).

## 3) Pull Request checklist

- [ ] I added en and zh tagline
- [ ] The game link works
- [ ] slug is unique
- [ ] (Optional) I added a cover image under `public/covers/`

## 4) Image Guidelines

We want the site to load fast and look good. Please follow these rules for game covers:

### Specifications
- **Directory**: Place images in `public/covers/`
- **Ratio**: **16:9** (Recommended: 1280x720 or 960x540)
- **Size**: **< 100kb** (Please compress your images!)
- **Format**: `.jpg`, `.png`, or `.webp`
- **Naming**: Use your game's slug. Example: `neon-drift.jpg`

### Usage in Code
In `src/content/games.ts`:
```ts
{
  slug: "neon-drift",
  // ...
  cover: "/covers/neon-drift.jpg" // Must start with /covers/
}
```

### Auto-Optimization (WebP)
You don't need to manually convert images to WebP if you don't want to. Our project uses Next.js Image Optimization.
- You upload a standard `png` or `jpg`.
- When a user visits the site, Next.js **automatically** serves them a specialized `webp` or `avif` version based on their browser support.
- This ensures best performance without extra work for you.

