import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = resolve(rootDir, "site");
const siteIndexPath = resolve(siteDir, "index.html");
const redirectBlockPattern =
  /\s*<!-- GITHUB_PAGES_BRANCH_REDIRECT_START -->[\s\S]*?<!-- GITHUB_PAGES_BRANCH_REDIRECT_END -->\s*/;

await build({
  root: rootDir,
  configFile: resolve(rootDir, "vite.config.js"),
  build: {
    outDir: siteDir,
    emptyOutDir: true,
  },
});

const siteIndex = await readFile(siteIndexPath, "utf8");
const sanitizedSiteIndex = siteIndex.replace(redirectBlockPattern, "\n");

if (siteIndex === sanitizedSiteIndex) {
  throw new Error("Nao foi possivel remover o redirect de GitHub Pages do build em site/index.html.");
}

await writeFile(siteIndexPath, sanitizedSiteIndex, "utf8");
await writeFile(resolve(siteDir, ".nojekyll"), "", "utf8");
