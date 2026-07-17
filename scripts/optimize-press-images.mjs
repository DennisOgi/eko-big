/**
 * Compress the extracted press-page scans for the web.
 *
 * The raw pages from `extract-press-pdf.mjs` are ~3.3 MB each. This script
 * rewrites them as progressive JPEGs capped at 1600px wide (plenty for the
 * on-page viewer and lightbox) and emits 480px `-thumb` variants for the
 * thumbnail strip. Re-run `extract-press-pdf.mjs` first to restore originals.
 */
import { readdir, rename, stat } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pagesDir = path.resolve(__dirname, "..", "public", "media", "press", "pages")

const files = (await readdir(pagesDir)).filter(
  (f) => /^page-\d+\.jpg$/.test(f),
)

for (const file of files) {
  const full = path.join(pagesDir, file)
  const before = (await stat(full)).size

  const tmp = `${full}.tmp`
  await sharp(full)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 76, progressive: true, mozjpeg: true })
    .toFile(tmp)
  await rename(tmp, full)

  const thumbName = file.replace(/\.jpg$/, "-thumb.jpg")
  await sharp(full)
    .resize({ width: 480, withoutEnlargement: true })
    .jpeg({ quality: 70, progressive: true, mozjpeg: true })
    .toFile(path.join(pagesDir, thumbName))

  const after = (await stat(full)).size
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (+ ${thumbName})`,
  )
}
