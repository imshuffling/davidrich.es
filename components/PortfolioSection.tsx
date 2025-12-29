"use client";

import { use } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import type { PortfolioItem, SideProject } from "@/types/contentful";

interface PortfolioSectionProps {
  dataPromise: Promise<{
    portfolioCollection: PortfolioItem[];
    sideProjectsCollection: SideProject[];
  }>;
}

export default function PortfolioSection({ dataPromise }: PortfolioSectionProps) {
  const { portfolioCollection, sideProjectsCollection } = use(dataPromise);

  return (
    <>
      <div id="cards">
        {portfolioCollection.map((item, index) => (
          <PortfolioCard
            key={item.slug}
            index={index}
            item={item}
            priority={index === 0}
          />
        ))}
      </div>

      {sideProjectsCollection.length > 0 && (
        <div id="side-projects">
          <h2>Side projects</h2>
          <div className="side-projects-wrapper">
            {sideProjectsCollection.map((node, i) => (
              <SideProject key={i} node={node} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SideProject({ node }: { node: SideProject }) {
  return (
    <div className="item" key={node.id}>
      <div>
        <h3 className="item__title">{node.title}</h3>
        {node.description && (
          <div
            className="item__content"
            dangerouslySetInnerHTML={{
              __html: node.description,
            }}
          />
        )}
      </div>

      {node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.link}>
            View Site
          </a>
        </span>
      )}

      {node.githubUrl && !node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.githubUrl}>
            View Repo
          </a>
        </span>
      )}
    </div>
  );
}
