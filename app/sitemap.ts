import type { MetadataRoute } from "next";
import { getPortfolioSlugs } from "@/utils/contentful";
import { PAGES, SITE_URL } from "@/utils/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioItems = await getPortfolioSlugs();

  return [
    ...Object.values(PAGES).map((page) => ({
      url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
      lastModified: new Date(),
      ...page.sitemap,
    })),
    ...portfolioItems.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
