"use client";

import { use } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import type { PortfolioItem } from "@/types/contentful";

interface PortfolioFooterProps {
  footerPromise: Promise<{ items: PortfolioItem[] } | undefined>;
}

export default function PortfolioFooter({ footerPromise }: PortfolioFooterProps) {
  const footerCollection = use(footerPromise);

  if (!footerCollection || footerCollection.items.length === 0) return null;

  return (
    <section className="other-projects">
      <h3>Other projects</h3>
      <div id="cards">
        {footerCollection.items.map((item, index) => (
          <PortfolioCard
            key={item.slug}
            item={item}
            index={index}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
