import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function requireIncludes(file, text, description) {
  const source = read(file);
  if (!source.includes(text)) errors.push(`${file} missing ${description}`);
}

function requirePattern(file, pattern, description) {
  const source = read(file);
  if (!pattern.test(source)) errors.push(`${file} missing ${description}`);
}

requireIncludes(
  "lib/release-index.ts",
  "https://raw.githubusercontent.com/knoxhack/ECHO-Release-Index/main/channels/alpha/launcher-channel.json",
  "canonical Release Index channel URL"
);
requireIncludes("lib/release-index.ts", "catalogUrls", "catalog URL resolver");
requirePattern(
  "lib/release-index.ts",
  /entry\.validation\s*===\s*"approved"/,
  "approved-entry filtering"
);
requireIncludes("lib/release-index.ts", "hasNativeInstallArtifact", "native install artifact guard");
requireIncludes("lib/release-index.ts", "hasModpackManifestArtifact", "modpack manifest artifact guard");
requirePattern(
  "lib/release-index.ts",
  /hasUrlAndSha256[\s\S]+sha256/,
  "URL and SHA-256 artifact requirement"
);
requirePattern(
  "lib/release-index.ts",
  /entry\.kind\s*===\s*"module"[\s\S]+entry\.kind\s*===\s*"addon"[\s\S]+hasNativeInstallArtifact/,
  "installable module/addon filtering"
);
requireIncludes("lib/install-links.ts", "echo://install/addon/", "addon install deep link");
requireIncludes("lib/install-links.ts", "echo://update/pack/", "pack update deep link");

requireIncludes("app/download/page.tsx", "getReleaseIndexCatalog", "Release Index catalog fetch");
requireIncludes("app/download/page.tsx", "approvedEntries", "approved modpack filtering");
requireIncludes("app/download/page.tsx", "packUpdateLink(target.id)", "indexed pack update links");

requireIncludes("app/modules/page.tsx", "getReleaseIndexCatalog", "Release Index catalog fetch");
requireIncludes("app/modules/page.tsx", "approvedInstallableIds", "approved installable ID filtering");
requireIncludes("app/modules/page.tsx", "installableModuleIds={installableModuleIds}", "installable IDs passed to catalog");
requireIncludes("components/module-catalog.tsx", "installable.has(module.id)", "module-card install gating");
requireIncludes("components/module-card.tsx", "{installable ?", "conditional install rendering");
requirePattern(
  "components/module-card.tsx",
  /\{installable \? \([\s\S]+addonInstallLink\(module\.id\)[\s\S]+\) : null\}/,
  "install link guarded by approved index state"
);
requireIncludes("app/modules/[id]/page.tsx", "getReleaseIndexCatalog", "detail page Release Index catalog fetch");
requireIncludes("app/modules/[id]/page.tsx", "approvedInstallableIds", "detail page approved installable filtering");
requirePattern(
  "app/modules/[id]/page.tsx",
  /\{installable \? \([\s\S]+addonInstallLink\(moduleRecord\.id\)[\s\S]+\) : null\}/,
  "detail install link guarded by approved index state"
);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Release Index link audit passed");
