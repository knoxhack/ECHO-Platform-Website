import type { Metadata } from "next";

export const siteConfig = {
  name: "ECHO Platform",
  url: "https://echoplatform.dev",
  description:
    "Official home of ECHO experiences, modules, launcher tools, PackOS validation, and future native runtime foundations.",
  socialImage: "/images/echo-social-card.png",
  links: {
    discord: "https://discord.gg/0eXbwPGyRiqemwip",
    docs: "/docs",
    download: "/download",
    github: "https://github.com/knoxhack/ECHO-Native-Platform",
    githubIssues: "https://github.com/knoxhack/ECHO-Native-Platform/issues",
    githubReleases: "https://github.com/knoxhack/ECHO-Native-Platform/releases",
    launcherDocs: "/docs/install/launcher",
    media: "/media",
    support: "/docs/install/troubleshooting",
    youtube: "https://www.youtube.com/@echolabs-mc"
  }
} as const;

export const mainSiteRoutes = [
  { path: "/", priority: 1 },
  { path: "/platform", priority: 0.9 },
  { path: "/ashfall", priority: 0.9 },
  { path: "/launcher", priority: 0.9 },
  { path: "/download", priority: 0.95 },
  { path: "/modules", priority: 0.85 },
  { path: "/developers", priority: 0.8 },
  { path: "/docs", priority: 0.9 },
  { path: "/roadmap", priority: 0.7 },
  { path: "/community", priority: 0.75 },
  { path: "/media", priority: 0.78 },
  { path: "/news", priority: 0.8 }
] as const;

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const metadataTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metadataDescription = description ?? siteConfig.description;
  const canonicalPath = withTrailingSlash(path);

  return {
    ...(title ? { title } : {}),
    description: metadataDescription,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: absoluteUrl(canonicalPath),
      images: [
        {
          url: absoluteUrl(siteConfig.socialImage),
          width: 1200,
          height: 630,
          alt: "ECHO Platform cyberglass social preview"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [absoluteUrl(siteConfig.socialImage)]
    }
  };
}

function withTrailingSlash(path: string) {
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}
