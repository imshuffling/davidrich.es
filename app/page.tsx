import PortfolioSection from "@/components/PortfolioSection";
import { getHome } from "@/utils/contentful";
import { buildMetadata } from "@/utils/metadata";
import { LINKS } from "@/utils/site";

export const metadata = buildMetadata({
  title: "David Riches — Senior Front-End Engineer",
  description:
    "I'm David — a senior front-end engineer and hockey player based in Kent, building headless commerce and content platforms for performance-focused brands.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const dataPromise = getHome();

  return (
    <>
      {/* Hero Section */}
      <section className="container pt-8 pb-12 md:pt-20 md:pb-24 flex items-center justify-between gap-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-headline font-extrabold tracking-tight leading-tight mb-6 md:mb-8">
            Hello, I&apos;m David.{" "}
            <span role="img" aria-label="Waving hand" className="wave">
              👋
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-light leading-relaxed max-w-3xl text-pretty font-body">
            <span className="text-on-surface font-semibold">
              Senior front-end engineer
            </span>{" "}
            and hockey player 🏑 based in Kent.
            <br /> I build headless commerce and content platforms for brands
            that care about performance, content, and the teams behind them.
          </p>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
            <a href="#work" className="btn-primary">
              View Projects
            </a>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id="work" className="scroll-mt-28">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">
                Selected Work
              </h2>
              <p className="text-on-surface-variant max-w-2xl mb-0">
                A collection of commercial projects built for industry-leading
                brands.
              </p>
            </div>
          </div>
        </div>
        <PortfolioSection dataPromise={dataPromise} />
      </div>
    </>
  );
}
