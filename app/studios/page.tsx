import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { getProductsByRepos } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

const studioProducts = getProductsByRepos(["ECHO-Developer-Studio", "ECHO-Addons-Studio"]);

export const metadata: Metadata = pageMetadata({
  title: "Studios",
  description: "ECHO Developer Studio and ECHO Addons Studio product pages, releases, docs, and download links.",
  path: "/studios"
});

export default function StudiosPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Desktop Tools"
        title="ECHO Studios"
        kicker="Two apps, two jobs: operate the platform and create addons."
        description="Developer Studio is for release operators. Addons Studio is for module creators. Both ship as separate products with their own repositories, releases, and docs paths."
        actions={[
          { label: "Download Apps", href: "/download" },
          { label: "SDK Docs", href: "/docs/sdk/getting-started", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Products"
          title="Choose the studio that matches the job."
          description="The public site now links each studio to its own source repository and release surface instead of sending both through a generic platform link."
        />
        <div className="mt-8">
          <ProductGrid products={studioProducts} />
        </div>
      </section>
    </>
  );
}
