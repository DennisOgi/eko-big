# ECKOBIG ANTHONY — Profile Site

Premium personal / professional profile website for **ECKOBIG ANTHONY** (gold, green, white).

## Stack

- Vite
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/     # Hero, About, CHANGE, SON, CEFON, Contact, VideoPlayer, YouTubeEmbed, Nav
  content/        # Copy + asset paths (easy to extend)
  App.tsx
public/media/     # Optimized-path copies of project assets
assets/           # Original source media (kept intact)
```

### Adding a new section later

1. Add copy in `src/content/`
2. Create a section component under `src/components/`
3. Register it in `src/content/sections.ts` and render it in `App.tsx`
4. Add a nav link in `src/components/Nav.tsx`

### Page sections (order)

1. Hero (cinematic portrait suite)
2. About
3. **CHANGE! YES WE CAN!** — campaign / song (YouTube embed)
4. SON Initiative
5. CEFON
6. Contact

### Asset map

| Role | File |
|------|------|
| Hero cinematic suite | See `src/content/hero.ts` — portraits + ambient plates |
| About portraits | `portrait-navy-full.jpeg`, `portrait-lifestyle.jpeg`, `portrait-dubai-story.jpeg` |
| Brand mark (contact) | `eckobig-logo.jpeg` |
| CEFON logo / poster | `cefon-logo.jpeg` |
| Change Your Thinking | `change-thinking.jpeg` |
| CHANGE! YES WE CAN! | YouTube `IwWFg2fktu8` (facade embed in `YouTubeEmbed`) |
| SON video | `son.mp4` |
| CEFON video | `cefon.mp4` |
| Credentials | `credential-cac.jpeg`, `credential-employment.jpeg`, `credential-sira.jpeg` |

Original filenames remain under `/assets`.
