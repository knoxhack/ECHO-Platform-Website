import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/product-detail-page";
import { getProductByRepo } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

const product = getProductByRepo("ECHO-Openlands-NeoForge-Edition");

export const metadata: Metadata = pageMetadata({
  title: product.product,
  description: product.description,
  path: product.route
});

export default function OpenlandsNeoForgeEditionPage() {
  return <ProductDetailPage product={product} />;
}
