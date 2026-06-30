# my personal site & photography portfolio

Built with [Astro](https://astro.build).

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


## Projects & installations

The "other projects & installations" cluster is also folder-based. Posts are
defined in `src/data/installations.ts`; images live in
`public/installations/<folder>/` (galleries) or
`public/installations/<folder>/<year>/` (carousels) and are read automatically
at build, drop files in and rebuild.



