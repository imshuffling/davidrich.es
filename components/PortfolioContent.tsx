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
    body,
    blocksCollection,
  } = portfolioItem;

  return (
    <section className="portfolio-item">
      <div className="portfolio-item__content">
        <div className="portfolio-item__copy animate-on-scroll">
          <div className="portfolio-item__who">
            {agency ? agency : "Mirum"}
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
          <h2>{documentToReactComponents(body.json)}</h2>
        </div>
      </div>

      <div className="portfolio-wrapper">
        <div className="portfolio-info">
          {client && (
            <div
              className="portfolio-info__item animate-on-scroll-delayed"
              data-delay="200"
            >
              <span>Client</span>
              <span>
                <strong>{client}</strong>
              </span>
            </div>
          )}

          {completed && (
            <div
              className="portfolio-info__item animate-on-scroll-delayed"
              data-delay="300"
            >
              <span>Completed</span>
              <span>
                <strong>{completed}</strong>
              </span>
            </div>
          )}

          {timeframe && (
            <div
              className="portfolio-info__item animate-on-scroll-delayed"
              data-delay="400"
            >
              <span>Timeframe</span>
              <span>
                <strong>{timeframe}</strong>
              </span>
            </div>
          )}

          {link && (
            <div
              className="portfolio-info__item animate-on-scroll-delayed"
              data-delay="500"
            >
              <span>Website</span>
              <span>
                <strong>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://${link}`}
                  >
                    {link}
                  </a>
                </strong>
              </span>
            </div>
          )}
        </div>
      </div>
      {blocksCollection && <Blocks blocksCollection={blocksCollection} />}
      {link && (
        <p>
          <span role="img" aria-label="Finger">
            👉{" "}
          </span>
          <a target="_blank" rel="noopener noreferrer" href={`//${link}`}>
            Visit website
          </a>
        </p>
      )}
    </section>
  );
}
