import type { MetadataRoute } from "next"

import { allPages, allPosts } from "contentlayer/generated"

import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = ["", "/posts", "/shop", "/rss.xml"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }))

  const postRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const pageRoutes: MetadataRoute.Sitemap = allPages.map((page) => ({
    url: `${baseUrl}/${page.slugAsParams}`,
    lastModified: now,
  }))

  return [...staticRoutes, ...postRoutes, ...pageRoutes]
}
