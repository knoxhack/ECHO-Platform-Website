import type { MetadataRoute } from "next";
import { allDocs, docHref } from "@/lib/docs";
import { allModules, moduleHref } from "@/lib/modules";
import { getAllNewsEntries, newsHref } from "@/lib/news";
import { absoluteUrl, mainSiteRoutes } from "@/lib/site";

type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();
  const newsEntries = await getAllNewsEntries();

  const routes: RouteEntry[] = [
    ...mainSiteRoutes.map((route) => ({
      ...route,
      changeFrequency: route.path === "/" ? ("weekly" as const) : ("monthly" as const),
      lastModified: buildDate
    })),
    ...allDocs.map((doc) => ({
      path: docHref(doc),
      priority: 0.72,
      changeFrequency: "monthly" as const,
      lastModified: buildDate
    })),
    ...allModules.map((module) => ({
      path: moduleHref(module),
      priority: module.usedByAshfall ? 0.68 : 0.58,
      changeFrequency: "monthly" as const,
      lastModified: buildDate
    })),
    ...newsEntries.map((entry) => ({
      path: newsHref(entry),
      priority: entry.source === "release" ? 0.62 : 0.7,
      changeFrequency: "weekly" as const,
      lastModified: entry.publishedAt ? new Date(entry.publishedAt) : buildDate
    }))
  ];

  return routes.map((route) => ({
    url: absoluteUrl(withTrailingSlash(route.path)),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}

function withTrailingSlash(path: string) {
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}
