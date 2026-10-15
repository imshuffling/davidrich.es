import HeroBlob from "@/components/HeroBlob";
import HeroBlobStatic from "@/components/HeroBlobStatic";
import PortfolioSection from "@/components/PortfolioSection";
import { getHome } from "@/utils/contentful";
import { pageMetadata } from "@/utils/metadata";
import Link from "next/link";
import ClientStrip from "@/components/ClientStrip";

export const metadata = pageMetadata("home");

export default function HomePage() {
  const dataPromise = getHome();

  return (
    <>
      {/* Hero Section */}
      <section className="site-container relative pt-8 pb-12 md:pt-20 md:pb-24 flex items-center justify-between gap-12">
        <div className="relative z-10 max-w-4xl">
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
            <Link href="/about" className="btn-secondary">
              About Me
            </Link>
          </div>
        </div>
        <HeroBlobStatic className="xl:hidden pointer-events-none absolute -top-6 -right-20 w-64 h-64 md:-right-16 md:w-[26rem] md:h-[26rem] opacity-40 md:opacity-60" />
        <HeroBlob />
      </section>

      <ClientStrip />

      {/* Portfolio Section */}
      <div id="work" className="scroll-mt-header">
        <div className="site-container">
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
