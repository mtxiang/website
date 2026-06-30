// ---------------------------------------------------------------------------
// Projects & installations — folder-based, like the photo wall.
//
// Put images in:  public/installations/<folder>/      (galleries)
//             or: public/installations/<folder>/<year>/  (carousels)
// then just reference the folder here. `imagesFor()` reads it at build time,
// natural-sorted (so "01 - x.jpg" controls order).
//
// Layouts:
//   • "gallery"  — a masonry of images from `folder`
//   • "carousel" — one arrow-carousel per entry in `carousels`
//   • "index"    — a landing that links to `children` posts
// ---------------------------------------------------------------------------
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../public/installations/", import.meta.url));
const IMG = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
const natural = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/** image paths (under /installations/...) for a folder, natural-sorted */
export function imagesFor(folder: string): string[] {
  const dir = join(ROOT, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => IMG.test(f))
    .sort(natural.compare)
    .map((f) => `/installations/${folder}/${f}`);
}

export interface Carousel {
  year: string;
  folder: string;
}

export interface Installation {
  slug: string;
  title: string;
  org?: string; // ties to a Campus Involvement entry
  blurb?: string; // one-line intro under the title
  body?: string[]; // longer description — one string per paragraph
  tone: [string, string]; // wall thumbnail gradient (until a cover image exists)
  layout: "gallery" | "carousel" | "index";
  folder?: string; // gallery
  carousels?: Carousel[]; // carousel
  children?: string[]; // index → child slugs
  onWall?: boolean; // shown in the wall's "other projects & installations" cluster
}

export const installations: Installation[] = [
  {
    slug: "infinite",
    title: "Infinite Magazine",
    org: "Infinite Magazine",
    blurb: "Five editorial spreads I shot for MIT's fashion magazine.",
    tone: ["#7a3340", "#c2702f"],
    layout: "index",
    children: [
      "infinite-1",
      "infinite-2",
      "infinite-3",
      "infinite-4",
      "infinite-5",
    ],
    onWall: true,
  },
  {
    slug: "mit-gala",
    title: "MIT Gala",
    org: "MIT Gala",
    blurb: "Runway & event photography, 2024–2026.",
    tone: ["#3a2f40", "#7a3340"],
    layout: "carousel",
    carousels: [
      { year: "2026", folder: "mit-gala/2026" },
      { year: "2025", folder: "mit-gala/2025" },
      { year: "2024", folder: "mit-gala/2024" },
    ],
    onWall: true,
  },
  // the five Infinite spreads (linked under "infinite", not shown on the wall)
  ...[1, 2, 3, 4, 5].map(
    (n): Installation => ({
      slug: `infinite-${n}`,
      title: `Infinite — Spread ${n}`,
      org: "Infinite Magazine",
      tone: ["#7a3340", "#9a4a55"],
      layout: "gallery",
      folder: `infinite-${n}`,
    })
  ),
];

export const installationBySlug: Record<string, Installation> =
  Object.fromEntries(installations.map((i) => [i.slug, i]));

/** best cover image for a thumbnail, or null to fall back to the tone gradient */
export function coverFor(inst: Installation): string | null {
  if (inst.layout === "gallery" && inst.folder) {
    return imagesFor(inst.folder)[0] ?? null;
  }
  if (inst.layout === "carousel" && inst.carousels?.length) {
    return imagesFor(inst.carousels[0].folder)[0] ?? null;
  }
  if (inst.layout === "index" && inst.children?.length) {
    for (const slug of inst.children) {
      const child = installationBySlug[slug];
      if (child?.folder) {
        const img = imagesFor(child.folder)[0];
        if (img) return img;
      }
    }
  }
  return null;
}
