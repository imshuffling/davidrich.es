import { notFound } from "next/navigation";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import { getPortfolio, getPortfolioSlugs, portfolioSeo } from "@/utils/contentful";
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
  const [portfolioItem, seo] = await Promise.all([getPortfolio(slug), portfolioSeo(slug)]);
  if (!portfolioItem || !seo) notFound();

  return (
    <>
      <PortfolioContent portfolioItem={portfolioItem} seo={seo} />
      <PortfolioFooter footerCollection={portfolioItem.footerCollection} />
    </>
  );
}
