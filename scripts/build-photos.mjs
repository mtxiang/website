// ---------------------------------------------------------------------------
// Builds one manifest file PER SECTION in  public/photos/manifest/<category>.json
// from the per-category image folders.
//
// Workflow:
//   1. Drop image files into  public/photos/<category>/   (folder = category)
//   2. Run:  npm run photos
//   3. Open  public/photos/manifest/<category>.json  and edit each photo's
//      "caption" (and "wall" flag). One file per section, so you only touch the
//      section you're working on. Captions AND wall flags are PRESERVED across
//      runs (keyed by file path), so re-run any time you add/remove/reorder.
//
// Ordering: files are sorted naturally, so a numeric prefix controls order,
// e.g. "01 - doechii.jpg", "02 - dayglow.jpg".
//
// "wall": true/false controls whether a photo shows on the gallery wall (no
// cap). New photos default to wall:true; photos set to false stay gallery-only.
// ---------------------------------------------------------------------------
import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const photosDir = join(__dirname, "..", "public", "photos");
const manifestDir = join(photosDir, "manifest");
const legacyManifest = join(photosDir, "manifest.json");

// Keep in sync with CATEGORIES in src/data/photos.ts
const CATEGORIES = ["concert", "action", "portraits", "life", "landscape", "film"];
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

// Preserve existing captions + wall flags, keyed by src. Read from the new
// per-section files first, then fall back to the legacy single manifest.json
// (so existing edits migrate over on the first run).
const captionBySrc = new Map();
const wallBySrc = new Map();
function remember(entries) {
  for (const p of entries) {
    if (!captionBySrc.has(p.src)) captionBySrc.set(p.src, p.caption ?? "");
    if (!wallBySrc.has(p.src)) wallBySrc.set(p.src, p.wall);
  }
}
for (const cat of CATEGORIES) {
  const f = join(manifestDir, `${cat}.json`);
  if (existsSync(f)) remember(JSON.parse(readFileSync(f, "utf8")));
}
if (existsSync(legacyManifest))
  remember(JSON.parse(readFileSync(legacyManifest, "utf8")));

// natural sort so "2 - x" comes before "10 - x"
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });

let total = 0;
let missingCaptions = 0;
console.log("");
for (const cat of CATEGORIES) {
  const dir = join(photosDir, cat);
  const section = [];
  if (existsSync(dir)) {
    const files = readdirSync(dir)
      .filter((f) => IMG_EXT.has(extname(f).toLowerCase()))
      .sort(collator.compare);
    for (const file of files) {
      const src = `/photos/${cat}/${file}`;
      // default new photos onto the wall; preserve an explicit choice across runs
      const wall = wallBySrc.has(src) ? wallBySrc.get(src) !== false : true;
      const caption = captionBySrc.get(src) ?? "";
      if (!caption) missingCaptions++;
      section.push({ src, caption, wall });
    }
  }
  writeFileSync(
    join(manifestDir, `${cat}.json`),
    JSON.stringify(section, null, 2) + "\n"
  );
  total += section.length;
  const n = section.length;
  const onWall = section.filter((p) => p.wall).length;
  const note = onWall < n ? `  (${onWall} on the wall, ${n} total)` : "";
  console.log(`  ${cat.padEnd(11)} ${String(n).padStart(2)} photo${n === 1 ? "" : "s"}${note}`);
}

// flag any non-category folders so nothing is silently ignored
for (const entry of readdirSync(photosDir)) {
  if (
    entry !== "manifest" &&
    statSync(join(photosDir, entry)).isDirectory() &&
    !CATEGORIES.includes(entry)
  ) {
    console.warn(`  ! folder "${entry}" is not a known category — skipped`);
  }
}

// retire the old single-file manifest once sections are written
if (existsSync(legacyManifest)) rmSync(legacyManifest);

console.log(`\n  wrote ${total} photos across ${CATEGORIES.length} section files in public/photos/manifest/`);
if (missingCaptions)
  console.log(`  ${missingCaptions} still need a caption (edit the section files)\n`);
