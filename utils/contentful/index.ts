import { cacheLife, cacheTag } from "next/cache";
import {
  loadAbout,
  loadCaseStudy,
  loadHome,
  loadPortfolioSlugs,
  loadServices,
  type CaseStudy,
  type PortfolioSlugEntry,
} from "./loaders";
import { graphqlSource } from "./source";
import type { About, PortfolioItem, Service, SideProject } from "@/types/contentful";

export type { CaseStudy, PortfolioSeo, PortfolioSlugEntry } from "./loaders";

export async function getHome(): Promise<{
  portfolioCollection: PortfolioItem[];
  sideProjectsCollection: SideProject[];
}> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadHome(graphqlSource);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadCaseStudy(graphqlSource, slug);
}

export async function getPortfolioSlugs(): Promise<PortfolioSlugEntry[]> {
  "use cache";
  cacheLife("days");
  cacheTag("contentful");

  return loadPortfolioSlugs(graphqlSource);
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
