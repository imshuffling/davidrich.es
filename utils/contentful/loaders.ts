import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { enrichBlocks } from "@/blocks/registry";
import { enrichImage, enrichItems } from "@/utils/contentfulImage";
import { deriveSeo } from "@/utils/metadata";
import { sanitize } from "@/utils/sanitize";
import {
  ABOUT_QUERY,
  FEATURED_ORDER_QUERY,
  HOME_QUERY,
  PORTFOLIO_QUERY,
  PORTFOLIO_SLUGS_QUERY,
  SERVICES_QUERY,
} from "./queries";
import type { ContentfulSource } from "./source";
import type { About, ContentfulImage, Job, PortfolioItem, Service, SideProject } from "@/types/contentful";

type FeaturedData<T> = {
  featuredProjectsCollection: { items: { itemCollection: { items: T[] } }[] };
};

function featuredItems<T>(data: FeaturedData<T>): T[] {
  return data.featuredProjectsCollection.items[0]?.itemCollection.items ?? [];
}

const sanitizeTitle = <T extends { title: string }>(item: T): T => ({
  ...item,
  title: sanitize(item.title) ?? item.title,
});

export async function loadHome(source: ContentfulSource): Promise<{
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}> {
  const data = await source.query<
    FeaturedData<PortfolioItem> & { sideProjectsCollection: { items: SideProject[] } }
  >(HOME_QUERY);

  const items = featuredItems(data);

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
    ...sanitizeTitle(item),
    ...(blocks && { blocksCollection: { items: blocks } }),
    ...(footerItems && { footerCollection: { items: footerItems.map(sanitizeTitle) } }),
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

export type PortfolioSeo = ReturnType<typeof deriveSeo> & { ogImage?: ContentfulImage };

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

type PagerLink = Pick<PortfolioItem, "slug" | "title">;

export interface CaseStudy {
  item: PortfolioItem;
  seo: PortfolioSeo;
  pager: { prev?: PagerLink; next?: PagerLink };
}

// Prev/next cycle through the featured order; non-featured items get no pager
function pagerFor(featured: PagerLink[], slug: string): CaseStudy["pager"] {
  const index = featured.findIndex((link) => link.slug === slug);
  if (index === -1 || featured.length < 2) return {};
  return {
    prev: featured[(index - 1 + featured.length) % featured.length],
    next: featured[(index + 1) % featured.length],
  };
}

export async function loadCaseStudy(
  source: ContentfulSource,
  slug: string,
): Promise<CaseStudy | undefined> {
  const [item, featured] = await Promise.all([
    loadPortfolio(source, slug),
    source.query<FeaturedData<PagerLink>>(FEATURED_ORDER_QUERY).then(featuredItems),
  ]);
  if (!item) return undefined;

  return {
    item,
    seo: await loadPortfolioSeo(source, item),
    pager: pagerFor(featured.map(sanitizeTitle), slug),
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
