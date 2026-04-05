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
      <div className="container">
        <div id="cards">
          {portfolioCollection.map((item, index) => {
            const total = portfolioCollection.length;
            const remaining = total - 2; // items after first row (8+4)
            const isLast = index === total - 1;
            const fillLastRow = isLast && remaining > 0 && remaining % 3 !== 0;

            return (
              <PortfolioCard
                key={item.slug}
                index={index}
                item={item}
                priority={index === 0}
                className={fillLastRow ? "card--fill" : undefined}
              />
            );
          })}
        </div>
      </div>

      {sideProjectsCollection.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-low mt-16">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Side Projects</h2>
              <p className="text-on-surface-variant mb-0">
                Experimenting with tools and APIs to solve small problems.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sideProjectsCollection.map((node, i) => (
                <SideProjectCard key={i} node={node} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 text-center container">
        <div className="bg-primary-container rounded-xl py-16 md:py-24 px-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white blur-3xl opacity-10 -ml-20 -mb-20"></div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 relative z-10 !text-white">
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 relative z-10">
            I&apos;m currently taking on new projects and would love to hear about yours.
          </p>
          <a className="btn-white relative z-10" href="mailto:hi@davidrich.es">
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}

function SideProjectCard({ node }: { node: SideProject }) {
  const link = node.link || node.githubUrl;
  const linkLabel = node.link ? "View Project" : "View Repo";

  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl hover:translate-y-[-4px] transition-all duration-300 group shadow-sm">
      <h4 className="text-xl font-headline font-bold mb-3">{node.title}</h4>
      {node.description && (
        <p
          className="text-sm text-on-surface-variant leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: node.description }}
        />
      )}
      {link && (
        <a
          className="!text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all !border-none !bg-none"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}
