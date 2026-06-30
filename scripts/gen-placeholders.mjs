// Generates muted SVG placeholders so the gallery layout looks real before
// Michelle drops in actual photos. Safe to delete once real photos exist.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "photos");
mkdirSync(outDir, { recursive: true });

// per-category tone (hue, sat) + how many placeholders to make.
const cats = {
  concert: { hs: [285, 42], count: 4 },
  action: { hs: [205, 40], count: 4 }, // action / sport
  portraits: { hs: [25, 32], count: 4 },
  life: { hs: [40, 28], count: 4 },
  landscape: { hs: [150, 34], count: 4 },
  film: { hs: [30, 10], count: 4 }, // desaturated, film-ish
};

const ratios = [
  [1200, 1500],
  [1200, 800],
  [1200, 1200],
  [1200, 1600],
];

const manifest = [];

for (const [cat, { hs: [h, s], count }] of Object.entries(cats)) {
  Array.from({ length: count }, (_, n) => ratios[n % ratios.length]).forEach(
    (ratio, i) => {
      const [w, hgt] = ratio;
      const l1 = 34 + i * 5;
      const l2 = l1 + 16;
      const file = `${cat}-${i + 1}.svg`;
      const label = cat.toUpperCase();
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" viewBox="0 0 ${w} ${hgt}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h} ${s}% ${l1}%)"/>
      <stop offset="1" stop-color="hsl(${(h + 25) % 360} ${s}% ${l2}%)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${hgt}" fill="url(#g)"/>
  <text x="50%" y="50%" fill="rgba(255,255,255,.4)" font-family="Helvetica, Arial, sans-serif"
    font-size="${Math.round(w / 18)}" letter-spacing="5" text-anchor="middle"
    dominant-baseline="middle">${label}</text>
</svg>`;
      writeFileSync(join(outDir, file), svg.trim());
      manifest.push({
        src: `/photos/${file}`,
        category: cat,
        caption: `${cat[0].toUpperCase()}${cat.slice(1)} — untitled`,
        w,
        h: hgt,
      });
    }
  );
}

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Wrote ${manifest.length} placeholders to public/photos/`);
