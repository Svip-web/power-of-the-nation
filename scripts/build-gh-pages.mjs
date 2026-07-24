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
  const scriptSrc = `${basePath}/${entryFile}`;
  const script = `<script type="module" crossorigin src="${scriptSrc}"></script>`;
  const clientEntryPattern =
    /<script\s+type=["']module["']\s+crossorigin(?:=["'][^"']*["'])?\s+src=["'](?:\/power-of-the-nation)?\/assets\/index-[^"']+\.js["']><\/script>/g;
  const nextHtml = html.replace(clientEntryPattern, script);

  if (nextHtml.includes(scriptSrc)) {
    return nextHtml;
  }

  return nextHtml.replace("</body>", `${script}</body>`);
}

function normalizeClientAssets(html, entryFile, cssFile) {
  const scriptSrc = `${basePath}/${entryFile}`;
  const cssHref = `${basePath}/${cssFile}`;

  return html
    .replace(/<link\s+rel=["']modulepreload["'][^>]+>/g, "")
    .replace(/(?:\/power-of-the-nation)+\/assets\/index-[^"'\\\]]+\.js/g, scriptSrc)
    .replace(/\/assets\/index-[^"'\\\]]+\.js/g, scriptSrc)
    .replace(/(?:\/power-of-the-nation)+\/assets\/index-[^"'\\\]]+\.css/g, cssHref)
    .replace(/\/assets\/index-[^"'\\\]]+\.css/g, cssHref)
    .replace(/(?:\/power-of-the-nation){2,}/g, basePath);
}

async function getClientCssFile(outDir) {
  const assetsDir = path.join(outDir, "assets");
  const entries = await readdir(assetsDir, { withFileTypes: true });
  const cssFile = entries
    .filter((entry) => entry.isFile() && /^index-[\w-]+\.css$/.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .at(-1);

  if (!cssFile) {
    throw new Error("Cannot find the compiled client CSS file.");
  }

  return `assets/${cssFile}`;
}

function ensureClientCss(html, cssFile) {
  const cssHref = `${basePath}/${cssFile}`;
  return html
    .replace(/(?:\/power-of-the-nation)+\/assets\/index-[^"'\\\]]+\.css/g, cssHref)
    .replace(/\/assets\/index-[^"'\\\]]+\.css/g, cssHref);
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
const cssFile = await getClientCssFile(distClient);

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
html = ensureClientCss(html, cssFile);
html = ensureClientEntry(html, entryFile);
html = normalizeClientAssets(html, entryFile, cssFile);
assertReady(html);

await writeFile(path.join(outDir, "index.html"), html);
await writeFile(path.join(outDir, "404.html"), html);
await writeFile(path.join(outDir, ".nojekyll"), "");
await writeFile(path.join(cwd, ".last-gh-pages-static"), path.basename(outDir));

console.log(outDir);
