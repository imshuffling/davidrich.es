import Link from "next/link";
import ImageWrapper from "@/components/ImageWrapper";
import RichText from "@/components/RichText";
import HoverVideo from "@/components/HoverVideo";
import type { PortfolioCardProps } from "@/types/components";

const SIZE_CLASS = { standard: "", large: "card--large", full: "card--full" } as const;

export default function PortfolioCard({ item, slot }: PortfolioCardProps) {
  const { title, slug, media, image, industry, description, services } = item;
  const tags = services?.slice(0, 3);
  const classes = ["card", SIZE_CLASS[slot.size], media && "has-video"].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <ImageWrapper
            image={image}
            variant={slot.variant}
            alt={title}
            priority={slot.priority}
            showGradient={true}
          />
          {media && <HoverVideo url={media.url} />}
        </div>
        <div className="card__details">
          <div className="card__content">
            {industry && <span>{industry}</span>}
            <RichText as="h2" html={title} />
            {slot.showDescription && description && (
              <p className="card__description">{description}</p>
            )}
            {tags && tags.length > 0 && (
              <ul className="card__tags" aria-label="Tech stack">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
