import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/product-detail-page";
import { getProductByRepo } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

const product = getProductByRepo("ECHO-Sky-Relay-Standalone-Edition");

export const metadata: Metadata = pageMetadata({
  title: product.product,
  description: product.description,
  path: product.route
});

export default function SkyRelayStandaloneEditionPage() {
  return <ProductDetailPage product={product} />;
}
