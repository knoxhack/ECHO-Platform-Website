import products from "@/data/products.json";

export type ProductFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type ProductRecord = {
  repoName: string;
  product: string;
  releaseKind: string;
  route: string;
  tagline: string;
  description: string;
  purpose: string;
  publicRole: string;
  status: string;
  repoUrl: string;
  issuesUrl: string;
  releasesUrl: string;
  releaseUrl: string;
  assetCount: number;
  docsHref: string;
  downloadHref: string;
  updateFlow: string;
  artifacts: string[];
  features: ProductFeature[];
  relatedRepos: string[];
};

export const allProducts = products as ProductRecord[];

export function productHref(product: Pick<ProductRecord, "route">) {
  return product.route;
}

export function getProductByRepo(repoName: string) {
  const product = allProducts.find((entry) => entry.repoName === repoName);
  if (!product) {
    throw new Error(`Unknown ECHO product repo: ${repoName}`);
  }
  return product;
}

export function getProductsByRepos(repoNames: string[]) {
  return repoNames.map(getProductByRepo);
}
