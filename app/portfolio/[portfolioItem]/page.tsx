import { notFound } from "next/navigation";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import ProjectPager from "@/components/ProjectPager";
import { getCaseStudy, getPortfolioSlugs } from "@/utils/contentful";
import { buildMetadata } from "@/utils/metadata";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ portfolioItem: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map(({ slug }) => ({ portfolioItem: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { portfolioItem: slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) notFound();
  const { seo } = caseStudy;

  return buildMetadata({
    title: seo.plainTitle,
    description: seo.description,
    path: `/portfolio/${slug}`,
    ogImage: seo.ogImage ? { url: seo.ogImage.url, alt: seo.plainTitle } : undefined,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { portfolioItem: slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) notFound();
  const { item, seo, pager } = caseStudy;

  return (
    <>
      <PortfolioContent portfolioItem={item} seo={seo} />
      <ProjectPager prev={pager.prev} next={pager.next} />
      <PortfolioFooter footerCollection={item.footerCollection} />
    </>
  );
}
