import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Blocks from "@/blocks";
import RichText from "@/components/RichText";
import { articleJsonLd, breadcrumbJsonLd } from "@/utils/metadata";
import type { PortfolioSeo } from "@/utils/contentful";
import type { PortfolioItem } from "@/types/contentful";

type Props = {
  portfolioItem: PortfolioItem;
  seo: PortfolioSeo;
};

export default function PortfolioContent({ portfolioItem, seo }: Props) {
  const { title, link, agency, client, industry, services, body, blocksCollection, sys } = portfolioItem;

  const articleLd = articleJsonLd({
    title: seo.plainTitle,
    description: seo.description,
    pageUrl: seo.pageUrl,
    ogImage: seo.ogImage,
    datePublished: sys?.firstPublishedAt || sys?.publishedAt,
    dateModified: sys?.publishedAt || sys?.firstPublishedAt,
  });

  const breadcrumbLd = breadcrumbJsonLd(seo.plainTitle, seo.pageUrl);

  const metaItems = [
    client && { label: "Client", value: client },
    industry && { label: "Industry", value: industry },
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
      <div className="pt-4 md:pt-12 mb-8 md:mb-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-headline font-semibold text-primary !border-none !bg-none mb-6 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <br />
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label text-xs tracking-widest uppercase font-bold mb-6">
          {agency && <span className="text-on-surface-variant font-normal mr-1">Agency:</span>}
          {badgeText}
        </span>
        <RichText
          as="h1"
          html={title}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight tracking-tight mb-8"
        />

        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
          <div className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            {body && documentToReactComponents(body.json)}
          </div>

          {(metaItems.length > 0 || (services && services.length > 0)) && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 md:gap-12 shrink-0 md:max-w-sm content-start">
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
              {services && services.length > 0 && (
                <div className="w-full">
                  <p className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-2 font-bold">
                    Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-headline font-semibold"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
