import PortfolioCard from "@/components/PortfolioCard";
import RichText from "@/components/RichText";
import { visualFor } from "@/utils/visuals";
import CtaBlock from "@/components/CtaBlock";
import type { PortfolioItem, SideProject } from "@/types/contentful";

interface PortfolioSectionProps {
  dataPromise: Promise<{
    portfolioCollection: PortfolioItem[];
    sideProjectsCollection: SideProject[];
  }>;
}

export default async function PortfolioSection({ dataPromise }: PortfolioSectionProps) {
  const { portfolioCollection, sideProjectsCollection } = await dataPromise;

  const count = portfolioCollection.length;
  // Mirrors the #cards last-child full-width rule in globals.css:
  // :last-child:nth-child(n + 3):not(:nth-child(3n + 2))
  const isFullBleed = (index: number) =>
    index === count - 1 && count >= 3 && count % 3 !== 2;

  return (
    <>
      <div className="site-container">
        <div id="cards">
          {portfolioCollection.map((item, index) => (
            <PortfolioCard
              key={item.slug}
              index={index}
              item={item}
              priority={index === 0}
              imageVariant={isFullBleed(index) ? "hero" : undefined}
            />
          ))}
        </div>
      </div>

      {sideProjectsCollection.length > 0 && (
        <section className="py-7 md:py-28 bg-surface-container-low mt-6 md:mt-16">
          <div className="site-container">
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Side Projects</h2>
              <p className="text-on-surface-variant mb-0">
                Experimenting with tools and APIs to solve small problems.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sideProjectsCollection.map((node) => (
                <SideProjectCard key={node.title} node={node} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBlock
        title="Have a project in mind?"
        body="I'm currently taking on new projects and would love to hear about yours."
        label="Get in touch"
      />
    </>
  );
}

function SideProjectCard({ node }: { node: SideProject }) {
  const link = node.link || node.githubUrl;
  const linkLabel = node.link ? "View Project" : "View Repo";
  const { icon, ...iconColor } = visualFor(node.title, "sideProject");

  return (
    <div className="p-8 rounded-xl bg-card motion-safe:hover:-translate-y-1 transition-all duration-300 group shadow-sm">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
        style={{ background: iconColor.bg, color: iconColor.color }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-3">{node.title}</h3>
      {node.description && (
        <RichText
          as="p"
          html={node.description}
          className="text-sm leading-relaxed mb-6 text-on-surface-variant"
        />
      )}
      {link && (
        <a
          className="font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all text-primary"
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
