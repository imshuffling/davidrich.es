import { Suspense } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import PortfolioFooter from "@/components/PortfolioFooter";
import PortfolioContent from "@/components/PortfolioContent";
import { getOgImageForPortfolio, getPortfolio, getPortfolioSlugs } from "@/utils/contentful";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ portfolioItem: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ portfolioItem: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { portfolioItem: slug } = await params;
  const portfolioItem = await getPortfolio(slug);
  if (!portfolioItem) return {};

  const plainText = documentToPlainTextString(portfolioItem.body.json);
  const seoDescription = plainText.slice(0, 160);
  const ogImage = await getOgImageForPortfolio(portfolioItem);

  return {
    title: portfolioItem.seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://davidrich.es/portfolio/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://davidrich.es/portfolio/${slug}`,
      title: portfolioItem.seoTitle || portfolioItem.title,
      description: seoDescription,
      images: ogImage
        ? [
            {
              url: ogImage.url,
              width: 1200,
              height: 630,
              alt: portfolioItem.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: portfolioItem.seoTitle || portfolioItem.title,
      description: seoDescription,
    },
  };
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
    <section className="portfolio-item" style={{ opacity: 0.5 }}>
      <div className="portfolio-item__content">
        <div className="portfolio-item__copy">
          <div
            style={{
              width: "80px",
              height: "16px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />
          <div
            style={{
              width: "60%",
              height: "48px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "24px",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "80px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      <div className="portfolio-wrapper">
        <div className="portfolio-info">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="portfolio-info__item">
              <div
                style={{
                  width: "60px",
                  height: "16px",
                  background: "var(--text-color)",
                  opacity: 0.1,
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  width: "100px",
                  height: "20px",
                  background: "var(--text-color)",
                  opacity: 0.1,
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "40px 0" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: "400px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
              marginBottom: "40px",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function OtherProjectsSkeleton() {
  return (
    <section className="other-projects">
      <h3>Other projects</h3>
      <div id="cards" style={{ opacity: 0.5 }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </section>
  );
}
