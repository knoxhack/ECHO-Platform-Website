import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const auditRoot = path.resolve(root, "..");
const errors = [];
const ignoredDirs = new Set([".git", ".next", "node_modules", "out", "dist", "build"]);

function exists(file) {
  return fs.existsSync(file);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function walk(dir, out = []) {
  if (!exists(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function normalizeRoute(route) {
  const clean = route.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean || "/";
}

function appRouteFromPage(file) {
  const relative = rel(file).replace(/^app\//, "").replace(/\/page\.(tsx|ts|jsx|js|mdx?)$/, "");
  if (relative === "page.tsx" || relative === "page" || relative === "") return "/";
  return `/${relative}`;
}

const pageFiles = walk(path.join(root, "app")).filter((file) => /\/page\.(tsx|ts|jsx|js|mdx?)$/.test(rel(file)));
const staticRoutes = new Set();
const dynamicRoutePatterns = [];

for (const file of pageFiles) {
  const route = appRouteFromPage(file);
  if (!route.includes("[")) {
    staticRoutes.add(normalizeRoute(route));
    continue;
  }
  const pattern = route
    .replace(/\/\[\.\.\.[^\]]+\]/g, "(?:/.+)?")
    .replace(/\[[^\]]+\]/g, "[^/]+");
  dynamicRoutePatterns.push(new RegExp(`^${pattern}$`));
}

function docsRouteExists(route) {
  if (route === "/docs") return true;
  if (!route.startsWith("/docs/")) return false;
  const docsPath = route.replace(/^\/docs\//, "");
  const target = path.join(root, "docs", docsPath);
  return [
    target,
    `${target}.md`,
    `${target}.mdx`,
    path.join(target, "index.md"),
    path.join(target, "index.mdx")
  ].some(exists);
}

function routeExists(route) {
  const clean = normalizeRoute(route);
  if (staticRoutes.has(clean)) return true;
  if (docsRouteExists(clean)) return true;
  return dynamicRoutePatterns.some((pattern) => pattern.test(clean));
}

function collectInternalRoutes(file) {
  const text = fs.readFileSync(file, "utf8");
  const routes = [];
  const patterns = [
    /\bhref\s*=\s*["'](\/[^"'#?]+)["']/g,
    /\bhref:\s*["'](\/[^"'#?]+)["']/g,
    /\[[^\]]+\]\((\/[^)#?]+)[^)]*\)/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text))) {
      const route = match[1];
      if (route.includes("${")) continue;
      if (route.startsWith("/images/") || route.startsWith("/fonts/")) continue;
      routes.push(route);
    }
  }
  return routes;
}

for (const file of walk(root).filter((entry) => /\.(tsx|ts|mdx|md|json)$/i.test(entry))) {
  const relative = rel(file);
  if (relative.startsWith("data/release-index-snapshot.json")) continue;
  for (const route of collectInternalRoutes(file)) {
    if (!routeExists(route)) {
      errors.push(`${relative} links missing route ${route}`);
    }
  }
}

const products = readJson(path.join(root, "data", "products.json"));
const modules = readJson(path.join(root, "data", "modules.json"));
const downloads = readJson(path.join(root, "data", "downloads.json"));
const moduleManifest = readJson(path.join(root, "data", "module-source-manifest.json"));
const sdkManifest = readJson(path.join(root, "data", "sdk-docs-manifest.json"));
const releaseSnapshot = readJson(path.join(root, "data", "release-index-snapshot.json"));

if (products.length !== 12) errors.push(`Expected 12 products, found ${products.length}`);
for (const product of products) {
  if (!routeExists(product.route)) errors.push(`Product ${product.repoName} has missing route ${product.route}`);
  if (!product.repoUrl.includes(`/knoxhack/${product.repoName}`)) {
    errors.push(`Product ${product.repoName} has wrong repoUrl ${product.repoUrl}`);
  }
}

if (modules.length !== moduleManifest.moduleCount) {
  errors.push(`modules.json has ${modules.length} modules but manifest expects ${moduleManifest.moduleCount}`);
}

const moduleIds = modules.map((module) => module.id).sort();
const manifestIds = [...moduleManifest.moduleIds].sort();
if (moduleIds.join("\n") !== manifestIds.join("\n")) {
  errors.push("modules.json ids do not match module-source-manifest.json");
}

const modulesSourceDir = path.join(auditRoot, "ECHO-Modules", "addons");
if (exists(modulesSourceDir)) {
  const sourceIds = fs
    .readdirSync(modulesSourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => exists(path.join(modulesSourceDir, entry.name, "src/main/resources/META-INF/echo.mod.json")))
    .map((entry) => {
      const descriptor = readJson(path.join(modulesSourceDir, entry.name, "src/main/resources/META-INF/echo.mod.json"));
      return descriptor.id;
    })
    .sort();
  if (sourceIds.join("\n") !== moduleIds.join("\n")) {
    errors.push("modules.json ids do not match ../ECHO-Modules/addons");
  }
}

if (sdkManifest.docCount !== sdkManifest.docs.length) {
  errors.push("sdk-docs-manifest.json docCount does not match docs length");
}
for (const doc of sdkManifest.docs) {
  if (!exists(path.join(root, doc.targetPath))) errors.push(`Missing mirrored SDK doc ${doc.targetPath}`);
}

const sdkDocsSourceDir = path.join(auditRoot, "ECHO-SDK", "docs");
if (exists(sdkDocsSourceDir)) {
  for (const doc of sdkManifest.docs) {
    const sourcePath = path.join(sdkRoot(), doc.sourcePath);
    if (!exists(sourcePath)) {
      errors.push(`Missing SDK source doc ${doc.sourcePath}`);
      continue;
    }
    const hash = sha256(fs.readFileSync(sourcePath, "utf8"));
    if (hash !== doc.sourceSha256) {
      errors.push(`Mirrored SDK doc is stale: ${doc.sourcePath}`);
    }
  }
}

if ((releaseSnapshot.repositories || []).length !== 12) {
  errors.push(`release-index-snapshot.json expected 12 repositories, found ${(releaseSnapshot.repositories || []).length}`);
}
const releaseAssetCount = (releaseSnapshot.repositories || []).reduce((sum, repository) => sum + (repository.assets || []).length, 0);
if (releaseAssetCount === 0) errors.push("release-index-snapshot.json has no downloadable assets");
for (const repoName of ["ECHO-Launcher", "ECHO-Modules", "ECHO-Ashfall-Native-Edition", "ECHO-Ashfall-NeoForge-Edition", "ECHO-Ashfall-Standalone-Edition"]) {
  if (!(releaseSnapshot.repositories || []).some((repository) => repository.repoName === repoName)) {
    errors.push(`release-index-snapshot.json missing ${repoName}`);
  }
}

for (const download of downloads) {
  if (!download.assetKind) continue;
  const matches = findDownloadMatches(download, releaseSnapshot);
  if (download.requiresAsset && !download.allowMissingAsset && matches.length === 0) {
    errors.push(`download ${download.id} did not match a release asset`);
    continue;
  }
  for (const match of matches) {
    if (download.assetRepoName && match.repository.repoName !== download.assetRepoName) {
      errors.push(`download ${download.id} matched wrong repo ${match.repository.repoName}`);
    }
  }
}

const publicFiles = walk(root).filter((file) => /\.(tsx|ts|mdx|md|json)$/i.test(file));
const staleChecks = [
  { pattern: /docs\/developers\/addons/i, label: "old addon docs route" },
  { pattern: new RegExp("ECHO Native Platform Public " + "Alpha", "i"), label: "old native alpha title" },
  { pattern: new RegExp("by ECHO " + "Labs", "i"), label: "old module publisher suffix" }
];
for (const file of publicFiles) {
  const relative = rel(file);
  if (relative.startsWith("scripts/")) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const check of staleChecks) {
    if (check.pattern.test(text)) errors.push(`${relative} contains ${check.label}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Website drift audit passed");

function sdkRoot() {
  return path.join(auditRoot, "ECHO-SDK");
}

function classifyAsset(name) {
  const normalized = name.toLowerCase();
  if (normalized.endsWith(".echo-pack.zip")) return "echo-pack";
  if (normalized.endsWith(".pack.json")) return "pack-manifest";
  if (normalized === "echo-release.json") return "release-metadata";
  if (normalized.includes("checksum") || normalized === "checksums.txt") return "checksums";
  if (normalized.includes("final-qa") || normalized.includes("release-prep") || normalized.includes("proof-gate")) return "qa-report";
  if (normalized.endsWith(".blockmap") || normalized === "latest.yml" || normalized.includes("license")) return "other";
  if (normalized.endsWith(".echo-addon")) return "native-addon";
  if (normalized.includes("ashfall") && normalized.includes("edition") && normalized.endsWith(".zip")) return "echo-pack";
  if (normalized.endsWith("-standalone.jar")) return "module-jar";
  if (normalized.includes("standalone") && (normalized.endsWith(".zip") || normalized.endsWith(".jar"))) return "standalone-runtime";
  if (normalized.includes("native-product") && normalized.endsWith(".zip")) return "native-platform-package";
  if (normalized.endsWith(".jar")) return "module-jar";
  if (normalized.endsWith(".msi")) return "windows-installer";
  if (normalized.endsWith(".exe") && (normalized.includes("setup") || normalized.includes("install"))) return "windows-installer";
  if (normalized.endsWith(".exe") && normalized !== "elevate.exe") return "windows-portable-app";
  if (normalized.endsWith(".appimage")) return "linux-appimage";
  return "other";
}

function findDownloadMatches(download, releaseSnapshot) {
  const includes = (download.assetNameIncludes || []).map((value) => value.toLowerCase());
  const excludes = (download.assetNameExcludes || []).map((value) => value.toLowerCase());
  const matches = [];

  for (const repository of releaseSnapshot.repositories || []) {
    if (download.assetRepoName && repository.repoName !== download.assetRepoName) continue;
    for (const asset of repository.assets || []) {
      const name = asset.name.toLowerCase();
      if (classifyAsset(asset.name) !== download.assetKind) continue;
      if (includes.some((value) => !name.includes(value))) continue;
      if (excludes.some((value) => name.includes(value))) continue;
      matches.push({ repository, asset });
    }
  }

  return matches;
}
