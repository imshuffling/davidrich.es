import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Blocks from "@/blocks";
import RichText from "@/components/RichText";
import { articleJsonLd, breadcrumbJsonLd } from "@/utils/metadata";
import type { PortfolioSeo } from "@/utils/contentful";
import type { PortfolioItem } from "@/types/contentful";

const labelClass = "font-label text-[0.65rem] uppercase tracking-widest text-primary mb-1.5 font-bold";

type Props = {
  portfolioItem: PortfolioItem;
  seo: PortfolioSeo;
};

export default function PortfolioContent({ portfolioItem, seo }: Props) {
  const { title, link, agency, client, industry, timeframe, completed, services, body, blocksCollection } = portfolioItem;

  const articleLd = articleJsonLd({
    title: seo.plainTitle,
    description: seo.description,
    pageUrl: seo.pageUrl,
    ogImage: seo.ogImage,
    datePublished: seo.datePublished,
    dateModified: seo.dateModified,
  });

  const breadcrumbLd = breadcrumbJsonLd(seo.plainTitle, seo.pageUrl);

  const metaItems = [
    client && { label: "Client", value: client },
    industry && { label: "Industry", value: industry },
    timeframe && { label: "Timeline", value: timeframe },
    completed && { label: "Completed", value: completed },
    link && { label: "Website", value: link, isLink: true },
  ].filter(Boolean) as { label: string; value: string; isLink?: boolean }[];

  const hasServices = !!services && services.length > 0;

  return (
    <section className="portfolio-item site-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Hero */}
      <header className="pt-4 md:pt-12 mb-8 md:mb-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-headline font-semibold text-primary mb-6 md:mb-10 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <p className="font-label text-xs tracking-widest uppercase font-bold text-primary mb-3 md:mb-4">
          Case study{agency && <span className="text-on-surface-variant font-normal"> · {agency}</span>}
        </p>
        <RichText
          as="h1"
          html={title}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight tracking-tight mb-4 md:mb-6"
        />
        {body && (
          <div className="text-base md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
            {documentToReactComponents(body.json)}
          </div>
        )}

        {(metaItems.length > 0 || hasServices) && (
          <dl className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-8 gap-y-6 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-outline-variant">
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt className={labelClass}>{item.label}</dt>
                <dd className="font-headline font-semibold text-on-surface text-sm">
                  {item.isLink ? (
                    <a target="_blank" rel="noopener noreferrer" href={`https://${item.value}`}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
            {hasServices && (
              <div className="col-span-2">
                <dt className={labelClass}>Services</dt>
                <dd className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-headline font-semibold"
                    >
                      {service}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        )}
      </header>

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
