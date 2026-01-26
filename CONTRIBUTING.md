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
