import { notFound } from "next/navigation";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import ProjectPager from "@/components/ProjectPager";
import { getHome, getPortfolio, getPortfolioSlugs, portfolioSeo } from "@/utils/contentful";
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
  const seo = await portfolioSeo(slug);
  if (!seo) notFound();

  return buildMetadata({
    title: seo.plainTitle,
    description: seo.description,
    path: `/portfolio/${slug}`,
    ogImage: seo.ogImage ? { url: seo.ogImage.url, alt: seo.plainTitle } : undefined,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { portfolioItem: slug } = await params;
  const [portfolioItem, seo, home] = await Promise.all([
    getPortfolio(slug),
    portfolioSeo(slug),
    getHome(),
  ]);
  if (!portfolioItem || !seo) notFound();

  // Prev/next cycle through the featured order; non-featured items get no pager
  const featured = home.portfolioCollection;
  const index = featured.findIndex((item) => item.slug === slug);
  const hasPager = index !== -1 && featured.length > 1;
  const prev = hasPager ? featured[(index - 1 + featured.length) % featured.length] : undefined;
  const next = hasPager ? featured[(index + 1) % featured.length] : undefined;

  return (
    <>
      <PortfolioContent portfolioItem={portfolioItem} seo={seo} />
      <ProjectPager prev={prev} next={next} />
      <PortfolioFooter footerCollection={portfolioItem.footerCollection} />
    </>
  );
}
