import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { enrichBlocks } from "@/blocks/registry";
import { enrichImage, enrichItems } from "@/utils/contentfulImage";
import { deriveSeo } from "@/utils/metadata";
import { sanitize } from "@/utils/sanitize";
import {
  ABOUT_QUERY,
  HOME_QUERY,
  PORTFOLIO_QUERY,
  PORTFOLIO_SLUGS_QUERY,
  SERVICES_QUERY,
} from "./queries";
import type { ContentfulSource } from "./source";
import type { About, ContentfulImage, Job, PortfolioItem, Service, SideProject } from "@/types/contentful";

export async function loadHome(source: ContentfulSource): Promise<{
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}> {
  const data = await source.query<{
    featuredProjectsCollection: { items: { itemCollection: { items: PortfolioItem[] } }[] };
    sideProjectsCollection: { items: SideProject[] };
  }>(HOME_QUERY);

  const items = data.featuredProjectsCollection.items[0]?.itemCollection.items ?? [];

  const portfolioCollection = await Promise.all(
    items.map(async (item, index) => ({
      ...item,
      body: undefined,
      title: sanitize(item.title) ?? item.title,
      // Only the first (large) card renders a description
      description:
        index === 0 && item.body ? documentToPlainTextString(item.body.json) : undefined,
      image: await enrichImage(source, item.image, "card"),
    })),
  );

  const sideProjectsCollection = data.sideProjectsCollection.items.map((p) => ({
    ...p,
    title: sanitize(p.title) ?? p.title,
    description: sanitize(p.description),
  }));

  return { portfolioCollection, sideProjectsCollection };
}

export async function loadPortfolio(
  source: ContentfulSource,
  slug: string,
): Promise<PortfolioItem | undefined> {
  const data = await source.query<{ portfolioCollection: { items: PortfolioItem[] } }>(
    PORTFOLIO_QUERY,
    { slug },
  );
  const item = data.portfolioCollection.items[0];
  if (!item) return undefined;

  const [blocks, footerItems] = await Promise.all([
    item.blocksCollection?.items ? enrichBlocks(source, item.blocksCollection.items) : undefined,
    item.footerCollection?.items ? enrichItems(source, item.footerCollection.items, "card") : undefined,
  ]);

  return {
    ...item,
    title: sanitize(item.title) ?? item.title,
    ...(blocks && { blocksCollection: { items: blocks } }),
    ...(footerItems && {
      footerCollection: {
        items: footerItems.map((p) => ({ ...p, title: sanitize(p.title) ?? p.title })),
      },
    }),
  };
}

export interface PortfolioSlugEntry {
  slug: string;
  publishedAt?: string;
}

export async function loadPortfolioSlugs(source: ContentfulSource): Promise<PortfolioSlugEntry[]> {
  const data = await source.query<{
    portfolioCollection: { items: { slug: string; sys?: { publishedAt?: string } }[] };
  }>(PORTFOLIO_SLUGS_QUERY);
  return data.portfolioCollection.items.map((i) => ({
    slug: i.slug,
    publishedAt: i.sys?.publishedAt,
  }));
}

export interface PortfolioSeo {
  plainTitle: string;
  description: string;
  pageUrl: string;
  ogImage?: ContentfulImage;
}

export async function loadPortfolioSeo(
  source: ContentfulSource,
  item: PortfolioItem,
): Promise<PortfolioSeo> {
  const firstImageBlock = item.blocksCollection?.items.find(
    (block) => block.__typename === "Image",
  );
  return {
    ...deriveSeo(item),
    ...(firstImageBlock && { ogImage: await enrichImage(source, firstImageBlock.image, "og") }),
  };
}

export async function loadServices(source: ContentfulSource): Promise<Service[]> {
  const data = await source.query<{ servicesCollection: { items: Service[] } }>(SERVICES_QUERY);
  return data.servicesCollection.items;
}

export async function loadAbout(source: ContentfulSource): Promise<About> {
  const data = await source.query<{
    resumeCollection: { items: { image?: ContentfulImage }[] };
    jobCollection: { items: Job[] };
    skillsCollection: { items: { skill?: string[] }[] };
  }>(ABOUT_QUERY);

  const photo = data.resumeCollection.items[0]?.image;

  return {
    photo: photo ? await enrichImage(source, photo, "card") : undefined,
    jobs: data.jobCollection.items,
    skills: (data.skillsCollection.items[0]?.skill ?? []).map((s) => s.trim()).filter(Boolean),
  };
}
