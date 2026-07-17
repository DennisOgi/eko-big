import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { pdf } from "pdf-to-img"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const pdfPath = path.join(root, "assets", "ECKOBIG PDF.pdf")
const outDir = path.join(root, "public", "media", "press", "pages")

await mkdir(outDir, { recursive: true })

const doc = await pdf(pdfPath, { scale: 2 })
let page = 0

for await (const image of doc) {
  page += 1
  const name = `page-${String(page).padStart(2, "0")}.jpg`
  await writeFile(path.join(outDir, name), image)
  console.log(`Wrote ${name} (${image.length} bytes)`)
}

console.log(`TOTAL_PAGES=${page}`)
