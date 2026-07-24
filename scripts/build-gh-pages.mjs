import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const basePath = "/power-of-the-nation";
const cwd = process.cwd();
const distClient = path.join(cwd, "dist", "client");
const renderedIndex = path.join(cwd, ".rendered-index.html");
const manifestPath = path.join(distClient, ".vite", "manifest.json");

function prefixAbsolutePaths(source) {
  return source
    .replace(/(\s(?:href|src|data-rsc-css-href)=["'])\/(?!power-of-the-nation\/|\/)/g, `$1${basePath}/`)
    .replace(/url\((["']?)\/(?!power-of-the-nation\/|\/)/g, `url($1${basePath}/`)
    .replace(/(["'`])\/(?!power-of-the-nation\/|\/)([^"'`]+\.(?:png|webp|svg|jpg|jpeg|gif|woff2?|css|js))/g, `$1${basePath}/$2`);
}

function ensureClientEntry(html, entryFile) {
  const script = `<script type="module" crossorigin src="${basePath}/${entryFile}"></script>`;
  if (html.includes(script)) {
    return html;
  }

  return html.replace("</body>", `${script}</body>`);
}

function assertReady(html) {
  if (!html.includes('<script type="module"')) {
    throw new Error("Generated HTML is missing the client module script.");
  }

  if (/src=["']\/(?!power-of-the-nation\/)/.test(html) || /href=["']\/(?!power-of-the-nation\/)/.test(html)) {
    throw new Error("Generated HTML still contains root-relative asset paths.");
  }
}

async function prefixCssAssets(outDir) {
  const assetsDir = path.join(outDir, "assets");
  const entries = await readdir(assetsDir, { withFileTypes: true });
  const cssFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".css"));

  for (const file of cssFiles) {
    const filePath = path.join(assetsDir, file.name);
    const css = await readFile(filePath, "utf8");
    await writeFile(filePath, prefixAbsolutePaths(css));
  }
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const entryFile = manifest["virtual:vinext-app-browser-entry"]?.file;

if (!entryFile) {
  throw new Error("Cannot find the Vinext browser entry in the Vite manifest.");
}

if (!existsSync(renderedIndex)) {
  throw new Error("Missing .rendered-index.html. Render the production page before running this script.");
}

const stamp = Date.now();
const outDir = path.join(cwd, `gh-pages-static-${stamp}`);

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(distClient, outDir, { recursive: true });
await prefixCssAssets(outDir);

let html = await readFile(renderedIndex, "utf8");
html = prefixAbsolutePaths(html);
html = ensureClientEntry(html, entryFile);
assertReady(html);

await writeFile(path.join(outDir, "index.html"), html);
await writeFile(path.join(outDir, "404.html"), html);
await writeFile(path.join(outDir, ".nojekyll"), "");
await writeFile(path.join(cwd, ".last-gh-pages-static"), path.basename(outDir));

console.log(outDir);
