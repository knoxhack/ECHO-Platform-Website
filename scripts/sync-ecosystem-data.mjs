import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const auditRoot = path.resolve(root, "..");
const modulesRoot = path.join(auditRoot, "ECHO-Modules");
const sdkRoot = path.join(auditRoot, "ECHO-SDK");
const releaseIndexRoot = path.join(auditRoot, "ECHO-Release-Index");

const targetRepos = [
  "ECHO-Launcher",
  "ECHO-Modules",
  "ECHO-Ashfall-Native-Edition",
  "ECHO-Ashfall-NeoForge-Edition",
  "ECHO-Ashfall-Standalone-Edition",
  "ECHO-Openlands-Native-Edition",
  "ECHO-Openlands-NeoForge-Edition",
  "ECHO-Openlands-Standalone-Edition",
  "ECHO-Sky-Relay-Native-Edition",
  "ECHO-Sky-Relay-NeoForge-Edition",
  "ECHO-Sky-Relay-Standalone-Edition",
  "ECHO-Release-Index",
  "ECHO-Native-Platform",
  "ECHO-Standalone-Runtime",
  "ECHO-SDK",
  "ECHO-Developer-Studio",
  "ECHO-Addons-Studio",
  "ECHO-Platform-Website"
];

const productSeed = {
  "ECHO-Launcher": {
    route: "/launcher",
    tagline: "Install, update, repair, and launch ECHO experiences.",
    description:
      "Launcher source and app releases. It owns player install flow, repair flow, launcher updates, modpack file updates, and individual module updates.",
    status: "Public Releases",
    docsHref: "/docs/install/launcher",
    downloadHref: "/download",
    updateFlow:
      "Reads the Release Index channel, resolves the selected Ashfall edition, expands moduleRequirements, and downloads only missing or changed files when individual assets are available.",
    artifacts: ["Windows installer", "portable launcher app", "latest.yml", "blockmap", "launcher channel metadata"],
    features: [
      ["Individual module updates", "Compares module path, version, size, and SHA-256 before downloading a changed artifact.", "download"],
      ["Pack repair", "Rebuilds missing or corrupt pack files from release metadata without forcing a full reinstall.", "shield"],
      ["Edition handoff", "Launches Native, NeoForge, or Standalone Ashfall entries from one catalog.", "route"]
    ]
  },
  "ECHO-Modules": {
    route: "/modules",
    tagline: "All shared ECHO module source and per-module release artifacts.",
    description:
      "The canonical module repo. Each module owns source, manifests, per-module docs, generated Native, NeoForge, Standalone, and sources artifacts, per-module content graph sidecars, and release-root content graph evidence.",
    status: "Modules",
    docsHref: "/docs/release/module-artifacts",
    downloadHref: "/download",
    updateFlow:
      "Publishes one artifact family per runtime so the launcher can update modules independently inside each Ashfall edition.",
    artifacts: [
      "<module>-<version>-neoforge.jar",
      "<module>-<version>.echo-addon",
      "<module>-<version>-standalone.jar",
      "<module>-<version>-sources.jar",
      "<module>-<version>-content-graph.json",
      "content-graph-evidence.json"
    ],
    features: [
      ["Runtime families", "Native, NeoForge, and Standalone outputs share one echo.mod.json contract.", "layers"],
      ["Per-module docs", "Every addon has a README, artifact notes, descriptor files, and release ownership.", "file"],
      ["Launcher addressable", "moduleRequirements identify exact files instead of forcing whole-pack downloads.", "target"]
    ]
  },
  "ECHO-Ashfall-Native-Edition": {
    route: "/ashfall/native-edition",
    tagline: "Native runtime Ashfall pack using .echo-addon modules.",
    description:
      "The primary Ashfall edition for the ECHO Native Platform. Its assets are checksum-backed, but launcher installs are blocked until Phase 7-10 readiness evidence passes.",
    publicRole:
      "Warning-gated Ashfall Native Edition pack source and metadata for launcher pack updates. Consumes .echo-addon artifacts from ECHO-Modules.",
    status: "Readiness Blocked",
    docsHref: "/docs/release/ashfall-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily echo-addon after approval; launcher installs stay locked while beta sessions, gameplay QA evidence, screenshots, and RC smoke results are incomplete.",
    artifacts: ["ashfall-native-edition pack archive", "pack manifest", ".echo-addon module requirements", "checksums"],
    features: [
      ["Native loader lane", "Targets the runtime-independent ECHO Native Platform.", "loader"],
      ["Addon packages", "Consumes .echo-addon module packages from ECHO-Modules.", "puzzle"],
      ["Player catalog entry", "Appears in the launcher catalog as warning-gated until release-readiness evidence is green.", "app"]
    ]
  },
  "ECHO-Ashfall-NeoForge-Edition": {
    route: "/ashfall/neoforge-edition",
    tagline: "Minecraft/NeoForge Ashfall pack using -neoforge.jar modules.",
    description:
      "The compatibility edition for players and testers who need Minecraft/NeoForge runtime behavior while modules migrate to shared contracts. Its live pack manifest must be rebuilt with moduleRequirements before approval.",
    publicRole:
      "Warning-gated Ashfall NeoForge Edition pack source and metadata. Consumes -neoforge.jar artifacts from ECHO-Modules.",
    status: "Manifest Blocked",
    docsHref: "/docs/release/ashfall-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily neoforge after approval; the current live .pack.json is missing moduleRequirements and readiness evidence is not green.",
    artifacts: ["ashfall-neoforge-edition pack archive", "NeoForge pack manifest", "-neoforge.jar module requirements", "checksums"],
    features: [
      ["Minecraft-compatible", "Keeps the NeoForge fallback lane explicit and documented.", "network"],
      ["Jar module family", "Consumes -neoforge.jar module artifacts from ECHO-Modules.", "box"],
      ["Parity signal", "Blocked until moduleRequirements and gameplay readiness evidence are attached.", "gauge"]
    ]
  },
  "ECHO-Ashfall-Standalone-Edition": {
    route: "/ashfall/standalone-edition",
    tagline: "Ashfall Standalone Edition using -standalone.jar modules.",
    description:
      "The renamed standalone Ashfall runtime package. It proves standalone module behavior without positioning the old showcase name as the product, but the live pack manifest must be rebuilt with moduleRequirements before approval.",
    publicRole:
      "Warning-gated Ashfall Standalone Edition pack source and metadata. Consumes -standalone.jar artifacts from ECHO-Modules.",
    status: "Manifest Blocked",
    docsHref: "/docs/release/ashfall-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily standalone after approval; the current live .pack.json is missing moduleRequirements and readiness evidence is not green.",
    artifacts: ["ashfall-standalone-edition pack archive", "standalone pack manifest", "-standalone.jar module requirements", "checksums"],
    features: [
      ["Standalone runtime lane", "Runs Ashfall systems in the standalone runtime shell.", "box"],
      ["Standalone module family", "Consumes -standalone.jar module artifacts from ECHO-Modules.", "server"],
      ["Parity harness", "Blocked until moduleRequirements and gameplay readiness evidence are attached.", "test"]
    ]
  },
  "ECHO-Openlands-Native-Edition": {
    route: "/openlands/native-edition",
    tagline: "Native runtime Openlands pack using .echo-addon modules.",
    description:
      "The ECHO Native Platform edition for Openlands. It consumes .echo-addon artifacts from ECHO-Modules and keeps echoopenlandsprotocol as the source of truth.",
    status: "Planned Preview",
    docsHref: "/docs/release/openlands-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily echo-addon; launcher updates changed .echo-addon files independently after release metadata provides asset URLs.",
    artifacts: ["openlands-native-edition pack archive", "pack manifest", ".echo-addon module requirements", "checksums"],
    features: [
      ["Native loader lane", "Targets the runtime-independent ECHO Native Platform.", "layers"],
      ["Relaxed default", "Keeps Openlands Standard gentle and non-hardcore by default.", "shield"],
      ["Waystone parity", "Uses the same waystone state and map discovery IDs as Standalone and NeoForge.", "route"]
    ]
  },
  "ECHO-Openlands-NeoForge-Edition": {
    route: "/openlands/neoforge-edition",
    tagline: "NeoForge adapter edition using original Openlands content.",
    description:
      "The NeoForge edition for Openlands. It adapts Echo IDs into NeoForge runtime/data output without making Minecraft assets or branding the Openlands source.",
    status: "Planned Preview",
    docsHref: "/docs/release/openlands-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily neoforge; launcher updates changed -neoforge.jar files independently after release metadata provides asset URLs.",
    artifacts: ["openlands-neoforge-edition pack archive", "pack manifest", "-neoforge.jar module requirements", "checksums"],
    features: [
      ["NeoForge lane", "Provides Minecraft/NeoForge compatibility while keeping Openlands names, assets, and gameplay contracts original.", "blocks"],
      ["Generated data", "Converts Echo registries into NeoForge resources from echoopenlandsprotocol.", "file"],
      ["Parity target", "Matches Native and Standalone block, item, recipe, biome, creature, and waystone IDs.", "target"]
    ]
  },
  "ECHO-Openlands-Standalone-Edition": {
    route: "/openlands/standalone-edition",
    tagline: "Standalone runtime Openlands pack with no Minecraft dependency.",
    description:
      "The Standalone Runtime edition for Openlands. It proves the Openlands experience can run natively in the ECHO standalone runtime using the same shared protocol data.",
    status: "Planned Preview",
    docsHref: "/docs/release/openlands-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily standalone; launcher updates changed -standalone.jar files independently after release metadata provides asset URLs.",
    artifacts: ["openlands-standalone-edition pack archive", "pack manifest", "-standalone.jar module requirements", "checksums"],
    features: [
      ["Standalone lane", "Runs Openlands through ECHO Standalone Runtime without Minecraft or NeoForge.", "monitor"],
      ["Full runtime proof", "Validates worldgen, inventory, crafting, building, map, save/load, and waystone state in the standalone engine.", "check"],
      ["Shared protocol", "Consumes the same echoopenlandsprotocol registries as Native and NeoForge.", "layers"]
    ]
  },
  "ECHO-Sky-Relay-Native-Edition": {
    route: "/sky-relay/native-edition",
    tagline: "Native runtime Sky Relay pack using .echo-addon modules.",
    description:
      "The ECHO Native Platform edition for Sky Relay. It consumes echoskyrelayprotocol as the source-backed contract for fragments, storm routes, power stability, and recovery.",
    status: "Blocked Preview",
    docsHref: "/docs/release/sky-relay-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily echo-addon; launcher visibility remains preview-only until manual gameplay evidence, checksums, install, update, repair, and rollback gates pass.",
    artifacts: ["sky-relay-native-edition pack archive", "pack manifest", ".echo-addon module requirements", "manual gameplay evidence"],
    features: [
      ["Native loader lane", "Targets the runtime-independent ECHO Native Platform for the Sky Relay restoration loop.", "layers"],
      ["Fragment contracts", "Keeps anchor costs, scans, storm risk, and fragment unlock state source-backed.", "route"],
      ["Fail-closed release gate", "Public alpha stays blocked until the release pipeline proves real gameplay evidence.", "shield"]
    ]
  },
  "ECHO-Sky-Relay-NeoForge-Edition": {
    route: "/sky-relay/neoforge-edition",
    tagline: "NeoForge Sky Relay pack for Minecraft-compatible validation.",
    description:
      "The Minecraft/NeoForge edition for Sky Relay. It validates the same relay, fragment, storm, and Signal Crown contracts through the modded-client lane.",
    status: "Blocked Preview",
    docsHref: "/docs/release/sky-relay-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily neoforge; launcher install remains gated until strict release assets and manual playthrough evidence are attached.",
    artifacts: ["sky-relay-neoforge-edition pack archive", "pack manifest", "-neoforge.jar module requirements", "manual gameplay evidence"],
    features: [
      ["NeoForge lane", "Provides the Minecraft-compatible validation route for Sky Relay systems.", "blocks"],
      ["Signal Crown parity", "Checks late-route completion against the same source data as Native and Standalone.", "target"],
      ["Launcher smoke path", "Install, update, repair, rollback, and deep-link checks remain required before promotion.", "download"]
    ]
  },
  "ECHO-Sky-Relay-Standalone-Edition": {
    route: "/sky-relay/standalone-edition",
    tagline: "Standalone runtime Sky Relay pack with no Minecraft dependency.",
    description:
      "The Standalone Runtime edition for Sky Relay. It proves the relay-restoration loop can run against ECHO runtime contracts without Minecraft or NeoForge.",
    status: "Blocked Preview",
    docsHref: "/docs/release/sky-relay-editions",
    downloadHref: "/download",
    updateFlow:
      "Uses moduleArtifactFamily standalone; promotion is blocked until runtime harness evidence and manual gameplay proof are complete.",
    artifacts: ["sky-relay-standalone-edition pack archive", "pack manifest", "-standalone.jar module requirements", "manual gameplay evidence"],
    features: [
      ["Standalone lane", "Runs Sky Relay through ECHO Standalone Runtime for fast parity checks.", "monitor"],
      ["Storm route proof", "Validates storms, shelters, condensers, collectors, and recovery contracts outside NeoForge.", "gauge"],
      ["Release pipeline gate", "The central verifier refuses public alpha while evidence is still template-only.", "shield"]
    ]
  },
  "ECHO-Release-Index": {
    route: "/release-index",
    tagline: "Public catalog and channel metadata for launcher and website downloads.",
    description:
      "The canonical release catalog for channels, launcher updates, Ashfall editions, module artifacts, and website download snapshots.",
    status: "Catalog",
    docsHref: "/docs/release/release-index",
    downloadHref: "/download",
    updateFlow:
      "Website builds carry a static snapshot, while launcher clients read channel metadata to resolve pack and module assets.",
    artifacts: ["channels/alpha/release-manifest.json", "channels/alpha/repositories.json", "pack manifests", "launcher channel metadata"],
    features: [
      ["Channel source", "Keeps launcher, website, and release tooling pointed at one catalog.", "globe"],
      ["Static website snapshot", "Prevents private raw GitHub access from breaking the public download page.", "shield"],
      ["Pack registry", "Maps Ashfall editions to module artifact families and asset URLs.", "map"]
    ]
  },
  "ECHO-Native-Platform": {
    route: "/native-platform",
    tagline: "Native runtime, platform contracts, loader code, and PackOS integration.",
    description:
      "The runtime-independent platform foundation for Native Loader, core contracts, diagnostics, PackOS integration, and future ECHO runtime work.",
    status: "Native Platform",
    docsHref: "/docs/platform/native-platform",
    downloadHref: "/download",
    updateFlow:
      "Consumes module descriptors and pack metadata from the release index, then hosts native-compatible ECHO modules.",
    artifacts: ["native platform package", "runtime diagnostics", "PackOS reports", "native module inventory"],
    features: [
      ["Runtime-independent", "Keeps module contracts separate from one Minecraft mod loader.", "cpu"],
      ["Native loader", "Owns the primary future runtime lane for official experiences.", "loader"],
      ["Platform contracts", "Services, registry, lifecycle, networking, and resource contracts live here.", "braces"]
    ]
  },
  "ECHO-Standalone-Runtime": {
    route: "/standalone-runtime",
    tagline: "Standalone runtime shell and engine for ECHO modules.",
    description:
      "The standalone runtime shell, runtime contracts, PackOS bridge, parity tools, and standalone addon compatibility surface.",
    status: "Experimental",
    docsHref: "/docs/sdk/standalone-module-guide",
    downloadHref: "/download",
    updateFlow:
      "Consumes -standalone.jar modules and standalone pack metadata for fast testing and runtime parity work.",
    artifacts: ["standalone runtime assets", "parity matrix", "standalone module examples", "readiness gates"],
    features: [
      ["Fast test loop", "Runs ECHO module behavior outside full Minecraft startup.", "zap"],
      ["Headless-friendly", "Useful for automated addon tests and service validation.", "server"],
      ["Parity reports", "Tracks behavior against Native and NeoForge expectations.", "gauge"]
    ]
  },
  "ECHO-SDK": {
    route: "/sdk",
    tagline: "SDK, schemas, contracts, templates, and developer docs.",
    description:
      "The source of truth for ECHO schemas, contracts, templates, API docs, native authoring guidance, and release packaging docs.",
    status: "SDK",
    docsHref: "/docs/sdk/getting-started",
    downloadHref: "/download",
    updateFlow:
      "Documents the artifact and manifest contracts consumed by modules, studios, launchers, and Ashfall editions.",
    artifacts: ["schemas", "templates", "sample addons", "API docs", "packaging guides"],
    features: [
      ["Mirrored docs", "Website docs are generated from ECHO-SDK/docs so public SDK docs stay current.", "file"],
      ["Schemas", "Manifest contracts and validation surfaces for modules and packs.", "braces"],
      ["Templates", "Native, NeoForge, Standalone, and creator templates for addon work.", "template"]
    ]
  },
  "ECHO-Developer-Studio": {
    route: "/developer-studio",
    tagline: "Developer operations app for release validation and publishing.",
    description:
      "The platform operator app for release validation, manifest checks, SDK metadata, QA reports, and public release workflows.",
    status: "Studio",
    docsHref: "/docs/release/release-index",
    downloadHref: "/download",
    updateFlow:
      "Uses release-index metadata and SDK schemas to validate, preview, and prepare release assets before publication.",
    artifacts: ["Windows setup", "portable app", "win-x64 zip", "latest.yml", "blockmap"],
    features: [
      ["Release validation", "Checks manifests, checksums, assets, and QA evidence before publishing.", "shield"],
      ["Catalog preview", "Shows how launcher and website will read release metadata.", "eye"],
      ["Operator console", "Focuses on release managers and platform maintainers.", "monitor"]
    ]
  },
  "ECHO-Addons-Studio": {
    route: "/addons-studio",
    tagline: "Addon creation app for Native and Standalone modules.",
    description:
      "The creator IDE for ECHO addon developers. It owns templates, manifest editing, SDK detection, local testing, and publish assistance.",
    status: "Studio",
    docsHref: "/docs/sdk/creator-start-here",
    downloadHref: "/download",
    updateFlow:
      "Uses SDK templates and schemas to produce module projects that can publish Native, NeoForge, and Standalone artifacts.",
    artifacts: ["Windows setup", "portable app", "latest.yml", "blockmap", "template metadata"],
    features: [
      ["Manifest editor", "Validates echo.mod.json and packaging metadata while creators work.", "file"],
      ["Multi-target builds", "Guides Native, NeoForge, Standalone, and dual-target addon projects.", "target"],
      ["Publish assistant", "Prepares release assets and checksums for GitHub Releases.", "upload"]
    ]
  },
  "ECHO-Platform-Website": {
    route: "/",
    tagline: "Official website, docs, product pages, and download hub.",
    description:
      "The public website that mirrors SDK docs, renders the module catalog, exposes product pages, and publishes release download links.",
    status: "Website",
    docsHref: "/docs",
    downloadHref: "/download",
    updateFlow:
      "Generates static data from sibling repos and fails audits when modules, SDK docs, routes, or release snapshots drift.",
    artifacts: ["static export", "docs index", "release snapshot", "module catalog", "product catalog"],
    features: [
      ["Static export", "Works as a static website while still rendering release metadata at build time.", "globe"],
      ["Generated docs", "Mirrors SDK docs and release update docs into the public docs tree.", "file"],
      ["Drift audits", "CI checks route links, module catalog sync, SDK doc sync, and release snapshot health.", "shield"]
    ]
  }
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const normalized = value.replace(/[ \t]+$/gm, "").replace(/\n+$/g, "");
  fs.writeFileSync(file, `${normalized}\n`);
}

function repoCommit(repoPath) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repoPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return null;
  }
}

function isTrackedFile(repoPath, filePath) {
  const relativeFile = path.relative(repoPath, filePath).replace(/\\/g, "/");
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", "--", relativeFile], {
      cwd: repoPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    return true;
  } catch {
    return false;
  }
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function prettyStatus(meta) {
  const value = String(meta.channel || meta.apiStability || "active").toLowerCase();
  if (value === "beta") return "Beta";
  if (value === "alpha") return "Alpha";
  if (value === "stable") return "Stable";
  return "Active";
}

function titleFromId(id) {
  return id
    .replace(/^echo/, "ECHO ")
    .replace(/core$/i, " Core")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

function cleanModuleName(name) {
  return String(name).replace(new RegExp("\\s+by\\s+ECHO\\s+Labs$", "i"), "");
}

function categoryFor(meta) {
  const role = `${meta.role || ""} ${meta.kind || ""}`.toLowerCase();
  if (role.includes("official_pack") || meta.id.includes("ashfall")) return "Experience";
  if (role.includes("platform") || role.includes("adapter")) return "Platform";
  if (role.includes("ui") || role.includes("surface")) return "Player Interface";
  if (role.includes("core") || meta.id.endsWith("core")) return "Foundation";
  if (role.includes("protocol")) return "Protocol";
  if (role.includes("world") || role.includes("content")) return "Content";
  return "Gameplay";
}

function groupFor(meta) {
  const id = meta.id;
  const role = `${meta.role || ""} ${meta.kind || ""}`.toLowerCase();
  const platformIds = new Set([
    "echoadaptercore",
    "echoaddonapi",
    "echobridgecore",
    "echometadatacore",
    "echomodulegraph",
    "echopackcore",
    "echoplatformcore",
    "echoschemacore",
    "echovalidationcore"
  ]);
  const interfaceIds = new Set([
    "echoguidecore",
    "echoholomap",
    "echohudcore",
    "echoindex",
    "echolens",
    "echonotificationcore",
    "echosocialcore",
    "echoterminal",
    "echowiki",
    "signalos"
  ]);

  if (id.includes("ashfall")) return "Ashfall";
  if (id.includes("openlands")) return "Openlands";
  if (id.includes("skyrelay") || id.includes("sky-relay")) return "Sky Relay";
  if (role.includes("official_pack")) return "Experience";
  if (platformIds.has(id) || role.includes("platform") || role.includes("adapter")) return "Platform";
  if (interfaceIds.has(id) || role.includes("ui") || role.includes("surface")) return "Interface";
  if (id.endsWith("core") || role.includes("core") || role.includes("library")) return "Core";
  return "Future";
}

function firstParagraph(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const paragraphs = [];
  let current = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith("|") || line.startsWith("```")) {
      if (current.length) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }
    if (line.startsWith("- ") || /^\d+\.\s/.test(line)) continue;
    current.push(line);
  }
  if (current.length) paragraphs.push(current.join(" "));
  return paragraphs[0] || "";
}

function cleanMarkdownText(text) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/[_*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildDescription(meta, readmeText) {
  const paragraph = cleanMarkdownText(firstParagraph(readmeText));
  if (paragraph) return paragraph;
  if (Array.isArray(meta.provides) && meta.provides.length) {
    return `Provides ${meta.provides.slice(0, 4).join(", ")} for the ECHO module graph.`;
  }
  return `${meta.name || titleFromId(meta.id)} participates in the ECHO module graph.`;
}

function releaseExperienceName(meta, id) {
  const gameModes = Array.isArray(meta.gameModes) ? meta.gameModes.map((mode) => String(mode).toLowerCase()) : [];
  if (id.includes("skyrelay") || id.includes("sky-relay") || gameModes.some((mode) => mode.startsWith("skyrelay"))) {
    return "Sky Relay";
  }
  if (id.includes("openlands") || gameModes.some((mode) => mode.includes("openlands"))) return "Openlands";
  return "Ashfall";
}

function moduleRecord(addonDir) {
  const id = path.basename(addonDir);
  const metaPath = path.join(addonDir, "src", "main", "resources", "META-INF", "echo.mod.json");
  const readmePath = path.join(addonDir, "README.md");
  const meta = readJson(metaPath);
  const readmeText = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
  const version = meta.version || null;
  const name = cleanModuleName(meta.name || titleFromId(id));
  const required = Array.isArray(meta.requires) ? meta.requires : [];
  const optional = Array.isArray(meta.optional) ? meta.optional : [];
  const provides = Array.isArray(meta.provides) ? meta.provides : [];
  const gameModes = Array.isArray(meta.gameModes) ? meta.gameModes : [];
  const artifactPrefix = `${meta.id}-${version || "version"}`;
  const releaseExperience = releaseExperienceName(meta, id);

  return {
    id: meta.id || id,
    name,
    category: categoryFor(meta),
    group: groupFor(meta),
    status: prettyStatus(meta),
    version,
    description: buildDescription(meta, readmeText),
    dependencies: required,
    standalone: Boolean(meta.standalone),
    usedByAshfall: gameModes.includes("ashfall") || id.includes("ashfall"),
    docs: `https://github.com/knoxhack/ECHO-Modules/tree/main/addons/${id}`,
    github: `https://github.com/knoxhack/ECHO-Modules/tree/main/addons/${id}`,
    overview: [
      `${name} is sourced from ECHO-Modules/addons/${id}.`,
      `It declares ${required.length} required module${required.length === 1 ? "" : "s"} and ${optional.length} optional integration${optional.length === 1 ? "" : "s"}.`,
      `Release output is generated per runtime family so the launcher can update this module independently.`
    ],
    capabilities: [
      `Native artifact: ${artifactPrefix}.echo-addon`,
      `NeoForge artifact: ${artifactPrefix}-neoforge.jar`,
      `Standalone artifact: ${artifactPrefix}-standalone.jar`,
      `Sources artifact: ${artifactPrefix}-sources.jar`,
      `Provides: ${provides.slice(0, 3).join(", ") || "module contract"}`,
      `API stability: ${meta.apiStability || meta.channel || "tracked"}`
    ],
    integrations: [...new Set([...required, ...optional, ...provides])].slice(0, 14),
    statusNote:
      "Generated from src/main/resources/META-INF/echo.mod.json in ECHO-Modules. The launcher resolves this module through moduleRequirements and downloads only changed artifacts when URLs are present.",
    roadmap: [
      "Keep echo.mod.json, README.md, docs/artifacts.md, and release artifacts in sync for every release.",
      "Publish Native, NeoForge, Standalone, and sources artifacts with checksums before marking an edition player-ready.",
      "Use Release Index metadata as the public source for launcher and website download links."
    ],
    releaseNotes: [
      {
        title: "Generated release files",
        version,
        notes: [
          `${artifactPrefix}-neoforge.jar for ${releaseExperience} NeoForge Edition.`,
          `${artifactPrefix}.echo-addon for ${releaseExperience} Native Edition.`,
          `${artifactPrefix}-standalone.jar for ${releaseExperience} Standalone Edition.`,
          `${artifactPrefix}-sources.jar for traceability and developer debugging.`,
          "META-INF/echo.mod.json is always required; META-INF/neoforge.mods.toml and echo-addon-package.json are required when applicable."
        ]
      }
    ]
  };
}

function syncModules() {
  const addonsDir = path.join(modulesRoot, "addons");
  const addons = fs
    .readdirSync(addonsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(addonsDir, entry.name))
    .filter((dir) => {
      const descriptor = path.join(dir, "src", "main", "resources", "META-INF", "echo.mod.json");
      return fs.existsSync(descriptor) && isTrackedFile(modulesRoot, descriptor);
    })
    .map(moduleRecord)
    .sort((a, b) => a.id.localeCompare(b.id));

  writeJson(path.join(root, "data", "modules.json"), addons);
  writeJson(path.join(root, "data", "module-source-manifest.json"), {
    generatedAt: new Date().toISOString(),
    sourceRepo: "knoxhack/ECHO-Modules",
    sourceCommit: repoCommit(modulesRoot),
    moduleCount: addons.length,
    moduleIds: addons.map((module) => module.id)
  });
}

function releaseRepositoriesByName() {
  const repositoriesFile = path.join(releaseIndexRoot, "channels", "alpha", "repositories.json");
  if (!fs.existsSync(repositoriesFile)) return new Map();
  const catalog = readJson(repositoriesFile);
  return new Map((catalog.repositories || []).map((repository) => [repository.repoName, repository]));
}

function releaseIndexModules() {
  const modulesDir = path.join(releaseIndexRoot, "modules");
  if (!fs.existsSync(modulesDir)) return [];

  return fs
    .readdirSync(modulesDir)
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => readJson(path.join(modulesDir, entry)))
    .filter((entry) => entry.kind === "module" && entry.sourceRepo === "knoxhack/ECHO-Modules");
}

function indexedContentGraphEvidence() {
  const groups = new Map();
  for (const moduleRecord of releaseIndexModules()) {
    const artifact = moduleRecord.artifacts?.["content-graph-evidence"];
    if (!artifact || artifact.artifactRole !== "content-graph-evidence") continue;
    const key = artifact.url || artifact.sha256 || artifact.file;
    if (!key) continue;
    if (!groups.has(key)) {
      groups.set(key, {
        artifact,
        releaseTag: moduleRecord.releaseTag,
        moduleIds: new Set(),
        uniqueArtifactUrls: new Set()
      });
    }
    const group = groups.get(key);
    group.moduleIds.add(moduleRecord.id);
    for (const asset of Object.values(moduleRecord.artifacts || {})) {
      if (asset?.url) group.uniqueArtifactUrls.add(asset.url);
    }
  }

  return [...groups.values()].sort((a, b) => b.moduleIds.size - a.moduleIds.size)[0] || null;
}

function finiteNumber(value) {
  return Number.isFinite(value) ? value : undefined;
}

async function readRemoteJson(url) {
  if (!url || process.env.ECHO_WEBSITE_SKIP_REMOTE_EVIDENCE === "1") return null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Could not fetch content graph evidence ${url}: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`Could not fetch content graph evidence ${url}: ${error.message}`);
    return null;
  }
}

async function contentGraphEvidenceForModules() {
  const indexed = indexedContentGraphEvidence();
  if (!indexed) return null;

  const evidence = await readRemoteJson(indexed.artifact.url);
  const moduleCount = finiteNumber(evidence?.moduleCount) ?? indexed.moduleIds.size;
  return {
    schemaVersion: evidence?.schemaVersion || indexed.artifact.schemaVersion,
    artifact: indexed.artifact.file || "content-graph-evidence.json",
    availability: `Canonical release evidence imported by Release Index from ${indexed.releaseTag}. Hytale values are export planning evidence, not runtime/playable support.`,
    releaseTag: indexed.releaseTag,
    url: indexed.artifact.url,
    sha256: indexed.artifact.sha256,
    graphCount: finiteNumber(evidence?.graphCount) ?? moduleCount,
    moduleCount,
    nodeCount: finiteNumber(evidence?.nodeCount),
    edgeCount: finiteNumber(evidence?.edgeCount),
    featureCount: finiteNumber(evidence?.featureCount),
    exportPlanCount: finiteNumber(evidence?.exportPlanCount),
    hytaleBlockerCount: finiteNumber(evidence?.hytaleBlockerCount),
    indexedModuleRows: indexed.moduleIds.size,
    indexedAssetCount: indexed.uniqueArtifactUrls.size + 4
  };
}

function syncReleaseIndexSnapshot() {
  const manifestFile = path.join(releaseIndexRoot, "channels", "alpha", "release-manifest.json");
  const manifest = readJson(manifestFile);
  writeJson(path.join(root, "data", "release-index-snapshot.json"), manifest);
}

function syncProducts(contentGraphEvidence) {
  const releaseRepos = releaseRepositoriesByName();
  const products = targetRepos.map((repoName) => {
    const seed = productSeed[repoName];
    const releaseRepo = releaseRepos.get(repoName) || {};
    const repoUrl = releaseRepo.repoUrl || `https://github.com/knoxhack/${repoName}`;
    const product = {
      repoName,
      product: releaseRepo.product || productName(repoName),
      releaseKind: releaseRepo.releaseKind || "source",
      route: seed.route,
      tagline: seed.tagline,
      description: seed.description,
      purpose: seed.description,
      publicRole: releaseRepo.publicRole || seed.publicRole || seed.description,
      status: seed.status,
      repoUrl,
      issuesUrl: `${repoUrl}/issues`,
      releasesUrl: `${repoUrl}/releases`,
      releaseUrl: releaseRepo.releaseUrl || `${repoUrl}/releases`,
      assetCount: releaseRepo.assetCount ?? 0,
      docsHref: seed.docsHref,
      downloadHref: seed.downloadHref,
      updateFlow: seed.updateFlow,
      artifacts: seed.artifacts,
      features: seed.features.map(([title, description, icon]) => ({ title, description, icon })),
      relatedRepos: relatedRepos(repoName)
    };

    if (repoName === "ECHO-Modules" && contentGraphEvidence) {
      product.contentGraphEvidence = contentGraphEvidence;
      product.status = `${contentGraphEvidence.moduleCount} Modules`;
      product.releaseUrl = contentGraphEvidence.releaseTag
        ? `${repoUrl}/releases/tag/${contentGraphEvidence.releaseTag}`
        : product.releaseUrl;
      product.assetCount = contentGraphEvidence.indexedAssetCount || product.assetCount;
    }

    return product;
  });

  writeJson(path.join(root, "data", "products.json"), products);
}

function productName(repoName) {
  return repoName.replace(/^ECHO-/, "ECHO ").replace(/-/g, " ");
}

function relatedRepos(repoName) {
  if (repoName.includes("Ashfall")) return ["ECHO-Launcher", "ECHO-Modules", "ECHO-Release-Index"];
  if (repoName.includes("Openlands")) return ["ECHO-Modules", "ECHO-Release-Index", "ECHO-SDK"];
  if (repoName.includes("Sky-Relay")) return ["ECHO-Launcher", "ECHO-Modules", "ECHO-Release-Index"];
  if (repoName === "ECHO-Launcher") return ["ECHO-Release-Index", "ECHO-Modules", "ECHO-Ashfall-Native-Edition"];
  if (repoName === "ECHO-Modules") return ["ECHO-SDK", "ECHO-Release-Index", "ECHO-Launcher"];
  if (repoName === "ECHO-SDK") return ["ECHO-Addons-Studio", "ECHO-Developer-Studio", "ECHO-Modules"];
  if (repoName === "ECHO-Release-Index") return ["ECHO-Launcher", "ECHO-Platform-Website", "ECHO-Modules"];
  if (repoName.includes("Studio")) return ["ECHO-SDK", "ECHO-Release-Index", "ECHO-Platform-Website"];
  return ["ECHO-Launcher", "ECHO-Release-Index", "ECHO-Modules"];
}

function sdkSlug(relativeFile) {
  const withoutExt = relativeFile.replace(/\.md$/i, "");
  const parts = withoutExt.split(/[\\/]/).map((part) =>
    part
      .replace(/_/g, "-")
      .replace(/[^a-zA-Z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()
  );
  if (parts[parts.length - 1] === "index") parts.pop();
  return parts;
}

function pascalName(slug, index) {
  const value = slug.join("-") || `doc-${index}`;
  return `Sdk${value.replace(/(^|-)([a-z0-9])/g, (_, __, char) => char.toUpperCase()).replace(/[^a-zA-Z0-9]/g, "")}`;
}

function titleFromMarkdown(markdown, fallback) {
  const heading = /^#\s+(.+)$/m.exec(markdown);
  if (heading) return cleanMarkdownText(heading[1]);
  return fallback
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function descriptionFromMarkdown(markdown) {
  const paragraph = cleanMarkdownText(firstParagraph(markdown));
  if (paragraph) return paragraph.slice(0, 190);
  return "SDK reference mirrored from ECHO-SDK/docs.";
}

function transformSdkMarkdown(markdown, sourceFile, docsRoot) {
  const sourceDir = path.dirname(sourceFile);
  const repoRoot = path.resolve(docsRoot, "..");
  let inCode = false;
  const lines = markdown.replace(/\r\n/g, "\n").split("\n").map((line) => {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      return line;
    }
    if (inCode) return line;

    const escaped = line.replace(/<([a-z][a-z0-9_-]*)>/gi, "&lt;$1&gt;");
    return escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) return match;
      const cleanHref = href.split("#")[0];
      const hash = href.includes("#") ? `#${href.split("#").slice(1).join("#")}` : "";
      const resolved = path.resolve(sourceDir, cleanHref);
      if (cleanHref.endsWith(".md") && resolved.startsWith(docsRoot)) {
        const relative = path.relative(docsRoot, resolved).replace(/\\/g, "/");
        const targetSlug = sdkSlug(relative);
        return `[${label}](/docs/sdk/${targetSlug.join("/")}${hash})`;
      }
      if (resolved.startsWith(repoRoot)) {
        const relative = path.relative(repoRoot, resolved).replace(/\\/g, "/");
        const kind = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory() ? "tree" : "blob";
        return `[${label}](https://github.com/knoxhack/ECHO-SDK/${kind}/main/${relative}${hash})`;
      }
      return match;
    });
  });
  return ["{/* Generated from ECHO-SDK/docs by scripts/sync-ecosystem-data.mjs. */}", "", ...lines].join("\n");
}

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdown(full, out);
    if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function syncSdkDocs() {
  const docsRoot = path.join(sdkRoot, "docs");
  const targetRoot = path.join(root, "docs", "sdk");
  fs.rmSync(targetRoot, { recursive: true, force: true });
  const files = walkMarkdown(docsRoot).sort((a, b) => a.localeCompare(b));
  const docs = files.map((file, index) => {
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(docsRoot, file).replace(/\\/g, "/");
    const slug = sdkSlug(relative);
    const target = path.join(targetRoot, ...slug.slice(0, -1), `${slug.at(-1) || "index"}.mdx`);
    writeText(target, transformSdkMarkdown(source, file, docsRoot));
    return {
      sourcePath: `docs/${relative}`,
      targetPath: path.relative(root, target).replace(/\\/g, "/"),
      slug: ["sdk", ...slug],
      title: titleFromMarkdown(source, path.basename(relative, ".md")),
      description: descriptionFromMarkdown(source),
      componentName: pascalName(slug, index),
      sourceSha256: sha256(source)
    };
  });

  const imports = docs
    .map((doc) => `import ${doc.componentName} from "@/${doc.targetPath.replace(/\\/g, "/").replace(/\.mdx$/, ".mdx")}";`)
    .join("\n");
  const entries = docs
    .map(
      (doc) => `  {
    title: ${JSON.stringify(doc.title)},
    description: ${JSON.stringify(doc.description)},
    section: "SDK",
    slug: ${JSON.stringify(doc.slug)},
    component: ${doc.componentName}
  }`
    )
    .join(",\n");

  writeText(
    path.join(root, "lib", "generated-sdk-docs.tsx"),
    `import type { ComponentType } from "react";

${imports}

export type GeneratedDocEntry = {
  title: string;
  description: string;
  section: string;
  slug: string[];
  component: ComponentType;
};

export const sdkDocs: GeneratedDocEntry[] = [
${entries}
];
`
  );

  writeJson(path.join(root, "data", "sdk-docs-manifest.json"), {
    generatedAt: new Date().toISOString(),
    sourceRepo: "knoxhack/ECHO-SDK",
    sourceCommit: repoCommit(sdkRoot),
    docCount: docs.length,
    docs: docs.map((doc) => ({
      sourcePath: doc.sourcePath,
      targetPath: doc.targetPath,
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      sourceSha256: doc.sourceSha256
    }))
  });
}

const contentGraphEvidence = await contentGraphEvidenceForModules();
syncModules();
syncReleaseIndexSnapshot();
syncProducts(contentGraphEvidence);
syncSdkDocs();

console.log("Synced modules, products, release index snapshot, and SDK docs.");
