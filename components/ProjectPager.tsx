import Link from "next/link";
import RichText from "@/components/RichText";
import type { PortfolioItem } from "@/types/contentful";

interface ProjectPagerProps {
  prev?: Pick<PortfolioItem, "slug" | "title">;
  next?: Pick<PortfolioItem, "slug" | "title">;
}

export default function ProjectPager({ prev, next }: ProjectPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More projects" className="site-container mt-12 md:mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {prev && (
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group p-6 md:p-8 rounded-xl bg-card hover:bg-surface-container-high transition-colors"
          >
            <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
              ← Previous
            </span>
            <RichText as="span" html={prev.title} className="block mt-2 text-xl md:text-2xl font-headline font-bold text-on-surface" />
          </Link>
        )}
        {next && (
          <Link
            href={`/portfolio/${next.slug}`}
            className="group p-6 md:p-8 rounded-xl bg-card hover:bg-surface-container-high transition-colors sm:text-right sm:col-start-2"
          >
            <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">
              Next →
            </span>
            <RichText as="span" html={next.title} className="block mt-2 text-xl md:text-2xl font-headline font-bold text-on-surface" />
          </Link>
        )}
      </div>
    </nav>
  );
}
