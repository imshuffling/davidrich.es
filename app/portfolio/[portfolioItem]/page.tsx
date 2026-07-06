import { Suspense } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import { getOgImageForPortfolio, getPortfolio, getPortfolioSlugs } from "@/utils/contentful";
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
  const portfolioItem = await getPortfolio(slug);
  if (!portfolioItem) return {};

  const plainText = documentToPlainTextString(portfolioItem.body.json);
  const seoDescription = plainText.slice(0, 160);
  const ogImage = await getOgImageForPortfolio(portfolioItem);

  return buildMetadata({
    title: portfolioItem.seoTitle || portfolioItem.title,
    description: seoDescription,
    path: `/portfolio/${slug}`,
    ogImage: ogImage ? { url: ogImage.url, alt: portfolioItem.title } : undefined,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { portfolioItem: slug } = await params;
  const portfolioPromise = getPortfolio(slug);
  const footerPromise = portfolioPromise.then((p) => p?.footerCollection);

  return (
    <>
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioContent dataPromise={portfolioPromise} />
      </Suspense>
      <Suspense fallback={<OtherProjectsSkeleton />}>
        <PortfolioFooter footerPromise={footerPromise} />
      </Suspense>
    </>
  );
}

function PortfolioSkeleton() {
  return (
    <section className="portfolio-item container animate-pulse">
      <div className="pt-8 md:pt-12 mb-12 md:mb-16">
        <div className="inline-block h-6 w-32 rounded-full bg-surface-container-high mb-6" />
        <div className="space-y-4 mb-8">
          <div className="h-12 md:h-16 lg:h-20 w-3/4 rounded-md bg-surface-container-high" />
          <div className="h-12 md:h-16 lg:h-20 w-1/2 rounded-md bg-surface-container-high" />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
          <div className="space-y-3 max-w-2xl flex-1">
            <div className="h-5 w-full rounded bg-surface-container-high" />
            <div className="h-5 w-full rounded bg-surface-container-high" />
            <div className="h-5 w-2/3 rounded bg-surface-container-high" />
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 md:gap-12 shrink-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 rounded bg-surface-container-high" />
                <div className="h-4 w-24 rounded bg-surface-container-high" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full aspect-video rounded-xl bg-surface-container-high" />
        ))}
      </div>
    </section>
  );
}

function OtherProjectsSkeleton() {
  return (
    <section className="other-projects container animate-pulse">
      <h3 className="font-headline font-bold">Other projects</h3>
      <div id="cards">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-surface-container-high"
            style={{ aspectRatio: "1" }}
          />
        ))}
      </div>
    </section>
  );
}
