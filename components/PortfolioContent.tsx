import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { notFound } from "next/navigation";
import Blocks from "@/blocks";
import RichText from "@/components/RichText";
import { getOgImageForPortfolio } from "@/utils/contentful";
import { articleJsonLd, breadcrumbJsonLd } from "@/utils/metadata";
import { SITE_URL } from "@/utils/site";
import type { PortfolioItem } from "@/types/contentful";

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

type Props = {
  dataPromise: Promise<PortfolioItem | undefined>;
};

export default async function PortfolioContent({ dataPromise }: Props) {
  const portfolioItem = await dataPromise;
  if (!portfolioItem) notFound();

  const {
    title,
    slug,
    seoTitle,
    link,
    agency,
    client,
    industry,
    body,
    blocksCollection,
    sys,
  } = portfolioItem;

  const plainTitle = stripHtml(seoTitle || title);
  const plainDescription = documentToPlainTextString(body.json).slice(0, 160);
  const ogImage = await getOgImageForPortfolio(portfolioItem);
  const pageUrl = `${SITE_URL}/portfolio/${slug}`;

  const articleLd = articleJsonLd({
    title: plainTitle,
    description: plainDescription,
    pageUrl,
    ogImage,
    datePublished: sys?.firstPublishedAt || sys?.publishedAt,
    dateModified: sys?.publishedAt || sys?.firstPublishedAt,
  });

  const breadcrumbLd = breadcrumbJsonLd(plainTitle, pageUrl);

  const metaItems = [
    client && { label: "Client", value: client },
    industry && { label: "Services", value: industry },
    link && { label: "Website", value: link, isLink: true },
  ].filter(Boolean) as { label: string; value: string; isLink?: boolean }[];

  const badgeText = agency || "Case Study";

  return (
    <section className="portfolio-item container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Hero */}
      <div className="pt-8 md:pt-12 mb-12 md:mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label text-xs tracking-widest uppercase font-bold mb-6">
          {agency && <span className="text-on-surface-variant font-normal mr-1">Agency:</span>}
          {badgeText}
        </span>
        <RichText
          as="h1"
          html={title}
          className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight tracking-tight mb-8"
        />

        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
          <div className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            {documentToReactComponents(body.json)}
          </div>

          {metaItems.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 md:gap-12 shrink-0">
              {metaItems.map((item, i) => (
                <div key={i}>
                  <p className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-1 font-bold">
                    {item.label}
                  </p>
                  <p className="font-headline font-semibold text-on-surface mb-0 text-sm">
                    {item.isLink ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://${item.value}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {blocksCollection && <Blocks blocksCollection={blocksCollection} />}

      {link && (
        <div className="mt-12 mb-8 text-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`//${link}`}
            className="btn-primary gap-2"
          >
            Visit website
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}
