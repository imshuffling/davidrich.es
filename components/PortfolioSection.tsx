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
                <SideProjectCard key={i} node={node} index={i} />
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

const sideProjectIcons = [
  // timer
  <svg key="timer" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3L2 6" /><path d="M22 6l-3-3" /><line x1="12" y1="1" x2="12" y2="3" />
  </svg>,
  // fork-knife
  <svg key="fork" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>,
  // image
  <svg key="image" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </svg>,
  // map
  <svg key="map" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>,
];

function SideProjectCard({ node, index }: { node: SideProject; index: number }) {
  const link = node.link || node.githubUrl;
  const linkLabel = node.link ? "View Project" : "View Repo";
  const icon = sideProjectIcons[index % sideProjectIcons.length];

  return (
    <div className="p-8 rounded-xl hover:translate-y-[-4px] transition-all duration-300 group shadow-sm" style={{ background: "var(--card-bg)" }}>
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:text-white transition-colors"
        style={{ background: "rgba(99, 14, 212, 0.1)" }}
      >
        {icon}
      </div>
      <h4 className="text-xl font-headline font-bold mb-3" style={{ color: "var(--heading-color)" }}>{node.title}</h4>
      {node.description && (
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-color)" }}
          dangerouslySetInnerHTML={{ __html: node.description }}
        />
      )}
      {link && (
        <a
          className="font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all !border-none !bg-none"
          style={{ color: "var(--heading-color)" }}
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
