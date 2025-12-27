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
        <div className="portfolio-item__copy">
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
            <div className="portfolio-info__item">
              <span>Client</span>
              <span>
                <strong>{client}</strong>
              </span>
            </div>
          )}

          {completed && (
            <div className="portfolio-info__item">
              <span>Completed</span>
              <span>
                <strong>{completed}</strong>
              </span>
            </div>
          )}

          {timeframe && (
            <div className="portfolio-info__item">
              <span>Timeframe</span>
              <span>
                <strong>{timeframe}</strong>
              </span>
            </div>
          )}

          {link && (
            <div className="portfolio-info__item">
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
