import { Suspense } from "react";
import PortfolioSection from "@/components/PortfolioSection";
import { getHome } from "@/utils/contentful";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me",
  description:
    "Hello I'm David, A Senior Front-end developer and part-time hockey player",
};

export default function HomePage() {
  const dataPromise = getHome();

  return (
    <>
      {/* Hero Section */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tight leading-tight mb-8">
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
              href="https://resume.davidrich.es/"
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
  return (
    <div id="cards">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-surface-container-high rounded-xl animate-pulse"
          style={{ aspectRatio: "1", minHeight: "300px" }}
        />
      ))}
    </div>
  );
}
