import { Suspense } from "react";
import Image from "next/image";
import PortfolioSection from "@/components/PortfolioSection";
import { getHome } from "@/utils/contentful";
import { gridLayout } from "@/utils/portfolioGrid";
import { buildMetadata } from "@/utils/metadata";
import { LINKS } from "@/utils/site";

export const metadata = buildMetadata({
  title: "About me - David Riches",
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
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24 flex items-center justify-between gap-12">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-headline font-extrabold tracking-tight leading-tight mb-8">
            Hello, I&apos;m David.{" "}
            <span role="img" aria-label="Waving hand" className="wave">
              👋
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed max-w-3xl text-pretty font-body">
            <span className="text-on-surface font-semibold">
              Senior front-end engineer
            </span>{" "}
            and hockey player 🏑 based in Kent.
            <br /> I build headless commerce and content platforms for brands
            that care about performance, content, and the teams behind them.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
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
        {/* Hidden for now — re-enable when ready */}
        {false && (
          <Image
            src="/me.png"
            alt="Illustration of David carrying his son in a baby carrier"
            width={460}
            height={460}
            priority
            className="hidden lg:block w-72 xl:w-80 shrink-0 rounded-full"
          />
        )}
      </section>

      {/* Portfolio Section */}
      <div id="work" className="scroll-mt-28">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
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
        <Suspense
          fallback={
            <div className="container">
              <PortfolioSkeleton />
            </div>
          }
        >
          <PortfolioSection dataPromise={dataPromise} />
        </Suspense>
      </div>
    </>
  );
}

function PortfolioSkeleton() {
  const count = 6;
  return (
    <div id="cards">
      {[...Array(count)].map((_, i) => {
        const { fill } = gridLayout(count, i);
        return (
          <div
            key={i}
            className={`card animate-pulse${fill ? " card--fill" : ""}`}
          />
        );
      })}
    </div>
  );
}
