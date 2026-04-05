import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Blocks from "@/blocks";
import type { PortfolioItem } from "@/types/contentful";

type Props = {
  dataPromise: Promise<PortfolioItem>;
};

export default async function PortfolioContent({ dataPromise }: Props) {
  const portfolioItem = await dataPromise;

  const {
    title,
    link,
    completed,
    agency,
    client,
    timeframe,
    industry,
    body,
    blocksCollection,
  } = portfolioItem;

  const metaItems = [
    client && { label: "Client", value: client },
    industry && { label: "Industry", value: industry },
    completed && { label: "Completed", value: completed },
    timeframe && { label: "Timeframe", value: timeframe },
    link && { label: "Website", value: link, isLink: true },
  ].filter(Boolean) as { label: string; value: string; isLink?: boolean }[];

  return (
    <section className="portfolio-item container">
      {/* Hero */}
      <div className="pt-8 md:pt-12 mb-12 md:mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label text-xs tracking-widest uppercase font-bold mb-6">
          {agency || "Case Study"}
        </span>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight tracking-tight mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mb-10">
          {documentToReactComponents(body.json)}
        </div>

        {/* Meta bar */}
        {metaItems.length > 0 && (
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-4 sm:gap-0 border-t border-b border-outline-variant/30 py-5">
            {metaItems.map((item, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-8 bg-outline-variant/40 mx-8 hidden sm:block" />
                )}
                <div>
                  <p className="font-label text-[0.65rem] uppercase tracking-widest text-primary mb-0.5 font-bold">
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
              </div>
            ))}
          </div>
        )}
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
