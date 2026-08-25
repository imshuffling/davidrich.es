import Image from "next/image";
import type { ContentfulImage } from "@/types/contentful";

export type ImageVariant = "card" | "cardLarge" | "footerCard" | "hero" | "twoColumn";

/* Sizes derived from the .container cap (80rem − 2×2rem padding = 1216px content)
   and the 12-col #cards grid: span-4 ≈ 390px, span-8 ≈ 803px, full-bleed = 1216px. */
const VARIANTS: Record<ImageVariant, { fill: boolean; sizes: string }> = {
  card: {
    fill: true,
    sizes: "(min-width: 80em) 390px, (min-width: 48em) 33vw, calc(100vw - 4rem)",
  },
  cardLarge: {
    fill: true,
    sizes: "(min-width: 80em) 803px, (min-width: 48em) 66vw, calc(100vw - 4rem)",
  },
  footerCard: {
    fill: true,
    sizes: "(min-width: 80em) 596px, (min-width: 48em) 50vw, calc(100vw - 4rem)",
  },
  hero: {
    fill: true,
    sizes: "(min-width: 80em) 1216px, calc(100vw - 4rem)",
  },
  twoColumn: {
    fill: false,
    sizes: "(min-width: 80em) 576px, (min-width: 48em) calc(50vw - 4rem), calc(100vw - 4rem)",
  },
};

export function MediaGradient({ zIndex }: { zIndex?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)",
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
}

interface ImageWrapperProps {
  image: ContentfulImage;
  variant: ImageVariant;
  alt?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  style?: React.CSSProperties;
  showGradient?: boolean;
}

export default function ImageWrapper({
  image,
  variant,
  alt,
  priority = false,
  loading = "lazy",
  className,
  style,
  showGradient = false,
}: ImageWrapperProps) {
  const { fill, sizes } = VARIANTS[variant];

  const img = (
    <Image
      src={image.url}
      alt={alt || image.fileName}
      width={fill ? undefined : image.width}
      height={fill ? undefined : image.height}
      fill={fill}
      blurDataURL={image.blurDataURL}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      priority={priority}
      loading={priority ? undefined : loading}
      sizes={sizes}
      className={className}
      style={style}
    />
  );

  if (!fill) return img;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {img}
      {showGradient && <MediaGradient />}
    </div>
  );
}
