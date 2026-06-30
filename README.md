# Michelle Xiang — personal site & photography portfolio

Built with [Astro](https://astro.build). A minimal, typography-forward shell
(About / Work / Contact) that opens into an image-first photography gallery.

## Run it

```sh
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # preview the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, tagline, nav, email | `src/data/site.ts` |
| About page text | `src/pages/index.astro` |
| Work / CV entries | `src/pages/work.astro` |
| Contact links (Instagram, LinkedIn, GitHub…) | `src/data/site.ts` → `socials` |
| Photo list & categories | `src/data/photos.ts` |
| Styling (colors, fonts, layout) | `src/styles/global.css` |

## Adding photos

Photos live in per-category folders under `public/photos/`, and a script builds
the manifest the site reads.

1. Drop web-sized images (~2000px long edge, sRGB, compressed) into the folder
   for their category:
   `public/photos/{concert,action,portraits,life,landscape,film}/`
   Name them to control order with a numeric prefix, e.g. `01 - doechii.jpg`.
2. Run `npm run photos` — this regenerates `public/photos/manifest.json`,
   listing every image with an empty `caption`.
3. Open `public/photos/manifest.json` and fill in each `caption`. Captions are
   **preserved** on future runs (keyed by file path), so you can keep adding
   files and re-running `npm run photos` without losing them.

Where they appear: the **first 6** photos in each category show on the wall
(`WALL_MAX` in `src/pages/photography/index.astro`); the **rest** show in that
category's gallery page (`/photography/<category>/`). Captions appear on hover on
the wall and below each image in the gallery.

To rename/add categories, edit `CATEGORIES` in `src/data/photos.ts` **and** the
matching list in `scripts/build-photos.mjs`.

## Projects & installations

The "other projects & installations" cluster is also folder-based. Posts are
defined in `src/data/installations.ts`; images live in
`public/installations/<folder>/` (galleries) or
`public/installations/<folder>/<year>/` (carousels) and are read automatically
at build — just drop files in and rebuild (no manifest, no `npm run photos`).

- **gallery** posts → a masonry of the folder's images (e.g. `the-tech-v145`)
- **carousel** posts → one arrow-carousel per year (e.g. `mit-gala` → 2026/2025/2024)
- **index** posts → a landing linking to child posts (e.g. `infinite` → 5 spreads)

Campus Involvement entries link to these posts via `href` in `src/data/tech.ts`.

The old placeholder generator `scripts/gen-placeholders.mjs` is superseded;
delete it and the placeholder `*.svg` files once real media is in.

## Deploy

The build is fully static (`dist/`), so it works on GitHub Pages, Netlify,
Vercel, or Cloudflare Pages with no extra config.
