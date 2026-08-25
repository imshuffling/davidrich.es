import PortfolioCard from "@/components/PortfolioCard";
import type { PortfolioItem } from "@/types/contentful";

interface PortfolioFooterProps {
  footerCollection?: { items: PortfolioItem[] };
}

export default function PortfolioFooter({ footerCollection }: PortfolioFooterProps) {
  if (!footerCollection || footerCollection.items.length === 0) return null;

  return (
    <section className="other-projects container">
      <h3 className="font-headline font-bold">Other projects</h3>
      <div id="cards">
        {footerCollection.items.map((item, index) => (
          <PortfolioCard key={item.slug} item={item} index={index} imageVariant="footerCard" />
        ))}
      </div>
    </section>
  );
}
