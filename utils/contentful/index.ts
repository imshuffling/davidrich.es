import { cacheLife, cacheTag } from "next/cache";
import {
  loadAbout,
  loadHome,
  loadPortfolio,
  loadPortfolioSeo,
  loadPortfolioSlugs,
  loadServices,
  type PortfolioSeo,
  type PortfolioSlugEntry,
} from "./loaders";
import { graphqlSource } from "./source";
import type { About, PortfolioItem, Service, SideProject } from "@/types/contentful";

export type { PortfolioSeo, PortfolioSlugEntry } from "./loaders";

export async function getHome(): Promise<{
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadHome(graphqlSource);
}

export async function getPortfolio(slug: string): Promise<PortfolioItem | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadPortfolio(graphqlSource, slug);
}

export async function getPortfolioSlugs(): Promise<PortfolioSlugEntry[]> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadPortfolioSlugs(graphqlSource);
}

export async function portfolioSeo(slug: string): Promise<PortfolioSeo | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  const item = await getPortfolio(slug);
  if (!item) return undefined;
  return loadPortfolioSeo(graphqlSource, item);
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadServices(graphqlSource);
}

export async function getAbout(): Promise<About> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadAbout(graphqlSource);
}
