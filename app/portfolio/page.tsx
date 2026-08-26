import PortfolioCard from "@/components/PortfolioCard";
import { getPortfolioIndex } from "@/utils/contentful";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Commercial projects and case studies — headless commerce and content platforms built for industry-leading brands.",
  path: "/portfolio",
});

export default async function PortfolioIndexPage() {
  const items = await getPortfolioIndex();
  const count = items.length;
  // Mirrors the #cards last-child full-width rule in globals.css
  const isFullBleed = (index: number) =>
    index === count - 1 && count >= 3 && count % 3 !== 2;

  return (
    <section className="container pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight leading-tight mb-4">
          Portfolio
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-0">
          Commercial projects built for industry-leading brands.
        </p>
      </div>
      <div id="cards">
        {items.map((item, index) => (
          <PortfolioCard
            key={item.slug}
            index={index}
            item={item}
            priority={index === 0}
            imageVariant={isFullBleed(index) ? "hero" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
