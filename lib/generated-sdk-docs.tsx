import type { ComponentType } from "react";

import SdkApiIndex from "@/docs/sdk/api-index.mdx";
import SdkApiStability from "@/docs/sdk/api-stability.mdx";
import SdkApi from "@/docs/sdk/api.mdx";
import SdkApiOptionalIntegrations from "@/docs/sdk/api/optional-integrations.mdx";
import SdkCreatorGuidesBuildYourFirstEchoPack from "@/docs/sdk/creator-guides/build-your-first-echo-pack.mdx";
import SdkCreatorStartHere from "@/docs/sdk/creator-start-here.mdx";
import SdkCreatorTemplates from "@/docs/sdk/creator-templates.mdx";
import SdkCreatorToolingApi from "@/docs/sdk/creator-tooling-api.mdx";
import SdkDeveloperStartHere from "@/docs/sdk/developer-start-here.mdx";
import SdkExamples from "@/docs/sdk/examples.mdx";
import SdkExamplesIntegrations from "@/docs/sdk/examples/integrations.mdx";
import SdkGettingStarted from "@/docs/sdk/getting-started.mdx";
import SdkModDevelopers from "@/docs/sdk/mod-developers.mdx";
import SdkNativeAdaptercoreGuide from "@/docs/sdk/native-adaptercore-guide.mdx";
import SdkNativeApiReference from "@/docs/sdk/native-api-reference.mdx";
import SdkNativeCompatibilityMatrix from "@/docs/sdk/native-compatibility-matrix.mdx";
import SdkNativeExampleAddonWalkthrough from "@/docs/sdk/native-example-addon-walkthrough.mdx";
import SdkNativeModAuthorGuide from "@/docs/sdk/native-mod-author-guide.mdx";
import SdkNativePortingGuide from "@/docs/sdk/native-porting-guide.mdx";
import SdkNativeReleasePackagingGuide from "@/docs/sdk/native-release-packaging-guide.mdx";
import SdkNativeSdkArtifacts from "@/docs/sdk/native-sdk-artifacts.mdx";
import SdkNativeTemplates from "@/docs/sdk/native-templates.mdx";
import SdkNativeTroubleshooting from "@/docs/sdk/native-troubleshooting.mdx";
import SdkNativeAddonGuide from "@/docs/sdk/native-addon-guide.mdx";
import SdkNeoforgeModuleGuide from "@/docs/sdk/neoforge-module-guide.mdx";
import SdkOptionalIntegrations from "@/docs/sdk/optional-integrations.mdx";
import SdkReleasePackaging from "@/docs/sdk/release-packaging.mdx";
import SdkSchemas from "@/docs/sdk/schemas.mdx";
import SdkStandaloneModuleGuide from "@/docs/sdk/standalone-module-guide.mdx";

export type GeneratedDocEntry = {
  title: string;
  description: string;
  section: string;
  slug: string[];
  component: ComponentType;
};

export const sdkDocs: GeneratedDocEntry[] = [
  {
    title: "ECHO API Index",
    description: "SDK reference mirrored from ECHO-SDK/docs.",
    section: "SDK",
    slug: ["sdk","api-index"],
    component: SdkApiIndex
  },
  {
    title: "ECHO 1.3.5 API Stability",
    description: "Reusable integrations must not require Ashfall unless the module metadata explicitly says Ashfall is required.",
    section: "SDK",
    slug: ["sdk","api-stability"],
    component: SdkApiStability
  },
  {
    title: "API Index",
    description: "The public API surface is organized around module descriptors, runtime services, registry contracts, diagnostics, lifecycle hooks, and release metadata.",
    section: "SDK",
    slug: ["sdk","api"],
    component: SdkApi
  },
  {
    title: "Optional Integrations",
    description: "Optional integrations must be safe when the target module or runtime is absent.",
    section: "SDK",
    slug: ["sdk","api","optional-integrations"],
    component: SdkApiOptionalIntegrations
  },
  {
    title: "Build Your First ECHO Pack",
    description: "SDK reference mirrored from ECHO-SDK/docs.",
    section: "SDK",
    slug: ["sdk","creator-guides","build-your-first-echo-pack"],
    component: SdkCreatorGuidesBuildYourFirstEchoPack
  },
  {
    title: "Creator Start Here",
    description: "ECHO gives creators reusable modules, Pack Builder templates, datapack examples, config presets, theme templates, and validators.",
    section: "SDK",
    slug: ["sdk","creator-start-here"],
    component: SdkCreatorStartHere
  },
  {
    title: "Creator Templates",
    description: "Templates define module lists, starter datapacks, docs, resourcepack/config scaffolds, launcher cards, health rules, and export profiles.",
    section: "SDK",
    slug: ["sdk","creator-templates"],
    component: SdkCreatorTemplates
  },
  {
    title: "Creator Tooling Api",
    description: "Creator tools expose metadata schemas and validators. All new validators support text output and --json.",
    section: "SDK",
    slug: ["sdk","creator-tooling-api"],
    component: SdkCreatorToolingApi
  },
  {
    title: "Developer Start Here",
    description: "External mods should integrate through ECHO Core services and optional integration checks. Avoid direct hard references to optional addons unless your module declares them as required.",
    section: "SDK",
    slug: ["sdk","developer-start-here"],
    component: SdkDeveloperStartHere
  },
  {
    title: "Examples",
    description: "Examples show the smallest useful SDK patterns.",
    section: "SDK",
    slug: ["sdk","examples"],
    component: SdkExamples
  },
  {
    title: "Integration Examples",
    description: "Check whether a service/module exists before calling it. If the dependency is optional, the addon must still load when the dependency is absent.",
    section: "SDK",
    slug: ["sdk","examples","integrations"],
    component: SdkExamplesIntegrations
  },
  {
    title: "Getting Started",
    description: "Start here when building against the ECHO SDK.",
    section: "SDK",
    slug: ["sdk","getting-started"],
    component: SdkGettingStarted
  },
  {
    title: "Mod Developers",
    description: "Depend on ECHO Core for shared service contracts and use optional lookups for every cross-addon connection.",
    section: "SDK",
    slug: ["sdk","mod-developers"],
    component: SdkModDevelopers
  },
  {
    title: "Native AdapterCore Guide",
    description: "AdapterCore bridges module contracts across native, NeoForge, and standalone runtimes.",
    section: "SDK",
    slug: ["sdk","native-adaptercore-guide"],
    component: SdkNativeAdaptercoreGuide
  },
  {
    title: "ECHO Native API Reference",
    description: "The full public API snapshot is published as:",
    section: "SDK",
    slug: ["sdk","native-api-reference"],
    component: SdkNativeApiReference
  },
  {
    title: "Native Compatibility Matrix",
    description: "SDK reference mirrored from ECHO-SDK/docs.",
    section: "SDK",
    slug: ["sdk","native-compatibility-matrix"],
    component: SdkNativeCompatibilityMatrix
  },
  {
    title: "Example Addon Walkthrough: EchoExampleMod",
    description: "This walkthrough builds a minimal ECHO Native addon from scratch. It registers a block, an item, a datapack-driven recipe, and an optional Index integration.",
    section: "SDK",
    slug: ["sdk","native-example-addon-walkthrough"],
    component: SdkNativeExampleAddonWalkthrough
  },
  {
    title: "ECHO Native Mod Author Guide",
    description: "my-addon/ build.gradle src/main/java/.../MyAddon.java src/main/resources/META-INF/echo-native-addon.descriptor.json src/main/resources/data/myaddon/... src/test/java/.../MyAddonTest.java",
    section: "SDK",
    slug: ["sdk","native-mod-author-guide"],
    component: SdkNativeModAuthorGuide
  },
  {
    title: "Porting Guide from NeoForge to ECHO Native",
    description: "ECHO Native gives you service-based optional integrations, policy-driven runtime lanes, and built-in RuntimeGuard budgets. Porting is incremental: you can keep NeoForge compatibility while a",
    section: "SDK",
    slug: ["sdk","native-porting-guide"],
    component: SdkNativePortingGuide
  },
  {
    title: "Native Release Packaging Guide",
    description: "Native addon releases use .echo-addon packages generated from module descriptors.",
    section: "SDK",
    slug: ["sdk","native-release-packaging-guide"],
    component: SdkNativeReleasePackagingGuide
  },
  {
    title: "ECHO Native SDK Maven Artifacts",
    description: "./gradlew publishToMavenLocal",
    section: "SDK",
    slug: ["sdk","native-sdk-artifacts"],
    component: SdkNativeSdkArtifacts
  },
  {
    title: "Native Templates",
    description: "Native templates should include an addon descriptor, package metadata, a minimal runtime entrypoint, and validation notes.",
    section: "SDK",
    slug: ["sdk","native-templates"],
    component: SdkNativeTemplates
  },
  {
    title: "ECHO Native Troubleshooting",
    description: "Cause: An addon descriptor is missing a required field or contains invalid JSON. Fix:",
    section: "SDK",
    slug: ["sdk","native-troubleshooting"],
    component: SdkNativeTroubleshooting
  },
  {
    title: "Native Addon Guide",
    description: "Native addons are packaged as .echo-addon files.",
    section: "SDK",
    slug: ["sdk","native-addon-guide"],
    component: SdkNativeAddonGuide
  },
  {
    title: "NeoForge Module Guide",
    description: "NeoForge modules are packaged as <module>-<version>-neoforge.jar files.",
    section: "SDK",
    slug: ["sdk","neoforge-module-guide"],
    component: SdkNeoforgeModuleGuide
  },
  {
    title: "Optional Integrations",
    description: "Use api/optionalintegrations.md as the implementation guide. This page remains as the stable legacy link target.",
    section: "SDK",
    slug: ["sdk","optional-integrations"],
    component: SdkOptionalIntegrations
  },
  {
    title: "Release Packaging",
    description: "Runtime artifacts are owned by their release repos.",
    section: "SDK",
    slug: ["sdk","release-packaging"],
    component: SdkReleasePackaging
  },
  {
    title: "Schemas",
    description: "Schemas define the machine-readable contracts used by launchers, modules, packs, and tools.",
    section: "SDK",
    slug: ["sdk","schemas"],
    component: SdkSchemas
  },
  {
    title: "Standalone Module Guide",
    description: "Standalone modules are packaged as <module>-<version>-standalone.jar files.",
    section: "SDK",
    slug: ["sdk","standalone-module-guide"],
    component: SdkStandaloneModuleGuide
  }
];
