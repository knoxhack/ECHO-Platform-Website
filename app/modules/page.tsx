import type { Metadata } from "next";
import modules from "@/data/modules.json";
import { HeroSection } from "@/components/hero-section";
import { ModuleCatalog } from "@/components/module-catalog";
import type { ModuleRecord } from "@/components/module-card";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Modules",
  description: "Official ECHO module catalog with status, category, version, dependencies, docs, and GitHub links.",
  path: "/modules"
});

export default function ModulesPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Module Registry"
        title="ECHO Modules"
        kicker="The building blocks of ECHO experiences."
        description="Official modules are shown as platform components with status, versions, dependencies, standalone support, Ashfall usage, docs links, and GitHub paths."
        actions={[
          { label: "Developer Docs", href: "/developers" },
          { label: "Platform Overview", href: "/platform", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Catalog"
          title="Filter the ecosystem by role."
          description="Core, interface, Ashfall, platform, and future modules all render from data/modules.json so the site can evolve into a real registry later."
        />
        <div className="mt-8">
          <ModuleCatalog modules={modules as ModuleRecord[]} />
        </div>
      </section>
    </>
  );
}
