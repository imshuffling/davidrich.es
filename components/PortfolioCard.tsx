import Link from "next/link";
import ImageWrapper from "@/components/ImageWrapper";
import RichText from "@/components/RichText";
import HoverVideo from "@/components/HoverVideo";
import type { PortfolioCardProps } from "@/types/components";

export default function PortfolioCard({
  item,
  index,
  priority = false,
  imageVariant,
}: PortfolioCardProps) {
  const { title, slug, media, image, industry, description, services } = item;
  const tags = services?.slice(0, 3);
  const isLarge = index === 0;
  const variant = imageVariant ?? (isLarge ? "cardLarge" : "card");

  return (
    <div className={`card ${media ? "has-video" : ""}`}>
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <ImageWrapper
            image={image}
            variant={variant}
            alt={title}
            priority={priority}
            showGradient={true}
          />
          {media && <HoverVideo url={media.url} />}
        </div>
        <div className="card__details">
          <div className="card__content">
            {industry && <span>{industry}</span>}
            <RichText as="h2" html={title} />
            {isLarge && description && (
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
